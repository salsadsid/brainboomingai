"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FAQItem, FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { Brain, Fingerprint, Search, Sparkles } from "lucide-react";
import { originality_analysis_prompt } from "./prompt";

const config: TextToolConfig = {
  toolSlug: "free-plagiarism-checker",
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

const faqs: FAQItem[] = [
  {
    gradient: "from-indigo-500 to-purple-500",
    question: "Does this tool compare my text against external sources?",
    answer:
      "No. This tool performs pattern-based analysis of your writing style and structure. It does NOT search the web, academic databases, or any external sources. It evaluates how original and human-like your writing appears based on language patterns, not source matching.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    question: "What does the originality score mean?",
    answer:
      "The score reflects how original and distinctly human your writing appears based on AI analysis of your language patterns. A high score means strong personal voice and fresh expression. A low score suggests generic, formulaic, or AI-like writing patterns. It is not a plagiarism percentage.",
  },
  {
    gradient: "from-pink-500 to-red-500",
    question: "Can this detect if text was written by AI?",
    answer:
      "It can identify common patterns associated with AI-generated text, such as uniform sentence length, hedging language, lack of personal anecdotes, and overly balanced arguments. However, no AI detection tool is 100% accurate, and well-edited AI text may score higher on originality.",
  },
  {
    gradient: "from-red-500 to-orange-500",
    question: "Is this a replacement for a real plagiarism checker?",
    answer:
      "No. If you need to verify that your text isn't copied from specific sources, use a dedicated plagiarism detection service like Turnitin or Copyscape that actually compares against indexed content. This tool analyzes writing quality and patterns, not source overlap.",
  },
];

export default function PlagiarismCheckerTool() {
  return (
    <div className="max-w-4xl mx-auto">
      <TextToolForm config={config} />
      <ToolFeatures title="What This Tool Analyzes" features={features} />
      <ToolHowItWorks title="How the Originality Analyzer Works" steps={steps} />
      <ToolFAQ title="Originality Analyzer FAQ" faqs={faqs} />
    </div>
  );
}
