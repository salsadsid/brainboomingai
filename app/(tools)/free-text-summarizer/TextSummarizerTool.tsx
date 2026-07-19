"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { BookOpen, FileText, Zap } from "lucide-react";
import { free_grammar_checker_prompt } from "./prompt";

const config: TextToolConfig = {
  toolSlug: "free-text-summarizer",
  placeholder: "Paste your long text here to get a concise summary...",
  minInputLength: 1,
  buildPrompt: free_grammar_checker_prompt,
  submitLabel: "Summarize Text",
  loadingLabel: "Summarizing...",
  regenerateLabel: "Generate Another",
  successMessage: "Summary generated successfully!",
  errorMessage: "Failed to generate summary. Please try again.",
  fallbackMessage: "Could not generate summary. Please try again.",
  submitIcon: FileText,
  accentGradient: "from-indigo-600 to-purple-600",
  accentHoverGradient: "from-indigo-700 to-purple-700",
  focusRingColor: "focus:ring-indigo-500 dark:focus:ring-indigo-400",
  dotColor: "bg-indigo-500",
  hoverBorderColor: "hover:border-indigo-300 dark:hover:border-indigo-600",
  outputBadgeGradient: "from-indigo-500 to-purple-500",
  formatOutputStats: (output) =>
    `Summary Generated · ${wordCount(output)} words · ${characterCount(output)} chars`,
};

const features: FeatureItem[] = [
  {
    icon: FileText,
    gradient: "from-indigo-500 to-purple-500",
    title: "Smart Summarization",
    description:
      "Our AI intelligently identifies key points and main ideas to create concise, comprehensive summaries while preserving essential information.",
  },
  {
    icon: BookOpen,
    gradient: "from-purple-500 to-pink-500",
    title: "Context Preservation",
    description:
      "Maintains the original context and meaning while condensing lengthy articles, reports, and documents into digestible summaries.",
  },
  {
    icon: Zap,
    gradient: "from-pink-500 to-red-500",
    title: "Instant Results",
    description:
      "Get professional-quality summaries in seconds. Perfect for research, studying, content creation, and quick information processing.",
  },
];

const steps: StepItem[] = [
  {
    gradient: "from-indigo-500 to-purple-500",
    title: "Input Your Text",
    description:
      "Paste your long article, document, or content into the text area. Our tool can handle various types of text content up to 5000 characters.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    title: "AI Analysis",
    description:
      "Our advanced AI analyzes the content structure, identifies key points, and understands the main themes to create an accurate summary.",
  },
  {
    gradient: "from-pink-500 to-red-500",
    title: "Get Concise Summary",
    description:
      "Receive a well-structured summary that captures the essence of your content while significantly reducing length and complexity.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/free-text-summarizer"];

export default function TextSummarizerTool() {
  return (
    <div className="max-w-4xl mx-auto">
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Text Summarization Features" features={features} />
      <ToolHowItWorks title="How Our Text Summarizer Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
