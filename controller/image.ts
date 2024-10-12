import { nanoid } from "nanoid";
import { pool } from "../server";
import { setInsertColumns, setOffset, setUpdateColumns } from "../util/query";
const format = require('pg-format');

export async function getAllImages(columns?: string[] | string, limit: number | string = `ALL`, page: number = 0){
  if(typeof limit === "number" && page > 0) 
    page = (page - 1) * limit
  else page = 0;

  let select, sql
  if(columns){
    select = format(`SELECT %I`, columns);
  } else {
    select = format(`SELECT *`);
  }

  sql = format(`
    %s FROM "Image"
    ORDER BY "uploadedAt"
    LIMIT %s OFFSET %L`, 
    select, limit, page);

  const res = await pool.query(sql);
  return res.rows
}

export async function getImagesByTag(tags: string[], limit: number | string = `ALL`, page: number = 0){
  const offset = setOffset(limit, page)

  const sql = format(`
    SELECT "Image".*
    FROM "Image"
      JOIN "ImageTag" ON "Image".id = "ImageTag"."imageId"
      JOIN "Tag" ON "Tag".id = "ImageTag"."tagId" 
    GROUP BY "Image".id
    HAVING array[%L] <@ ARRAY_AGG("Tag".name)
    ORDER BY "uploadedAt"
    LIMIT %s OFFSET %L`, 
    tags, limit, offset);

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