import { Pool } from "pg";
import dotenv from 'dotenv';
dotenv.config();

let connection: any;
console.log('from db ',process.env.DB_HOST)
if (!connection) {
  connection = new Pool({
    user:process.env.DB_USER,
    password: process.env.PWD,
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DATABASE,
  });
}
export { connection };
