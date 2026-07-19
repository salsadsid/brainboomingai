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
  minInputLength: 1,
  buildPrompt: free_grammar_checker_prompt,
  submitLabel: "Check Grammar",
  loadingLabel: "Analyzing...",
  regenerateLabel: "Recheck",
  successMessage: "Analysis complete!",
  errorMessage: "Failed to analyze text. Please try again.",
  fallbackMessage: "Could not analyze text. Please try again.",
  submitIcon: CheckCircle,
  accentGradient: "from-green-600 to-emerald-600",
  accentHoverGradient: "from-green-700 to-emerald-700",
  focusRingColor: "focus:ring-green-500 dark:focus:ring-green-400",
  dotColor: "bg-green-500",
  hoverBorderColor: "hover:border-green-300 dark:hover:border-green-600",
  outputBadgeGradient: "from-green-500 to-emerald-500",
  parseCopyText: parseCorrectedParagraph,
  formatOutputStats: (output) =>
    `${parseMistakeCount(output)} issues · ${wordCount(output)} words · ${characterCount(output)} chars`,
};

const features: FeatureItem[] = [
  {
    icon: CheckCircle,
    gradient: "from-green-500 to-emerald-500",
    title: "Real-time Grammar Check",
    description:
      "Instantly detect and correct grammatical errors, spelling mistakes, and punctuation issues with our advanced AI-powered grammar checking technology.",
  },
  {
    icon: BookOpen,
    gradient: "from-emerald-500 to-teal-500",
    title: "Style & Clarity",
    description:
      "Improve your writing style and clarity with suggestions for better word choice, sentence structure, and overall readability enhancement.",
  },
  {
    icon: Shield,
    gradient: "from-teal-500 to-cyan-500",
    title: "Secure Processing",
    description:
      "Your text and results are stored to improve our service. We do not share your data with third parties. All processing happens over encrypted connections.",
  },
];

const steps: StepItem[] = [
  {
    gradient: "from-green-500 to-emerald-500",
    title: "Paste Your Text",
    description:
      "Simply paste or type your text into our grammar checker. Our tool supports various text formats and can handle documents of any length.",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    title: "AI Analysis",
    description:
      "Our advanced AI analyzes your text for grammar, spelling, punctuation, and style issues, providing comprehensive feedback in seconds.",
  },
  {
    gradient: "from-teal-500 to-cyan-500",
    title: "Get Corrections",
    description:
      "Receive detailed corrections and suggestions to improve your text. Copy the corrected version or apply changes individually.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/free-grammar-checker"];

export default function GrammarCheckerTool() {
  return (
    <div className="max-w-4xl mx-auto">
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Grammar Checking Features" features={features} />
      <ToolHowItWorks title="How Our Grammar Checker Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
