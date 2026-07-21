import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/logger", () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}));

import { parseToolResult } from "@/lib/parseToolResult";
import { primaryTextOf, toolResultSchemas } from "@/lib/toolResults";
import { TOOL_RESPONSE_SCHEMAS } from "@/lib/toolSchemas";

const grammar = {
  correctedText: "She doesn't like it when it rains.",
  issueCount: 2,
  corrections: [
    { original: "dont", corrected: "doesn't", type: "grammar" },
    { original: "freind", corrected: "friend", type: "spelling" },
  ],
};

describe("parseToolResult", () => {
  it("returns structured data for valid JSON", () => {
    const result = parseToolResult(
      "free-grammar-checker",
      JSON.stringify(grammar),
    );

    expect(result.format).toBe("structured");
    if (result.format !== "structured") throw new Error("unreachable");
    expect(result.tool).toBe("free-grammar-checker");
    expect(result.data).toEqual(grammar);
  });

  it("tolerates JSON wrapped in a markdown code fence", () => {
    // Models are told to return bare JSON but sometimes fence it anyway.
    // Without this, a perfectly good answer would land in the text fallback.
    const fenced = "```json\n" + JSON.stringify(grammar) + "\n```";
    const result = parseToolResult("free-grammar-checker", fenced);
    expect(result.format).toBe("structured");
  });

  // --- fallback paths -----------------------------------------------------
  // Each of these previously had no answer at all: the client rendered
  // whatever came back and scraped it with regexes.

  it("falls back to text when the response is prose, not JSON", () => {
    const raw = "<p>Corrected Paragraph:</p><p>She doesn't like rain.</p>";
    const result = parseToolResult("free-grammar-checker", raw);

    expect(result).toEqual({ format: "text", content: raw });
  });

  it("falls back to text when JSON is truncated mid-object", () => {
    // The realistic failure: output hits maxOutputTokens and simply stops.
    const truncated = JSON.stringify(grammar).slice(0, 60);
    const result = parseToolResult("free-grammar-checker", truncated);

    expect(result.format).toBe("text");
    if (result.format !== "text") throw new Error("unreachable");
    expect(result.content).toBe(truncated);
  });

  it("falls back to text when a required field is missing", () => {
    const result = parseToolResult(
      "free-grammar-checker",
      JSON.stringify({ correctedText: "hi", corrections: [] }),
    );
    expect(result.format).toBe("text");
  });

  it("falls back to text when a field has the wrong type", () => {
    const result = parseToolResult(
      "free-grammar-checker",
      JSON.stringify({ ...grammar, issueCount: "two" }),
    );
    expect(result.format).toBe("text");
  });

  it("never throws, whatever the model returns", () => {
    for (const raw of ["", "   ", "null", "[]", "42", '{"a":', "```"]) {
      expect(() => parseToolResult("free-text-summarizer", raw)).not.toThrow();
    }
  });
});

describe("primaryTextOf", () => {
  it("copies the tool's actual output, not its commentary", () => {
    expect(
      primaryTextOf({ tool: "free-grammar-checker", data: grammar }),
    ).toBe(grammar.correctedText);

    expect(
      primaryTextOf({
        tool: "free-text-summarizer",
        data: { summary: "A summary.", keyPoints: ["one", "two"] },
      }),
    ).toBe("A summary.");

    expect(
      primaryTextOf({
        tool: "prompt-generator",
        data: { title: "T", prompt: "The prompt", tips: [] },
      }),
    ).toBe("The prompt");
  });

  it("renders the analyzer as readable plain text", () => {
    const text = primaryTextOf({
      tool: "free-originality-analyzer",
      data: {
        score: 72,
        aiIndicators: "Some uniform phrasing.",
        expression: "Fresh.",
        voice: "Distinct.",
        suggestions: ["Vary sentence length"],
      },
    });

    expect(text).toContain("72/100");
    expect(text).toContain("- Vary sentence length");
  });
});

describe("schema pairs", () => {
  // The Gemini schema and the zod schema are hand-written separately. If their
  // required keys diverge, the model is told to send one shape while the server
  // validates another — and every response silently lands in the fallback.
  it("agree on required keys for every tool", () => {
    for (const [tool, geminiSchema] of Object.entries(TOOL_RESPONSE_SCHEMAS)) {
      const zodSchema = toolResultSchemas[tool as keyof typeof toolResultSchemas];
      const zodRequired = Object.entries(zodSchema.shape)
        .filter(([, v]) => !(v as { isOptional(): boolean }).isOptional())
        .map(([k]) => k)
        .sort();

      expect(
        [...(geminiSchema.required ?? [])].sort(),
        `mismatch for ${tool}`,
      ).toEqual(zodRequired);
    }
  });

  it("declares a schema for every tool that has a result shape", () => {
    expect(Object.keys(TOOL_RESPONSE_SCHEMAS).sort()).toEqual(
      Object.keys(toolResultSchemas).sort(),
    );
  });
});
