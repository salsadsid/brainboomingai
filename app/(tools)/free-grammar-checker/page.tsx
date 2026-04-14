import type { Metadata } from "next";
import GrammarCheckerTool from "./GrammarCheckerTool";

export const metadata: Metadata = {
  title:
    "Free Grammar Checker - AI-Powered Grammar & Spell Check Tool | BrainBoomingAI",
  description:
    "Check grammar, spelling, and punctuation errors instantly with our free AI-powered grammar checker. Improve your writing with intelligent suggestions and corrections.",
  keywords: [
    "grammar checker",
    "spell checker",
    "punctuation checker",
    "writing tool",
    "grammar correction",
    "AI grammar check",
    "free grammar checker",
    "text correction",
    "writing assistant",
    "proofreading tool",
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
    title: "Free Grammar Checker - AI-Powered Writing Tool | BrainBoomingAI",
    description:
      "Check grammar, spelling, and punctuation errors instantly with our free AI-powered grammar checker. Perfect your writing with intelligent corrections.",
    url: "https://brainboomingai.vercel.app/free-grammar-checker",
    siteName: "BrainBoomingAI",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "Free Grammar Checker Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Grammar Checker - AI-Powered Writing Tool | BrainBoomingAI",
    description:
      "Check grammar, spelling, and punctuation errors instantly with our free AI-powered grammar checker.",
    images: ["/aitools.png"],
  },
  alternates: {
    canonical: "https://brainboomingai.vercel.app/free-grammar-checker",
  },
};

export default function Page() {
  return <GrammarCheckerTool />;
}
