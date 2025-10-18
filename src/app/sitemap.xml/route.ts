import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";

const siteUrl = process.env.APP_URL || "http://localhost:3000";

export async function GET() {
  try {
    const db = await createConnection();

    const [rows] = await db.query<RowDataPacket[]>(`
      SELECT 
        post_name AS slug, 
        post_modified AS modified
      FROM wpkj_posts
      WHERE post_status = 'publish'
        AND post_type = 'post'
        AND post_parent = 0
      ORDER BY post_modified DESC;
    `);

    if (!Array.isArray(rows) || rows.length === 0) {
      console.warn("⚠️ No published posts found in database");
    }

    const urls = rows
      .map(
        (post) => `
  <url>
    <loc>${siteUrl}/${post.slug}</loc>
    <lastmod>${new Date(post.modified).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=59",
      },
    });
  } catch (error) {
    console.error("❌ Sitemap generation failed:", error);
    return new NextResponse("Sitemap generation failed", { status: 500 });
  }
}
