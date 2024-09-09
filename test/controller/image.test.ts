import { pool } from '../../server';
import * as imageController from '../../controller/image';

//Start and rollback transaction for each test
beforeEach(async () => {
  await pool.query('BEGIN')
});

afterEach(async () => {
  await pool.query('ROLLBACK')
});

describe('get all images', () => {
  it('should return an array of length 15 (all rows)', async () => {
    const data = await imageController.getAllImages()
    expect(data.length).toBe(15)
    expect(data[0].id).toBe("one1")
    expect(data[14].id).toBe("fifteen")
  })
});

describe('get image by id', () => {
  describe('given image id "two"', () => {
    it('should return image of id "two"', async () => {
      const data = await imageController.getImageById('two')
      expect(data.length).toBe(1)
      expect(data[0].id).toBe("two")
    })
  })

  describe('given image id that does not exist', () => {
    it('should return array of length 0', async () => {
      const data = await imageController.getImageById('999')
      expect(data.length).toBe(0)
    })
  })
})

describe('create image', () => {
  describe('given all image details', () => {
    it('should return object with matching details', async () => {
      const data = await imageController.createImage("...", "one","desc", "....", true, "111")
      expect(data[0].id).toBe("111")
      expect(data[0].uploaderId).toBe("one")
      expect(data[0].description).toBe("desc")
      expect(data[0].published).toBe(true)
    })
  })

  describe('given no optional details', () => {
    it('should return object with default values', async () => {
      const data = await imageController.createImage("...", "one")
      expect(data[0].uploaderId).toBe("one")
      expect(data[0].description).toBe("")
      expect(data[0].published).toBe(false)
    })
  })
})

afterAll(async () => {
  await pool.end();
});