"use client";

import { useState } from "react";

export default function GenerateButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch("/api/generateArticle", {
      method: "POST",
    });

    if (res.ok) {
      console.log("Article generated successfully!");
      window.location.reload();  // Reload to show the new article in UI
    } else {
      console.error("Failed to generate article");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600"
      disabled={loading}
    >
      {loading ? "Generating..." : "Generate New Article"}
    </button>
  );
}
