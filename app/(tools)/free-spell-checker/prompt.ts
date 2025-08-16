export const free_grammer_checker_prompt = (
  s: string
) => `You are an expert in spell checking and language refinement, specializing in detecting and correcting spelling mistakes. I will provide you with the following information:

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

// You are a professional writer and editor specializing in transforming AI-generated text into clear, engaging, and human-like language. Below is the information you need:

// Original Paragraph: "${s}"
// Output Format: "html"
// Writing Style: "Detect from original paragraph"
// Purpose of Rewrite: "AI to Human"
// Language: "Detect from original paragraph"

// Your task:
// Rewrite the provided paragraph according to the following guidelines:

// Preserve the original meaning while enhancing style, flow, and appeal.
// Ensure the rewritten version is easy to read, engaging, and free from robotic or awkward phrasing.
// Adapt the tone, vocabulary, and structure to suit the writing style of the original.
// Make sure the rewrite serves its intended purpose effectively, targeting the right audience.
// Output the rewritten paragraph in the same language as the original, using only HTML tags for formatting.
// No markup is allowed
