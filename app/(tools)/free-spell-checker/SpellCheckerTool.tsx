"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FAQItem, FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { BookCheck, CheckCircle2, Zap } from "lucide-react";
import { free_grammar_checker_prompt } from "./prompt";
import { parseCorrectedParagraph, parseMistakeCount } from "./utils";

const config: TextToolConfig = {
  toolSlug: "free-spell-checker",
  placeholder: "Paste your text here for spell checking...",
  minInputLength: 1,
  buildPrompt: free_grammar_checker_prompt,
  submitLabel: "Check Spelling",
  loadingLabel: "Checking...",
  regenerateLabel: "Recheck",
  successMessage: "Spell check complete!",
  errorMessage: "Failed to check spelling. Please try again.",
  fallbackMessage: "Could not check spelling. Please try again.",
  submitIcon: CheckCircle2,
  accentGradient: "from-indigo-600 to-purple-600",
  accentHoverGradient: "from-indigo-700 to-purple-700",
  focusRingColor: "focus:ring-indigo-500 dark:focus:ring-indigo-400",
  dotColor: "bg-indigo-500",
  hoverBorderColor: "hover:border-indigo-300 dark:hover:border-indigo-600",
  outputBadgeGradient: "from-indigo-500 to-purple-500",
  parseCopyText: parseCorrectedParagraph,
  formatOutputStats: (output) =>
    `${parseMistakeCount(output)} spelling errors · ${wordCount(output)} words · ${characterCount(output)} chars`,
};

const features: FeatureItem[] = [
  {
    icon: CheckCircle2,
    gradient: "from-indigo-500 to-purple-500",
    title: "Accurate Detection",
    description:
      "Detect and correct spelling mistakes with high accuracy. Our AI identifies common typos, misspellings, and contextual errors in real-time.",
  },
  {
    icon: BookCheck,
    gradient: "from-purple-500 to-pink-500",
    title: "Context-Aware",
    description:
      "Our spell checker understands context and provides intelligent suggestions based on the surrounding text and intended meaning.",
  },
  {
    icon: Zap,
    gradient: "from-pink-500 to-red-500",
    title: "Instant Corrections",
    description:
      "Get instant spelling corrections and suggestions. Improve your writing quality with fast, reliable spell checking technology.",
  },
];

const steps: StepItem[] = [
  {
    gradient: "from-indigo-500 to-purple-500",
    title: "Input Your Text",
    description:
      "Paste or type your text into our spell checker. Our tool supports various document types and text formats for comprehensive checking.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    title: "AI Analysis",
    description:
      "Our advanced AI scans your text for spelling errors, typos, and contextual mistakes using sophisticated language processing algorithms.",
  },
  {
    gradient: "from-pink-500 to-red-500",
    title: "Get Corrections",
    description:
      "Receive detailed corrections with highlighted errors and suggested improvements. Copy the corrected text for immediate use.",
  },
];

const faqs: FAQItem[] = [
  {
    gradient: "from-indigo-500 to-purple-500",
    question: "What types of spelling errors does the tool detect?",
    answer:
      "Our spell checker detects common typos, misspellings, doubled words, contextual errors, and phonetic mistakes. It also identifies proper nouns and technical terms that may need attention.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    question: "Does the spell checker support different languages?",
    answer:
      "Currently, our spell checker is optimized for English text. It includes American and British spelling variations and can handle technical, academic, and creative writing styles.",
  },
  {
    gradient: "from-pink-500 to-red-500",
    question: "How accurate are the spelling corrections?",
    answer:
      "Our AI-powered spell checker has high accuracy rates and considers context when making suggestions. However, we recommend reviewing all suggestions, especially for technical terms or proper nouns.",
  },
  {
    gradient: "from-red-500 to-orange-500",
    question: "Is my text stored or shared when using the spell checker?",
    answer:
      "Your text and corrections are stored on our servers to improve our service. We do not share your data with third parties. All processing happens over encrypted connections.",
  },
];

export default function SpellCheckerTool() {
  return (
    <div className="max-w-4xl mx-auto">
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Spell Checking Features" features={features} />
      <ToolHowItWorks title="How Our Spell Checker Works" steps={steps} />
      <ToolFAQ title="Spell Checker FAQ" faqs={faqs} />
    </div>
  );
}
