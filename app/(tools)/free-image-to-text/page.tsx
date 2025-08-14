"use client";
/* eslint-disable no-unused-expressions */
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerateResponseMutation } from "@/redux/api/promptApi";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { useEffect, useState } from "react";
import { ImageUploader } from "./components/ImageUploader";
import { free_image_to_text_prompt } from "./prompt";

export default function AiToHumanConverter() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageToText, setImageToText] = useState<string>("");
  const [generateResponse, { isLoading, data, error }] =
    useGenerateResponseMutation();
  useEffect(() => {
    if (imageToText) {
      const handleGenerateResponse = async () => {
        setLoading(true);
        setResponse(null);
        const modifiedPrompt = free_image_to_text_prompt(imageToText);
        try {
          const result = await generateResponse({
            prompt: modifiedPrompt,
            tool: "free-image-to-text",
          }).unwrap();
          setResponse(result ?? "No response received.");
        } catch (err) {
          console.error("Error generating response:", err);
        } finally {
          setLoading(false);
        }
      };
      handleGenerateResponse();
    }
  }, [imageToText, generateResponse]);

  return (
    <section className="max-w-4xl flex flex-col gap-10 justify-center mx-auto py-16">
      <article>
        <h1 className="text-2xl font-mono text-gray-800 font-bold my-4 text-center md:text-7xl">
          Image to Text
        </h1>
        <p className="text-lg text-gray-500 my-4 text-center">
          Take your AI-generated text and turn it into something that reads like
          it was written by a human. Just copy and paste your text into our
          converter and watch it transform in seconds.
        </p>
      </article>
      <article className="">
        <ImageUploader
          imageToText={imageToText}
          setImageToText={setImageToText}
        />
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

              {/* Display mistakes count */}
            </p>
            <p
              className="text-gray-800 text-lg mt-4 space-y-3"
              dangerouslySetInnerHTML={{
                __html: response,
              }} // Corrected paragraph
            ></p>
          </div>
        )}
      </article>
    </section>
  );
}
