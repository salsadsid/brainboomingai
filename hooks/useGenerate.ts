"use client";

import { useCallback, useState } from "react";

export function useGenerate(): [
  (args: { prompt: string; tool: string }) => Promise<string>,
  { isLoading: boolean },
] {
  const [isLoading, setIsLoading] = useState(false);

  const trigger = useCallback(
    async ({ prompt, tool }: { prompt: string; tool: string }) => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, tool }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to generate a response.");
        }

        return data as string;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return [trigger, { isLoading }];
}
