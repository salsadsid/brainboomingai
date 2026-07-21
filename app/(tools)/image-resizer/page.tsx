import ToolSeo from "@/components/seo/ToolSeo";
import ToolHeader from "@/components/tools/ToolHeader";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import ImageResizerTool from "./ImageResizerTool";

export const metadata = buildMetadata({
  title: "Free Online Image Resizer - Resize Images for Social Media",
  description: "Resize images quickly for Instagram, Twitter, Facebook, LinkedIn, and custom dimensions. Free online image resizer with aspect ratio lock and instant preview. No signup required.",
  path: "/image-resizer",
  keywords: toolKeywords("/image-resizer"),
});

export default function ImageResizerPage() {
  return (
    <>
      <ToolSeo path="/image-resizer" />
      <ToolHeader href="/image-resizer" />
      <ImageResizerTool />
    </>
  );
}
