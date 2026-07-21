import { afterEach, describe, expect, it, vi } from "vitest";

// Mock external dependencies before importing the route
vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue(null),
}));

vi.mock("@/lib/mongoose", () => ({
  default: vi.fn(),
}));

vi.mock("@/lib/rateLimit", () => ({
  rateLimit: vi.fn(),
}));

vi.mock("@/lib/googleAIService", () => ({
  generateResponse: vi.fn(),
  // The route branches on this class, so the mock has to provide the real
  // shape — a bare vi.fn() would make `instanceof` throw.
  UpstreamBusyError: class UpstreamBusyError extends Error {
    readonly retryable = true;
    constructor(message = "The AI provider is busy.") {
      super(message);
      this.name = "UpstreamBusyError";
    }
  },
}));

vi.mock("@/models/GeneratedResponse", () => ({
  default: {
    create: vi.fn(),
  },
}));

vi.mock("@/models/UserActivity", () => ({
  default: {
    create: vi.fn(),
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

import { POST } from "@/app/api/generate/route";
import { generateResponse, UpstreamBusyError } from "@/lib/googleAIService";
import { rateLimit } from "@/lib/rateLimit";
import GeneratedResponseModel from "@/models/GeneratedResponse";

function jsonRequest(body: unknown, ip = "1.2.3.4"): Request {
  return new Request("http://localhost/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("POST /api/generate", () => {
  it("returns 429 when rate limited", async () => {
    vi.mocked(rateLimit).mockResolvedValue({ success: false });

    const res = await POST(jsonRequest({ prompt: "test", tool: "free-ai-to-human" }));
    expect(res.status).toBe(429);

    const data = await res.json();
    expect(data.error).toMatch(/too many requests/i);
  });

  it("returns 400 when prompt is missing", async () => {
    vi.mocked(rateLimit).mockResolvedValue({ success: true });

    const res = await POST(jsonRequest({ tool: "free-ai-to-human" }));
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toMatch(/prompt is required/i);
  });

  it("returns 400 when prompt is not a string", async () => {
    vi.mocked(rateLimit).mockResolvedValue({ success: true });

    const res = await POST(jsonRequest({ prompt: 123, tool: "free-ai-to-human" }));
    expect(res.status).toBe(400);
  });

  it("returns 201 with AI response on success", async () => {
    vi.mocked(rateLimit).mockResolvedValue({ success: true });
    vi.mocked(generateResponse).mockResolvedValue({
      response: "AI says hello",
      responseRaw: {} as Record<string, unknown>,
    });
    vi.mocked(GeneratedResponseModel.create).mockResolvedValue({
      response: "AI says hello",
    } as never);

    const res = await POST(
      jsonRequest({ prompt: "say hello", tool: "free-grammar-checker" }),
    );
    expect(res.status).toBe(201);

    const data = await res.json();
    expect(data).toBe("AI says hello");
  });

  it("returns 500 when AI service throws", async () => {
    vi.mocked(rateLimit).mockResolvedValue({ success: true });
    vi.mocked(generateResponse).mockRejectedValue(new Error("API down"));

    const res = await POST(
      jsonRequest({ prompt: "say hello", tool: "free-grammar-checker" }),
    );
    expect(res.status).toBe(500);

    const data = await res.json();
    // Deliberately NOT "API down". The upstream error text used to be echoed
    // straight to the client, which put raw Google JSON in front of users.
    expect(data.error).toBe("Failed to generate a response. Please try again.");
    expect(JSON.stringify(data)).not.toContain("API down");
  });

  it("returns 503 and a retryable flag when the provider is busy", async () => {
    vi.mocked(rateLimit).mockResolvedValue({ success: true });
    vi.mocked(generateResponse).mockRejectedValue(new UpstreamBusyError());

    const res = await POST(
      jsonRequest({ prompt: "say hello", tool: "free-grammar-checker" }),
    );
    expect(res.status).toBe(503);
    expect(res.headers.get("Retry-After")).toBe("5");

    const data = await res.json();
    expect(data.retryable).toBe(true);
    expect(data.error).toMatch(/busy/i);
  });
});
