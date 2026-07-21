"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
import { BookCheck, CheckCircle2, Zap } from "lucide-react";

const config: TextToolConfig = {
  toolSlug: "free-spell-checker",
  placeholder: "Paste your text here for spell checking...",
  inputLabel: "Your text",
  outputLabel: "Corrected text",
  emptyStateHint: "Your spell-checked text will appear here.",
  minInputLength: 1,
  submitLabel: "Check Spelling",
  loadingLabel: "Checking...",
  regenerateLabel: "Recheck",
  successMessage: "Spell check complete!",
  errorMessage: "Failed to check spelling. Please try again.",
  fallbackMessage: "Could not check spelling. Please try again.",
  submitIcon: CheckCircle2,
};

const features: FeatureItem[] = [
  {
    icon: CheckCircle2,
    title: "Accurate Detection",
    description:
      "Detect and correct spelling mistakes with high accuracy. Our AI identifies common typos, misspellings, and contextual errors in real-time.",
  },
  {
    icon: BookCheck,
    title: "Context-Aware",
    description:
      "Our spell checker understands context and provides intelligent suggestions based on the surrounding text and intended meaning.",
  },
  {
    icon: Zap,
    title: "Instant Corrections",
    description:
      "Get instant spelling corrections and suggestions. Improve your writing quality with fast, reliable spell checking technology.",
  },
];

const steps: StepItem[] = [
  {
    title: "Input Your Text",
    description:
      "Paste or type your text into our spell checker. Our tool supports various document types and text formats for comprehensive checking.",
  },
  {
    title: "AI Analysis",
    description:
      "Our advanced AI scans your text for spelling errors, typos, and contextual mistakes using sophisticated language processing algorithms.",
  },
  {
    title: "Get Corrections",
    description:
      "Receive detailed corrections with highlighted errors and suggested improvements. Copy the corrected text for immediate use.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/free-spell-checker"];

export default function SpellCheckerTool() {
  return (
    <div>
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Spell Checking Features" features={features} />
      <ToolHowItWorks title="How Our Spell Checker Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
