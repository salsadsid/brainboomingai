import { afterEach, describe, expect, it, vi } from "vitest";

const generateContent = vi.fn();

vi.mock("@google/genai", () => ({
  GoogleGenAI: class {
    models = { generateContent };
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}));

process.env.GOOGLE_API_KEY = "test-key";

const { generateResponse, UpstreamBusyError, QuotaExceededError } =
  await import("@/lib/googleAIService");

/** Shaped like the SDK's error: the HTTP status is embedded in the message. */
const upstream = (status: number, name: string) =>
  new Error(`got status: ${status} ${name}. {"error":{"code":${status}}}`);

const ok = (text: string) => ({ text });

afterEach(() => {
  generateContent.mockReset();
});

describe("generateResponse", () => {
  it("returns the trimmed text on first success", async () => {
    generateContent.mockResolvedValueOnce(ok("  hello  "));
    const result = await generateResponse("hi");
    expect(result.response).toBe("hello");
    expect(generateContent).toHaveBeenCalledTimes(1);
  });

  // The bug this retry exists for: a single transient 503 was surfacing to the
  // user as a hard failure, even though the very next call succeeded.
  it("retries a 503 and succeeds", async () => {
    generateContent
      .mockRejectedValueOnce(upstream(503, "Service Unavailable"))
      .mockResolvedValueOnce(ok("recovered"));

    const result = await generateResponse("hi");
    expect(result.response).toBe("recovered");
    expect(generateContent).toHaveBeenCalledTimes(2);
  });

  it("does NOT retry a 429 — quota cannot clear within a request", async () => {
    // The free tier's binding limit is GenerateRequestsPerDayPerProjectPerModel,
    // so a sub-second backoff can never clear it. Retrying only made the user
    // wait ~2s longer for the same refusal.
    generateContent.mockRejectedValue(upstream(429, "Too Many Requests"));

    await expect(generateResponse("hi")).rejects.toBeInstanceOf(
      QuotaExceededError,
    );
    expect(generateContent).toHaveBeenCalledTimes(1);
  });

  it("carries Google's suggested wait through on a quota error", async () => {
    generateContent.mockRejectedValue(
      new Error(
        'got status: 429 Too Many Requests. {"error":{"code":429}} Please retry in 45.8s.',
      ),
    );

    await expect(generateResponse("hi")).rejects.toMatchObject({
      retryAfterSeconds: 46,
    });
  });

  it("gives up after 3 attempts and reports the provider as busy", async () => {
    generateContent.mockRejectedValue(upstream(503, "Service Unavailable"));

    await expect(generateResponse("hi")).rejects.toBeInstanceOf(
      UpstreamBusyError
    );
    expect(generateContent).toHaveBeenCalledTimes(3);
  });

  it("does NOT retry a deterministic failure", async () => {
    // A revoked key fails identically every time; retrying only triples the
    // time the user waits for the same error.
    generateContent.mockRejectedValue(upstream(403, "Forbidden"));

    await expect(generateResponse("hi")).rejects.toThrow(/403/);
    expect(generateContent).toHaveBeenCalledTimes(1);
  });

  it("does not retry an empty completion", async () => {
    generateContent.mockResolvedValue(ok("   "));
    await expect(generateResponse("hi")).rejects.toThrow(/No valid content/);
    expect(generateContent).toHaveBeenCalledTimes(1);
  });
});
