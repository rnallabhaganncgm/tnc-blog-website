import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const db = await createConnection();
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const [rows] = await db.query<RowDataPacket[]>(`
      SELECT 
  p.ID,
  p.post_title,
  p.post_name AS slug,
  p.post_date,
  p.post_excerpt,
  p.post_content,
  p.post_status,
  u.display_name AS author_name,
  u.user_email AS author_email,
  u.user_nicename AS author_slug,
  um.meta_value AS author_bio,
  (
    SELECT t.name 
    FROM wpkj_term_relationships tr
    JOIN wpkj_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'category'
    JOIN wpkj_terms t ON tt.term_id = t.term_id
    WHERE tr.object_id = p.ID
    LIMIT 1
  ) AS category_name,
  (
    SELECT t.slug 
    FROM wpkj_term_relationships tr
    JOIN wpkj_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'category'
    JOIN wpkj_terms t ON tt.term_id = t.term_id
    WHERE tr.object_id = p.ID
    LIMIT 1
  ) AS category_slug,
  (
    SELECT GROUP_CONCAT(t.name SEPARATOR ', ')
    FROM wpkj_term_relationships tr
    JOIN wpkj_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id AND tt.taxonomy = 'post_tag'
    JOIN wpkj_terms t ON tt.term_id = t.term_id
    WHERE tr.object_id = p.ID
  ) AS tags,
  (
    SELECT guid 
    FROM wpkj_posts thumbnail
    WHERE thumbnail.ID = (
      SELECT meta_value 
      FROM wpkj_postmeta pm 
      WHERE pm.post_id = p.ID AND pm.meta_key = '_thumbnail_id' 
      LIMIT 1
    )
    LIMIT 1
  ) AS thumbnail_url
FROM wpkj_posts p
LEFT JOIN wpkj_users u ON p.post_author = u.ID
LEFT JOIN wpkj_usermeta um ON um.user_id = u.ID AND um.meta_key = 'description'
WHERE p.post_type = 'post' 
  AND p.post_parent = 0
ORDER BY p.post_date_gmt DESC
LIMIT 50;
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
