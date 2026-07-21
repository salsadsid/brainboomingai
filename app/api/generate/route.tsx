import { auth } from "@/auth";
import { generateResponse, UpstreamBusyError } from "@/lib/googleAIService";
import { logger } from "@/lib/logger";
import dbConnect from "@/lib/mongoose";
import { parseToolResult } from "@/lib/parseToolResult";
import { buildPrompt, isValidTool } from "@/lib/prompts";
import { TOOL_RESPONSE_SCHEMAS } from "@/lib/toolSchemas";
import { rateLimit } from "@/lib/rateLimit";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import UserActivity from "@/models/UserActivity";
import { NextResponse } from "next/server";

/**
 * Matches MAX_INPUT_LENGTH in components/tools/TextToolForm.tsx. The old limit
 * was 50,000 — ten times anything the UI can produce, which only ever widened
 * the window for someone calling this endpoint directly.
 */
const MAX_TEXT_LENGTH = 5_000;

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

    // Only the user's text is accepted. Any `prompt` field a caller supplies is
    // ignored: the instruction is chosen here, by tool, so this endpoint cannot
    // be used as a general-purpose LLM proxy on the project's API key.
    const { text, tool } = body as { text?: unknown; tool?: unknown };

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Text is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        {
          error: `Text must be ${MAX_TEXT_LENGTH.toLocaleString()} characters or fewer.`,
        },
        { status: 400 }
      );
    }

    if (!isValidTool(tool)) {
      return NextResponse.json(
        { error: "Invalid or missing tool identifier." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(tool, text);

    // Generate the response, asking for JSON shaped to this tool.
    const generatedResponse = await generateResponse(prompt, {
      schema: TOOL_RESPONSE_SCHEMAS[tool],
    });

    const { response: aiResponse, responseRaw } = generatedResponse;

    // Validated here rather than in the browser: the client should never have
    // to reason about malformed model output. Anything unparseable degrades to
    // plain text instead of failing the request.
    const payload = parseToolResult(tool, aiResponse);

    // Save to MongoDB — the raw string, as before, so history stays readable
    // whichever format the response took.
    await GeneratedResponseModel.create({
      prompt,
      text,
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

    return NextResponse.json(payload, { status: 201 });
  } catch (error: unknown) {
    logger.error("Error generating response", error);

    // Never return the provider's own error text. It was being echoed verbatim,
    // which put raw Google JSON (model name, quota details, internal status) in
    // front of users and told them nothing actionable.
    if (error instanceof UpstreamBusyError) {
      return NextResponse.json(
        {
          error:
            "Our AI provider is busy right now. Please wait a moment and try again.",
          retryable: true,
        },
        { status: 503, headers: { "Retry-After": "5" } }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate a response. Please try again." },
      { status: 500 }
    );
  }
}
