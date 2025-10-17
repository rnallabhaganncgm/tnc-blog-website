import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

interface Params {
  params: { slug: string };
}

export async function GET(req: Request, { params }: Params) {
  const { slug: categorySlug } = params;

  // Get "limit" from query params; default to 10 if not passed
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const db = await createConnection();
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const [posts] = await db.query<RowDataPacket[]>(
      `
      SELECT
        p.ID,
        p.post_title,
        p.post_name AS slug,
        p.post_date,
        p.post_excerpt,
        u.display_name AS author_name,
        u.user_nicename AS author_slug,
        (
          SELECT guid
          FROM wpkj_posts thumbnail
          WHERE thumbnail.ID = (
            SELECT meta_value
            FROM wpkj_postmeta pm
            WHERE pm.post_id = p.ID
              AND pm.meta_key = '_thumbnail_id'
            LIMIT 1
          )
          LIMIT 1
        ) AS thumbnail_url,
        (
          SELECT GROUP_CONCAT(t.name SEPARATOR ', ')
          FROM wpkj_term_relationships tr
          JOIN wpkj_term_taxonomy tt
            ON tr.term_taxonomy_id = tt.term_taxonomy_id
            AND tt.taxonomy = 'post_tag'
          JOIN wpkj_terms t ON tt.term_id = t.term_id
          WHERE tr.object_id = p.ID
        ) AS tags
      FROM wpkj_posts p
      JOIN wpkj_term_relationships tr ON tr.object_id = p.ID
      JOIN wpkj_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
      JOIN wpkj_terms t ON tt.term_id = t.term_id
      LEFT JOIN wpkj_users u ON p.post_author = u.ID
      WHERE p.post_type = 'post'
        AND p.post_status = 'publish'
        AND tt.taxonomy = 'category'
        AND t.slug = ?
      ORDER BY p.post_date_gmt DESC
      LIMIT ?;
      `,
      [categorySlug, limit]
    );

    if (posts.length === 0) {
      return NextResponse.json(
        { message: "No posts found for this category" },
        { status: 404 }
      );
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching category posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
