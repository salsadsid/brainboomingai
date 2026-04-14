"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import type { FAQItem } from "./types";

export default function ToolFAQ({
  title,
  faqs,
}: {
  title: string;
  faqs: FAQItem[];
}) {
  return (
    <div className="mt-16 mb-12">
      <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
        {title}
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: (i + 1) * 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-8 h-8 bg-gradient-to-r ${faq.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}
              >
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
