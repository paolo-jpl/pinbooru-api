import * as tagController from '../controller/tags'
import { Router } from 'express';
import type { Request, Response } from 'express';

export const tagsRouter = Router();

tagsRouter.get('/', async (req: Request, res: Response) => {
  const limit:any = req.query.limit ? parseInt(req.query.limit as string) : undefined;
  const page:any = req.query.page ? parseInt(req.query.page as string) : undefined;

  const data = await tagController.getAllTags(limit, page);
  res.json(data);
});

tagsRouter.get('/:name', async (req: Request, res: Response) => {
  const data = await tagController.getTagByName(req.params.name);
  res.json(data);
});

//get images given tag
tagsRouter.get('/:name/images', async (req, res) => {
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