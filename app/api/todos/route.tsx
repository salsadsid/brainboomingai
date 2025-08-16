import dbConnect from "@/lib/mongoose";
import Todo from "@/models/Todos";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || !description) {
      return NextResponse.json(
        { message: "Title and description are required." },
        { status: 400 }
      );
    }

    const newTodo = await Todo.create({ title, description });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Server error.", error: error.message },
        { status: 500 }
      );
    }
    // Handle non-Error cases (e.g., string, number, etc.)
    return NextResponse.json(
      { message: "An unexpected error occurred.", error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 }); // Sort by newest first
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
