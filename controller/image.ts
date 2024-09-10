import { nanoid } from "nanoid";
import { pool } from "../server";
import { nullToDefault } from "../util/query";

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

export async function createImage(
  imgURL: string, 
  uploaderId: string, 
  description?: string, 
  source?: string, 
  published?: boolean,
  id?: string,
){
  if(!id){ id = nanoid() }

  const values = nullToDefault([description, source, published]);

  const res = await pool.query(
    `INSERT into "Image" ("id", "imgURL", "uploaderId", "description", "source", "published")
     VALUES ($1, $2, $3, ${values[0]}, ${values[1]}, ${values[2]})
     RETURNING *`, 
    [id, imgURL, uploaderId]);
  return res.rows
}