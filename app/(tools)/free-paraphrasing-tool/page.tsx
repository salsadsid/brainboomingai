import type { Metadata } from "next";
import ParaphrasingTool from "./ParaphrasingTool";

export const metadata: Metadata = {
  title:
    "Free Paraphrasing Tool - Rewrite Text & Avoid Plagiarism | BrainBoomingAI",
  description:
    "Paraphrase and rewrite text instantly with our free AI-powered paraphrasing tool. Create unique content while maintaining original meaning. 100% free and secure.",
  keywords: [
    "paraphrasing tool",
    "text paraphraser",
    "rewrite text",
    "content rewriter",
    "plagiarism free tool",
    "AI paraphrasing",
    "free paraphrasing tool",
    "text rewriting",
    "article rewriter",
    "sentence rephraser",
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
      "Free Paraphrasing Tool - Rewrite Text & Avoid Plagiarism | BrainBoomingAI",
    description:
      "Paraphrase and rewrite text instantly with our free AI-powered paraphrasing tool. Create unique content while maintaining original meaning.",
    url: "https://brainboomingai.vercel.app/free-paraphrasing-tool",
    siteName: "BrainBoomingAI",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "Free Paraphrasing Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Paraphrasing Tool - BrainBoomingAI",
    description:
      "Paraphrase and rewrite text instantly with our free AI-powered paraphrasing tool.",
    images: ["/aitools.png"],
  },
  alternates: {
    canonical: "https://brainboomingai.vercel.app/free-paraphrasing-tool",
  },
};

export default function Page() {
  return <ParaphrasingTool />;
}
