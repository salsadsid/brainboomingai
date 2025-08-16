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
  CheckCircle,
  Clipboard,
  ClipboardCheck,
  FileWarning,
  RotateCw,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { FormEvent, useCallback, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { free_ai_human_prompt } from "./prompt";

const MAX_INPUT_LENGTH = 5000;
const schema = z.object({
  content: z
    .string()
    .min(10, "Input cannot be empty or too short")
    .max(MAX_INPUT_LENGTH, `Input exceeds ${MAX_INPUT_LENGTH} character limit`),
});

export default function AiToHumanConverter() {
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

        const modifiedPrompt = free_ai_human_prompt(input);
        const result = await generateResponse({
          prompt: modifiedPrompt,
          tool: "free-ai-to-human",
        }).unwrap();

        setOutputs((prev) => [
          result || "Could not generate conversion. Please try again.",
          ...prev,
        ]);
        toast.success("Conversion successful!");
      } catch (err) {
        console.error("Conversion error:", err);
        toast.error("Failed to convert text. Please try again.");
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
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          className:
            "dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700",
        }}
      />

      {/* Main Tool Interface */}
      <div className="max-w-4xl mx-auto mb-16">
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
                  placeholder="Paste your AI-generated text here..."
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
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                  text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 
                  transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <RotateCw className="w-5 h-5 animate-spin" />
                    Converting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Convert to Human Text
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
                    hover:border-blue-300 dark:hover:border-blue-600 text-slate-700 dark:text-slate-300 
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
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                        {wordCount(output)} words · {characterCount(output)}{" "}
                        chars
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
      </div>

      {/* SEO Content Sections */}
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Instant Conversion
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Transform AI-generated text to natural, human-like content in
              seconds using advanced language processing.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              100% Free & Secure
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              No registration required. Your text is processed securely and
              never stored on our servers.
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              High Quality Output
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Get natural, human-like text that maintains meaning while
              improving readability and flow.
            </p>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-8">
            How Our AI to Human Text Converter Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Paste Your AI Text
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Simply paste your AI-generated content into our text editor.
                Supports up to 5,000 characters.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                AI Processing
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our advanced AI analyzes your text and transforms it into
                natural, human-like language.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Get Results
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Receive your humanized text instantly. Copy, edit, or regenerate
                as needed.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                What is an AI to Human Text Converter?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                An AI to Human Text Converter is a tool that transforms
                AI-generated content into more natural, human-like text while
                preserving the original meaning and context.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Is this tool completely free?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Yes! Our AI to Human Text Converter is 100% free to use with no
                registration required. You can convert unlimited text without
                any restrictions.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                How accurate is the conversion?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our advanced AI algorithms provide highly accurate conversions,
                maintaining the original meaning while making the text sound
                more natural and human-like.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                What types of content can I convert?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                You can convert any AI-generated text including articles, blog
                posts, emails, social media content, academic papers, and more.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
