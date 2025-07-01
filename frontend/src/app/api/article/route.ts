// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";


// GET all articles
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const articles = await Article.find().sort({ _id: -1 });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST new article
// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect();
//     const body = await request.json();

//     const newArticle = await Article.create({
//       title: body.title,
//       slug: body.slug,
//       meta: body.meta,
//       content: body.content,
//       media: body.media || [],
//     });

//     return NextResponse.json(newArticle);
//   } catch (error) {
//     console.error("Error creating article:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const article = new Article(body);
    await article.save();
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
