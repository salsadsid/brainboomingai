"use client";

import type { GeneratePayload } from "@/lib/toolResults";
import { useCallback, useState } from "react";

/**
 * An error the API reported, carrying a message that is already safe and
 * useful to show a user. Distinguishes those from network/parse failures,
 * where the raw message ("Failed to fetch") is worse than a tool's own copy.
 */
export class GenerateError extends Error {
  constructor(
    message: string,
    readonly retryable = false,
  ) {
    super(message);
    this.name = "GenerateError";
  }
}

/**
 * Sends the user's raw text — never a prompt.
 *
 * The instruction lives server-side in lib/prompts.ts and is selected by
 * `tool`. Building it here previously meant /api/generate accepted any prompt
 * at all, i.e. it was an open proxy to the project's Gemini key.
 */
export function useGenerate(): [
  (args: { text: string; tool: string }) => Promise<GeneratePayload>,
  { isLoading: boolean },
] {
  const [isLoading, setIsLoading] = useState(false);

  const trigger = useCallback(
    async ({ text, tool }: { text: string; tool: string }) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, tool }),
        });

        // A gateway or proxy can fail before our route runs, in which case the
        // body is HTML and res.json() throws something unhelpful.
        let data: unknown;
        try {
          data = await res.json();
        } catch {
          throw new GenerateError(
            "Something went wrong reaching the server. Please try again.",
            res.status >= 500,
          );
        }

        if (!res.ok) {
          const body = data as { error?: string; retryable?: boolean };
          throw new GenerateError(
            body?.error || "Failed to generate a response.",
            body?.retryable === true || res.status === 503,
          );
        }

        return data as GeneratePayload;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return [trigger, { isLoading }];
}
