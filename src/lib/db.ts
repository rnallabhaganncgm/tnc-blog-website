import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || "localhost",
  port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 3306,
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


export const db = pool;
export const createConnection = () => pool;
