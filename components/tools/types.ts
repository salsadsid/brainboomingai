import type { LucideIcon } from "lucide-react";

/**
 * Behavioural config for a text tool. Purely cosmetic fields (per-tool gradient
 * pairs, focus-ring and dot colours) were removed in the redesign: the tools now
 * share one accent driven by the `--primary` token, so eleven near-identical
 * colour tuples no longer have to be kept in sync by hand.
 */
export interface TextToolConfig {
  toolSlug: string;
  /** Heading above the input pane, e.g. "Your text". */
  inputLabel?: string;
  /** Heading above the output pane, e.g. "Corrected text". */
  outputLabel?: string;
  /** Shown in the empty output pane before the first run. */
  emptyStateHint?: string;
  placeholder: string;
  minInputLength: number;
  submitLabel: string;
  loadingLabel: string;
  regenerateLabel: string;
  successMessage: string;
  errorMessage: string;
  fallbackMessage: string;
  submitIcon: LucideIcon;
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StepItem {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
