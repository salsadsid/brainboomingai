"use client";
import { AutosizeTextarea } from "@/components/ui/autotextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Md5Generator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  async function generateMD5(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    try {
      const response = await fetch("/api/md5", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      setHash(data.md5);
    } catch (error) {
      console.error("Error generating MD5:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-4xl flex flex-col gap-10 justify-center mx-auto py-16">
      <article>
        <h1 className="text-2xl font-mono text-gray-800 font-bold my-4 text-center md:text-7xl">
          MD5 Generator
        </h1>
        <p className="text-lg text-gray-500 my-4 text-center">
          This is an easy to use tool that enables you to generate the MD5 hash
          of a string. In order to use the tool, enter the text you want to
          convert to MD5 below and click on ‘Generate’ button.
        </p>
      </article>
      <article className="flex justify-center items-center">
        <form
          onSubmit={generateMD5}
          className="max-w-2xl w-full md:min-w-[700px] px-1.5"
        >
          <AutosizeTextarea
            placeholder="Enter text to convert to MD5"
            name="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            minHeight={100}
            maxHeight={300}
            className="text-base"
          />

          <div className="flex gap-4 mt-6 items-center flex-col sm:flex-row">
            <Button
              type="submit"
              disabled={loading}
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground font-medium text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              {loading ? "Loading..." : "Generate"}
            </Button>
          </div>

          {loading ? (
            <div className="flex flex-col mt-6 space-y-3">
              <Skeleton className="w-full h-40 rounded-xl" />
            </div>
          ) : null}

          {hash && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="flex gap-2 text-gray-500">{hash}</p>
            </div>
          )}
        </form>
      </article>
    </section>
  );
}
