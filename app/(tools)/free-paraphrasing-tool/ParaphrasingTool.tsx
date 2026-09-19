"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
import { RefreshCw, Shield, Shuffle, Zap } from "lucide-react";

const config: TextToolConfig = {
  toolSlug: "free-paraphrasing-tool",
  placeholder: "Paste your text here to paraphrase it...",
  inputLabel: "Original text",
  outputLabel: "Paraphrased text",
  emptyStateHint: "Your rewritten text will appear here.",
  minInputLength: 10,
  submitLabel: "Paraphrase Text",
  loadingLabel: "Paraphrasing...",
  regenerateLabel: "Regenerate",
  successMessage: "Text paraphrased successfully!",
  errorMessage: "Failed to paraphrase text. Please try again.",
  fallbackMessage: "Could not paraphrase text. Please try again.",
  submitIcon: RefreshCw,
};

const features: FeatureItem[] = [
  {
    icon: Shuffle,
    title: "A Different Take Each Time",
    description:
      "Each run rewrites your text while keeping the original meaning and context. Not happy with the result? Regenerate for a different version.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get paraphrased content instantly with our AI-powered technology. Save time while maintaining quality and readability of your text.",
  },
  {
    icon: Shield,
    title: "Meaning Preserved",
    description:
      "Rewords and restructures your text while preserving its core message. Rewording someone else's ideas does not make them yours — always credit your sources.",
  },
];

const steps: StepItem[] = [
  {
    title: "Paste Your Text",
    description:
      "Simply paste or type the text you want to paraphrase — up to 5,000 characters per run.",
  },
  {
    title: "AI Processing",
    description:
      "Our advanced AI analyzes your text and rewrites it using different words and sentence structures while preserving the original meaning.",
  },
  {
    title: "Get Paraphrased Text",
    description:
      "Receive your paraphrased text in a few seconds. Copy the result, or regenerate for a different version.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/free-paraphrasing-tool"];

export default function ParaphrasingTool() {
  return (
    <div>
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Paraphrasing Features" features={features} />
      <ToolHowItWorks title="How Our Paraphrasing Tool Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
