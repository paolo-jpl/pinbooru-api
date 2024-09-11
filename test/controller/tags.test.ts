import { pool } from '../../server';
import * as tagController from '../../controller/tags';

//Start and rollback transaction for each test
beforeEach(async () => {
  await pool.query('BEGIN')
});

afterEach(async () => {
  await pool.query('ROLLBACK')
});

// READ
describe('get all tags', () => {
  it('should return an array of length 13 (all rows)', async () => {
    const data = await tagController.getAllTags()
    expect(data.length).toBe(13)
    expect(data[1].name).toBe("clothing")
    expect(data[10].name).toBe("original_character")
  })
});

describe('get tag by name', () => {
  describe('given tag name "mech"', () => {
    it('should return tag obj of name "mech"', async () => {
      const data = await tagController.getTagByName("mech")
      expect(data.length).toBe(1)
      expect(data[0]).toEqual({id: 3, name: "mech", category: "content"})
    })
  })

  describe('given tag name that does not exist', () => {
    it('should return array of length 0', async () => {
      const data = await tagController.getTagByName("random")
      expect(data.length).toBe(0)
    })
  })
})

// CREATE
//ASSUMPTION: Can not force assign tag id (autoincrement)
describe('create tag', () => {
  describe('given all tag details', () => {
    it('should return object with matching details', async () => {
      const data = await tagController.createTag("paint", 3)
      expect(data[0]).toMatchObject({name: "paint", categoryId: 3})
    })
  })

  describe('given no optional details', () => {
    it('should return object with default values', async () => {
      const data = await tagController.createTag("action")
      expect(data[0]).toMatchObject({name: "action", categoryId: 1})
    })
  })

  describe('given categoryId that does not exist', () => {
    it('should throw FKey restraint error (23503)', async () => {
      try{
        await tagController.createTag("morning", 4)
      } catch (e) {
        expect(e).toMatchObject({code: "23503"});
      }
    })
  })
})

// UPDATE
describe('update tag', () => {
  describe('given new categoryId', () => {
    it('should return updated with new changes', async () => {
      const data = await tagController.updateTag("anatomy", 2);
      expect(data[0].categoryId).toBe(2)
    })
  })
  describe('given new categoryId that does not exist', () => {
    it('should throw FKey restraint error (23503)', async () => {
      try{
        await tagController.updateTag("anatomy", 4)
      } catch (e) {
        expect(e).toMatchObject({code: "23503"});
      }
    })
  })
})

//DELETE
describe('delete tag', () => {
  describe('given tag "mech"', () => {
    it('should have tag "mech" removed from list of tags', async () => {
      let data = await tagController.deleteTag("mech");
      expect(data[0].name).toBe("mech")
      expect(data[0].categoryId).toBe(1)

      data = await tagController.getTagByName("mech");
      expect(data.length).toBe(0);
    })
  })
  describe('given tag that does not exist', () => {
    it('should return empty query result', async () => {
      const data = await tagController.deleteTag("random");
      expect(data.length).toBe(0);
    })
  })
})

afterAll(async () => {
  await pool.end();
});