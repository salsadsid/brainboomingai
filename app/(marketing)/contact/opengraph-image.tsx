import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Contact Us — BrainBoomingAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    title: "Contact Us",
    description:
      "Questions, bug reports and feature requests for our free AI writing tools.",
    eyebrow: "Free AI Tools",
  });
}
