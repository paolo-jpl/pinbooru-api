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

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}!`));

export { pool }
