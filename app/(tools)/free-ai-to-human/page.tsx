import type { Metadata } from "next";
import AiToHumanConverter from "./AiToHumanConverter";

export const metadata: Metadata = {
  title:
    "Free AI to Human Text Converter - Transform AI Content to Natural Text | BrainBoomingAI",
  description:
    "Convert AI-generated text into natural, human-like content instantly. Free AI to human text converter with advanced algorithms. No registration required.",
  keywords: [
    "AI to human text converter",
    "humanize AI text",
    "AI text transformer",
    "natural text generator",
    "AI content converter",
    "free AI tools",
    "text humanization",
    "AI writing assistant",
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
    title: "Free AI to Human Text Converter - BrainBoomingAI",
    description:
      "Transform AI-generated content into natural, human-like text instantly. Free, fast, and accurate AI to human text conversion.",
    url: "https://brainboomingai.vercel.app/free-ai-to-human",
    siteName: "BrainBoomingAI",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "AI to Human Text Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI to Human Text Converter - BrainBoomingAI",
    description:
      "Transform AI-generated content into natural, human-like text instantly.",
    images: ["/aitools.png"],
  },
  alternates: {
    canonical: "https://brainboomingai.vercel.app/free-ai-to-human",
  },
};

export default function Page() {
  return <AiToHumanConverter />;
}
