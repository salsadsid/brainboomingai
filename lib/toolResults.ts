import { z } from "zod";

/**
 * The shape each tool's result takes, once the model's JSON has been validated.
 *
 * Client-safe on purpose: `components/tools/results/*` and the Copy button in
 * TextToolForm import from here. The Gemini-specific response schemas live in
 * `lib/toolSchemas.ts`, which pulls in @google/genai and must stay server-side.
 *
 * These replace a set of regexes that scraped values back out of model-authored
 * HTML — e.g. matching `<p>Number of Mistakes:</p>` to find the issue count,
 * which silently yielded 0 whenever the model varied its markup.
 */

const correction = z.object({
  original: z.string(),
  corrected: z.string(),
  /** e.g. "grammar", "spelling", "punctuation". Advisory, so kept loose. */
  type: z.string().optional(),
});

export type Correction = z.infer<typeof correction>;

export const toolResultSchemas = {
  "free-grammar-checker": z.object({
    correctedText: z.string(),
    issueCount: z.number().int().nonnegative(),
    corrections: z.array(correction),
  }),
  "free-spell-checker": z.object({
    correctedText: z.string(),
    issueCount: z.number().int().nonnegative(),
    corrections: z.array(correction),
  }),
  "free-paraphrasing-tool": z.object({
    paraphrasedText: z.string(),
    notes: z.array(z.string()).optional(),
  }),
  "free-text-summarizer": z.object({
    summary: z.string(),
    keyPoints: z.array(z.string()),
  }),
  "free-ai-to-human": z.object({
    rewrittenText: z.string(),
    changes: z.array(z.string()).optional(),
  }),
  "free-originality-analyzer": z.object({
    score: z.number().min(0).max(100),
    aiIndicators: z.string(),
    expression: z.string(),
    voice: z.string(),
    suggestions: z.array(z.string()),
  }),
  "free-image-to-text": z.object({
    extractedText: z.string(),
  }),
  "prompt-generator": z.object({
    title: z.string(),
    prompt: z.string(),
    tips: z.array(z.string()).optional(),
  }),
} as const;

export type ToolResultSlug = keyof typeof toolResultSchemas;

export type ToolResults = {
  [K in ToolResultSlug]: z.infer<(typeof toolResultSchemas)[K]>;
};

/** A validated result together with the tool it belongs to. */
export type ToolResult = {
  [K in ToolResultSlug]: { tool: K; data: ToolResults[K] };
}[ToolResultSlug];

/** What the server sends back — structured when parsing worked, text when not. */
export type GeneratePayload =
  | ({ format: "structured" } & ToolResult)
  | { format: "text"; content: string };

export function hasResultSchema(tool: string): tool is ToolResultSlug {
  return Object.hasOwn(toolResultSchemas, tool);
}

/**
 * The text the Copy button should place on the clipboard: the tool's actual
 * output, not its commentary. Previously a per-tool regex that returned "" —
 * copying nothing at all — whenever the model's markup drifted.
 */
export function primaryTextOf(result: ToolResult): string {
  switch (result.tool) {
    case "free-grammar-checker":
    case "free-spell-checker":
      return result.data.correctedText;
    case "free-paraphrasing-tool":
      return result.data.paraphrasedText;
    case "free-text-summarizer":
      return result.data.summary;
    case "free-ai-to-human":
      return result.data.rewrittenText;
    case "free-image-to-text":
      return result.data.extractedText;
    case "prompt-generator":
      return result.data.prompt;
    case "free-originality-analyzer": {
      const { score, aiIndicators, expression, voice, suggestions } =
        result.data;
      return [
        `Originality score: ${score}/100`,
        ``,
        `AI indicators: ${aiIndicators}`,
        `Expression: ${expression}`,
        `Voice: ${voice}`,
        ``,
        `Suggestions:`,
        ...suggestions.map((s) => `- ${s}`),
      ].join("\n");
    }
  }
}
