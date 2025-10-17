import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    // Fetch the latest 6 posts as "trending"
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
        ) AS image
      FROM wp_posts p
      WHERE post_status = 'publish'
        AND post_type = 'post'
      ORDER BY post_date DESC
      LIMIT 6;
      `
    );

    return NextResponse.json({ success: true, posts: rows });
  } catch (error) {
    console.error("Error fetching trending news:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}
