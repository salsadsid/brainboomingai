import { Type, type Schema } from "@google/genai";
import type { ToolResultSlug } from "./toolResults";

/**
 * Gemini `responseSchema` per tool — the model-facing half of the contract
 * whose validated half lives in `lib/toolResults.ts`.
 *
 * Server-only: importing this pulls in @google/genai.
 *
 * Kept deliberately parallel to the zod schemas; `__tests__/lib/toolSchemas`
 * asserts the two agree on required keys so the hand-written pair cannot drift.
 */

const correctionItem: Schema = {
  type: Type.OBJECT,
  properties: {
    original: { type: Type.STRING, description: "The text as the user wrote it" },
    corrected: { type: Type.STRING, description: "The corrected replacement" },
    type: {
      type: Type.STRING,
      description: "Category, e.g. grammar, spelling, punctuation",
    },
  },
  required: ["original", "corrected"],
};

const correctionResult = (what: string): Schema => ({
  type: Type.OBJECT,
  properties: {
    correctedText: {
      type: Type.STRING,
      description: `The full ${what} text, with no markup`,
    },
    issueCount: {
      type: Type.INTEGER,
      description: "How many issues were found and fixed",
    },
    corrections: { type: Type.ARRAY, items: correctionItem },
  },
  required: ["correctedText", "issueCount", "corrections"],
});

export const TOOL_RESPONSE_SCHEMAS: Record<ToolResultSlug, Schema> = {
  "free-grammar-checker": correctionResult("corrected"),
  "free-spell-checker": correctionResult("spell-corrected"),

  "free-paraphrasing-tool": {
    type: Type.OBJECT,
    properties: {
      paraphrasedText: { type: Type.STRING },
      notes: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Optional notes on what was changed and why",
      },
    },
    required: ["paraphrasedText"],
  },

  "free-text-summarizer": {
    type: Type.OBJECT,
    properties: {
      summary: { type: Type.STRING, description: "The summary as prose" },
      keyPoints: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "The main takeaways, one per item",
      },
    },
    required: ["summary", "keyPoints"],
  },

  "free-ai-to-human": {
    type: Type.OBJECT,
    properties: {
      rewrittenText: { type: Type.STRING },
      changes: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "What was changed to make it read as human-written",
      },
    },
    required: ["rewrittenText"],
  },

  "free-originality-analyzer": {
    type: Type.OBJECT,
    properties: {
      score: {
        type: Type.INTEGER,
        description: "0-100. Higher means a more original, human voice",
      },
      aiIndicators: {
        type: Type.STRING,
        description: "Analysis of AI-generated patterns found or not found",
      },
      expression: {
        type: Type.STRING,
        description: "Analysis of language freshness, cliches, generic phrasing",
      },
      voice: {
        type: Type.STRING,
        description: "Analysis of authorial voice and distinctiveness",
      },
      suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["score", "aiIndicators", "expression", "voice", "suggestions"],
  },

  "free-image-to-text": {
    type: Type.OBJECT,
    properties: {
      extractedText: {
        type: Type.STRING,
        description: "The cleaned-up text, meaning unchanged",
      },
    },
    required: ["extractedText"],
  },

  "prompt-generator": {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: "A short name for the prompt" },
      prompt: { type: Type.STRING, description: "The generated prompt itself" },
      tips: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Optional tips for getting the most from the prompt",
      },
    },
    required: ["title", "prompt"],
  },
};
