import type { Metadata } from "next";
import GrammarCheckerTool from "./GrammarCheckerTool";

export const metadata: Metadata = {
  title:
    "Free Grammar Checker - AI-Powered Grammar & Spell Check Tool | Brain Booming",
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
  authors: [{ name: "Brain Booming" }],
  creator: "Brain Booming",
  publisher: "Brain Booming",
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
    title: "Free Grammar Checker - AI-Powered Writing Tool | Brain Booming",
    description:
      "Check grammar, spelling, and punctuation errors instantly with our free AI-powered grammar checker. Perfect your writing with intelligent corrections.",
    url: "https://brainbooming.com/free-grammer-checker",
    siteName: "Brain Booming",
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
    title: "Free Grammar Checker - AI-Powered Writing Tool | Brain Booming",
    description:
      "Check grammar, spelling, and punctuation errors instantly with our free AI-powered grammar checker.",
    images: ["/aitools.png"],
  },
  alternates: {
    canonical: "https://brainbooming.com/free-grammer-checker",
  },
};

export default function Page() {
  return <GrammarCheckerTool />;
}
