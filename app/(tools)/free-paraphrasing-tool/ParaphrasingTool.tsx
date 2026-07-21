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
  inputLabel: "Original text",
  outputLabel: "Paraphrased text",
  emptyStateHint: "Your rewritten text will appear here.",
  minInputLength: 10,
  buildPrompt: free_grammar_checker_prompt,
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
    title: "Multiple Variations",
    description:
      "Generate multiple unique paraphrased versions of your text while maintaining the original meaning and context. Perfect for avoiding repetition.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get paraphrased content instantly with our AI-powered technology. Save time while maintaining quality and readability of your text.",
  },
  {
    icon: Shield,
    title: "Plagiarism-Free",
    description:
      "Create original content that passes plagiarism checks while preserving the core message and meaning of your original text.",
  },
];

const steps: StepItem[] = [
  {
    title: "Paste Your Text",
    description:
      "Simply paste or type the text you want to paraphrase. Our tool accepts content of any length and from various sources.",
  },
  {
    title: "AI Processing",
    description:
      "Our advanced AI analyzes your text and rewrites it using different words and sentence structures while preserving the original meaning.",
  },
  {
    title: "Get Paraphrased Text",
    description:
      "Receive your paraphrased text instantly. Copy the result or generate additional variations for more options.",
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
