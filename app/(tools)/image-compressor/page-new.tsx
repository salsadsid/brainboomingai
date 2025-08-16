import type { Metadata } from "next";
import ImageCompressorTool from "./ImageCompressorTool";

export const metadata: Metadata = {
  title:
    "Free Online Image Compressor - Reduce Image File Size | BrainBoomingAI",
  description:
    "Free online image compressor tool. Reduce image file size without losing quality. Compress JPEG, PNG, GIF, and WebP images instantly. Perfect for web optimization and storage.",
  keywords: [
    "image compressor",
    "reduce image size",
    "compress photos",
    "optimize images",
    "image optimization",
    "file size reducer",
    "web image compression",
    "photo compressor",
    "free image compressor",
    "online image optimizer",
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
      "Free Online Image Compressor - Reduce Image File Size | BrainBoomingAI",
    description:
      "Free online image compressor tool. Reduce image file size without losing quality. Compress JPEG, PNG, GIF, and WebP images instantly.",
    url: "https://brainboomingai.com/image-compressor",
    siteName: "BrainBoomingAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/image-compressor-og.jpg",
        width: 1200,
        height: 630,
        alt: "BrainBoomingAI Free Image Compressor Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Compressor - Reduce Image File Size",
    description:
      "Free online image compressor tool. Reduce image file size without losing quality. Compress JPEG, PNG, GIF, and WebP images instantly.",
    images: ["/image-compressor-twitter.jpg"],
    creator: "@brainboomingai",
    site: "@brainboomingai",
  },
  alternates: {
    canonical: "https://brainboomingai.com/image-compressor",
  },
  category: "Utility Tools",
  classification: "Image Tools",
  other: {
    "application-name": "BrainBoomingAI",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Image Compressor",
    "msapplication-TileColor": "#6366f1",
    "theme-color": "#6366f1",
  },
};

export default function ImageCompressorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Free Online Image Compressor
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Reduce image file sizes without losing quality. Compress JPEG, PNG,
            GIF, and WebP images instantly for faster websites and efficient
            storage.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Smart Compression
            </span>
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Multiple Formats
            </span>
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Quality Preserved
            </span>
          </div>
        </div>

        {/* Tool Component */}
        <ImageCompressorTool />

        {/* Bottom Content */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Why Use Our Image Compressor?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Our advanced image compression technology reduces file sizes while
              maintaining visual quality. Perfect for web developers, content
              creators, and anyone who needs to optimize images for faster
              loading times and reduced storage space.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Web Optimization
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Compress images for faster website loading times, improved
                  SEO, and better user experience across all devices.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Storage Efficiency
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Reduce storage costs and save space by compressing images
                  without sacrificing visual quality for your projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
