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
