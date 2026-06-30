import type { ToolIconName } from "./toolIcons";

export interface ToolDef {
  title: string;
  href: string;
  icon: ToolIconName;
  shortTitle: string;
  description: string;
}

export const aiTools: ToolDef[] = [
  {
    title: "AI Prompt Generator",
    href: "/prompt-generator",
    icon: "Sparkles",
    shortTitle: "Prompt Generator",
    description: "Generate creative and engaging prompts for any purpose using AI.",
  },
  {
    title: "AI To Human Text Converter",
    href: "/free-ai-to-human",
    icon: "Repeat",
    shortTitle: "AI to Human",
    description: "Convert AI-generated text into human-like text.",
  },
  {
    title: "Free Grammar Checker",
    href: "/free-grammar-checker",
    icon: "BookOpenCheck",
    shortTitle: "Grammar Checker",
    description:
      "Check your text for grammar errors and improve your writing with our free grammar checker.",
  },
  {
    title: "Free Image to Text",
    href: "/free-image-to-text",
    icon: "ScanText",
    shortTitle: "Image to Text",
    description:
      "Extract text from images with our free image to text converter. Upload an image and get the text instantly.",
  },
  {
    title: "Free Text Summarizer",
    href: "/free-text-summarizer",
    icon: "ListCollapse",
    shortTitle: "Text Summarizer",
    description:
      "Summarize long articles and documents into concise summaries with our free text summarizer.",
  },
  {
    title: "Free Spell Checker",
    href: "/free-spell-checker",
    icon: "SpellCheck",
    shortTitle: "Spell Checker",
    description:
      "Check your text for spelling errors and improve your writing with our free spell checker.",
  },
  {
    title: "Free Paraphrasing Tool",
    href: "/free-paraphrasing-tool",
    icon: "Replace",
    shortTitle: "Paraphrasing Tool",
    description:
      "Enhance your writing with our free paraphrasing tool. Generate unique and creative paraphrases for your text.",
  },
];

export const otherTools: ToolDef[] = [
  {
    title: "MD5 Generator",
    href: "/md5-generator",
    icon: "Hash",
    shortTitle: "MD5 Generator",
    description:
      "Generate MD5 hashes for your text with our free MD5 generator. Secure your data with ease.",
  },
  {
    title: "Image Resizer",
    href: "/image-resizer",
    icon: "Scaling",
    shortTitle: "Image Resizer",
    description:
      "Resize your images quickly and easily with our free image resizer. Adjust dimensions and file size effortlessly.",
  },
  {
    title: "Image Compressor",
    href: "/image-compressor",
    icon: "Shrink",
    shortTitle: "Image Compressor",
    description:
      "Compress your images without losing quality with our free image compressor. Optimize your images for web use.",
  },
];
