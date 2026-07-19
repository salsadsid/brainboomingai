import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Terms of Service — BrainBoomingAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Terms of Service",
    description:
      "The terms that apply when you use our free AI writing and productivity tools.",
    eyebrow: "Free AI Tools",
  });
}
