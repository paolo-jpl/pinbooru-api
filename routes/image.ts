import { pool } from "../server";
import { Router } from 'express';

export const imageRouter = Router();

imageRouter.get('/', async (req, res) => {
  res.end();
});

imageRouter.get('/imageUrl', async (req, res) => {
  res.end();
});

imageRouter.get('/:id', async (req, res) => {
  res.end();
});

imageRouter.get('/imageUrl/:id', async (req, res) => {
  res.end();
});

//get tags given image
imageRouter.get('/:id/tags', async (req, res) => {
  res.end();
});

imageRouter.post('/', async (req, res) => {
  res.end();
});

imageRouter.put('/:id', async (req, res) => {
  res.end();
});

imageRouter.delete('/:id', async (req, res) => {
  res.end();
});