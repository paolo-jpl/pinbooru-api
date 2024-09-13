import { pool } from "../server";
import { setInsertColumns } from "../util/query";
const format = require('pg-format');

export async function getAllTags(limit: number | string = `ALL`, page: number = 0){
  if(typeof limit === "number") {page = (page - 1) * limit}
  const res = await pool.query(`
    SELECT * 
    FROM "Tag"
    ORDER BY "id"
    LIMIT ${limit} OFFSET $1`,
    [page]);

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