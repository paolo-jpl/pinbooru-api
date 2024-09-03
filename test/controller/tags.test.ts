import { pool } from '../../server';
import * as tagController from '../../controller/tags';

describe('get all images', () => {
  it('should return an array of length 13 (all rows)', async () => {
    const data = await tagController.getAllTags()
    expect(data.length).toBe(13)
  })
});

afterAll(async () => {
  await pool.end();
});