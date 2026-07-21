import ToolSeo from "@/components/seo/ToolSeo";
import ToolHeader from "@/components/tools/ToolHeader";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import ImageCompressorTool from "./ImageCompressorTool";

export const metadata = buildMetadata({
  title: "Free Online Image Compressor - Reduce Image File Size",
  description: "Free online image compressor tool. Reduce image file size without losing quality. Compress JPEG, PNG, GIF, and WebP images instantly. Perfect for web optimization and storage.",
  path: "/image-compressor",
  keywords: toolKeywords("/image-compressor"),
});

export default function ImageCompressorPage() {
  return (
    <>
      <ToolSeo path="/image-compressor" />
      <ToolHeader href="/image-compressor" />
      <ImageCompressorTool />

      {/* Bottom Content */}
      <div className="mt-16 text-center">
        <div className="bg-card rounded-xl border border-border p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Why Use Our Image Compressor?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our advanced image compression technology reduces file sizes while
            maintaining visual quality. Perfect for web developers, content
            creators, and anyone who needs to optimize images for faster loading
            times and reduced storage space.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Web Optimization
              </h3>
              <p className="text-sm text-muted-foreground">
                Compress images for faster website loading times, improved SEO,
                and better user experience across all devices.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Storage Efficiency
              </h3>
              <p className="text-sm text-muted-foreground">
                Reduce storage costs and save space by compressing images
                without sacrificing visual quality for your projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
