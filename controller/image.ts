import { pool } from "../server";

export async function getAllImages(){
  const res = await pool.query('SELECT * FROM "Image"');
  return res.rows
}

export async function getImageById(id: string){
  const res = await pool.query(
    `SELECT "Image".*, "User"."name" AS "uploader"
     FROM   "Image"
     JOIN   "User" ON "User".id = "Image"."uploaderId"
     WHERE  "Image".id = $1`, 
    [id]);
  return res.rows
}