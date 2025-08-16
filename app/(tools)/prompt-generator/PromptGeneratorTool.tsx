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
  Shield,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { FormEvent, useCallback, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

const MAX_INPUT_LENGTH = 5000;
const schema = z.object({
  content: z
    .string()
    .min(10, "Input cannot be empty or too short")
    .max(MAX_INPUT_LENGTH, `Input exceeds ${MAX_INPUT_LENGTH} character limit`),
});

export default function PromptGeneratorTool() {
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

        const prompt = `Generate a detailed and creative prompt based on this description: ${input}. Make it engaging and specific. The prompt should be well-structured and clear.`;
        const result = await generateResponse({
          prompt,
          tool: "prompt-generator",
        }).unwrap();

        setOutputs((prev) => [
          result.response || "Could not generate a prompt. Please try again.",
          ...prev,
        ]);
        toast.success("Prompt generated successfully!");
      } catch (err) {
        console.error("Generation error:", err);
        toast.error("Failed to generate prompt. Please try again.");
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
                placeholder="Describe what kind of prompt you want to generate..."
                minHeight={180}
                maxHeight={400}
                maxLength={MAX_INPUT_LENGTH}
                className="w-full ring-2 ring-slate-200 dark:ring-slate-600 focus:ring-blue-500 dark:focus:ring-blue-400 
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
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 
                text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
                transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <RotateCw className="w-5 h-5 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Generate Prompt
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
                  hover:border-purple-300 dark:hover:border-purple-600 text-slate-700 dark:text-slate-300 
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
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
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
          Why Choose Our AI Prompt Generator?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Tailored Prompts
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Generate highly specific and customized prompts based on your
              exact requirements. Our AI understands context and creates prompts
              that match your intended purpose.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              Instant Generation
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Get creative and engaging prompts in seconds. No more writer's
              block or struggling to find the right words to express your ideas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              100% Free & Secure
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Completely free to use with no registration required. Your data is
              processed securely and we don't store your prompts or personal
              information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          How Our Prompt Generator Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Describe Your Needs
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Simply describe what kind of prompt you need. Be as specific or
              general as you want - our AI adapts to your requirements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              AI Processing
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our advanced AI analyzes your description and generates creative,
              well-structured prompts that match your specific requirements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Get Your Prompt
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive your custom-generated prompt instantly. Copy it to use for
              writing, brainstorming, or any creative project you have in mind.
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  What types of prompts can I generate?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  You can generate prompts for any purpose: creative writing,
                  academic essays, business content, social media posts, art
                  descriptions, conversation starters, and much more. Our AI
                  adapts to your specific needs.
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  How detailed should my description be?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  The more specific you are, the better the generated prompt
                  will be. Include details about the topic, tone, length,
                  audience, and purpose to get the most relevant results.
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
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Can I generate multiple prompts from the same description?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yes! You can use the "Regenerate" button to create different
                  variations of prompts based on the same description. Each
                  generation will provide a unique perspective.
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
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Is there a limit to how many prompts I can generate?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  No, there's no limit! You can generate as many prompts as you
                  need. Our service is completely free and designed to support
                  your creative process without restrictions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
