
import { generateResponse } from "@/lib/googleAIService";
import getRandomAIWord from "@/utils/aiWords";

export async function generatePrompt(input: string): Promise<string> {
  try {
    const prompt = `Generate a detailed and creative prompt based on this description: ${input}. 
    Make it engaging and specific, suitable for ${getRandomAIWord()}. 
    The prompt should be well-structured and clear.`;

    const response = await generateResponse(prompt);
    if (!response) return "Could not generate a prompt. Please try again.";
    return response.response;
  } catch (error) {
    console.error("Error in prompt generation:", error);
    throw new Error("Failed to generate prompt");
  }
}
