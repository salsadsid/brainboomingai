import type { Metadata } from "next";
import ImageToTextTool from "./ImageToTextTool";

export const metadata: Metadata = {
  title:
    "Free AI Image to Text Converter - OCR Extract Text from Images | BrainBoomingAI",
  description:
    "Free online AI image to text converter with OCR technology. Extract text from images, photos, documents, and screenshots instantly. Convert images to editable text for free.",
  keywords: [
    "image to text",
    "OCR online",
    "text extraction",
    "image text converter",
    "photo to text",
    "document scanner",
    "text recognition",
    "AI OCR",
    "free image to text",
    "extract text from image",
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
      "Free AI Image to Text Converter - OCR Extract Text from Images | BrainBoomingAI",
    description:
      "Free online AI image to text converter with OCR technology. Extract text from images, photos, documents, and screenshots instantly.",
    url: "https://brainboomingai.com/free-image-to-text",
    siteName: "BrainBoomingAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/image-to-text-og.jpg",
        width: 1200,
        height: 630,
        alt: "BrainBoomingAI Free Image to Text Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Image to Text Converter - OCR Extract Text from Images",
    description:
      "Free online AI image to text converter with OCR technology. Extract text from images, photos, documents, and screenshots instantly.",
    images: ["/image-to-text-twitter.jpg"],
    creator: "@brainboomingai",
    site: "@brainboomingai",
  },
  alternates: {
    canonical: "https://brainboomingai.com/free-image-to-text",
  },
  category: "AI Tools",
  classification: "OCR Tools",
  other: {
    "application-name": "BrainBoomingAI",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Image to Text",
    "msapplication-TileColor": "#6366f1",
    "theme-color": "#6366f1",
  },
};

export default function FreeImageToTextPage() {
  return (
    <>
      <ImageToTextTool />

      {/* Bottom Content */}
      <div className="mt-16 text-center">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Why Choose Our AI Image to Text Converter?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            Our advanced OCR technology uses cutting-edge AI to accurately
            extract text from any image. Whether you need to digitize documents,
            convert screenshots to text, or extract text from photos, our tool
            provides fast and reliable results.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Perfect for Students
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Quickly digitize handwritten notes, extract text from textbook
                pages, and convert study materials into searchable text.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Business Applications
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
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
