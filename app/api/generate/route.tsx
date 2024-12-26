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
    const { prompt } = await req.json();

    console.log(prompt);
    // Generate the response
    const aiResponse = await generateResponse(prompt);

    // Save to MongoDB
    const savedResponse = await GeneratedResponseModel.create({
      prompt,
      response: aiResponse,
    });

    // Calculate word frequencies from the prompt
    // const wordFrequencies = calculateWordFrequency(prompt);

    // // Save word frequencies to the database
    // const wordFrequencyEntries = Object.entries(wordFrequencies).map(
    //   ([word, frequency]) => ({
    //     word,
    //     frequency,
    //     prompt,
    //   })
    // );

    // await WordFrequencyModel.insertMany(wordFrequencyEntries);

    return NextResponse.json(savedResponse, { status: 201 });
  } catch (error: any) {
    console.error("Error generating response:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
