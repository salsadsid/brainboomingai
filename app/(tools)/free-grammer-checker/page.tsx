"use client";
import { AutosizeTextarea } from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerateResponseMutation } from "@/redux/api/promptApi";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { Clipboard, ClipboardCheck, RotateCw } from "lucide-react";
import { FormEvent, useCallback, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { free_grammer_checker_prompt } from "./prompt";
import { parseCorrectedParagraph, parseMistakeCount } from "./utils";

const MAX_INPUT_LENGTH = 5000;
const schema = z.object({
  content: z
    .string()
    .min(1, "Input cannot be empty")
    .max(MAX_INPUT_LENGTH, `Input exceeds ${MAX_INPUT_LENGTH} character limit`),
});

export default function GrammarChecker() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [generateResponse, { isLoading }] = useGenerateResponseMutation();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const validation = schema.safeParse({ content: input });
        if (!validation.success) {
          validation.error.issues.forEach((issue) =>
            toast.error(issue.message)
          );
          return;
        }

        const modifiedPrompt = free_grammer_checker_prompt(input);
        const result = await generateResponse({
          prompt: modifiedPrompt,
          tool: "free-grammer-checker",
        }).unwrap();

        setOutputs((prev) => [
          result || "Could not analyze text. Please try again.",
          ...prev,
        ]);
        toast.success("Analysis complete!");
      } catch (err) {
        console.error("Analysis error:", err);
        toast.error("Failed to analyze text. Please try again.");
      }
    },
    [input, generateResponse]
  );

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(parseCorrectedParagraph(text));
      setCopiedIndex(index);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const inputStats = `${wordCount(input)} words · ${characterCount(
    input
  )} chars`;
  const isInputValid =
    input.trim().length > 0 && input.length <= MAX_INPUT_LENGTH;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          className:
            "dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700",
        }}
      />

      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-5xl mb-4 dark:text-white">
          Free Grammar Checker
        </h1>
        <p className="text-gray-600 md:text-lg mx-auto max-w-2xl dark:text-slate-400">
          Perfect your writing with AI-powered grammar checking. Get instant
          feedback on grammatical errors and improve your text with smart
          suggestions.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md "
      >
        <div className="space-y-4">
          <div className="relative">
            <AutosizeTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text here for grammar analysis..."
              minHeight={150}
              maxHeight={400}
              maxLength={MAX_INPUT_LENGTH}
              className="ring-1 border border-gray-300 ring-gray-200 focus:ring-2 focus:ring-blue-500 
              rounded-lg p-4 text-base text-black bg-white shadow-sm 
               "
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
              {input.length}/{MAX_INPUT_LENGTH}
            </div>
          </div>

          {input.length > 0 && (
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-slate-400">
              <span>{inputStats}</span>
              {input.length > MAX_INPUT_LENGTH && (
                <span className="text-red-500 flex items-center dark:text-red-400">
                  Exceeds character limit
                </span>
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !isInputValid}
          className="w-full border border-solid border-transparent transition-colors 
            flex items-center justify-center bg-blue-600 hover:bg-blue-700 font-medium 
            text-white gap-2 text-base h-12 px-5
            dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <RotateCw className="w-5 h-5 animate-spin" />
              Analyzing...
            </div>
          ) : (
            "Check Grammar"
          )}
        </Button>

        {isLoading && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-32 bg-slate-200 " />
            <Skeleton className="h-32 w-full bg-slate-200 " />
          </div>
        )}

        <div className="space-y-6">
          {outputs.map((output, index) => (
            <div
              key={index}
              className=" bg-gray-100 rounded-lg p-6 shadow-sm 
              relative  dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500 ">
                  {parseMistakeCount(output)} issues ·{wordCount(output)} words
                  · {characterCount(output)} chars
                </span>
                <Button
                  onClick={() => copyToClipboard(output, index)}
                  size="sm"
                  type="button"
                  className="text-gray-600  "
                >
                  {copiedIndex === index ? (
                    <ClipboardCheck className="w-4 h-4" />
                  ) : (
                    <Clipboard className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div
                className="prose text-gray-800 "
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
          ))}
        </div>
      </form>
    </section>
  );
}
