import type { Metadata } from "next";
import PlagiarismCheckerTool from "./PlagiarismCheckerTool";

export const metadata: Metadata = {
  title: "Free AI Plagiarism Checker - Detect Copied Content Instantly | BrainBoomingAI",
  description: "Free online AI plagiarism checker tool. Detect copied content, ensure academic integrity, and check for duplicate text instantly. Advanced plagiarism detection for students and professionals.",
  keywords: [
    "plagiarism checker",
    "duplicate content detector",
    "academic integrity",
    "originality checker",
    "copy detection",
    "plagiarism scanner",
    "content verification",
    "AI plagiarism detection",
    "free plagiarism checker",
    "online plagiarism tool"
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
    title: "Free AI Plagiarism Checker - Detect Copied Content Instantly | BrainBoomingAI",
    description: "Free online AI plagiarism checker tool. Detect copied content, ensure academic integrity, and check for duplicate text instantly. Advanced plagiarism detection.",
    url: "https://brainboomingai.com/free-plagiarism-checker",
    siteName: "BrainBoomingAI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/plagiarism-checker-og.jpg",
        width: 1200,
        height: 630,
        alt: "BrainBoomingAI Free Plagiarism Checker Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Plagiarism Checker - Detect Copied Content Instantly",
    description: "Free online AI plagiarism checker tool. Detect copied content, ensure academic integrity, and check for duplicate text instantly.",
    images: ["/plagiarism-checker-twitter.jpg"],
    creator: "@brainboomingai",
    site: "@brainboomingai",
  },
  alternates: {
    canonical: "https://brainboomingai.com/free-plagiarism-checker",
  },
  category: "AI Tools",
  classification: "Academic Tools",
  other: {
    "application-name": "BrainBoomingAI",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Plagiarism Checker",
    "msapplication-TileColor": "#6366f1",
    "theme-color": "#6366f1",
  },
};

export default function FreePlagiarismCheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Free AI Plagiarism Checker
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Detect copied content and ensure academic integrity with our advanced AI-powered 
            plagiarism checker. Get comprehensive reports and maintain originality in your work.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Deep Web Scanning
            </span>
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Academic Integrity
            </span>
            <span className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Instant Results
            </span>
          </div>
        </div>

        {/* Tool Component */}
        <PlagiarismCheckerTool />

        {/* Bottom Content */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Our AI Plagiarism Checker?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              Our advanced AI plagiarism detection technology scans billions of sources 
              to ensure your content is original and properly cited. Perfect for students, 
              researchers, content creators, and professionals who value academic integrity 
              and original writing.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  For Academic Excellence
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ensure your research papers, essays, and dissertations meet 
                  academic integrity standards with comprehensive plagiarism detection.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Content Originality
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Verify the originality of your content, identify potential 
                  issues, and maintain credibility in your professional work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
