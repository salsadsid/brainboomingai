import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt =
  "BrainBoomingAI — free AI tools for writing and productivity";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Free AI Tools for Smarter Writing",
    description:
      "Grammar checker, paraphraser, summarizer, AI humanizer, image-to-text and more.",
  });
}
