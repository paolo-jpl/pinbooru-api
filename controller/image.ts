import { nanoid } from "nanoid";
import { pool } from "../server";
import { nullToDefault, paginate, setUpdateColumn } from "../util/query";

export async function getAllImages(limit?: number, page?: number){
  let sql = `
    SELECT * 
    FROM "Image"
    ORDER BY "createdAt"`

  if(limit != null){
    sql = sql + paginate(limit, page)
  }

  const res = await pool.query(sql);
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
  options:{
    description?: string, 
    source?: string, 
    published?: boolean,
    id?: string,
  } 
){
  let { id, description, source, published } = options;
  
  if(!id){ id = nanoid() }
  const values = nullToDefault([description, source, published]);

  const res = await pool.query(
    `INSERT into "Image" ("id", "imgURL", "uploaderId", "description", "source", "published")
     VALUES ($1, $2, $3, ${values[0]}, ${values[1]}, ${values[2]})
     RETURNING *`, 
    [id, imgURL, uploaderId]);
  return res.rows
}

export async function updateImage(
  id: string,
  data: {
    imgURL?: string, 
    uploaderId?: string, 
    description?: string, 
    source?: string, 
    published?: boolean,
  }
){
  const query = setUpdateColumn(
    [data.imgURL, data.uploaderId, data.description, data.source, data.published], 
    ["imgURL", "uploaderId", "description", "source", "published"])

  const res = await pool.query(`
    UPDATE "Image"
    SET ${query}
    WHERE "id" = $1
    RETURNING *`,
    [id])
  return res.rows;
}

export async function deleteImage(id: string) {
  const res = await pool.query(`
    DELETE FROM "Image"
    WHERE "id" = $1
    RETURNING *`,
    [id]);
  return res.rows
}