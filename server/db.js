import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    // Hosted Postgres (Neon/Supabase/RDS) requires SSL; enable via env in prod.
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
});

export default pool;