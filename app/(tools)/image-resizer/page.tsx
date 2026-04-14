import type { Metadata } from "next";
import ImageResizerTool from "./ImageResizerTool";

export const metadata: Metadata = {
  title:
    "Free Online Image Resizer - Resize Images for Social Media | BrainBoomingAI",
  description:
    "Resize images quickly for Instagram, Twitter, Facebook, LinkedIn, and custom dimensions. Free online image resizer with aspect ratio lock and instant preview. No signup required.",
  keywords: [
    "image resizer",
    "resize images",
    "social media image sizes",
    "Instagram image size",
    "Twitter header size",
    "Facebook image size",
    "photo resizer",
    "free image resizer",
    "online image resizer",
    "bulk image resize",
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
      "Free Online Image Resizer - Resize Images for Social Media | BrainBoomingAI",
    description:
      "Resize images quickly for Instagram, Twitter, Facebook, LinkedIn, and custom dimensions. Free online image resizer with instant preview.",
    url: "https://brainboomingai.vercel.app/image-resizer",
    siteName: "BrainBoomingAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/aitools.png",
        width: 1200,
        height: 630,
        alt: "BrainBoomingAI Free Image Resizer Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Resizer - Resize Images for Social Media",
    description:
      "Resize images quickly for Instagram, Twitter, Facebook, LinkedIn, and custom dimensions. Free online image resizer with instant preview.",
    images: ["/aitools.png"],
    creator: "@brainboomingai",
    site: "@brainboomingai",
  },
  alternates: {
    canonical: "https://brainboomingai.vercel.app/image-resizer",
  },
};

export default function ImageResizerPage() {
  return <ImageResizerTool />;
}
