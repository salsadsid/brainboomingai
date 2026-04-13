import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { logger } from "@/lib/logger";

import dbConnect from "@/lib/mongoose";
import { rateLimit } from "@/lib/rateLimit";
import User from "@/models/User";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

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

    const body = await req.json();
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      const message = validation.error.issues
        .map((i) => i.message)
        .join(", ");
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, password } = validation.data;

    const existingUser = await User.findOne({ email }).lean();
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isActive: true,
    });

    return NextResponse.json(
      { message: "Account created successfully. Please sign in." },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Registration error", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
