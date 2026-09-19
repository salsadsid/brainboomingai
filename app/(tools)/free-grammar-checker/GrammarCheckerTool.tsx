"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { TEXT_TOOL_DATA_HANDLING } from "@/config/dataHandling";
import { toolFaqs } from "@/config/toolFaqs";
import { BookOpen, CheckCircle, Shield } from "lucide-react";

const config: TextToolConfig = {
  toolSlug: "free-grammar-checker",
  placeholder: "Paste your text here for grammar analysis...",
  inputLabel: "Your text",
  outputLabel: "Corrected text",
  emptyStateHint: "Your grammar-checked text will appear here.",
  minInputLength: 1,
  submitLabel: "Check Grammar",
  loadingLabel: "Analyzing...",
  regenerateLabel: "Recheck",
  successMessage: "Analysis complete!",
  errorMessage: "Failed to analyze text. Please try again.",
  fallbackMessage: "Could not analyze text. Please try again.",
  submitIcon: CheckCircle,
};

const features: FeatureItem[] = [
  {
    icon: CheckCircle,
    title: "AI Grammar Check",
    description:
      "Detect and correct grammatical errors, spelling mistakes, and punctuation issues in one pass with our AI-powered grammar checking technology.",
  },
  {
    icon: BookOpen,
    title: "Style & Clarity",
    description:
      "Improve your writing style and clarity with suggestions for better word choice, sentence structure, and overall readability enhancement.",
  },
  {
    icon: Shield,
    title: "What happens to your text",
    description: TEXT_TOOL_DATA_HANDLING,
  },
];

const steps: StepItem[] = [
  {
    title: "Paste Your Text",
    description:
      "Simply paste or type your text into our grammar checker. It takes plain text, up to 5,000 characters per check — split longer documents into sections.",
  },
  {
    title: "AI Analysis",
    description:
      "Our advanced AI analyzes your text for grammar, spelling, punctuation, and style issues, providing comprehensive feedback in seconds.",
  },
  {
    title: "Get Corrections",
    description:
      "Receive the corrected text along with a list of every change made and its type. Copy the corrected version with one click.",
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
