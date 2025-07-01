import { notFound } from "next/navigation";

interface Article {
  _id: string;
  title: string;
  slug: string;
  meta: string;
  content: string;
  media: string[];
}

async function getArticle(slug: string): Promise<Article | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/article/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) return notFound();

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-600 mb-6">{article.meta}</p>
      <article dangerouslySetInnerHTML={{ __html: article.content }}></article>
    </main>
  );
}
