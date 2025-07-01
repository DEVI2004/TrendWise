

"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


export default function ProfilePage() {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!session) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center text-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">You are not logged in.</h1>
          <Link
            href="/api/auth/signin"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Login with Google
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      {/* ✅ Navbar */}
      <nav className="w-full bg-black px-8 py-4 flex justify-between items-center shadow-md mb-6">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-gray-300 transition"
        >
          🌍 TrendWise
        </Link>

        {/* ✅ Profile with dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="flex items-center cursor-pointer space-x-2">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <span className="text-white">{session.user?.name}</span>
            )}
            <span className="text-white">{session.user?.name}</span>
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded border">
              <form action="/api/auth/signout" method="post">
                <input type="hidden" name="callbackUrl" value="/" />
                <button
                  type="submit"
                  className="block w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white transition duration-150"
                >
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* ✅ Profile Content */}
      <section className="max-w-2xl mx-auto bg-white border border-gray-300 shadow rounded-xl p-6">
        <h1 className="text-3xl font-bold text-red-700 mb-4">👤 Your Profile</h1>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
        )}
        <p className="text-lg mb-2">
          <strong>Name:</strong> {session.user?.name}
        </p>
        <p className="text-lg mb-2">
          <strong>Email:</strong> {session.user?.email}
        </p>
      </section>
    </main>
  );
}
