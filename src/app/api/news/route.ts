import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        ID as id,
        post_title as title,
        post_date as date,
        guid as link
      FROM wp_posts
      WHERE post_status = 'publish'
      AND post_type = 'post'
      ORDER BY post_date DESC
      LIMIT 10;
    `);

    return NextResponse.json({ success: true, posts: rows });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

