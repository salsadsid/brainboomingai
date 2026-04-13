import crypto from "crypto";
import { NextResponse } from "next/server";

const MAX_INPUT_LENGTH = 10_000;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { text } = body as { text?: unknown };

  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { error: "Text is required and must be a string." },
      { status: 400 }
    );
  }

  if (text.length > MAX_INPUT_LENGTH) {
    return NextResponse.json(
      { error: `Text must be ${MAX_INPUT_LENGTH.toLocaleString()} characters or fewer.` },
      { status: 400 }
    );
  }

  const hash = crypto.createHash("md5").update(text).digest("hex");
  return NextResponse.json({ text, md5: hash });
}
