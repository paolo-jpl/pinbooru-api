import { pool } from "../server";

export async function getAllTags(){
  const res = await pool.query('SELECT * FROM "Tag"');
  return res.rows
}