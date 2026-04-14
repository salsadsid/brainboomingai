"use client";

import { motion } from "framer-motion";
import type { FeatureItem } from "./types";

export default function ToolFeatures({
  title,
  features,
}: {
  title: string;
  features: FeatureItem[];
}) {
  return (
    <div className="mt-16 mb-12">
      <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
        {title}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
