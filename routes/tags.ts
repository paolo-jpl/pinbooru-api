import * as tagController from '../controller/tags'
import { Router } from 'express';

export const tagsRouter = Router();

tagsRouter.get('/', async (req, res) => {
  res.end();
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