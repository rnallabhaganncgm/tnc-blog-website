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

    const term_ids = [
      143, 142, 1644, 146, 1643, 144, 2200, 2412, 816, 908, 403, 1500, 147,
      1874, 4601, 817,
    ];
    const placeholders = term_ids.map(() => "?").join(",");
    const query = `SELECT * FROM wpkj_terms WHERE term_id IN (${placeholders})`;

    const [categories] = await db.query<RowDataPacket[]>(query, term_ids);

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
