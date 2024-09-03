import * as imageController from '../controller/image'
import { Router } from 'express';

export const imageRouter = Router();
//TODO: Route for published only images
imageRouter.get('/', async (req, res) => {
  try{
    const data = await imageController.getAllImages();
    res.json(data);
  } catch (err) {

  }
});

imageRouter.get('/imageUrl', async (req, res) => {
  res.end();
});

imageRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try{
    const data = await imageController.getImageById(id);
    res.json(data);
  } catch (err) {

  }
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