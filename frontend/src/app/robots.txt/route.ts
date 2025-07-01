import { NextResponse } from "next/server";

export function GET() {
  const content = `
User-agent: *
Allow: /

Disallow: /admin

Sitemap: http://localhost:3000/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
