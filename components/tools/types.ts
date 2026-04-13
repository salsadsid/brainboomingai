import type { LucideIcon } from "lucide-react";

export interface TextToolConfig {
  toolSlug: string;
  placeholder: string;
  minInputLength: number;
  buildPrompt: (input: string) => string;
  submitLabel: string;
  loadingLabel: string;
  regenerateLabel: string;
  successMessage: string;
  errorMessage: string;
  fallbackMessage: string;
  submitIcon: LucideIcon;
  accentGradient: string;
  accentHoverGradient: string;
  focusRingColor: string;
  dotColor: string;
  hoverBorderColor: string;
  outputBadgeGradient: string;
  formatOutputStats?: (output: string) => string;
  parseCopyText?: (output: string) => string;
}

export interface FeatureItem {
  icon: LucideIcon;
  gradient: string;
  title: string;
  description: string;
}

export interface StepItem {
  gradient: string;
  title: string;
  description: string;
}

export interface FAQItem {
  gradient: string;
  question: string;
  answer: string;
}
