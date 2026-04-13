"use client";

import TextToolForm from "@/components/tools/TextToolForm";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolFeatures from "@/components/tools/ToolFeatures";
import ToolHowItWorks from "@/components/tools/ToolHowItWorks";
import type { FAQItem, FeatureItem, StepItem, TextToolConfig } from "@/components/tools/types";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { Search, Shield, Zap } from "lucide-react";
import { free_grammar_checker_prompt } from "./prompt";

const config: TextToolConfig = {
  toolSlug: "free-plagiarism-checker",
  placeholder: "Paste your text here to check for plagiarism...",
  minInputLength: 1,
  buildPrompt: free_grammar_checker_prompt,
  submitLabel: "Check Plagiarism",
  loadingLabel: "Checking...",
  regenerateLabel: "Recheck",
  successMessage: "Plagiarism check complete!",
  errorMessage: "Failed to check for plagiarism. Please try again.",
  fallbackMessage: "Could not check for plagiarism. Please try again.",
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
    icon: Search,
    gradient: "from-indigo-500 to-purple-500",
    title: "Deep Web Scanning",
    description:
      "Our AI scans billions of web pages, academic papers, and published content to detect potential plagiarism with high accuracy.",
  },
  {
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
    title: "Academic Integrity",
    description:
      "Ensure academic integrity with thorough plagiarism detection that identifies paraphrased content and citation issues.",
  },
  {
    icon: Zap,
    gradient: "from-pink-500 to-red-500",
    title: "Instant Results",
    description:
      "Get comprehensive plagiarism reports in seconds. Detailed analysis with similarity percentages and source identification.",
  },
];

const steps: StepItem[] = [
  {
    gradient: "from-indigo-500 to-purple-500",
    title: "Upload Your Text",
    description:
      "Copy and paste your document, essay, or article into our plagiarism checker. We support various text formats and file types.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    title: "AI Analysis",
    description:
      "Our advanced AI algorithms scan your text against billions of sources including web pages, academic databases, and published materials.",
  },
  {
    gradient: "from-pink-500 to-red-500",
    title: "Get Detailed Report",
    description:
      "Receive a comprehensive plagiarism report with similarity percentages, source identification, and suggestions for improvement.",
  },
];

const faqs: FAQItem[] = [
  {
    gradient: "from-indigo-500 to-purple-500",
    question: "How accurate is the plagiarism detection?",
    answer:
      "Our AI-powered plagiarism checker has high accuracy rates and can detect various forms of plagiarism including direct copying, paraphrasing, and mosaic plagiarism with advanced pattern recognition.",
  },
  {
    gradient: "from-purple-500 to-pink-500",
    question: "What sources does the checker scan against?",
    answer:
      "Our tool scans against billions of web pages, academic papers, journals, books, and other published content to provide comprehensive plagiarism detection coverage across multiple databases.",
  },
  {
    gradient: "from-pink-500 to-red-500",
    question: "Is my document stored or shared after checking?",
    answer:
      "No, we prioritize your privacy and confidentiality. Your documents are processed securely and are not stored on our servers or shared with third parties after the plagiarism check is complete.",
  },
  {
    gradient: "from-red-500 to-orange-500",
    question: "Can I use this for academic papers and essays?",
    answer:
      "Absolutely! Our plagiarism checker is perfect for students, researchers, and academics. It helps ensure academic integrity and identifies areas that need proper citation or rephrasing.",
  },
];

export default function PlagiarismCheckerTool() {
  return (
    <div className="max-w-4xl mx-auto">
      <TextToolForm config={config} />
      <ToolFeatures title="Advanced Plagiarism Detection Features" features={features} />
      <ToolHowItWorks title="How Our Plagiarism Checker Works" steps={steps} />
      <ToolFAQ title="Plagiarism Checker FAQ" faqs={faqs} />
    </div>
  );
}
