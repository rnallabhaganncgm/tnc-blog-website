import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

interface Params {
  params: { slug: string };
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = params;

  try {
    const db = await createConnection();
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const [rows] = await db.query<RowDataPacket[]>(
      `
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
          JOIN wpkj_term_taxonomy tt
            ON tr.term_taxonomy_id = tt.term_taxonomy_id
            AND tt.taxonomy = 'category'
          JOIN wpkj_terms t ON tt.term_id = t.term_id
          WHERE tr.object_id = p.ID
          LIMIT 1
        ) AS category_name,
        (
          SELECT t.slug
          FROM wpkj_term_relationships tr
          JOIN wpkj_term_taxonomy tt
            ON tr.term_taxonomy_id = tt.term_taxonomy_id
            AND tt.taxonomy = 'category'
          JOIN wpkj_terms t ON tt.term_id = t.term_id
          WHERE tr.object_id = p.ID
          LIMIT 1
        ) AS category_slug,
        (
          SELECT GROUP_CONCAT(t.name SEPARATOR ', ')
          FROM wpkj_term_relationships tr
          JOIN wpkj_term_taxonomy tt
            ON tr.term_taxonomy_id = tt.term_taxonomy_id
            AND tt.taxonomy = 'post_tag'
          JOIN wpkj_terms t ON tt.term_id = t.term_id
          WHERE tr.object_id = p.ID
        ) AS tags,
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
        ) AS thumbnail_url
      FROM wpkj_posts p
      LEFT JOIN wpkj_users u ON p.post_author = u.ID
      LEFT JOIN wpkj_usermeta um ON um.user_id = u.ID AND um.meta_key = 'description'
      WHERE p.post_type = 'post'
        AND p.post_status = 'publish'
        AND p.post_parent = 0
        AND p.post_name = ?
      LIMIT 1;
    `,
      [slug]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
