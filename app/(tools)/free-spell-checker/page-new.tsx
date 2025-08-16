import type { Metadata } from "next";
import SpellCheckerTool from "./SpellCheckerTool";

export const metadata: Metadata = {
  title:
    "Free AI Spell Checker - Fix Spelling Mistakes Instantly | BrainBoomingAI",
  description:
    "Free online AI spell checker tool. Detect and correct spelling mistakes, typos, and errors instantly. Advanced context-aware spell checking for perfect writing. No signup required.",
  keywords: [
    "spell checker",
    "spelling mistakes",
    "typo checker",
    "grammar checker",
    "writing tool",
    "proofreading",
    "text correction",
    "AI spell check",
    "free spell checker",
    "online spell checker",
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
      "Free AI Spell Checker - Fix Spelling Mistakes Instantly | BrainBoomingAI",
    description:
      "Free online AI spell checker tool. Detect and correct spelling mistakes, typos, and errors instantly. Advanced context-aware spell checking for perfect writing.",
    url: "https://brainboomingai.com/free-spell-checker",
    siteName: "BrainBoomingAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/spell-checker-og.jpg",
        width: 1200,
        height: 630,
        alt: "BrainBoomingAI Free Spell Checker Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Spell Checker - Fix Spelling Mistakes Instantly",
    description:
      "Free online AI spell checker tool. Detect and correct spelling mistakes, typos, and errors instantly. Advanced context-aware spell checking.",
    images: ["/spell-checker-twitter.jpg"],
    creator: "@brainboomingai",
    site: "@brainboomingai",
  },
  alternates: {
    canonical: "https://brainboomingai.com/free-spell-checker",
  },
  category: "AI Tools",
  classification: "Writing Tools",
  other: {
    "application-name": "BrainBoomingAI",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Spell Checker",
    "msapplication-TileColor": "#6366f1",
    "theme-color": "#6366f1",
  },
};

export default function FreeSpellCheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Free AI Spell Checker
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Fix spelling mistakes and typos instantly with our advanced
            AI-powered spell checker. Get accurate corrections and improve your
            writing quality for free.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Context-Aware Checking
            </span>
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Instant Corrections
            </span>
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              No Registration Required
            </span>
          </div>
        </div>

        {/* Tool Component */}
        <SpellCheckerTool />

        {/* Bottom Content */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Our AI Spell Checker?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Our advanced AI spell checker goes beyond basic spell checking to
              provide context-aware corrections that understand the meaning of
              your text. Whether you&apos;re writing emails, essays, reports, or
              creative content, our tool helps you maintain professional writing
              standards.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Perfect for Students
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Check essays, research papers, and assignments for spelling
                  errors to improve academic writing quality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Professional Use
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ensure error-free business communications, reports, and
                  professional documents with accurate spell checking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
