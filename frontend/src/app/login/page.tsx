// // "use client";
// // import { signIn } from "next-auth/react";

// // export default function LoginPage() {
// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen">
// //       <h1 className="text-2xl font-bold mb-4">Login to TrendWise</h1>
// //       <button
// //         onClick={() => signIn("google")}
// //         className="px-4 py-2 bg-blue-500 text-white rounded"
// //       >
// //         Sign in with Google
// //       </button>
// //     </div>
// //   );
// // }

// "use client";
// import { signIn, useSession } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       // ✅ Redirect to home or dashboard after login
//       router.push("/");
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold mb-4">Login to TrendWise</h1>
//       <button
//         onClick={() => signIn("google")}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Sign in with Google
//       </button>
//     </div>
//   );
// }

"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login to TrendWise</h1>
      <button
        onClick={() => signIn("google", { callbackUrl: "/profile" })}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}

