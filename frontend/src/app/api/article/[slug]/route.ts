import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();

  const article = await Article.findOne({ slug: params.slug });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}
