import type { Metadata } from "next";
import OriginalityAnalyzerTool from "./OriginalityAnalyzerTool";

export const metadata: Metadata = {
  title:
    "Free AI Content Originality Analyzer - Detect AI Writing Patterns | BrainBoomingAI",
  description:
    "Free AI-powered writing originality analyzer. Detect AI-generated content patterns, evaluate writing voice, and get actionable suggestions to make your text more authentic. No source comparison — honest pattern analysis.",
  keywords: [
    "AI content detector",
    "originality analyzer",
    "AI writing detector",
    "writing voice analysis",
    "content originality",
    "AI text detection",
    "writing quality checker",
    "free AI tools",
  ],
  authors: [{ name: "BrainBoomingAI" }],
  creator: "BrainBoomingAI",
  publisher: "BrainBoomingAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Free AI Content Originality Analyzer | BrainBoomingAI",
    description:
      "Analyze your writing for originality, detect AI-generated content patterns, and get suggestions to improve your authorial voice. Free, honest, pattern-based analysis.",
    url: "https://brainboomingai.com/free-originality-analyzer",
    siteName: "BrainBoomingAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "BrainBoomingAI AI Content Originality Analyzer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Content Originality Analyzer",
    description:
      "Detect AI writing patterns and analyze content originality. Honest pattern-based analysis — no false claims about source comparison.",
    images: ["/aitools.png"],
    creator: "@brainboomingai",
    site: "@brainboomingai",
  },
  alternates: {
    canonical: "https://brainboomingai.com/free-originality-analyzer",
  },
  category: "AI Tools",
  classification: "Writing Tools",
};

export default function OriginalityAnalyzerPage() {
  return <OriginalityAnalyzerTool />;
}
