import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/models/ToolRun", () => ({
  default: { create: vi.fn() },
}));

vi.mock("@/lib/logger", () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}));

import { logger } from "@/lib/logger";
import { recordToolRun, type ToolRunFields } from "@/lib/toolRuns";
import ToolRun from "@/models/ToolRun";

const okRun: ToolRunFields = {
  tool: "free-grammar-checker",
  authenticated: false,
  inputChars: 120,
  outputChars: 118,
  latencyMs: 2400,
  aiLatencyMs: 2100,
  format: "structured",
  status: "ok",
};

function writtenDoc(): Record<string, unknown> {
  return vi.mocked(ToolRun.create).mock.calls[0][0] as unknown as Record<
    string,
    unknown
  >;
}

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("recordToolRun", () => {
  it("writes only the allowlisted fields, whatever it is handed", async () => {
    // Excess-property checks do not apply to spreads, so an object like this
    // compiles. The helper is what keeps it out of the collection.
    const leaky = {
      ...okRun,
      text: "what the visitor typed",
      response: "what they got back",
      userId: "user-1",
      ip: "9.9.9.9",
    };

    await recordToolRun(leaky);

    expect(writtenDoc()).toEqual(okRun);
  });

  it("fills in what a failed run cannot know", async () => {
    await recordToolRun({
      tool: "free-text-summarizer",
      authenticated: true,
      inputChars: 300,
      latencyMs: 900,
      status: "busy",
    });

    expect(writtenDoc()).toEqual({
      tool: "free-text-summarizer",
      authenticated: true,
      inputChars: 300,
      outputChars: 0,
      latencyMs: 900,
      aiLatencyMs: null,
      format: null,
      status: "busy",
    });
  });

  it("never rejects when the write fails", async () => {
    vi.mocked(ToolRun.create).mockRejectedValueOnce(new Error("mongo down"));

    await expect(recordToolRun(okRun)).resolves.toBeUndefined();
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it("gives up on a stalled write instead of holding the response", async () => {
    vi.useFakeTimers();
    // A connection that has gone quiet: the write neither resolves nor rejects.
    vi.mocked(ToolRun.create).mockReturnValueOnce(
      new Promise(() => {}) as never,
    );

    let settled = false;
    const pending = recordToolRun(okRun).then(() => {
      settled = true;
    });

    await vi.advanceTimersByTimeAsync(1_999);
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await pending;
    expect(settled).toBe(true);
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
