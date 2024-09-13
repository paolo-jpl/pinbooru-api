import { nanoid } from "nanoid";
import { pool } from "../server";
import { nullToDefault, paginate } from "../util/query";

export async function getAllTags(limit?: number, page?: number){
  let sql = `
    SELECT * 
    FROM "Tag"
    ORDER BY "id"`

  if(limit != null){
    sql = sql + paginate(limit, page)
  }

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

export async function createTag(name: string, categoryId?: number){
  const values = nullToDefault([categoryId])

  const res = await pool.query(`
    INSERT into "Tag" ("name", "categoryId")
    VALUES ($1, ${values[0]})
    RETURNING *`, 
    [name])
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