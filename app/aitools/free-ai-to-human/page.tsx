"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateResponse } from "@/lib/googleAIService";
import { useState } from "react";

export default function AiToHumanConverter() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setLoading(true);

    // Generate the response from the AI
    const result = await generateResponse(prompt);

    console.log(result, "RESULT");
    // Handle the response: if it's null or undefined, set a default message
    setResponse(result ?? "No response received.");
    setLoading(false);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Textarea
          placeholder="Type your message here."
          name="message"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button
            type="submit"
            disabled={loading}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>

        {response && (
          <p className="mt-4">
            <strong>AI Response:</strong> {response}
          </p>
        )}
      </form>
    </section>
  );
}
