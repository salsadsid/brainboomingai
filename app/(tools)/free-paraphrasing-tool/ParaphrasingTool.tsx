"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FAQItem, FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { RefreshCw, Shield, Shuffle, Zap } from "lucide-react";
import { free_grammar_checker_prompt } from "./prompt";

const config: TextToolConfig = {
  toolSlug: "free-paraphrasing-tool",
  placeholder: "Paste your text here to paraphrase it...",
  minInputLength: 10,
  buildPrompt: free_grammar_checker_prompt,
  submitLabel: "Paraphrase Text",
  loadingLabel: "Paraphrasing...",
  regenerateLabel: "Regenerate",
  successMessage: "Text paraphrased successfully!",
  errorMessage: "Failed to paraphrase text. Please try again.",
  fallbackMessage: "Could not paraphrase text. Please try again.",
  submitIcon: RefreshCw,
  accentGradient: "from-orange-600 to-red-600",
  accentHoverGradient: "from-orange-700 to-red-700",
  focusRingColor: "focus:ring-orange-500 dark:focus:ring-orange-400",
  dotColor: "bg-orange-500",
  hoverBorderColor: "hover:border-orange-300 dark:hover:border-orange-600",
  outputBadgeGradient: "from-orange-500 to-red-500",
};

const features: FeatureItem[] = [
  {
    icon: Shuffle,
    gradient: "from-orange-500 to-red-500",
    title: "Multiple Variations",
    description:
      "Generate multiple unique paraphrased versions of your text while maintaining the original meaning and context. Perfect for avoiding repetition.",
  },
  {
    icon: Zap,
    gradient: "from-red-500 to-pink-500",
    title: "Instant Results",
    description:
      "Get paraphrased content instantly with our AI-powered technology. Save time while maintaining quality and readability of your text.",
  },
  {
    icon: Shield,
    gradient: "from-pink-500 to-purple-500",
    title: "Plagiarism-Free",
    description:
      "Create original content that passes plagiarism checks while preserving the core message and meaning of your original text.",
  },
];

const steps: StepItem[] = [
  {
    gradient: "from-orange-500 to-red-500",
    title: "Paste Your Text",
    description:
      "Simply paste or type the text you want to paraphrase. Our tool accepts content of any length and from various sources.",
  },
  {
    gradient: "from-red-500 to-pink-500",
    title: "AI Processing",
    description:
      "Our advanced AI analyzes your text and rewrites it using different words and sentence structures while preserving the original meaning.",
  },
  {
    gradient: "from-pink-500 to-purple-500",
    title: "Get Paraphrased Text",
    description:
      "Receive your paraphrased text instantly. Copy the result or generate additional variations for more options.",
  },
];

const faqs: FAQItem[] = [
  {
    gradient: "from-orange-500 to-red-500",
    question: "What is paraphrasing and why is it useful?",
    answer:
      "Paraphrasing is rewriting text using different words while maintaining the same meaning. It's useful for avoiding plagiarism, improving readability, creating unique content, and adapting text for different audiences or purposes.",
  },
  {
    gradient: "from-red-500 to-pink-500",
    question: "Does the paraphrasing tool maintain the original meaning?",
    answer:
      "Yes, our AI-powered paraphrasing tool is designed to preserve the original meaning and context while changing the wording and sentence structure. However, we recommend reviewing the output to ensure it meets your specific requirements.",
  },
  {
    gradient: "from-pink-500 to-purple-500",
    question: "Can I paraphrase content for academic or professional use?",
    answer:
      "Yes, our paraphrasing tool is suitable for academic papers, professional documents, and business content. However, always ensure proper citation when using sources and follow your institution's or organization's guidelines.",
  },
  {
    gradient: "from-purple-500 to-indigo-500",
    question: "How many times can I use the paraphrasing tool?",
    answer:
      "There's no limit to how many times you can use our free paraphrasing tool. You can paraphrase as much content as you need and generate multiple variations of the same text to find the perfect version for your needs.",
  },
];

export default function ParaphrasingTool() {
  return (
    <div className="max-w-4xl mx-auto">
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Paraphrasing Features" features={features} />
      <ToolHowItWorks title="How Our Paraphrasing Tool Works" steps={steps} />
      <ToolFAQ title="Paraphrasing Tool FAQ" faqs={faqs} />
    </div>
  );
}
