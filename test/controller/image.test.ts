import { pool } from '../../server';
import * as imageController from '../../controller/image';

//Start and rollback transaction for each test
beforeEach(async () => {
  await pool.query('BEGIN')
});

afterEach(async () => {
  await pool.query('ROLLBACK')
});

// READ
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

// CREATE
describe('create image', () => {
  describe('given all image details', () => {
    it('should return object with matching details', async () => {
      const data = await imageController.createImage("...", "one", {description: "desc", source: "....", published: true, id: "111"})
      expect(data[0].id).toBe("111")
      expect(data[0].uploaderId).toBe("one")
      expect(data[0].description).toBe("desc")
      expect(data[0].published).toBe(true)
    })
  })

  describe('given no optional details', () => {
    it('should return object with default values', async () => {
      const data = await imageController.createImage("...", "one", {})
      expect(data[0].uploaderId).toBe("one")
      expect(data[0].description).toBe("")
      expect(data[0].published).toBe(false)
    })
  })

  describe('given some optional details', () => {
    it('should return with some default values', async () => {
      const data = await imageController.createImage("...", "one", {description: "desc"})
      expect(data[0].uploaderId).toBe("one")
      expect(data[0].description).toBe("desc")
      expect(data[0].published).toBe(false)
    })
  })

  describe('given uploaderId of user that does not exist', () => {
    it('should throw FKey restraint error (23503)', async () => {
      try{
        await imageController.createImage("llorem", "random", {})
      } catch (e) {
        expect(e).toMatchObject({code: "23503"});
      }
    })
  })
})

// UPDATE
describe('update image', () => {
  describe('given changes to all columns', () => {
    it('should be updated with all new changes', async () => {
      expect(true).toBe(true);
    })
  })
  describe('given new url', () => {
    it('should be updated with new url', async () => {
      const data = await imageController.updateImage("three", {imgURL: "new.url"})
      expect(data[0].imgURL).toBe("new.url");
      expect(data[0].published).toBe(true);
    })
  })
  describe('given new source and publish status', () => {
    it('should be updated with new source and status', async () => {
      const data = await imageController.updateImage("three", {source: "news", published: false})
      expect(data[0].source).toBe("news");
      expect(data[0].published).toBe(false);
      expect(data[0].uploaderId).toBe("one");
    })
  })
  describe('given new uploaderId of user that does not exist', () => {
    it('should throw FKey restraint error (23503)', async () => {
      try{
        await imageController.updateImage("seven", {uploaderId: "admin"})
      } catch (e) {
        expect(e).toMatchObject({code: "23503"});
      }
    })
  })
})

//DELETE
describe('delete image', () => {

})

afterAll(async () => {
  await pool.end();
});