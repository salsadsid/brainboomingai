import type { Metadata } from "next";
import TextSummarizerTool from "./TextSummarizerTool";

export const metadata: Metadata = {
  title:
    "Free AI Text Summarizer - Summarize Long Content Instantly | Brain Booming",
  description:
    "Summarize long articles, documents, and content instantly with our free AI text summarizer. Extract key points and create concise summaries in seconds.",
  keywords: [
    "text summarizer",
    "AI summarizer",
    "content summarizer",
    "article summarizer",
    "free text summarizer",
    "document summarizer",
    "summary generator",
    "AI summary tool",
    "text condensing tool",
    "content compression",
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
    title:
      "Free AI Text Summarizer - Instant Content Summarization | Brain Booming",
    description:
      "Summarize long articles, documents, and content instantly with our free AI text summarizer. Extract key points efficiently.",
    url: "https://brainbooming.com/free-text-summarizer",
    siteName: "Brain Booming",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "Free AI Text Summarizer Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Text Summarizer - Brain Booming",
    description:
      "Summarize long articles, documents, and content instantly with our free AI text summarizer.",
    images: ["/aitools.png"],
  },
  alternates: {
    canonical: "https://brainbooming.com/free-text-summarizer",
  },
};

export default function Page() {
  return <TextSummarizerTool />;
}
