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
  RefreshCw,
  RotateCw,
  Shield,
  Shuffle,
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
    .min(10, "Input cannot be empty or too short")
    .max(MAX_INPUT_LENGTH, `Input exceeds ${MAX_INPUT_LENGTH} character limit`),
});

export default function ParaphrasingTool() {
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
          tool: "free-paraphrasing-tool",
        }).unwrap();

        setOutputs((prev) => [
          result || "Could not paraphrase text. Please try again.",
          ...prev,
        ]);
        toast.success("Text paraphrased successfully!");
      } catch (err) {
        console.error("Paraphrasing error:", err);
        toast.error("Failed to paraphrase text. Please try again.");
      }
    },
    [input, generateResponse]
  );

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Copied to clipboard");
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
                placeholder="Paste your text here to paraphrase it..."
                minHeight={180}
                maxHeight={400}
                maxLength={MAX_INPUT_LENGTH}
                className="w-full ring-2 ring-slate-200 dark:ring-slate-600 focus:ring-orange-500 dark:focus:ring-orange-400 
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
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
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
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 
                text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
                transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <RotateCw className="w-5 h-5 animate-spin" />
                  Paraphrasing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <RefreshCw className="w-5 h-5" />
                  Paraphrase Text
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
                  hover:border-orange-300 dark:hover:border-orange-600 text-slate-700 dark:text-slate-300 
                  font-semibold py-4 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Regenerate
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
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                      {wordCount(output)} words · {characterCount(output)} chars
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
          Advanced Paraphrasing Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Multiple Variations
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Generate multiple unique paraphrased versions of your text while
              maintaining the original meaning and context. Perfect for avoiding
              repetition.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Instant Results
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Get paraphrased content instantly with our AI-powered technology.
              Save time while maintaining quality and readability of your text.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Plagiarism-Free
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Create original content that passes plagiarism checks while
              preserving the core message and meaning of your original text.
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          How Our Paraphrasing Tool Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Paste Your Text
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Simply paste or type the text you want to paraphrase. Our tool
              accepts content of any length and from various sources.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              AI Processing
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our advanced AI analyzes your text and rewrites it using different
              words and sentence structures while preserving the original
              meaning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Get Paraphrased Text
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive your paraphrased text instantly. Copy the result or
              generate additional variations for more options.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Paraphrasing Tool FAQ
        </h2>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  What is paraphrasing and why is it useful?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Paraphrasing is rewriting text using different words while
                  maintaining the same meaning. It&apos;s useful for avoiding
                  plagiarism, improving readability, creating unique content,
                  and adapting text for different audiences or purposes.
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
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Does the paraphrasing tool maintain the original meaning?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes, our AI-powered paraphrasing tool is designed to preserve
                  the original meaning and context while changing the wording
                  and sentence structure. However, we recommend reviewing the
                  output to ensure it meets your specific requirements.
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
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Can I paraphrase content for academic or professional use?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes, our paraphrasing tool is suitable for academic papers,
                  professional documents, and business content. However, always
                  ensure proper citation when using sources and follow your
                  institution&apos;s or organization&apos;s guidelines.
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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  How many times can I use the paraphrasing tool?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  There&apos;s no limit to how many times you can use our free
                  paraphrasing tool. You can paraphrase as much content as you
                  need and generate multiple variations of the same text to find
                  the perfect version for your needs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
