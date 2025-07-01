
"use client";

import { useState } from "react";

interface User {
  name: string;
  email: string;
}

export default function CommentForm({
  articleSlug,
  user,
}: {
  articleSlug: string;
  user: User;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          articleSlug,
          userName: user.name,
          userEmail: user.email,
          content,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      setContent("");
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong while posting the comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        required
        rows={3}
        className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 text-white rounded ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Submitting..." : "Submit Comment"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">Comment posted successfully!</p>}
    </form>
  );
}
