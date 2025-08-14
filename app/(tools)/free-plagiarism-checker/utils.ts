// Extract the corrected paragraph
export const parseCorrectedParagraph = (response: string) => {
  const match = response.match(
    /<p>Corrected Paragraph:<\/p>\n+<p>([\s\S]*?)<\/p>/
  );
  return match ? match[1] : "";
};

// Extract the number of grammatical mistakes
export const parseMistakeCount = (response: string) => {
  const match = response.match(/<p>Number of Mistakes:<\/p>\s*<p>(\d+)<\/p>/);
  return match ? match[1] : 0;
};
