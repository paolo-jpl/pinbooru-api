import * as userController from '../controller/user'
import { Router } from 'express';

export const userRouter = Router();

userRouter.get('/', async (req, res) => {
  res.end();
});

userRouter.get('/:id', async (req, res) => {
  res.end();
});

userRouter.post('/', async (req, res) => {
  res.end();
});

userRouter.put('/:id', async (req, res) => {
  res.end();
});

userRouter.delete('/:id', async (req, res) => {
  res.end();
});