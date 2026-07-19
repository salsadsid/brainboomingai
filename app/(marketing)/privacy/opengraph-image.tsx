import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Privacy Policy — BrainBoomingAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Privacy Policy",
    description:
      "How we handle the text, images and account data you submit to our free AI tools.",
    eyebrow: "Free AI Tools",
  });
}
