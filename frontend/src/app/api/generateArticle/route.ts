import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export async function POST() {
  try {
    // ✅ MongoDB Connect
    await dbConnect();
    console.log("✅ MongoDB Connected");

    // ✅ Gemini API init
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Write an SEO optimized article about the latest tech trends in AI with H1, H2, and meta description.`;

    console.log("✅ Sending prompt to Gemini...");

    const result = await model.generateContent(prompt);

    console.log("✅ Gemini Response Received");

    const response = result.response;
    const content = response.text();

    if (!content || content.length < 10) {
      console.error("❌ Gemini returned empty content");
      return NextResponse.json({ success: false, error: "Empty content from Gemini" }, { status: 500 });
    }

    // ✅ Save Article
    const newArticle = new Article({
      title: "Latest AI Trends",
      slug: "latest-ai-trends",
      meta: "An article about the latest AI technology trends",
      media: [],
      content: content,
    });

    await newArticle.save();
    console.log("✅ Article saved to MongoDB");

    return NextResponse.json({ success: true, article: newArticle });

  } catch (error: any) {
    console.error("❌ Generate Article Error:", error.message, error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
