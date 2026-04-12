import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { AIMessage } from "@langchain/core/messages";
import type { MessageContentComplex } from "@langchain/core/messages";

let model: ChatGoogleGenerativeAI | null = null;

function getModel(): ChatGoogleGenerativeAI {
  if (model) return model;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("API key for Google GenerativeAI is not set.");
  }
  model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    maxOutputTokens: 2048,
    apiKey,
  });
  return model;
}

export async function generateResponse(
  prompt: string
): Promise<{ response: string; responseRaw: AIMessage }> {
  const response = await getModel().invoke(prompt);

  // If content is an array, handle it accordingly
  if (Array.isArray(response.content)) {
    const combinedContent = response.content
      .map((msg: MessageContentComplex) => ("text" in msg ? msg.text : ""))
      .join(" ");
    if (!combinedContent.trim()) {
      throw new Error("No valid content returned from the API.");
    }
    return { response: combinedContent.trim(), responseRaw: response };
  }

  if (!response?.content || typeof response.content !== "string") {
    throw new Error("No valid content returned from the API.");
  }

  return { response: response.content, responseRaw: response };
}
