import { pool } from "../server";
import { setInsertColumns, setWhere } from "../util/query";
const format = require('pg-format');

export async function getAllTags(limit: number | string = `ALL`, page: number = 0, category?: string, name?: string){
  if(typeof limit === "number" && page > 0)
    page = (page - 1) * limit
  else page = 0;

  const conditions = setWhere([category, name], ['category', 'name'])

  const sql = format(`
    WITH tags as (
      SELECT "Tag".id, "Tag".name, "TagCategory".name AS "category"
      FROM   "Tag"
      JOIN   "TagCategory" ON "TagCategory".id = "Tag"."categoryId"
    )
    SELECT * FROM tags
    WHERE TRUE %s
    ORDER BY id
    LIMIT %s OFFSET %L`, 
    conditions, limit, page);

  const res = await pool.query(sql);
  return res.rows
}

export async function getTagByName(name: string){
  const res = await pool.query(
    `SELECT "Tag".id, "Tag"."name", "TagCategory"."name" AS "category"
     FROM   "Tag"
     JOIN   "TagCategory" ON "TagCategory".id = "Tag"."categoryId"
     WHERE  "Tag"."name" = $1`,
    [name]);
  return res.rows
}

export async function getImageTags(id: string){
  const res = await pool.query(`
    SELECT  "Tag".name, "TagCategory".name AS "category"
    FROM    "ImageTag"
    JOIN    "Tag" ON "Tag".id = "ImageTag"."tagId"
    JOIN    "TagCategory" ON "TagCategory".id = "Tag"."categoryId" 
    WHERE   "imageId" = $1`,
    [id]);
  return res.rows
}

export async function createTag(name: string, categoryId?: number){
  const { columns, inputs } = setInsertColumns([name, categoryId], ['name', 'categoryId'])

  const sql = format(`
    INSERT into "Tag" (%I)
    VALUES (%L)
    RETURNING *`,
    columns, inputs)

  const res = await pool.query(sql)
  return res.rows;
}

export async function updateTag( name: string, categoryId: number ){
  const res = await pool.query(`
    UPDATE "Tag"
    SET "categoryId" = $1
    WHERE "name" = $2
    RETURNING *`,
    [categoryId, name])
  return res.rows;
}

export async function deleteTag(name: string) {
  const res = await pool.query(`
    DELETE FROM "Tag"
    WHERE "name" = $1
    RETURNING *`,
    [name]);
  return res.rows
}