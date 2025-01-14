// app/api/generate/route.ts
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { generateResponse } from "@/lib/googleAIService";
import dbConnect from "@/lib/mongoose";

import GeneratedResponseModel from "@/models/GeneratedResponse";

import { NextResponse } from "next/server";

// Initialize the model

export async function POST(req: Request) {
  try {
    await dbConnect(); // Ensure DB connection
    const { prompt, tool } = await req.json();

    // Generate the response
    const generatedResponse = await generateResponse(prompt);

    // Check if the generatedResponse is null
    if (!generatedResponse) {
      return NextResponse.json(
        { error: "Failed to generate a response." },
        { status: 500 }
      );
    }

    const { response: aiResponse, responseRaw } = generatedResponse;

    // Save to MongoDB
    const savedResponse = await GeneratedResponseModel.create({
      prompt,
      tool,
      response: aiResponse,
      responseRaw,
    });

    return NextResponse.json(savedResponse.response, { status: 201 });
  } catch (error: any) {
    console.error("Error generating response:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
