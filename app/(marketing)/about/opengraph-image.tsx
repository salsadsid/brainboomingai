import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "About BrainBoomingAI — BrainBoomingAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "About BrainBoomingAI",
    description:
      "Free, AI-powered writing and productivity tools that work instantly in your browser — no signup, no paywall.",
    eyebrow: "Free AI Tools",
  });
}
