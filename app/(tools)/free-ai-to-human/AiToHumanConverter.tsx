"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
import { CheckCircle, Sparkles, Zap, Shield } from "lucide-react";

const config: TextToolConfig = {
  toolSlug: "free-ai-to-human",
  placeholder: "Paste your AI-generated text here...",
  inputLabel: "AI-generated text",
  outputLabel: "Humanized text",
  emptyStateHint: "Your humanized text will appear here.",
  minInputLength: 10,
  submitLabel: "Convert to Human Text",
  loadingLabel: "Converting...",
  regenerateLabel: "Regenerate",
  successMessage: "Conversion successful!",
  errorMessage: "Failed to convert text. Please try again.",
  fallbackMessage: "Could not generate conversion. Please try again.",
  submitIcon: Sparkles,
};

const features: FeatureItem[] = [
  {
    icon: Zap,
    title: "Instant Conversion",
    description:
      "Transform AI-generated text to natural, human-like content in seconds using advanced language processing.",
  },
  {
    icon: Shield,
    title: "100% Free & Secure",
    description:
      "No registration required. Your text and results are stored to improve our service. We do not share your data with third parties.",
  },
  {
    icon: CheckCircle,
    title: "High Quality Output",
    description:
      "Get natural, human-like text that maintains meaning while improving readability and flow.",
  },
];

const steps: StepItem[] = [
  {
    title: "Paste Your AI Text",
    description:
      "Simply paste your AI-generated content into our text editor. Supports up to 5,000 characters.",
  },
  {
    title: "AI Processing",
    description:
      "Our advanced AI analyzes your text and transforms it into natural, human-like language.",
  },
  {
    title: "Get Results",
    description:
      "Receive your humanized text instantly. Copy, edit, or regenerate as needed.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/free-ai-to-human"];

export default function AiToHumanConverter() {
  return (
    <>
      <div>
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
