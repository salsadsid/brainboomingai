import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const hash = crypto.createHash("md5").update(text).digest("hex");
  return NextResponse.json({ text, md5: hash });
}
