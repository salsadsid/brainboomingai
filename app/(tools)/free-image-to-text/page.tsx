import ToolSeo from "@/components/seo/ToolSeo";
import ToolHeader from "@/components/tools/ToolHeader";
import { toolKeywords } from "@/config/constants";
import { buildMetadata } from "@/lib/seo";
import ImageToTextTool from "./ImageToTextTool";

export const metadata = buildMetadata({
  title: "Free AI Image to Text Converter - OCR Extract Text from Images",
  description: "Free online AI image to text converter with OCR technology. Extract text from images, photos, documents, and screenshots instantly. Convert images to editable text for free.",
  path: "/free-image-to-text",
  keywords: toolKeywords("/free-image-to-text"),
});

export default function FreeImageToTextPage() {
  return (
    <>
      <ToolSeo path="/free-image-to-text" />
      <ToolHeader href="/free-image-to-text" />
      <ImageToTextTool />

      {/* Bottom Content */}
      <div className="mt-16 text-center">
        <div className="bg-card rounded-xl border border-border p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Why Choose Our AI Image to Text Converter?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our advanced OCR technology uses cutting-edge AI to accurately
            extract text from any image. Whether you need to digitize documents,
            convert screenshots to text, or extract text from photos, our tool
            provides fast and reliable results.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Perfect for Students
              </h3>
              <p className="text-sm text-muted-foreground">
                Quickly digitize handwritten notes, extract text from textbook
                pages, and convert study materials into searchable text.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Business Applications
              </h3>
              <p className="text-sm text-muted-foreground">
                Convert business cards, receipts, invoices, and documents into
                editable text for easy data entry and organization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
