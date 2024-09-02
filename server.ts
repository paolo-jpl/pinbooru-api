import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
dotenv.config()

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DBPORT as string),
});

import { tagsRouter } from './routes/tags';
import { imageRouter } from './routes/image';
import { userRouter } from './routes/user';

const app = express();
const PORT = process.env.PORT;

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

app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}!`));

export { pool }
