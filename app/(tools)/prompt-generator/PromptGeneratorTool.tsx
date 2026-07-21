"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { toolFaqs } from "@/config/toolFaqs";
import { Shield, Sparkles, Target, Zap } from "lucide-react";

const config: TextToolConfig = {
  toolSlug: "prompt-generator",
  placeholder: "Describe what kind of prompt you want to generate...",
  inputLabel: "Describe your prompt",
  outputLabel: "Generated prompt",
  emptyStateHint: "Your generated prompt will appear here.",
  minInputLength: 10,
  submitLabel: "Generate Prompt",
  loadingLabel: "Generating...",
  regenerateLabel: "Regenerate",
  successMessage: "Prompt generated successfully!",
  errorMessage: "Failed to generate prompt. Please try again.",
  fallbackMessage: "Could not generate a prompt. Please try again.",
  submitIcon: Sparkles,
};

const features: FeatureItem[] = [
  {
    icon: Target,
    title: "Tailored Prompts",
    description:
      "Generate highly specific and customized prompts based on your exact requirements. Our AI understands context and creates prompts that match your intended purpose.",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description:
      "Get creative and engaging prompts in seconds. No more writer's block or struggling to find the right words to express your ideas.",
  },
  {
    icon: Shield,
    title: "100% Free & Secure",
    description:
      "Completely free to use with no registration required. Your prompts and generated results are stored to improve our service. We do not share your data with third parties.",
  },
];

const steps: StepItem[] = [
  {
    title: "Describe Your Needs",
    description:
      "Simply describe what kind of prompt you need. Be as specific or general as you want - our AI adapts to your requirements.",
  },
  {
    title: "AI Processing",
    description:
      "Our advanced AI analyzes your description and generates creative, well-structured prompts that match your specific requirements.",
  },
  {
    title: "Get Your Prompt",
    description:
      "Receive your custom-generated prompt instantly. Copy it to use for writing, brainstorming, or any creative project you have in mind.",
  },
];

const { title: faqTitle, faqs } = toolFaqs["/prompt-generator"];

export default function PromptGeneratorTool() {
  return (
    <div>
      <TextToolForm config={config} />
      <ToolFeatures title="Why Choose Our AI Prompt Generator?" features={features} />
      <ToolHowItWorks title="How Our Prompt Generator Works" steps={steps} />
      <ToolFAQ title={faqTitle} faqs={faqs} />
    </div>
  );
}
