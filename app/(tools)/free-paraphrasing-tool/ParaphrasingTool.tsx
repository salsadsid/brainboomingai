"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
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

const { title: faqTitle, faqs } = toolFaqs["/free-paraphrasing-tool"];

export default function ParaphrasingTool() {
  return (
    <div className="max-w-4xl mx-auto">
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Paraphrasing Features" features={features} />
      <ToolHowItWorks title="How Our Paraphrasing Tool Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
