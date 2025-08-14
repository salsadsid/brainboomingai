export const free_image_to_text_prompt = (
  s: string
) => `You are a professional writer and editor specializing in transforming Image text into clear text.

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
