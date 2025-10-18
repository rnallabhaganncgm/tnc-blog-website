import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.APP_URL || "http://localhost:3000";

  const content = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`;

  return new NextResponse(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
