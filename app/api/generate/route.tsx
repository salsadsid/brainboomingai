import { generateResponse } from "@/lib/googleAIService";
import dbConnect from "@/lib/mongoose";
import { rateLimit } from "@/lib/rateLimit";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    if (!(await rateLimit(ip)).success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    const { prompt, tool } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    // Generate the response
    const generatedResponse = await generateResponse(prompt);

    const { response: aiResponse, responseRaw } = generatedResponse;

    // Save to MongoDB
    const savedResponse = await GeneratedResponseModel.create({
      prompt,
      tool,
      response: aiResponse,
      responseRaw,
    });

    return NextResponse.json(savedResponse.response, { status: 201 });
  } catch (error: unknown) {
    console.error("Error generating response:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate a response.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
