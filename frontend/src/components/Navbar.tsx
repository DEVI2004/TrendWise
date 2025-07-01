

"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">TrendWise</h1>
      </Link>

      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
        <button type="submit">
          <FiSearch size={20} />
        </button>
      </form>

      <div>
        {session ? (
          <form action="/api/auth/signout" method="post">
            <input type="hidden" name="callbackUrl" value="/" />
            <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </form>
        ) : (
          <Link href="/api/auth/signin">
            <button className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
