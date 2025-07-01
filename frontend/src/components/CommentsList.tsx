// "use client";

// import { useEffect, useState } from "react";

// export default function CommentsList({ articleSlug }: { articleSlug: string }) {
//   const [comments, setComments] = useState<any[]>([]);

//   useEffect(() => {
//     async function fetchComments() {
//       const res = await fetch(`/api/comment?articleSlug=${articleSlug}`);
//       const data = await res.json();
//       setComments(data);
//     }
//     fetchComments();
//   }, [articleSlug]);

//   return (
//     <ul className="mt-2">
//       {comments.map((comment) => (
//         <li key={comment._id} className="border p-2 mb-1">
//           <strong>{comment.userName}</strong>: {comment.content}
//         </li>
//       ))}
//     </ul>
//   );
// }


"use client";

import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  userName: string;
  content: string;
}

export default function CommentsList({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/comment?articleSlug=${articleSlug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await res.json();
        setComments(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong while fetching comments.");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [articleSlug]);

  if (loading) return <p className="text-gray-500">Loading comments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (comments.length === 0) return <p className="text-gray-500">No comments yet. Be the first to comment!</p>;

  return (
    <ul className="space-y-3 mt-4">
      {comments.map((comment) => (
        <li key={comment._id} className="border p-3 rounded bg-gray-50 shadow-sm">
          <p className="font-semibold text-blue-700">{comment.userName}</p>
          <p className="text-gray-800">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
