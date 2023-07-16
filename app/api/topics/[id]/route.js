import connectDB from "@/db/connect";
import Topic from "@/models/topics";
import { NextResponse } from "next/server";

// update topic
export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  // console.log(title, description);
  await connectDB();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
}

// get single topic
export async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
