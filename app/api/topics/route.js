import connectDB from "@/db/connect";
import Topic from "@/models/topics";
import { NextResponse } from "next/server";

// POST method || create
export async function POST(request) {
  const { title, description } = await request.json();
  await connectDB();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });

  //   const createTopic = await Topic.create({ title, description });
  //   return NextResponse.json(createTopic, { status: 201 }); this works
}

// GET method || read
export async function GET() {
  await connectDB();
  const topics = await Topic.find();
  return NextResponse.json({ topics }, { status: 200 });
}

// DELETE method || delete
export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await connectDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
