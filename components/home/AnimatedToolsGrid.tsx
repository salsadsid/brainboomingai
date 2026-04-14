"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Tool {
  title: string;
  href: string;
  featuresImg: string;
  description?: string;
}

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

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <motion.div variants={cardVariants} className="h-full">
      <Link href={tool.href} className="group relative block h-full">
        <Card className="h-full transition-all duration-500 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 dark:bg-slate-800/90 dark:border-slate-700 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/20 backdrop-blur-sm border-2 border-gray-200/50 flex flex-col">
          <CardHeader className="flex flex-col items-center gap-6 p-6 flex-grow">
            <div className="relative w-16 h-16 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <Image
                src={tool.featuresImg}
                fill
                className="object-contain dark:invert-[0.1]"
                alt={tool.title}
              />
            </div>
            <div className="text-center space-y-3 flex-grow flex flex-col justify-center">
              <CardTitle className="text-lg font-bold dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                {tool.title}
              </CardTitle>
              {tool.description && (
                <CardDescription className="text-sm leading-relaxed opacity-70 dark:text-slate-400 group-hover:opacity-90 transition-opacity duration-300 line-clamp-3">
                  {tool.description}
                </CardDescription>
              )}
            </div>
          </CardHeader>
        </Card>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
      </Link>
    </motion.div>
  );
}

export default function AnimatedToolsGrid({
  tools,
  columns = 4,
}: {
  tools: Tool[];
  columns?: 3 | 4;
}) {
  const gridCols =
    columns === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid ${gridCols} gap-6 auto-rows-fr`}
    >
      {tools.map((tool) => (
        <ToolCard key={tool.href} tool={tool} />
      ))}
    </motion.div>
  );
}
