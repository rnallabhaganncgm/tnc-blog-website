import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    // Fetch latest 5 interviews from WordPress posts or a custom table
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT
        ID as id,
        post_title as title,
        post_date as date,
        guid as link,
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
        ) AS interviewer
      FROM wp_posts p
      JOIN wpkj_term_relationships tr ON tr.object_id = p.ID
      JOIN wpkj_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
      JOIN wpkj_terms t ON tt.term_id = t.term_id
      WHERE p.post_status = 'publish'
        AND p.post_type = 'post'
        AND tt.taxonomy = 'category'
        AND t.slug = 'interview'
      ORDER BY p.post_date DESC
      LIMIT 5;
      `
    );

    return NextResponse.json({ success: true, interviews: rows });
  } catch (error) {
    console.error("Error fetching interviews:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
