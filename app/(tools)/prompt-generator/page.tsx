import type { Metadata } from "next";
import PromptGeneratorTool from "./PromptGeneratorTool";

export const metadata: Metadata = {
  title:
    "Free AI Prompt Generator - Create Custom Prompts Instantly | Brain Booming",
  description:
    "Generate creative and engaging prompts for any purpose with our AI-powered prompt generator. Perfect for writers, content creators, and educators. 100% free and instant.",
  keywords: [
    "AI prompt generator",
    "creative writing prompts",
    "content prompts",
    "writing inspiration",
    "prompt creator",
    "AI writing assistant",
    "free prompt generator",
    "custom prompts",
    "creative prompts",
    "writing prompts generator",
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
    title: "Free AI Prompt Generator - Brain Booming",
    description:
      "Generate creative and engaging prompts for any purpose with our AI-powered prompt generator. Perfect for writers, content creators, and educators.",
    url: "https://brainbooming.com/prompt-generator",
    siteName: "Brain Booming",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "AI Prompt Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Prompt Generator - Brain Booming",
    description:
      "Generate creative and engaging prompts for any purpose with our AI-powered prompt generator.",
    images: ["/aitools.png"],
  },
  alternates: {
    canonical: "https://brainbooming.com/prompt-generator",
  },
};

export default function Page() {
  return <PromptGeneratorTool />;
}
