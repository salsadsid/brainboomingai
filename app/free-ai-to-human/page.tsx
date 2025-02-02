"use client";
/* eslint-disable no-unused-expressions */
import { AutosizeTextarea } from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useGenerateResponseMutation } from "@/redux/api/promptApi";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { FileWarning } from "lucide-react";
import { useState } from "react";
import { free_ai_human_prompt } from "./prompt";

export default function AiToHumanConverter() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generateResponse, { isLoading, error }] =
    useGenerateResponseMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setResponse(null);
    // Generate the response from the AI
    if (!prompt.trim()) return;
    setLoading(true);

    const modifiedPrompt = free_ai_human_prompt(prompt);

    try {
      const result = await generateResponse({
        prompt: modifiedPrompt,
        tool: "free-ai-to-human",
      }).unwrap();
      setResponse(result ?? "No response received.");
      setLoading(false);
    } catch (err) {
      console.error("Error generating response:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl flex flex-col gap-10 justify-center mx-auto py-10 sm:py-16">
      <article>
        <h1 className="text-2xl font-mono text-gray-800 font-bold my-4 text-center md:text-6xl">
          AI to Human Text Converter
        </h1>
        <p className="sm:block hidden text-gray-500 my-4 text-center">
          Take your AI-generated text and turn it into something that reads like
          it was written by a human. Just copy and paste your text into our
          converter and watch it transform in seconds.
        </p>
      </article>
      <article className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl w-full md:min-w-[700px] sm:px-0 px-3"
        >
          <AutosizeTextarea
            placeholder="Paste your AI-generated text here."
            name="message"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            minHeight={100}
            maxHeight={400}
            className="text-base"
          />

          {prompt && (
            <div className="text-sm text-right my-2  sm:my-1 text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-md inline-block">
                {"Words: " + wordCount(prompt)}
              </span>
            </div>
          )}

          <div
            className={cn(
              "flex gap-4 mt-6 items-center flex-col sm:flex-row",
              prompt && "mt-0"
            )}
          >
            <Button
              type="submit"
              disabled={loading || isLoading}
              className={cn(
                "rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground font-medium text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] w-full sm:w-44 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5",
                loading || isLoading
                  ? "cursor-not-allowed animate-pulse"
                  : "cursor-pointer"
              )}
            >
              {loading || isLoading ? "Generating..." : "Generate"}
            </Button>
          </div>

          {loading || isLoading ? (
            <div className="flex flex-col mt-6 space-y-3">
              <Skeleton className="w-full h-40 rounded-xl" />
            </div>
          ) : null}

          {response && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="flex gap-2 items-center text-gray-500">
                <span>{characterCount(response)} characters</span>{" "}
                <span className="font-bold">&#183;</span>
                <span>{wordCount(response)} words</span>
              </p>
              <p
                className="text-gray-800 text-lg mt-4 space-y-3"
                dangerouslySetInnerHTML={{ __html: response }}
              ></p>
            </div>
          )}
          {error && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="flex gap-2 items-center text-red-500">
                <FileWarning className="w-4 h-4" /> Something went wrong, please
                try again.
              </p>
            </div>
          )}
        </form>
      </article>
    </section>
  );
}
