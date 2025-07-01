import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q || "";
  await dbConnect();
  const articles = await Article.find({ title: { $regex: query, $options: "i" } }).lean();

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      <ul className="space-y-4">
        {articles.map((article: any) => (
          <li key={article._id}>
            <Link
              href={`/article/${article.slug}`}
              className="text-blue-500 underline hover:text-blue-700"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
