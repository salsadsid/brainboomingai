"use client";

import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerateResponseMutation } from "@/redux/api/promptApi";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { motion } from "framer-motion";
import {
  Clipboard,
  ClipboardCheck,
  FileWarning,
  HelpCircle,
  RotateCw,
  Search,
  Shield,
  Zap,
} from "lucide-react";
import { FormEvent, useCallback, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { free_grammer_checker_prompt } from "./prompt";

const MAX_INPUT_LENGTH = 5000;
const schema = z.object({
  content: z
    .string()
    .min(1, "Input cannot be empty")
    .max(MAX_INPUT_LENGTH, `Input exceeds ${MAX_INPUT_LENGTH} character limit`),
});

export default function PlagiarismCheckerTool() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [generateResponse, { isLoading }] = useGenerateResponseMutation();
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<AutosizeTextAreaRef>(null);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      try {
        const validation = schema.safeParse({ content: input });
        if (!validation.success) {
          validation.error.issues.forEach((issue) => {
            setError(issue.message);
            if (issue.message === "Input cannot be empty") {
              textareaRef.current?.textArea.focus();
            }
          });
          return;
        }

        const modifiedPrompt = free_grammer_checker_prompt(input);
        const result = await generateResponse({
          prompt: modifiedPrompt,
          tool: "free-plagiarism-checker",
        }).unwrap();

        setOutputs((prev) => [
          result || "Could not check for plagiarism. Please try again.",
          ...prev,
        ]);
        toast.success("Plagiarism check complete!");
      } catch (err) {
        console.error("Plagiarism check error:", err);
        toast.error("Failed to check for plagiarism. Please try again.");
      }
    },
    [input, generateResponse]
  );

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const generateAnother = async () => {
    if (!input) return;
    await handleSubmit(new Event("submit") as unknown as FormEvent);
  };

  const inputStats = `${wordCount(input)} words · ${characterCount(
    input
  )} chars`;
  const isInputValid =
    input.trim().length > 0 && input.length <= MAX_INPUT_LENGTH;

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          className:
            "dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700",
        }}
      />

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="relative">
              <AutosizeTextarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError(null);
                }}
                placeholder="Paste your text here to check for plagiarism..."
                minHeight={180}
                maxHeight={400}
                maxLength={MAX_INPUT_LENGTH}
                className="w-full ring-2 ring-slate-200 dark:ring-slate-600 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                 rounded-xl p-4 text-base text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 
                 shadow-sm border-0 resize-none transition-all duration-200
                 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />
              <div
                className="absolute bottom-3 right-3 text-xs text-slate-500 dark:text-slate-400 
                bg-white dark:bg-slate-800 px-3 py-1 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
              >
                {input.length}/{MAX_INPUT_LENGTH}
              </div>
            </div>

            {input.length > 0 && (
              <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  {inputStats}
                </span>
                {input.length > MAX_INPUT_LENGTH && (
                  <span className="text-red-500 flex items-center dark:text-red-400">
                    <FileWarning className="w-4 h-4 mr-1" />
                    Exceeds character limit
                  </span>
                )}
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <FileWarning className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              disabled={isLoading || !isInputValid}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
                text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
                transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <RotateCw className="w-5 h-5 animate-spin" />
                  Checking...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Search className="w-5 h-5" />
                  Check Plagiarism
                </div>
              )}
            </Button>

            {outputs.length > 0 && (
              <Button
                type="button"
                onClick={generateAnother}
                variant="outline"
                disabled={isLoading}
                className="sm:w-auto bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 
                  hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-700 dark:text-slate-300 
                  font-semibold py-4 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Recheck
              </Button>
            )}
          </div>

          {isLoading && (
            <div className="space-y-4 animate-pulse">
              <Skeleton className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              <Skeleton className="h-40 w-full bg-slate-200 dark:bg-slate-700 rounded-xl" />
            </div>
          )}

          <div className="space-y-6">
            {outputs.map((output, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 
                  rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      Analysis Complete · {wordCount(output)} words ·{" "}
                      {characterCount(output)} chars
                    </span>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(output, index)}
                    size="sm"
                    variant="ghost"
                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 
                      hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedIndex === index ? (
                      <ClipboardCheck className="w-4 h-4 text-green-600" />
                    ) : (
                      <Clipboard className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div
                  className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: output }}
                />
              </motion.div>
            ))}
          </div>
        </form>
      </div>

      {/* Features Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Advanced Plagiarism Detection Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Deep Web Scanning
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our AI scans billions of web pages, academic papers, and published
              content to detect potential plagiarism with high accuracy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Academic Integrity
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Ensure academic integrity with thorough plagiarism detection that
              identifies paraphrased content and citation issues.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Instant Results
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Get comprehensive plagiarism reports in seconds. Detailed analysis
              with similarity percentages and source identification.
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          How Our Plagiarism Checker Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Upload Your Text
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Copy and paste your document, essay, or article into our
              plagiarism checker. We support various text formats and file
              types.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              AI Analysis
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our advanced AI algorithms scan your text against billions of
              sources including web pages, academic databases, and published
              materials.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Get Detailed Report
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive a comprehensive plagiarism report with similarity
              percentages, source identification, and suggestions for
              improvement.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Plagiarism Checker FAQ
        </h2>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  How accurate is the plagiarism detection?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our AI-powered plagiarism checker has high accuracy rates and
                  can detect various forms of plagiarism including direct
                  copying, paraphrasing, and mosaic plagiarism with advanced
                  pattern recognition.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  What sources does the checker scan against?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our tool scans against billions of web pages, academic papers,
                  journals, books, and other published content to provide
                  comprehensive plagiarism detection coverage across multiple
                  databases.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Is my document stored or shared after checking?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  No, we prioritize your privacy and confidentiality. Your
                  documents are processed securely and are not stored on our
                  servers or shared with third parties after the plagiarism
                  check is complete.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Can I use this for academic papers and essays?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Absolutely! Our plagiarism checker is perfect for students,
                  researchers, and academics. It helps ensure academic integrity
                  and identifies areas that need proper citation or rephrasing.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
