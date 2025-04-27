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
    <div className="p-3 rounded-lg bg-primary/10 text-primary">{icon}</div>
    <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
      {title}
    </h2>
  </motion.div>
);

const ToolCard = ({ tool }: { tool: (typeof aiTools)[number] }) => (
  <motion.div variants={cardVariants}>
    <Link href={tool.href} className="group relative block">
      <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={tool.featuresImg}
              fill
              className="object-contain"
              alt={tool.title}
            />
          </div>
          <CardTitle className="text-center text-xl">{tool.title}</CardTitle>
          {tool.description && (
            <CardDescription className="text-center text-sm opacity-80">
              {tool.description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </Link>
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gradient-to-b from-background to-muted/10">
      <section className="container py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Transform Your Workflow with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover powerful tools that enhance productivity and creativity
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/free-ai-to-human">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base bg-gradient-to-tr from-primary to-purple-500 text-white hover:bg-gradient-to-bl hover:shadow-lg hover:text-white"
                aria-label="Explore AI to Human Tool"
              >
                <MagicWandIcon className="w-5 h-5" />
                Explore AI to Human Tool
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="container py-12">
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

      <section className="container py-12">
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
