"use client";

import { motion } from "framer-motion";
import type { StepItem } from "./types";

const stepAnimations = [
  { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
  { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
];

export default function ToolHowItWorks({
  title,
  steps,
}: {
  title: string;
  steps: StepItem[];
}) {
  return (
    <div className="mt-16 mb-12">
      <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
        {title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => {
          const anim = stepAnimations[i] ?? stepAnimations[1];
          return (
            <motion.div
              key={step.title}
              initial={anim.initial}
              whileInView={anim.animate}
              transition={{ delay: (i + 1) * 0.1 }}
              className="text-center"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}
              >
                <span className="text-2xl font-bold text-white">{i + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
