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

const config: TextToolConfig = {
  toolSlug: "free-text-summarizer",
  placeholder: "Paste your long text here to get a concise summary...",
  inputLabel: "Text to summarize",
  outputLabel: "Summary",
  emptyStateHint: "Your summary will appear here.",
  minInputLength: 1,
  submitLabel: "Summarize Text",
  loadingLabel: "Summarizing...",
  regenerateLabel: "Generate Another",
  successMessage: "Summary generated successfully!",
  errorMessage: "Failed to generate summary. Please try again.",
  fallbackMessage: "Could not generate summary. Please try again.",
  submitIcon: FileText,
  formatOutputStats: (output) =>
    `Summary Generated · ${wordCount(output)} words · ${characterCount(output)} chars`,
};

const features: FeatureItem[] = [
  {
    icon: FileText,
    title: "Smart Summarization",
    description:
      "Our AI intelligently identifies key points and main ideas to create concise, comprehensive summaries while preserving essential information.",
  },
  {
    icon: BookOpen,
    title: "Context Preservation",
    description:
      "Maintains the original context and meaning while condensing lengthy articles, reports, and documents into digestible summaries.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get professional-quality summaries in seconds. Perfect for research, studying, content creation, and quick information processing.",
  },
];

const steps: StepItem[] = [
  {
    title: "Input Your Text",
    description:
      "Paste your long article, document, or content into the text area. Our tool can handle various types of text content up to 5000 characters.",
  },
  {
    title: "AI Analysis",
    description:
      "Our advanced AI analyzes the content structure, identifies key points, and understands the main themes to create an accurate summary.",
  },
  {
    title: "Get Concise Summary",
    description:
      "Receive a well-structured summary that captures the essence of your content while significantly reducing length and complexity.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/free-text-summarizer"];

export default function TextSummarizerTool() {
  return (
    <div>
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Text Summarization Features" features={features} />
      <ToolHowItWorks title="How Our Text Summarizer Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
