import { createConnection } from "@/lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET() {
	try {
		const db = await createConnection();
		if (!db) {
			return NextResponse.json(
				{ message: "Database connection failed" },
				{ status: 500 },
			);
		}

		const [users] = await db.query<RowDataPacket[]>(
			"SELECT * FROM wpkj_actionscheduler_groups",
		);
		return NextResponse.json(users);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 },
		);
	}
}