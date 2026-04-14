import { GoogleGenAI } from "@google/genai";

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (client) return client;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("API key for Google GenerativeAI is not set.");
  }
  client = new GoogleGenAI({ apiKey });
  return client;
}

export async function generateResponse(
  prompt: string,
): Promise<{ response: string; responseRaw: Record<string, unknown> }> {
  const result = await getClient().models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: { maxOutputTokens: 2048 },
  });

  const text = result.text;

  if (!text?.trim()) {
    throw new Error("No valid content returned from the API.");
  }

  return {
    response: text.trim(),
    responseRaw: result as unknown as Record<string, unknown>,
  };
}
