"use client";

import { Button } from "@/components/ui/button";
import { MagicWandIcon, RocketIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-950 w-full min-h-screen">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-bl from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-full blur-2xl opacity-40" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-50/30 to-indigo-50/30 dark:from-slate-800/20 dark:to-purple-900/20 rounded-full blur-[120px] opacity-30" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(148,163,184,0.3)_1px,_transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,_rgba(71,85,105,0.4)_1px,_transparent_0)] [background-size:32px_32px]" aria-hidden="true" />

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-6 py-3 mb-8 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/40 dark:to-indigo-900/40 dark:text-blue-300 shadow-lg border border-blue-200/50 dark:border-blue-700/50"
          >
            <SparklesIcon className="w-5 h-5 mr-3" />
            AI-Powered Transformation Suite
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            <span className="block text-slate-900 dark:text-white mb-4">
              Elevate Your Productivity
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
              With Intelligent AI Tools
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Streamline your workflow with cutting-edge AI solutions that enhance
            creativity, automate tasks, and unlock new possibilities for content
            creation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/free-ai-to-human">
              <Button
                size="lg"
                className="group relative px-10 py-5 font-semibold text-lg rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105"
                aria-label="Explore AI to Human Tool"
              >
                <span className="relative z-10 flex items-center">
                  <MagicWandIcon className="w-6 h-6 mr-3 transition-transform group-hover:scale-110" />
                  Explore AI Tools
                </span>
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>

            <a href="#features">
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-5 font-semibold text-lg rounded-2xl bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-2 border-slate-300 dark:border-slate-600 shadow-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
                aria-label="View All Features"
              >
                <RocketIcon className="w-6 h-6 mr-3" />
                View All Features
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative accent */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
