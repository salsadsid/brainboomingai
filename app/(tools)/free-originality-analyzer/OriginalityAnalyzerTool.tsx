"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { Brain, Fingerprint, Search, Sparkles } from "lucide-react";
import { originality_analysis_prompt } from "./prompt";

const config: TextToolConfig = {
  toolSlug: "free-originality-analyzer",
  placeholder: "Paste your text here to analyze its originality...",
  minInputLength: 10,
  buildPrompt: originality_analysis_prompt,
  submitLabel: "Analyze Originality",
  loadingLabel: "Analyzing...",
  regenerateLabel: "Re-analyze",
  successMessage: "Originality analysis complete!",
  errorMessage: "Failed to analyze text. Please try again.",
  fallbackMessage: "Could not complete the analysis. Please try again.",
  submitIcon: Search,
  accentGradient: "from-indigo-600 to-purple-600",
  accentHoverGradient: "from-indigo-700 to-purple-700",
  focusRingColor: "focus:ring-indigo-500 dark:focus:ring-indigo-400",
  dotColor: "bg-indigo-500",
  hoverBorderColor: "hover:border-indigo-300 dark:hover:border-indigo-600",
  outputBadgeGradient: "from-indigo-500 to-purple-500",
  formatOutputStats: (output) =>
    `Analysis Complete · ${wordCount(output)} words · ${characterCount(output)} chars`,
};

const features: FeatureItem[] = [
  {
    icon: Brain,
    gradient: "from-indigo-500 to-purple-500",
    title: "AI Content Detection",
    description:
      "Detects patterns commonly found in AI-generated text, including uniform sentence structure, hedging language, and generic phrasing that lacks personal voice.",
  },
  {
    icon: Fingerprint,
    gradient: "from-purple-500 to-pink-500",
    title: "Writing Voice Analysis",
    description:
      "Evaluates whether your text has a distinct authorial voice or reads as template-like. Helps you identify where your writing could be more authentic and personal.",
  },
  {
    icon: Sparkles,
    gradient: "from-pink-500 to-red-500",
    title: "Style & Expression Review",
    description:
      "Flags cliches, boilerplate phrases, and formulaic structures. Provides actionable suggestions to make your writing more original and engaging.",
  },
];

const steps: StepItem[] = [
  {
    gradient: "from-indigo-500 to-purple-500",
    title: "Paste Your Text",
    description:
      "Copy and paste the text you want to analyze. Works with essays, articles, blog posts, or any written content.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    title: "AI Pattern Analysis",
    description:
      "Our AI examines your writing for originality indicators, AI-generated content patterns, voice distinctiveness, and structural repetition.",
  },
  {
    gradient: "from-pink-500 to-red-500",
    title: "Get Your Report",
    description:
      "Receive an originality score with detailed breakdown of AI indicators, expression quality, voice assessment, and specific improvement suggestions.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/free-originality-analyzer"];

export default function OriginalityAnalyzerTool() {
  return (
    <div className="max-w-4xl mx-auto">
      <TextToolForm config={config} />
      <ToolFeatures title="What This Tool Analyzes" features={features} />
      <ToolHowItWorks title="How the Originality Analyzer Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
