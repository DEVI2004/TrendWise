import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const comment = await Comment.create(body);
  return NextResponse.json(comment, { status: 201 });
}

export async function GET(req: Request) {
  await dbConnect();
  const url = new URL(req.url);
  const articleSlug = url.searchParams.get("articleSlug");

  if (!articleSlug) {
    return NextResponse.json({ error: "Missing articleSlug" }, { status: 400 });
  }

  const comments = await Comment.find({ articleSlug }).sort({ createdAt: -1 });
  return NextResponse.json(comments, { status: 200 });
}
