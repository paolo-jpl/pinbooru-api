import { nanoid } from "nanoid";
import { pool } from "../server";
import { setInsertColumns, setUpdateColumns } from "../util/query";
const format = require('pg-format');

export async function getAllImages(columns?: string[] | string, limit: number | string = `ALL`, page: number = 0){
  if(typeof limit === "number" && page > 0) 
    page = (page - 1) * limit
  else page = 0;

  let sql 
  if(columns){
    sql = format(`
      SELECT %I FROM "Image"
      ORDER BY "uploadedAt"
      LIMIT %s OFFSET %L`, 
      columns, limit, page);
  } else {
    sql = format(`
      SELECT * FROM "Image"
      ORDER BY "uploadedAt"
      LIMIT %s OFFSET %L`, 
      limit, page);
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

export async function getImageTags(limit: number | string = `ALL`, page: number = 0){
  if(typeof limit === "number" && page > 0) 
    page = (page - 1) * limit
  else page = 0;
  
  const sql = format(`
    SELECT * 
    FROM "Image"
    ORDER BY "uploadedAt"
    LIMIT %s OFFSET %L`, 
    limit, page);

  const res = await pool.query(sql);
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
  const { columns, inputs } = setInsertColumns(
    [id, imgURL, uploaderId, description, source, published],
    ['id', 'imgURL', 'uploaderId', 'description', 'source', 'published'])

  const sql = format(`
    INSERT into "Image" (%I)
    VALUES (%L)
    RETURNING *`,
    columns, inputs)

  const res = await pool.query(sql)
  return res.rows;
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
  const query = setUpdateColumns(
    [data.imgURL, data.uploaderId, data.description, data.source, data.published], 
    ['imgURL', 'uploaderId', 'description', 'source', 'published'])

  const sql = format(`
    UPDATE "Image"
    SET %s
    WHERE "id" = %L
    RETURNING *`,
    query, id)

  const res = await pool.query(sql)
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