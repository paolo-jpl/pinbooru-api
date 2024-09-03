import { pool } from '../../server';
import * as imageController from '../../controller/image';

describe('get all images', () => {
  it('should return an array of length 15 (all rows)', async () => {
    const data = await imageController.getAllImages()
    expect(data.length).toBe(15)
  })
});

afterAll(async () => {
  await pool.end();
});