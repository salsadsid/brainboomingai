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
import { generateResponse } from "@/lib/googleAIService";
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
    expect(data.error).toBe("API down");
  });
});
