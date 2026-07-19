import type { ToolIconName } from "./toolIcons";

export interface ToolDef {
  title: string;
  href: string;
  icon: ToolIconName;
  shortTitle: string;
  description: string;
  /**
   * Search terms this tool should rank for. Feeds per-page `keywords` metadata
   * and the JSON-LD SoftwareApplication entry.
   */
  keywords?: string[];
  /** schema.org applicationCategory / applicationSubCategory hint. */
  category?: string;
  /** Sitemap priority hint; defaults to 0.8 for tools. */
  priority?: number;
}

export const aiTools: ToolDef[] = [
  {
    title: "AI Prompt Generator",
    href: "/prompt-generator",
    icon: "Sparkles",
    shortTitle: "Prompt Generator",
    description: "Generate creative and engaging prompts for any purpose using AI.",
    keywords: [
      "AI prompt generator",
      "prompt generator free",
      "ChatGPT prompt generator",
      "AI art prompt generator",
      "midjourney prompt generator",
      "writing prompt generator",
    ],
    category: "DesignApplication",
    priority: 0.9,
  },
  {
    title: "AI To Human Text Converter",
    href: "/free-ai-to-human",
    icon: "Repeat",
    shortTitle: "AI to Human",
    description: "Convert AI-generated text into human-like text.",
    keywords: [
      "AI to human text converter",
      "humanize AI text",
      "AI text humanizer",
      "make AI text undetectable",
      "AI content converter",
      "bypass AI detector",
    ],
    category: "UtilitiesApplication",
    priority: 0.9,
  },
  {
    title: "Free Grammar Checker",
    href: "/free-grammar-checker",
    icon: "BookOpenCheck",
    shortTitle: "Grammar Checker",
    description:
      "Check your text for grammar errors and improve your writing with our free grammar checker.",
    keywords: [
      "free grammar checker",
      "grammar check online",
      "punctuation checker",
      "sentence corrector",
      "English grammar checker",
      "proofreading tool",
    ],
    category: "EducationalApplication",
    priority: 0.9,
  },
  {
    title: "Free Image to Text",
    href: "/free-image-to-text",
    icon: "ScanText",
    shortTitle: "Image to Text",
    description:
      "Extract text from images with our free image to text converter. Upload an image and get the text instantly.",
    keywords: [
      "image to text",
      "free OCR online",
      "extract text from image",
      "picture to text converter",
      "photo to text",
      "JPG to text",
    ],
    category: "UtilitiesApplication",
    priority: 0.9,
  },
  {
    title: "Free Text Summarizer",
    href: "/free-text-summarizer",
    icon: "ListCollapse",
    shortTitle: "Text Summarizer",
    description:
      "Summarize long articles and documents into concise summaries with our free text summarizer.",
    keywords: [
      "free text summarizer",
      "article summarizer",
      "AI summary generator",
      "summarize text online",
      "paragraph summarizer",
      "TLDR generator",
    ],
    category: "EducationalApplication",
    priority: 0.9,
  },
  {
    title: "Free Spell Checker",
    href: "/free-spell-checker",
    icon: "SpellCheck",
    shortTitle: "Spell Checker",
    description:
      "Check your text for spelling errors and improve your writing with our free spell checker.",
    keywords: [
      "free spell checker",
      "spelling check online",
      "spell check tool",
      "typo checker",
      "English spelling corrector",
    ],
    category: "EducationalApplication",
    priority: 0.8,
  },
  {
    title: "Free Paraphrasing Tool",
    href: "/free-paraphrasing-tool",
    icon: "Replace",
    shortTitle: "Paraphrasing Tool",
    description:
      "Enhance your writing with our free paraphrasing tool. Generate unique and creative paraphrases for your text.",
    keywords: [
      "free paraphrasing tool",
      "paraphrase online",
      "rewrite text",
      "sentence rephraser",
      "article rewriter",
      "text spinner",
    ],
    category: "EducationalApplication",
    priority: 0.9,
  },
  {
    title: "Content Originality Analyzer",
    href: "/free-originality-analyzer",
    icon: "SearchCheck",
    shortTitle: "Originality Analyzer",
    description:
      "Analyze writing patterns and detect AI-generated content with our free originality analyzer.",
    keywords: [
      "AI content detector",
      "originality checker",
      "AI detection tool",
      "check if text is AI generated",
      "content originality analyzer",
    ],
    category: "EducationalApplication",
    priority: 0.9,
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
    keywords: [
      "MD5 generator",
      "MD5 hash online",
      "generate MD5 checksum",
      "MD5 encrypt text",
      "hash generator",
    ],
    category: "DeveloperApplication",
    priority: 0.7,
  },
  {
    title: "Image Resizer",
    href: "/image-resizer",
    icon: "Scaling",
    shortTitle: "Image Resizer",
    description:
      "Resize your images quickly and easily with our free image resizer. Adjust dimensions and file size effortlessly.",
    keywords: [
      "free image resizer",
      "resize image online",
      "change image dimensions",
      "photo resizer",
      "bulk image resize",
    ],
    category: "MultimediaApplication",
    priority: 0.8,
  },
  {
    title: "Image Compressor",
    href: "/image-compressor",
    icon: "Shrink",
    shortTitle: "Image Compressor",
    description:
      "Compress your images without losing quality with our free image compressor. Optimize your images for web use.",
    keywords: [
      "free image compressor",
      "compress image online",
      "reduce image file size",
      "optimize images for web",
      "JPEG compressor",
    ],
    category: "MultimediaApplication",
    priority: 0.8,
  },
];

/** Every indexable tool, in one list — drives the sitemap and internal linking. */
export const allTools: ToolDef[] = [...aiTools, ...otherTools];

/** Keywords for a tool route, so page metadata stays tied to the registry. */
export function toolKeywords(href: string): string[] {
  return allTools.find((tool) => tool.href === href)?.keywords ?? [];
}
