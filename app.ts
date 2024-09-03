import express from 'express';

import { tagsRouter } from './routes/tags';
import { imageRouter } from './routes/image';
import { userRouter } from './routes/user';

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/user", userRouter);
app.use("/image", imageRouter);
app.use("/tags", tagsRouter);