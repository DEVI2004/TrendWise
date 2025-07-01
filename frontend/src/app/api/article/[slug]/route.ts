

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET(req: NextRequest) {
  await dbConnect();

  // Extract slug from URL
  const slug = req.nextUrl.pathname.split("/").pop();

  if (!slug) {
    return NextResponse.json({ error: "Slug not provided" }, { status: 400 });
  }

  const article = await Article.findOne({ slug }).lean();

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}
