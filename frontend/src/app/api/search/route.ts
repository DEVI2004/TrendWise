

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET(request: Request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    // If no query → return all articles
    const allArticles = await Article.find({}, "title slug").lean();
    return NextResponse.json(allArticles);
  }

  // If query exists → return filtered articles
  const filteredArticles = await Article.find(
    { title: { $regex: query, $options: "i" } }, // Case-insensitive title match
    "title slug"
  ).lean();

  return NextResponse.json(filteredArticles);
}
