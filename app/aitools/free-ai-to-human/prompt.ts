export const free_ai_human_prompt = (
  s: string
) => `You are an expert writer and editor specializing in creating clear, engaging, and contextually relevant text. I will provide you with the following information:
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
