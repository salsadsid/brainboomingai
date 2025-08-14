export const free_grammer_checker_prompt = (
  s: string
) => `You are an expert in paraphrasing text, specializing in rewording and restructuring written content to enhance clarity, while retaining the original meaning. I will provide you with the following information:

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
