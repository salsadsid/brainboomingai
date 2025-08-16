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
    <>
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
            your text. Whether you're writing emails, essays, reports, or
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
    </>
  );
}
