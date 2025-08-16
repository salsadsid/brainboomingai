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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Free AI Image to Text Converter
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Extract text from images instantly with our advanced AI-powered OCR
            technology. Convert photos, documents, and screenshots to editable
            text for free.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Smart OCR Technology
            </span>
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Multiple Image Formats
            </span>
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Instant Processing
            </span>
          </div>
        </div>

        {/* Tool Component */}
        <ImageToTextTool />

        {/* Bottom Content */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Our AI Image to Text Converter?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Our advanced OCR technology uses cutting-edge AI to accurately
              extract text from any image. Whether you need to digitize
              documents, convert screenshots to text, or extract text from
              photos, our tool provides fast and reliable results.
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
      </div>
    </div>
  );
}
