"use client";
import { AutosizeTextarea } from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerateResponseMutation } from "@/redux/api/promptApi";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { Clipboard, ClipboardCheck, RotateCw } from "lucide-react";
import { useState } from "react";
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

export default function AiToHumanConverter() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generateResponse, { isLoading }] = useGenerateResponseMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse(null);

    try {
      const validation = schema.safeParse({ content: prompt });
      if (!validation.success) {
        validation.error.issues.forEach((issue) => toast.error(issue.message));
        return;
      }

      const modifiedPrompt = free_grammer_checker_prompt(prompt);
      const result = await generateResponse({
        prompt: modifiedPrompt,
        tool: "free-grammer-checker",
      }).unwrap();

      setResponse(result ?? "No response received.");
      toast.success("Analysis complete!");
    } catch (err) {
      console.error("Error generating response:", err);
      toast.error("Failed to analyze text. Please try again.");
    }
  };

  const copyToClipboard = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(parseCorrectedParagraph(response));
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <section className="max-w-4xl flex flex-col gap-10 justify-center mx-auto py-16 ">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          className:
            "dark:bg-slate-800 dark:text-white dark:border dark:border-slate-700",
        }}
      />

      <article>
        <h1 className="text-2xl font-mono text-gray-800 font-bold my-4 text-center md:text-7xl dark:text-white">
          Free Grammar Checker
        </h1>
        <p className="text-lg text-gray-500 my-4 text-center dark:text-slate-400">
          Perfect your writing with AI-powered grammar checking. Get instant
          feedback on grammatical errors and improve your text with smart
          suggestions.
        </p>
      </article>

      <article className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl w-full bg-white md:min-w-[700px] px-1.5"
        >
          <div className="relative">
            <AutosizeTextarea
              placeholder="Paste your text here for grammar analysis..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              minHeight={100}
              maxHeight={300}
              className="text-base dark:bg-slate-800 dark:ring-slate-700 dark:text-white dark:placeholder:text-slate-400"
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded dark:bg-slate-800/80 dark:text-slate-400">
              {prompt.length}/{MAX_INPUT_LENGTH}
            </div>
          </div>

          <div className="flex gap-4 mt-6 items-center flex-col sm:flex-row">
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-lg border border-solid border-transparent transition-colors 
                flex items-center justify-center bg-blue-600 hover:bg-blue-700 font-medium 
                text-white gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5
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
          </div>

          {isLoading && (
            <div className="flex flex-col mt-6 space-y-3">
              <Skeleton className="w-full h-40 rounded-xl dark:bg-slate-800" />
            </div>
          )}

          {response && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg dark:bg-slate-800 dark:border dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 text-gray-500 dark:text-slate-400">
                  <span>{characterCount(response)} chars</span>
                  <span className="font-bold">·</span>
                  <span>{wordCount(response)} words</span>
                  <span className="font-bold">·</span>
                  <span>{parseMistakeCount(response)} issues found</span>
                </div>
                <Button
                  onClick={copyToClipboard}
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="text-gray-600 hover:bg-gray-50 dark:text-slate-400 dark:hover:bg-slate-700/50"
                >
                  {copied ? (
                    <ClipboardCheck className="w-4 h-4" />
                  ) : (
                    <Clipboard className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div
                className="prose text-gray-800 dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: parseCorrectedParagraph(response),
                }}
              />
            </div>
          )}
        </form>
      </article>
    </section>
  );
}
