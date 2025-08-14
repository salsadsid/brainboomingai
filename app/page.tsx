"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aiTools, otherTools } from "@/config/constants";
import { MagicWandIcon, RocketIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SectionTitle = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-4 mb-8"
  >
    <div className="p-3  rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
      {icon}
    </div>
    <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent dark:to-purple-400">
      {title}
    </h2>
  </motion.div>
);

const ToolCard = ({ tool }: { tool: (typeof aiTools)[number] }) => (
  <motion.div variants={cardVariants}>
    <Link href={tool.href} className="group relative block">
      <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700 dark:hover:border-primary/30">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={tool.featuresImg}
              fill
              className="object-contain dark:invert-[0.1]"
              alt={tool.title}
            />
          </div>
          <CardTitle className="text-center text-xl dark:text-slate-100">
            {tool.title}
          </CardTitle>
          {tool.description && (
            <CardDescription className="text-center text-sm opacity-80 dark:text-slate-400">
              {tool.description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg dark:via-primary/20 dark:to-primary/40" />
    </Link>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen  mx-auto">
      <section className="relative overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-70" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-3xl opacity-70" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/40 dark:to-purple-900/20 rounded-3xl blur-[100px] opacity-40" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="container relative z-10 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-sm"
            >
              <SparklesIcon className="w-4 h-4 mr-2" />
              AI-Powered Transformation
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              <span className="block text-slate-900 dark:text-white">
                Elevate Your Productivity
              </span>
              <span className="block mt-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                With Intelligent AI Tools
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto sm:px-0 px-4"
            >
              Streamline your workflow with cutting-edge AI solutions that
              enhance creativity, automate tasks, and unlock new possibilities.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 px-2 justify-center"
            >
              <Link href="/free-ai-to-human">
                <Button
                  size="lg"
                  className="group relative px-8 py-4 font-medium rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
                  aria-label="Explore AI to Human Tool"
                >
                  <span className="relative z-10 flex items-center">
                    <MagicWandIcon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                    Explore AI to Human Tool
                  </span>
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 font-medium  sm:mx-0 mx-auto rounded-xl bg-white/70 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 shadow-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
                aria-label="View All Features"
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                View All Features
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom decorative accent */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
      </section>
      <section
        id="features"
        className="container max-w-7xl mx-auto sm:px-2 px-3 py-12"
      >
        <SectionTitle
          title="AI Tools"
          icon={<RocketIcon className="w-6 h-6" />}
        />
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {aiTools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </motion.div>
      </section>

      <section className="container sm:px-2 px-3 max-w-7xl mx-auto py-12">
        <SectionTitle
          title="Productivity Suite"
          icon={<MagicWandIcon className="w-6 h-6" />}
        />
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {otherTools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
