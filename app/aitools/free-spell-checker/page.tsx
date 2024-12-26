"use client";
import { AutosizeTextarea } from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerateResponseMutation } from "@/redux/api/promptApi";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { useState } from "react";
import { free_grammer_checker_prompt } from "./prompt";
import { parseCorrectedParagraph, parseMistakeCount } from "./utils";

export default function AiToHumanConverter() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generateResponse, { isLoading, data, error }] =
    useGenerateResponseMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setResponse(null);
    // Generate the response from the AI
    if (!prompt.trim()) return;
    setLoading(true);

    const modifiedPrompt = free_grammer_checker_prompt(prompt);

    try {
      const result = await generateResponse(modifiedPrompt).unwrap();
      // console.log(result, "RESULT");
      setResponse(result.response ?? "No response received.");
      setLoading(false);
    } catch (err) {
      console.error("Error generating response:", err);
    }
    // console.log(result, "RESULT");
    // // Handle the response: if it's null or undefined, set a default message
    // setResponse(result ?? "No response received.");
    // setLoading(false);
  };

  return (
    <section className="max-w-4xl flex flex-col gap-10 justify-center mx-auto py-16">
      <article>
        <h1 className="text-2xl font-mono text-gray-800 font-bold my-4 text-center md:text-7xl">
          Free Spell Checker
        </h1>
        <p className="text-lg text-gray-500 my-4 text-center">
          Take your AI-generated text and turn it into something that reads like
          it was written by a human. Just copy and paste your text into our
          converter and watch it transform in seconds.
        </p>
      </article>
      <article className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl w-full md:min-w-[700px] px-1.5"
        >
          <AutosizeTextarea
            placeholder="Paste your AI-generated text here."
            name="message"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            minHeight={100}
            maxHeight={300}
            className="text-base"
          />

          <div className="flex gap-4 mt-6 items-center flex-col sm:flex-row">
            <Button
              type="submit"
              disabled={loading || isLoading}
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground font-medium text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              {loading || isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>

          {loading || isLoading ? (
            <div className="flex flex-col mt-6 space-y-3">
              <Skeleton className="w-full h-40 rounded-xl" />
            </div>
          ) : null}

          {response && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="flex gap-2 text-gray-500">
                <span>{characterCount(response)} characters</span>
                <span className="font-bold">&#183;</span>
                <span>{wordCount(response)} words</span>
                <span className="font-bold">&#183;</span>
                <span>
                  {parseMistakeCount(response)} Spelling Mistakes
                </span>{" "}
                {/* Display mistakes count */}
              </p>
              <p
                className="text-gray-800 text-lg mt-4 space-y-3"
                dangerouslySetInnerHTML={{
                  __html: parseCorrectedParagraph(response),
                }} // Corrected paragraph
              ></p>
            </div>
          )}
        </form>
      </article>
    </section>
  );
}
