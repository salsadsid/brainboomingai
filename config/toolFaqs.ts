import type { FAQItem } from "@/components/tools/types";

/**
 * FAQ copy, keyed by tool route.
 *
 * Lives outside the "use client" tool components on purpose: Server Components
 * receive client-module exports as opaque references, not values, so the FAQPage
 * JSON-LD could not be built from data defined inside them. Keeping it here lets
 * the server page emit the schema and the client component render the same copy
 * from one source — they cannot drift, which matters because Google penalises
 * FAQ markup that does not match visible page content.
 */
export interface ToolFaqSection {
  title: string;
  faqs: FAQItem[];
}

export const toolFaqs: Record<string, ToolFaqSection> = {
  "/free-ai-to-human": {
    title: "Frequently Asked Questions",
    faqs: [
      {
        question: "What is an AI to Human Text Converter?",
        answer:
          "An AI to Human Text Converter is a tool that transforms AI-generated content into more natural, human-like text while preserving the original meaning and context.",
      },
      {
        question: "Is this tool completely free?",
        answer:
          "Yes! Our AI to Human Text Converter is 100% free to use with no registration required. You can convert unlimited text without any restrictions.",
      },
      {
        question: "How accurate is the conversion?",
        answer:
          "Our advanced AI algorithms provide highly accurate conversions, maintaining the original meaning while making the text sound more natural and human-like.",
      },
      {
        question: "What types of content can I convert?",
        answer:
          "You can convert any AI-generated text including articles, blog posts, emails, social media content, academic papers, and more.",
      },
    ],
  },

  "/prompt-generator": {
    title: "Frequently Asked Questions",
    faqs: [
      {
        question: "What types of prompts can I generate?",
        answer:
          "You can generate prompts for any purpose: creative writing, academic essays, business content, social media posts, art descriptions, conversation starters, and much more. Our AI adapts to your specific needs.",
      },
      {
        question: "How detailed should my description be?",
        answer:
          "The more specific you are, the better the generated prompt will be. Include details about the topic, tone, length, audience, and purpose to get the most relevant results.",
      },
      {
        question: "Can I generate multiple prompts from the same description?",
        answer:
          'Yes! You can use the "Regenerate" button to create different variations of prompts based on the same description. Each generation will provide a unique perspective.',
      },
      {
        question: "Is there a limit to how many prompts I can generate?",
        answer:
          "No, there's no limit! You can generate as many prompts as you need. Our service is completely free and designed to support your creative process without restrictions.",
      },
    ],
  },

  "/free-grammar-checker": {
    title: "Grammar Checker FAQ",
    faqs: [
      {
        question: "What types of errors does the grammar checker detect?",
        answer:
          "Our AI-powered grammar checker detects and corrects spelling mistakes, grammatical errors, punctuation issues, sentence structure problems, word choice improvements, and style suggestions to enhance your writing quality.",
      },
      {
        question: "Is there a word limit for the grammar checker?",
        answer:
          "You can check up to 5,000 characters at once. For longer documents, simply break them into smaller sections and check each part separately for comprehensive grammar analysis.",
      },
      {
        question: "Does the tool work for different writing styles?",
        answer:
          "Yes! Our grammar checker adapts to various writing styles including academic papers, business documents, creative writing, emails, and casual text. It provides context-appropriate suggestions for each style.",
      },
      {
        question: "Can I trust the AI suggestions?",
        answer:
          "Our AI is trained on extensive language data and provides highly accurate suggestions. However, we recommend reviewing all suggestions as context and personal writing style preferences may influence the final decision.",
      },
    ],
  },

  "/free-text-summarizer": {
    title: "Text Summarizer FAQ",
    faqs: [
      {
        question: "What types of content can I summarize?",
        answer:
          "You can summarize articles, research papers, blog posts, reports, essays, news articles, and any other text content. Our AI works best with well-structured, informative text.",
      },
      {
        question: "How long should my input text be?",
        answer:
          "For best results, input text should be at least 200 words long. Our tool can handle up to 5000 characters, making it perfect for most articles and documents.",
      },
      {
        question: "Can I control the summary length?",
        answer:
          "Our AI automatically determines the optimal summary length based on the input content. It aims to reduce the original text by 70-80% while preserving all key information.",
      },
      {
        question: "Is my content stored or shared?",
        answer:
          "Your prompts and generated summaries are stored on our servers to improve our service. We do not share your data with third parties. All processing happens over encrypted connections.",
      },
    ],
  },

  "/free-spell-checker": {
    title: "Spell Checker FAQ",
    faqs: [
      {
        question: "What types of spelling errors does the tool detect?",
        answer:
          "Our spell checker detects common typos, misspellings, doubled words, contextual errors, and phonetic mistakes. It also identifies proper nouns and technical terms that may need attention.",
      },
      {
        question: "Does the spell checker support different languages?",
        answer:
          "Currently, our spell checker is optimized for English text. It includes American and British spelling variations and can handle technical, academic, and creative writing styles.",
      },
      {
        question: "How accurate are the spelling corrections?",
        answer:
          "Our AI-powered spell checker has high accuracy rates and considers context when making suggestions. However, we recommend reviewing all suggestions, especially for technical terms or proper nouns.",
      },
      {
        question: "Is my text stored or shared when using the spell checker?",
        answer:
          "Your text and corrections are stored on our servers to improve our service. We do not share your data with third parties. All processing happens over encrypted connections.",
      },
    ],
  },

  "/free-paraphrasing-tool": {
    title: "Paraphrasing Tool FAQ",
    faqs: [
      {
        question: "What is paraphrasing and why is it useful?",
        answer:
          "Paraphrasing is rewriting text using different words while maintaining the same meaning. It's useful for avoiding plagiarism, improving readability, creating unique content, and adapting text for different audiences or purposes.",
      },
      {
        question: "Does the paraphrasing tool maintain the original meaning?",
        answer:
          "Yes, our AI-powered paraphrasing tool is designed to preserve the original meaning and context while changing the wording and sentence structure. However, we recommend reviewing the output to ensure it meets your specific requirements.",
      },
      {
        question: "Can I paraphrase content for academic or professional use?",
        answer:
          "Yes, our paraphrasing tool is suitable for academic papers, professional documents, and business content. However, always ensure proper citation when using sources and follow your institution's or organization's guidelines.",
      },
      {
        question: "How many times can I use the paraphrasing tool?",
        answer:
          "There's no limit to how many times you can use our free paraphrasing tool. You can paraphrase as much content as you need and generate multiple variations of the same text to find the perfect version for your needs.",
      },
    ],
  },

  "/free-originality-analyzer": {
    title: "Originality Analyzer FAQ",
    faqs: [
      {
        question: "Does this tool compare my text against external sources?",
        answer:
          "No. This tool performs pattern-based analysis of your writing style and structure. It does NOT search the web, academic databases, or any external sources. It evaluates how original and human-like your writing appears based on language patterns, not source matching.",
      },
      {
        question: "What does the originality score mean?",
        answer:
          "The score reflects how original and distinctly human your writing appears based on AI analysis of your language patterns. A high score means strong personal voice and fresh expression. A low score suggests generic, formulaic, or AI-like writing patterns. It is not a plagiarism percentage.",
      },
      {
        question: "Can this detect if text was written by AI?",
        answer:
          "It can identify common patterns associated with AI-generated text, such as uniform sentence length, hedging language, lack of personal anecdotes, and overly balanced arguments. However, no AI detection tool is 100% accurate, and well-edited AI text may score higher on originality.",
      },
      {
        question: "Is this a replacement for a real plagiarism checker?",
        answer:
          "No. If you need to verify that your text isn't copied from specific sources, use a dedicated plagiarism detection service like Turnitin or Copyscape that actually compares against indexed content. This tool analyzes writing quality and patterns, not source overlap.",
      },
    ],
  },
};
