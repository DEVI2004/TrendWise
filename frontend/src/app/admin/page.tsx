

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);

  const adminEmails = ["youremail@gmail.com"]; // ✅ Replace with your actual admin email

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !adminEmails.includes(session.user?.email || "")) {
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/api/article");
      const data = await res.json();
      setArticles(data);
    }
    fetchArticles();
  }, []);

  const handleGenerate = async () => {
    await fetch("/api/generateArticle", { method: "POST" });
    alert("Article generation triggered!");
  };

  if (!session || !adminEmails.includes(session.user?.email || "")) return null;

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      {/* ✅ Navbar */}
      <nav className="w-full bg-black px-8 py-4 flex justify-between items-center shadow-md mb-6">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-300 transition"
        >
          🌍 TrendWise (Admin)
        </Link>

        <div className="text-white">
          {session.user?.name}
        </div>
      </nav>

      {/* ✅ Admin Panel Content */}
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Admin Dashboard</h1>

        <button
          onClick={handleGenerate}
          className="mb-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 shadow"
        >
          ➕ Generate New Article (Manual Trigger)
        </button>

        <h2 className="text-2xl font-semibold mb-4">All Articles</h2>
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article._id} className="border p-3 rounded shadow hover:shadow-md">
              <Link
                href={`/article/${article.slug}`}
                className="text-blue-600 hover:underline text-lg"
              >
                {article.title}
              </Link>
              <p className="text-gray-600">{article.meta}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

