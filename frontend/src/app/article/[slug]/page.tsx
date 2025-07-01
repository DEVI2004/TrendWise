import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";
import Comment from "@/models/Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import Image from "next/image";
import CommentsList from "@/components/CommentsList";
import CommentForm from "@/components/CommentForm";
import { notFound } from "next/navigation";
import { Metadata } from "next";

//Types
type PageProps = {
  params: {
    slug: string;
  };
};

//SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await dbConnect();
  const article = await Article.findOne({ slug: params.slug }).lean();

  if (!article) {
    return {
      title: "Article Not Found - TrendWise",
      description: "The requested article was not found.",
    };
  }

  return {
    title: article.title,
    description: article.meta,
    openGraph: {
      title: article.title,
      description: article.meta,
      url: `https://your-vercel-site.vercel.app/article/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  await dbConnect();

  const article = await Article.findOne({ slug: params.slug }).lean();
  const session = await getServerSession(authOptions);

  if (!article) {
    return notFound();
  }

  const rawComments = await Comment.find({ articleSlug: params.slug }).lean();
  const comments = rawComments.map((comment) => ({
    ...comment,
    _id: comment._id.toString(),
    createdAt: comment.createdAt.toISOString(),
    updatedAt: comment.updatedAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      {/*Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black shadow-md">
        <Link href="/" className="text-white text-xl font-bold">🏠 Home</Link>
        {session && session.user?.image && (
          <div className="flex items-center space-x-2">
            <Image
              src={session.user.image}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full border-2 border-white"
            />
            <span className="text-white">{session.user.name}</span>
          </div>
        )}
      </nav>

      {/* Article */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h1 className="text-3xl font-bold mb-4 text-red-700">{article.title}</h1>
        <div className="whitespace-pre-line text-gray-800">{article.content}</div>
      </div>

      {/* Comments */}
      <div className="max-w-3xl mx-auto p-6 mt-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <CommentsList comments={comments} />

        {session ? (
          <CommentForm articleSlug={params.slug} user={session.user} />
        ) : (
          <Link
            href="/api/auth/signin"
            className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
          >
            Login to comment
          </Link>
        )}
      </div>
    </main>
  );
}
