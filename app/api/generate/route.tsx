import { auth } from "@/auth";
import { generateResponse } from "@/lib/googleAIService";
import { logger } from "@/lib/logger";
import dbConnect from "@/lib/mongoose";
import { rateLimit } from "@/lib/rateLimit";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import UserActivity from "@/models/UserActivity";
import { NextResponse } from "next/server";

const MAX_PROMPT_LENGTH = 50_000;

const VALID_TOOLS = new Set([
  "free-ai-to-human",
  "free-grammar-checker",
  "free-image-to-text",
  "free-originality-analyzer",
  "free-paraphrasing-tool",
  "free-spell-checker",
  "free-text-summarizer",
  "prompt-generator",
]);

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

    const session = await auth();
    const userId = session?.user?.id ?? null;

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { prompt, tool } = body as { prompt?: unknown; tool?: unknown };

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required and must be a string." },
        { status: 400 }
      );
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { error: `Prompt must be ${MAX_PROMPT_LENGTH.toLocaleString()} characters or fewer.` },
        { status: 400 }
      );
    }

    if (!tool || typeof tool !== "string" || !VALID_TOOLS.has(tool)) {
      return NextResponse.json(
        { error: "Invalid or missing tool identifier." },
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
      userId,
    });

    // Track activity for logged-in users
    if (userId) {
      UserActivity.create({
        userId,
        action: "tool_use",
        tool,
        metadata: { promptLength: prompt.length },
        ip,
      }).catch((err: unknown) => logger.error("Activity tracking error", err, { userId, tool }));
    }

    return NextResponse.json(savedResponse.response, { status: 201 });
  } catch (error: unknown) {
    logger.error("Error generating response", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate a response.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
