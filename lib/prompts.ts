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
 * This module must never be imported from a Client Component.
 */

const grammarChecker = (s: string) =>
  `You are an expert in grammar and language refinement, specializing in correcting and improving the clarity, accuracy, and fluency of written text. I will provide you with the following information: Original Text: "${s}" Output Format: "html" Writing Style: "Detect from original text" Purpose of Correction: "Grammar and fluency improvement" Language: "Detect from original text"

Your task is to:

Correct any grammatical, punctuation, or syntactical errors in the provided text.
Retain the original meaning while ensuring the text is easy to read, free of awkward phrasing or unnatural structure.
Adapt the tone and structure to align with the original writing style.
Improve fluency and readability, making the text sound natural and well-polished.
Count the total number of grammatical mistakes in the original text.
Provide the output in the following format:

<p>Corrected Paragraph:</p> followed by the corrected text wrapped in HTML <p> tags.
<p>Number of Mistakes:</p> followed by the number of grammatical mistakes found in the p tag.
Ensure the output includes only HTML tags, with the corrected paragraph and mistake count clearly separated as described above.`;

const spellChecker = (s: string) =>
  `You are an expert in spell checking and language refinement, specializing in detecting and correcting spelling mistakes. I will provide you with the following information:

Original Text: "${s}"
Output Format: "html"
Writing Style: "Detect from original text"
Purpose of Correction: "Spelling error correction"
Language: "Detect from original text"

Your task is to:

Identify any spelling errors in the provided text.
Correct the spelling mistakes while retaining the original meaning of the text.
Ensure the corrected text remains fluent and natural without altering the tone or style.
Count the total number of spelling mistakes in the original text.
Provide the output in the following format:
<p>Corrected Paragraph:</p> followed by the corrected text wrapped in HTML <p> tags. <p>Number of Spelling Mistakes:</p> followed by the number of spelling mistakes found in the p tag.
Ensure the output includes only HTML tags, with the corrected paragraph and mistake count clearly separated as described above.`;

const paraphraser = (s: string) =>
  `You are an expert in paraphrasing text, specializing in rewording and restructuring written content to enhance clarity, while retaining the original meaning. I will provide you with the following information:

Original Text: "${s}"
Output Format: "html"
Writing Style: "Detect from original text"
Purpose of Paraphrasing: "Rewording the text to enhance clarity and flow"
Language: "Detect from original text"

Your task is to:

Paraphrase the provided text by rewording sentences while preserving the original meaning.
Improve the clarity, readability, and fluency of the text by restructuring awkward sentences.
Ensure the paraphrased version remains aligned with the tone and style of the original text.
Provide a paraphrased version that is clear, concise, and natural to read.
Generate the output in the following format:
<p>Paraphrased Text:</p> followed by the paraphrased text wrapped in HTML <p> tags.
Ensure the output includes only HTML tags, with the paraphrased text clearly presented as described above.`;

const summarizer = (s: string) =>
  `You are an expert in summarizing written content, specializing in creating concise, accurate, and meaningful summaries. I will provide you with the following information:

Original Text: "${s}"
Output Format: "html"
Writing Style: "Detect from original text"
Purpose of Summary: "Provide a clear and concise summary while retaining all key points"
Language: "Detect from original text"

Your task is to:

Identify the most important ideas and key points from the provided text.
Create a summary that captures the essence of the original content without losing critical information.
Retain the tone, style, and structure of the original writing while ensuring the summary is concise.
Ensure the summary is readable, cohesive, and well-organized.
Generate the summary in the following format:
<p>Summary:</p> followed by the summary text wrapped in HTML <p> tags.
Ensure the output includes only HTML tags, with the summary clearly presented as described above.`;

const aiToHuman = (s: string) => `
You are an expert writer and editor specializing in creating clear, engaging, and contextually relevant text. I will provide you with the following information:

Original Paragraph: "${s}"
Output Format: "html"
Writing Style: "Detect from original paragraph"
Purpose of Rewrite: "AI to Human"
Language: "Detect from original paragraph"

Your task is to rewrite the provided paragraph based on the following guidelines:
- Retain the original meaning while improving style, and appeal.
- The rewritten paragraph should be easy to read and understand.
- It should sound natural and human-like, avoiding awkward or robotic language.
- Adapt the tone, vocabulary, and structure to align with the specified writing style.
- Ensure the rewrite serves the stated purpose effectively, addressing the target audience's needs.
- Output as the given paragraph format and paragraph numbers, headers, with the given writing style and purpose.


Provide the rewritten text in the following format, with the given writing style and language. Tailor the output to the given writing style , purpose and language. No markdown syntax is allowed. The output should be in the same format as the original paragraph. only html tags are allowed.
`;

const imageToText = (s: string) =>
  `You are a professional writer and editor specializing in transforming Image text into clear text.

Original Text: ${s}
Output Format: html
Writing Style: "Detect from original text"
Language: "Detect from original text

Your task is to:
make it clean.
do not change the meaning.
give proper html tags.

Provide the output in the following format:

<p>Image to Text:</p> followed by the corrected text wrapped in HTML tags.
`;

const originalityAnalyzer = (s: string) =>
  `You are an expert in writing analysis, specializing in evaluating text originality, detecting AI-generated content patterns, and assessing writing quality. I will provide you with text to analyze.

Text to Analyze: "${s}"
Output Format: "HTML"

Your task is to perform a writing originality analysis. Important: This is a PATTERN-BASED analysis of the writing itself. You are NOT comparing against external sources or databases. Be honest about that in your output.

Analyze the following aspects:

1. **AI-Generated Content Indicators**: Look for signs the text may be AI-generated — overly uniform sentence structure, hedging language ("It is important to note that..."), lack of personal voice, generic phrasing, excessive use of transition words.

2. **Originality of Expression**: Assess whether the writing uses fresh, specific language or relies on cliches, boilerplate phrases, and formulaic structures.

3. **Writing Voice**: Evaluate whether the text has a distinct authorial voice or reads as generic/template-like.

4. **Structural Patterns**: Check for repetitive paragraph structures, predictable formatting, or suspiciously balanced arguments that suggest automated generation.

Provide the output in this exact HTML format:

<h3>Originality Analysis Report</h3>
<p><strong>Note:</strong> This analysis evaluates writing patterns and style. It does not compare your text against external sources or databases.</p>

<p><strong>Originality Score:</strong> {score}/100</p>
<p>A score based on how original and human-like the writing appears. Higher = more original voice.</p>

<h4>AI Content Indicators</h4>
<p>{analysis of AI-generated patterns found or not found}</p>

<h4>Originality of Expression</h4>
<p>{analysis of language freshness, cliches, generic phrasing}</p>

<h4>Writing Voice Assessment</h4>
<p>{analysis of authorial voice and distinctiveness}</p>

<h4>Suggestions for Improvement</h4>
<ul>
  <li>{specific suggestion 1}</li>
  <li>{specific suggestion 2}</li>
  <li>{specific suggestion 3}</li>
</ul>

Ensure the output includes only HTML tags. Be honest and specific in your analysis. Do not claim to have checked against any external sources.`;

const promptGenerator = (s: string) =>
  `Generate a detailed and creative prompt based on this description: ${s}. Make it engaging and specific. The prompt should be well-structured and clear.`;

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
