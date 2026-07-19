import { allTools } from "@/config/constants";
import { OG_CONTENT_TYPE, OG_SIZE, renderToolOgImage } from "@/lib/og";

const HREF = "/free-grammar-checker";

export const alt = allTools.find((t) => t.href === HREF)?.title ?? "BrainBoomingAI";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderToolOgImage(HREF);
}
