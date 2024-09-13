import * as imageController from '../controller/image'
import { Router } from 'express';
import type { Request, Response } from 'express';

export const imageRouter = Router();

//TODO: Route for published only images
imageRouter.get('/', async (req: Request, res: Response) => {
  const limit:any = req.query.limit ? parseInt(req.query.limit as string) : undefined;
  const page:any = req.query.page ? parseInt(req.query.page as string) : undefined;

  const data = await imageController.getAllImages(undefined, limit, page);
  res.json(data);
});

imageRouter.get('/url', async (req: Request, res: Response) => {
  const limit:any = req.query.limit ? parseInt(req.query.limit as string) : undefined;
  const page:any = req.query.page ? parseInt(req.query.page as string) : undefined;

  const data = await imageController.getAllImages(["id", "imgURL"], limit, page);
  res.json(data);
});

imageRouter.get('/:id', async (req: Request, res: Response) => {
  const data = await imageController.getImageById(req.params.id);
  res.json(data);
});

imageRouter.get('/:id/tags', async (req, res) => {
  const data = await imageController.getImageTags(req.params.id);
  res.json(data);
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