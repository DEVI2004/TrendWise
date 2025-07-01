import { notFound } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommentForm from "@/components/CommentForm";
import CommentsList from "@/components/CommentsList";
import { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";
import Comment from "@/models/Comment";
import { useState } from "react";

// type Props = {
//     params: {
//         slug: string;
//     };
// };

// interface ArticleType {
//   title: string;
//   meta: string;
//   slug: string;
//   media: string[];
//   content: string;
// }

// // SEO Metadata for this page (Used for head / meta tags)
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//     await dbConnect();
//     const article = await Article.findOne({ slug: params.slug }).lean();

//     if (!article) {
//         return {
//             title: "Article Not Found - TrendWise",
//             description: "The article you are looking for does not exist.",
//         };
//     }

//     return {
//         title: article.title,
//         description: article.meta,
//         openGraph: {
//             title: article.title,
//             description: article.meta,
//             url: `http://localhost:3000/article/${article.slug}`, // ✅ Later change this to your production domain
//             images: article.media && article.media.length > 0
//                 ? article.media.map((url: string) => ({ url }))
//                 : [{ url: "http://localhost:3000/default-og-image.png" }], // ✅ Default OG image fallback
//         },
//     };
// }

// export default async function ArticlePage({ params }: Props) {
//   await dbConnect();

//   const article = (await Article.findOne({ slug: params.slug }).lean()) as ArticleType | null;

//   if (!article) {
//     return <div>Article not found</div>;
//   }

//   const rawComments = await Comment.find({ articleSlug: params.slug }).lean();

//   // ✅ Serialize comments (for _id and Date fields)
//   const comments = rawComments.map((comment) => ({
//     ...comment,
//     _id: comment._id.toString(),
//     createdAt: comment.createdAt.toISOString(),
//     updatedAt: comment.updatedAt.toISOString(),
//   }));

//   const session = await getServerSession(authOptions);

//   return (
//     <main className="max-w-3xl mx-auto py-8 px-4">
//       <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
//       <div className="mb-6 whitespace-pre-line">{article.content}</div>

//       <h2 className="text-xl font-semibold mb-4">Comments</h2>
//       <CommentsList comments={comments} />

//       {session ? (
//         <CommentForm articleSlug={params.slug} user={session.user} />
//       ) : (
//         <Link href="/api/auth/signin" className="text-blue-500 underline">
//           Login to post a comment
//         </Link>
//       )}
//     </main>
//   );
// }

type Props = {
  params: {
    slug: string;
  };
};

interface ArticleType {
  title: string;
  meta: string;
  slug: string;
  media: string[];
  content: string;
}

// ✅ SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const article = await Article.findOne({ slug: params.slug }).lean();

  if (!article) {
    return {
      title: "Article Not Found - TrendWise",
      description: "The article you are looking for does not exist.",
    };
  }

  return {
    title: article.title,
    description: article.meta,
    openGraph: {
      title: article.title,
      description: article.meta,
      url: `http://localhost:3000/article/${article.slug}`,
      images: article.media && article.media.length > 0
        ? article.media.map((url: string) => ({ url }))
        : [{ url: "http://localhost:3000/default-og-image.png" }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  await dbConnect();

  const article = (await Article.findOne({ slug: params.slug }).lean()) as ArticleType | null;

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

  const session = await getServerSession(authOptions);

//   return (
//     <main className="min-h-screen bg-gray-100 text-black px-4 py-6">
//       {/* ✅ Article Box */}
//       <div className="bg-white shadow-md border border-black-300 rounded-xl max-w-3xl mx-auto p-6">
//         <h1 className="text-3xl font-bold text-black-700 mb-4">{article.title}</h1>
//         <div className="whitespace-pre-line text-black-800 leading-relaxed">
//           {article.content}
//         </div>
//       </div>

//       {/* ✅ Comments Section */}
//       <div className="max-w-3xl mx-auto mt-8 bg-white border border-gray-300 shadow-md rounded-xl p-6">
//         <h2 className="text-2xl font-semibold text-black mb-4">Comments</h2>

//         <CommentsList comments={comments} />

//         {session ? (
//           <div className="mt-4">
//             <CommentForm articleSlug={params.slug} user={session.user} />
//           </div>
//         ) : (
//           <div className="mt-4 text-center">
//             <Link
//               href="/api/auth/signin"
//               className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
//             >
//               Login to post a comment
//             </Link>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

return (
    <main className="min-h-screen bg-gray-100 text-black">

      {/* ✅ NAVBAR - Added this full-width black navbar with Home button */}
      <nav className="w-full bg-black px-8 py-4 flex justify-between items-center shadow-md mb-6">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-300 transition"
        >
          🌍 TrendWise
        </Link>

        {session ? (
          <div className="flex items-center space-x-4">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <span className="text-white">{session.user?.name}</span>
            )}

            <form action="/api/auth/signout" method="post">
              <input type="hidden" name="callbackUrl" value="/" />
              <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                Logout
              </button>
            </form>
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Login
            </button>
          </Link>
        )}
      </nav>

      {/* ✅ Article Box */}
      <div className="bg-white shadow-md border border-gray-300 rounded-xl max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-700 mb-4">{article.title}</h1>
        <div className="whitespace-pre-line text-gray-800 leading-relaxed">
          {article.content}
        </div>
      </div>

      {/* ✅ Comments Section */}
      <div className="max-w-3xl mx-auto mt-8 bg-white border border-gray-300 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-black mb-4">Comments</h2>

        <CommentsList comments={comments} />

        {session ? (
          <div className="mt-4">
            <CommentForm articleSlug={params.slug} user={session.user} />
          </div>
        ) : (
          <div className="mt-4 text-center">
            <Link
              href="/api/auth/signin"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200"
            >
              Login to post a comment
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}