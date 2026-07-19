"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
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

const { title: faqTitle, faqs } = toolFaqs["/free-ai-to-human"];

export default function AiToHumanConverter() {
  return (
    <>
      <div className="max-w-4xl mx-auto mb-16">
        <TextToolForm config={config} />
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        <ToolFeatures title="Why Choose Our AI to Human Converter?" features={features} />
        <ToolHowItWorks title="How Our AI to Human Text Converter Works" steps={steps} />
        <ToolFAQ title={faqTitle} faqs={faqs} />
      </div>
    </>
  );
}
