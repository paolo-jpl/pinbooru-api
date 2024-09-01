import { pool } from "../server";
import { Router } from 'express';

export const tagsRouter = Router();

tagsRouter.get('/', async (req, res) => {
  pool.query('SELECT * FROM "Tag"' , (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
});

tagsRouter.get('/:id', async (req, res) => {
  res.end();
});

//get images given tag
tagsRouter.get('/:id/images', async (req, res) => {
  res.end();
});


tagsRouter.get('/category', async (req, res) => {
  res.end();
});

tagsRouter.post('/', async (req, res) => {
  res.end();
});

tagsRouter.put('/:id', async (req, res) => {
  res.end();
});

tagsRouter.delete('/:id', async (req, res) => {
  res.end();
});