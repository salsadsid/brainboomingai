export const free_grammer_checker_prompt = (
  s: string
) => `You are an expert in plagiarism detection, specializing in analyzing text for similarities with external sources. I will provide you with the following information:

Original Text: "${s}"
Output Format: "HTML"
Purpose of Detection: "Plagiarism Check"
Language: "Detect from original text"
Your task is to:

Compare the provided text against a wide range of external sources to detect any instances of plagiarism.
Highlight any portions of the text that appear to have been copied from other sources.
Calculate the overall percentage of text that matches with external sources.
Ensure that the output includes only the results of the plagiarism analysis, clearly separated from the original text.
Provide the output in the following format:

html

<p>Plagiarism Check Result:</p>
<p>Original Text:</p>
<p>${s}</p>
<p>Plagiarism Percentage: {percentage}%</p>
<p>Plagiarized Portions:</p>
<ul>
  <li>{plagiarized_segment_1}</li>
  <li>{plagiarized_segment_2}</li>
  <!-- Add more as needed -->
</ul>
<p>Overall Plagiarism Percentage: {percentage}%</p>
Notes:

Ensure that you flag any text that matches known sources, and provide a detailed list of those segments in the output.
The plagiarism percentage should represent the portion of the original text that matches with external sources, calculated as a percentage of the total word count.`;

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
