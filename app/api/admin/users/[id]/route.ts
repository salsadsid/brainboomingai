import { auth } from "@/auth";
import { logger } from "@/lib/logger";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    await dbConnect();

    const user = await User.findByIdAndUpdate(
      id,
      { isActive: body.isActive },
      { new: true }
    )
      .select("name email role isActive")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    logger.error("Admin update user error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
