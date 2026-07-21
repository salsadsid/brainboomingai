"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { BookOpen, CheckCircle, Shield } from "lucide-react";
import { free_grammar_checker_prompt } from "./prompt";
import { parseCorrectedParagraph, parseMistakeCount } from "./utils";

const config: TextToolConfig = {
  toolSlug: "free-grammar-checker",
  placeholder: "Paste your text here for grammar analysis...",
  inputLabel: "Your text",
  outputLabel: "Corrected text",
  emptyStateHint: "Your grammar-checked text will appear here.",
  minInputLength: 1,
  buildPrompt: free_grammar_checker_prompt,
  submitLabel: "Check Grammar",
  loadingLabel: "Analyzing...",
  regenerateLabel: "Recheck",
  successMessage: "Analysis complete!",
  errorMessage: "Failed to analyze text. Please try again.",
  fallbackMessage: "Could not analyze text. Please try again.",
  submitIcon: CheckCircle,
  parseCopyText: parseCorrectedParagraph,
  formatOutputStats: (output) =>
    `${parseMistakeCount(output)} issues · ${wordCount(output)} words · ${characterCount(output)} chars`,
};

const features: FeatureItem[] = [
  {
    icon: CheckCircle,
    title: "Real-time Grammar Check",
    description:
      "Instantly detect and correct grammatical errors, spelling mistakes, and punctuation issues with our advanced AI-powered grammar checking technology.",
  },
  {
    icon: BookOpen,
    title: "Style & Clarity",
    description:
      "Improve your writing style and clarity with suggestions for better word choice, sentence structure, and overall readability enhancement.",
  },
  {
    icon: Shield,
    title: "Secure Processing",
    description:
      "Your text and results are stored to improve our service. We do not share your data with third parties. All processing happens over encrypted connections.",
  },
];

const steps: StepItem[] = [
  {
    title: "Paste Your Text",
    description:
      "Simply paste or type your text into our grammar checker. Our tool supports various text formats and can handle documents of any length.",
  },
  {
    title: "AI Analysis",
    description:
      "Our advanced AI analyzes your text for grammar, spelling, punctuation, and style issues, providing comprehensive feedback in seconds.",
  },
  {
    title: "Get Corrections",
    description:
      "Receive detailed corrections and suggestions to improve your text. Copy the corrected version or apply changes individually.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/free-grammar-checker"];

export default function GrammarCheckerTool() {
  return (
    <div>
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Grammar Checking Features" features={features} />
      <ToolHowItWorks title="How Our Grammar Checker Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
