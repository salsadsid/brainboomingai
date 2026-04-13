"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FAQItem, FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { CheckCircle, Sparkles, Zap, Shield } from "lucide-react";
import { free_ai_human_prompt } from "./prompt";

const config: TextToolConfig = {
  toolSlug: "free-ai-to-human",
  placeholder: "Paste your AI-generated text here...",
  minInputLength: 10,
  buildPrompt: free_ai_human_prompt,
  submitLabel: "Convert to Human Text",
  loadingLabel: "Converting...",
  regenerateLabel: "Regenerate",
  successMessage: "Conversion successful!",
  errorMessage: "Failed to convert text. Please try again.",
  fallbackMessage: "Could not generate conversion. Please try again.",
  submitIcon: Sparkles,
  accentGradient: "from-blue-600 to-indigo-600",
  accentHoverGradient: "from-blue-700 to-indigo-700",
  focusRingColor: "focus:ring-blue-500 dark:focus:ring-blue-400",
  dotColor: "bg-green-500",
  hoverBorderColor: "hover:border-blue-300 dark:hover:border-blue-600",
  outputBadgeGradient: "from-green-500 to-emerald-500",
};

const features: FeatureItem[] = [
  {
    icon: Zap,
    gradient: "from-blue-500 to-indigo-500",
    title: "Instant Conversion",
    description:
      "Transform AI-generated text to natural, human-like content in seconds using advanced language processing.",
  },
  {
    icon: Shield,
    gradient: "from-green-500 to-emerald-500",
    title: "100% Free & Secure",
    description:
      "No registration required. Your text and results are stored to improve our service. We do not share your data with third parties.",
  },
  {
    icon: CheckCircle,
    gradient: "from-purple-500 to-indigo-500",
    title: "High Quality Output",
    description:
      "Get natural, human-like text that maintains meaning while improving readability and flow.",
  },
];

const steps: StepItem[] = [
  {
    gradient: "from-blue-500 to-indigo-500",
    title: "Paste Your AI Text",
    description:
      "Simply paste your AI-generated content into our text editor. Supports up to 5,000 characters.",
  },
  {
    gradient: "from-indigo-500 to-purple-500",
    title: "AI Processing",
    description:
      "Our advanced AI analyzes your text and transforms it into natural, human-like language.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    title: "Get Results",
    description:
      "Receive your humanized text instantly. Copy, edit, or regenerate as needed.",
  },
];

const faqs: FAQItem[] = [
  {
    gradient: "from-blue-500 to-indigo-500",
    question: "What is an AI to Human Text Converter?",
    answer:
      "An AI to Human Text Converter is a tool that transforms AI-generated content into more natural, human-like text while preserving the original meaning and context.",
  },
  {
    gradient: "from-indigo-500 to-purple-500",
    question: "Is this tool completely free?",
    answer:
      "Yes! Our AI to Human Text Converter is 100% free to use with no registration required. You can convert unlimited text without any restrictions.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    question: "How accurate is the conversion?",
    answer:
      "Our advanced AI algorithms provide highly accurate conversions, maintaining the original meaning while making the text sound more natural and human-like.",
  },
  {
    gradient: "from-pink-500 to-red-500",
    question: "What types of content can I convert?",
    answer:
      "You can convert any AI-generated text including articles, blog posts, emails, social media content, academic papers, and more.",
  },
];

export default function AiToHumanConverter() {
  return (
    <>
      <div className="max-w-4xl mx-auto mb-16">
        <TextToolForm config={config} />
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        <ToolFeatures title="Why Choose Our AI to Human Converter?" features={features} />
        <ToolHowItWorks title="How Our AI to Human Text Converter Works" steps={steps} />
        <ToolFAQ title="Frequently Asked Questions" faqs={faqs} />
      </div>
    </>
  );
}
