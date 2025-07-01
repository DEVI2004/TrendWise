"use client";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Article from "@/models/Article";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import { FiSearch } from "react-icons/fi";


// export default async function HomePage() {
//   // Connect to MongoDB and get all articles
//   await dbConnect();
//   const articles = await Article.find().lean();
//   const session = await getServerSession(authOptions);

//   return (
//     <main className="max-w-3xl mx-auto py-8 px-4">
//       <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center">🌍 TrendWise - Latest Articles</h1>


//       {/* ✅ LOGIN / LOGOUT BUTTON */}
//       <div className="mb-4">
//         {session ? (
//           <form action="/api/auth/signout" method="post">
//             <input type="hidden" name="callbackUrl" value="/" />
//             <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//               Logout ({session.user?.name})
//             </button>
//           </form>
//         ) : (
//           <Link href="/api/auth/signin">
//             <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//               Login with Google
//             </button>
//           </Link>
//         )}
//       </div>


//       {/* ✅ Generate Article Button */}
//       <form action="/api/generateArticle" method="post">
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
//         >
//           Generate New Article
//         </button>
//       </form>

//       {/* ✅ Articles List */}
//       {/* <ul className="grid gap-6">
//         {articles.map((article: any) => (
//           <li key={article._id}>
//             <Link
//               href={`/article/${article.slug}`}
//               className="text-blue-600 underline hover:text-blue-800 text-lg"
//             >
//               {article.title}
//             </Link>
//           </li>
//         ))}
//       </ul> */}
//       <div className="grid gap-6">
//         {articles.map((article: any) => (
//           <Link key={article._id} href={`/article/${article.slug}`}>
//             <div className="border rounded-xl shadow-md hover:shadow-lg p-4 cursor-pointer transition duration-300 hover:scale-[1.02]">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h2>
//               <p className="text-gray-600">{article.meta}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }

// export default function HomePage() {
//   const { data: session } = useSession();
//   const [articles, setArticles] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
  

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   async function fetchArticles(query = "") {
//     const res = await fetch(`/api/search?q=${query}`);
//     const data = await res.json();
//     setArticles(data);
//   }

//   function handleSearch(e: React.FormEvent) {
//     e.preventDefault();
//     fetchArticles(searchQuery);
//   }

//   return (
//     <main className="max-w-4xl mx-auto py-8 px-4">
//       <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">🌍 TrendWise: Latest Trending Articles</h1>

//       {/* ✅ Login / Logout */}
//       <div className="mb-4 text-center">
//         {session ? (
//           <button
//             onClick={() => signOut({ callbackUrl: "/" })}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Logout ({session.user?.name})
//           </button>
//         ) : (
//           <button
//             onClick={() => signIn("google")}
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Login with Google
//           </button>
//         )}
//       </div>

//       {/* ✅ Search Bar */}
//       <form onSubmit={handleSearch} className="mb-6 flex">
//         <input
//           type="text"
//           placeholder="Search articles..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-grow border p-2 rounded-l"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </form>

//       {/* ✅ Generate Article Button */}
//       <form action="/api/generateArticle" method="post" className="mb-6 text-center">
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//         >
//           Generate New Article
//         </button>
//       </form>

//       {/* ✅ Article List */}
//       <div className="grid gap-6">
//         {articles.length > 0 ? (
//           articles.map((article: any) => (
//             <Link key={article._id} href={`/article/${article.slug}`}>
//               <div className="border rounded-xl shadow-md hover:shadow-lg p-4 cursor-pointer transition duration-300 hover:scale-[1.02]">
//                 <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h2>
//                 <p className="text-gray-600">{article.meta}</p>
//               </div>
//             </Link>
// //           ))
// //         ) : (
// //           <p>No articles found.</p>
// //         )}
// //       </div>
// //     </main>
// //   );
// // }


// export default function HomePage() {
//   const { data: session } = useSession();
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const [articles, setArticles] = useState<any[]>([]);

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   async function fetchArticles() {
//     const res = await fetch(`/api/search`);
//     const data = await res.json();
//     setArticles(data);
//   }

//   async function handleSearchInput(value: string) {
//     setQuery(value);

//     if (value.trim() === "") {
//       setSuggestions([]);
//       return;
//     }

//     const res = await fetch(`/api/search?q=${value}`);
//     const data = await res.json();
//     setSuggestions(data);
//   }

//   return (
//   <>
//     <Navbar />
//     <main className="max-w-3xl mx-auto py-8 px-4">
//       {/* Your existing HomePage content */}
//     </main>
//   </>
// );


//   return (
//     <main className="max-w-4xl mx-auto py-8 px-4">
//       {/* Login / Logout */}
//       <div className="mb-4 text-center">
//         {session ? (
//           <button onClick={() => signOut({ callbackUrl: "/" })} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
//             Logout ({session.user?.name})
//           </button>
//         ) : (
//           <button onClick={() => signIn("google")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//             Login with Google
//           </button>
//         )}
//       </div>

      

//       {/* Search Input with Suggestions */}
//       <div className="mb-6 relative">
//         <input
//           type="text"
//           placeholder="Search articles..."
//           value={query}
//           onChange={(e) => handleSearchInput(e.target.value)}
//           className="w-full border p-2 rounded"
//         />

//         {suggestions.length > 0 && (
//           <ul className="absolute left-0 right-0 bg-white border shadow rounded mt-1 max-h-48 overflow-y-auto z-10">
//             {suggestions.map((article) => (
//               <li key={article._id} className="p-2 hover:bg-gray-100">
//                 <Link href={`/article/${article.slug}`}>{article.title}</Link>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Generate Article */}
//       <form action="/api/generateArticle" method="post" className="mb-6 text-center">
//         <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
//           Generate New Article
//         </button>
//       </form>

//       {/* Articles List */}
//       <div className="grid gap-6">
//         {articles.map((article) => (
//           <Link key={article._id} href={`/article/${article.slug}`}>
//             <div className="border rounded-xl shadow-md hover:shadow-lg p-4 cursor-pointer transition duration-300 hover:scale-[1.02]">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">{article.title}</h2>
//               <p className="text-gray-600">{article.meta}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }

//edited new
// export default function HomePage() {
//   const { data: session } = useSession();
//   const [articles, setArticles] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchArticles() {
//       const res = await fetch("/api/article");
//       const data = await res.json();
//       setArticles(data);
//     }
//     fetchArticles();
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <main className="max-w-5xl mx-auto py-4 px-4">
//       {/* ✅ Navbar */}
//       <nav className="flex items-center justify-between mb-8 p-4 bg-gray-100 rounded shadow-sm">
//         <h1 className="text-2xl font-bold text-blue-600">🌍 TrendWise</h1>

//         {/* ✅ Search Bar */}
//         <form onSubmit={handleSearch} className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Search articles..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="px-3 py-1 border rounded focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             <FiSearch className="mr-1" /> Search
//           </button>
//         </form>

//         {/* ✅ Login/Logout */}
//         {session ? (
//           <form action="/api/auth/signout" method="post">
//             <input type="hidden" name="callbackUrl" value="/" />
//             <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
//               Logout ({session.user?.name.split(" ")[0]})
//             </button>
//           </form>
//         ) : (
//           <Link href="/api/auth/signin">
//             <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
//               Login with Google
//             </button>
//           </Link>
//         )}
//       </nav>

//       {/* ✅ Generate Article Button */}
//       <form
//         action="/api/generateArticle"
//         method="post"
//         className="mb-6 text-center"
//       >
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow"
//         >
//           Generate New Article
//         </button>
//       </form>

//       {/* ✅ Article List - Styled Boxes */}
//       <div className="grid gap-6">
//         {articles.map((article) => (
//           <Link key={article._id} href={`/article/${article.slug}`}>
//             <div className="border rounded-xl shadow-md hover:shadow-lg p-4 cursor-pointer transition transform hover:scale-[1.02] bg-white">
//               <h2 className="text-xl font-semibold text-blue-800 mb-1">
//                 {article.title}
//               </h2>
//               <p className="text-gray-600">{article.meta}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </main>
//   );
// }


//better ui 
// export default function HomePage() {
//   const { data: session } = useSession();
//   const [articles, setArticles] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchArticles() {
//       const res = await fetch("/api/article");
//       const data = await res.json();
//       setArticles(data);
//     }
//     fetchArticles();
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gray-100 text-black">
//       {/* ✅ Navbar */}
//       <nav className="flex justify-between items-center px-8 py-4 bg-black shadow-md">
//         <h1 className="text-2xl font-bold text-white">🌍 TrendWise</h1>

//         <div className="flex items-center space-x-4">
//           <form onSubmit={handleSearch} className="flex">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="px-3 py-1 rounded-l bg-gray-200 text-black focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="px-4 py-1 bg-gray-700 text-white rounded-r hover:bg-gray-800 transition duration-200"
//             >
//               Search
//             </button>
//           </form>

//           {session ? (
//             <form action="/api/auth/signout" method="post">
//               <input type="hidden" name="callbackUrl" value="/" />
//               <button className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200">
//                 Logout
//               </button>
//             </form>
//           ) : (
//             <Link href="/api/auth/signin">
//               <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">
//                 Login
//               </button>
//             </Link>
//           )}
//         </div>
//       </nav>

//       {/* ✅ Generate Article Button */}
//       <div className="text-center my-6">
//         <form action="/api/generateArticle" method="post">
//           <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 shadow-md">
//             Generate New Article
//           </button>
//         </form>
//       </div>

//       {/* ✅ Articles Grid */}
//       <section className="grid gap-6 max-w-4xl mx-auto px-4">
//         {articles.map((article) => (
//           <Link key={article._id} href={`/article/${article.slug}`}>
//             <div className="bg-white border border-gray-300 rounded-xl p-4 hover:scale-[1.02] transition-transform duration-200 cursor-pointer shadow hover:shadow-lg">
//               <h2 className="text-xl font-semibold text-black mb-2">{article.title}</h2>
//               <p className="text-gray-600">{article.meta}</p>
//             </div>
//           </Link>
//         ))}
//       </section>
//     </main>
//   );
// }

export default function HomePage() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/api/article");
      const data = await res.json();
      setArticles(data);
    }
    fetchArticles();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // New: Generate Article Function
  const handleGenerateArticle = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/generateArticle", {
        method: "POST",
      });
      const result = await res.json();

      if (result.success) {
        alert("Article Generated Successfully!");
        // Refresh articles
        const updatedRes = await fetch("/api/article");
        const updatedData = await updatedRes.json();
        setArticles(updatedData);
      } else {
        alert("Error generating article");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black shadow-md w-full">
        <h1 className="text-2xl font-bold text-white">🌍 TrendWise</h1>

        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-l bg-gray-300 text-black focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-1 bg-maroon-600 text-white rounded-r hover:bg-green-700 transition duration-200"
              style={{ backgroundColor: "gray-300" }} 
            >
              Search
            </button>
          </form>

          {/* Profile / Login Dropdown */}
          {session ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-white focus:outline-none">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ) : (
                  <span>{session.user?.name}</span>
                )}
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.25 7.5L10 12.25L14.75 7.5H5.25Z" />
                </svg>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-50">
                <form action="/api/auth/signout" method="post">
                  <input type="hidden" name="callbackUrl" value="/" />
                  <button
                    type="submit"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Link href="/api/auth/signin">
              <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Generate Article Button */}
      <div className="text-center my-6">
        <button
          onClick={handleGenerateArticle}
          disabled={loading}
          className="px-6 py-2 text-white rounded hover:bg-yellow-600 transition duration-200 shadow-md"
          style={{ backgroundColor: "green" }}
        >
          {loading ? "Generating..." : "Generate New Article"}
        </button>
      </div>

      {/* Articles Grid */}
      <section className="grid gap-6 max-w-4xl mx-auto px-4">
        {articles.map((article) => (
          <Link key={article._id} href={`/article/${article.slug}`}>
            <div className="bg-white border border-gray-300 rounded-xl p-4 hover:scale-[1.02] transition-transform duration-200 cursor-pointer shadow hover:shadow-lg">
              <h2 className="text-xl font-semibold text-black mb-2">{article.title}</h2>
              <p className="text-gray-600">{article.meta}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}