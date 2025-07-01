import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export async function GET() {
  await dbConnect();
  const articles = await Article.find().lean();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";  // Change to your production domain later

  const urls = articles
    .map((article) => {
      return `<url>
        <loc>${baseUrl}/article/${article.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`;
    })
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
