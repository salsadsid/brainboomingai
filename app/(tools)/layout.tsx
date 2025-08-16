"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const toolsData = {
  "/free-ai-to-human": {
    title: "AI to Human Text Converter",
    description: "Transform AI-generated content into natural, human-like text",
    icon: "🤖",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient:
      "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
  },
  "/prompt-generator": {
    title: "AI Prompt Generator",
    description: "Generate creative and engaging prompts for any purpose",
    icon: "✨",
    gradient: "from-purple-500 to-pink-600",
    bgGradient:
      "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
  },
  "/free-grammer-checker": {
    title: "Grammar Checker",
    description: "Check and improve your text for grammar errors",
    icon: "📝",
    gradient: "from-green-500 to-emerald-600",
    bgGradient:
      "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
  },
  "/free-image-to-text": {
    title: "Image to Text Converter",
    description: "Extract text from images with AI-powered OCR",
    icon: "🖼️",
    gradient: "from-orange-500 to-red-600",
    bgGradient:
      "from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30",
  },
  "/free-text-summarizer": {
    title: "Text Summarizer",
    description: "Summarize long articles into concise summaries",
    icon: "📄",
    gradient: "from-cyan-500 to-blue-600",
    bgGradient:
      "from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30",
  },
  "/free-spell-checker": {
    title: "Spell Checker",
    description: "Check and correct spelling errors in your text",
    icon: "🔤",
    gradient: "from-violet-500 to-purple-600",
    bgGradient:
      "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
  },
  "/free-paraphrasing-tool": {
    title: "Paraphrasing Tool",
    description: "Enhance your writing with creative paraphrases",
    icon: "🔄",
    gradient: "from-teal-500 to-cyan-600",
    bgGradient:
      "from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30",
  },
  "/free-plagiarism-checker": {
    title: "Plagiarism Checker",
    description: "Check your content for originality and plagiarism",
    icon: "🔍",
    gradient: "from-rose-500 to-pink-600",
    bgGradient:
      "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
  },
  "/image-compressor": {
    title: "Image Compressor",
    description: "Reduce image file sizes without losing quality",
    icon: "🗜️",
    gradient: "from-indigo-500 to-purple-600",
    bgGradient:
      "from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30",
  },
  "/image-resizer": {
    title: "Image Resizer",
    description: "Resize images to any dimensions quickly and easily",
    icon: "📐",
    gradient: "from-amber-500 to-orange-600",
    bgGradient:
      "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
  },
  "/md5-generator": {
    title: "MD5 Generator",
    description: "Generate MD5 hash values for text and files",
    icon: "🔐",
    gradient: "from-gray-500 to-slate-600",
    bgGradient:
      "from-gray-50 to-slate-50 dark:from-gray-950/30 dark:to-slate-950/30",
  },
  "/todo-app": {
    title: "Todo App",
    description: "Organize your tasks with a simple todo application",
    icon: "📋",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient:
      "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
  },
};

export default function AiToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const toolData = toolsData[pathname as keyof typeof toolsData] || {
    title: "AI Tool",
    description: "Powerful AI-driven solution",
    icon: "🚀",
    gradient: "from-blue-500 to-indigo-600",
    bgGradient:
      "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
  };

  return (
    <div className="min-h-screen">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,_rgba(148,163,184,0.15)_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_rgba(71,85,105,0.3)_1px,_transparent_0)] [background-size:24px_24px]" />

      {/* Main Content */}
      <div className="relative pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </motion.div>

          {/* Tool Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`relative bg-gradient-to-br ${toolData.bgGradient} rounded-2xl p-8 md:p-12 mb-8 border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden`}
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${toolData.gradient} opacity-10 rounded-full blur-2xl`}
              />
              <div
                className={`absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-tr ${toolData.gradient} opacity-10 rounded-full blur-2xl`}
              />
            </div>

            <div className="relative text-center">
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${toolData.gradient} text-white text-2xl shadow-lg mb-4`}
              >
                {toolData.icon}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                <span
                  className={`bg-gradient-to-r ${toolData.gradient} bg-clip-text text-transparent`}
                >
                  {toolData.title}
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {toolData.description}
              </p>

              {/* Feature Badge */}
              <div className="inline-flex items-center mt-4 px-3 py-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                <Sparkles className="w-3 h-3 mr-1 text-yellow-500" />
                AI-Powered • Free • No Registration
              </div>
            </div>
          </motion.div>

          {children}
        </motion.div>
      </div>
    </div>
  );
}
