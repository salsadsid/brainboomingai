/**
 * Server-side prompt templates, keyed by tool slug.
 *
 * These used to live in `app/(tools)/<tool>/prompt.ts` and were imported by the
 * `"use client"` tool components, which had two consequences:
 *
 *  1. The instructions shipped in the JS bundle, readable in devtools.
 *  2. More seriously, the browser composed the whole prompt and the API
 *     forwarded it verbatim — so `/api/generate` was an open proxy to the
 *     project's Gemini key. The `tool` field was validated but constrained
 *     nothing, since the prompt arrived pre-built.
 *
 * Keeping them here means the client can only supply the interpolated text.
 * That does not stop a user writing "ignore previous instructions" inside their
 * own text — nothing fully does — but it is the difference between a
 * constrained tool and an anonymous LLM endpoint.
 *
 * ---
 *
 * The prompts no longer ask for HTML. Each tool now declares a JSON shape via
 * `responseSchema` (see lib/toolSchemas.ts), and the field expectations are
 * ALSO restated in the prompt text below. That redundancy is deliberate: if the
 * model or tier ignores `responseSchema`, the instruction alone still usually
 * produces valid JSON, and anything unparseable falls back to plain text.
 *
 * This module must never be imported from a Client Component.
 */

/** Appended to every prompt so the JSON contract survives without the schema. */
const jsonContract = (fields: string) =>
  `\n\nRespond with JSON only — no markdown, no code fences, no commentary outside the JSON. Use exactly these fields:\n${fields}\nPlain text inside the fields: do not include HTML tags.`;

const grammarChecker = (s: string) =>
  `You are an expert in grammar and language refinement. Correct the grammatical, punctuation and syntactical errors in the text below, in whatever language it is written.

Text:
"""
${s}
"""

Preserve the original meaning and the author's tone. Improve fluency and readability where the phrasing is awkward, but do not rewrite the author's voice. List every correction you make.${jsonContract(
    `- correctedText: the full corrected text
- issueCount: how many issues you fixed (a number)
- corrections: an array of { original, corrected, type } where type is one of "grammar", "spelling", "punctuation" or "style"`,
  )}`;

const spellChecker = (s: string) =>
  `You are an expert in spell checking. Find and correct the spelling mistakes in the text below, in whatever language it is written.

Text:
"""
${s}
"""

Correct only spelling. Leave grammar, tone and structure exactly as the author wrote them. List every misspelling you fix.${jsonContract(
    `- correctedText: the full text with spelling corrected
- issueCount: how many misspellings you fixed (a number)
- corrections: an array of { original, corrected, type } with type set to "spelling"`,
  )}`;

const paraphraser = (s: string) =>
  `You are an expert at paraphrasing. Reword and restructure the text below to improve clarity and flow, keeping the original meaning intact.

Text:
"""
${s}
"""

Match the tone and register of the original. Do not add new information or opinions.${jsonContract(
    `- paraphrasedText: the full paraphrased text
- notes: an optional array of short strings describing what you changed and why`,
  )}`;

const summarizer = (s: string) =>
  `You are an expert at summarizing written content. Summarize the text below, keeping every important idea.

Text:
"""
${s}
"""

The summary should be substantially shorter than the original, readable as prose, and faithful to the source. Do not introduce claims the text does not make.${jsonContract(
    `- summary: the summary, as prose
- keyPoints: an array of the main takeaways, one short sentence each`,
  )}`;

const aiToHuman = (s: string) =>
  `You are an expert writer and editor. Rewrite the text below so it reads as natural, human-written prose.

Text:
"""
${s}
"""

Retain the original meaning. Vary sentence length, remove robotic or formulaic phrasing, and drop hedging filler. Keep the author's apparent intent and register.${jsonContract(
    `- rewrittenText: the full rewritten text
- changes: an optional array of short strings describing the kinds of change you made`,
  )}`;

const imageToText = (s: string) =>
  `The text below was extracted from an image by OCR and may contain artefacts — broken line breaks, stray characters, or mis-split words.

Text:
"""
${s}
"""

Clean it up: repair line breaks and obvious OCR errors, and restore sensible paragraphs. Do not change the meaning, do not add anything that is not there, and do not translate it.${jsonContract(
    `- extractedText: the cleaned-up text`,
  )}`;

const originalityAnalyzer = (s: string) =>
  `You are an expert in writing analysis. Evaluate the originality and voice of the text below.

Text:
"""
${s}
"""

Important: this is a PATTERN-BASED analysis of the writing itself. You are NOT comparing against external sources or any database, and you must not imply that you are.

Assess:
1. AI-generated content indicators — uniform sentence structure, hedging language, absent personal voice, generic phrasing, heavy transition words.
2. Originality of expression — fresh and specific language versus cliches and boilerplate.
3. Writing voice — distinct and authorial versus template-like.

Be specific and honest, and cite what you actually observed in the text.${jsonContract(
    `- score: 0-100, where higher means a more original, human voice
- aiIndicators: what AI-like patterns you did or did not find
- expression: your assessment of language freshness
- voice: your assessment of authorial distinctiveness
- suggestions: an array of specific, actionable improvements`,
  )}`;

const promptGenerator = (s: string) =>
  `You are an expert prompt engineer. Write a detailed, effective prompt based on the description below.

Description:
"""
${s}
"""

The prompt should be specific, well-structured and immediately usable with an AI assistant. Give it clear context, a defined task, and any constraints that matter.${jsonContract(
    `- title: a short name for the prompt
- prompt: the generated prompt itself
- tips: an optional array of short tips for getting the most out of it`,
  )}`;

/**
 * Slug -> template. Keys must match `toolSlug` in the client tool configs and
 * the route segments under app/(tools).
 */
const PROMPTS = {
  "free-grammar-checker": grammarChecker,
  "free-spell-checker": spellChecker,
  "free-paraphrasing-tool": paraphraser,
  "free-text-summarizer": summarizer,
  "free-ai-to-human": aiToHuman,
  "free-image-to-text": imageToText,
  "free-originality-analyzer": originalityAnalyzer,
  "prompt-generator": promptGenerator,
} satisfies Record<string, (text: string) => string>;

export type ToolSlug = keyof typeof PROMPTS;

/** A tool is valid iff it has a template, so the two can never drift apart. */
export function isValidTool(tool: unknown): tool is ToolSlug {
  return typeof tool === "string" && Object.hasOwn(PROMPTS, tool);
}

export function buildPrompt(tool: ToolSlug, text: string): string {
  return PROMPTS[tool](text);
}
