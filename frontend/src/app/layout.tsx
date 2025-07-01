

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "TrendWise",
  description: "SEO Optimized Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
