import dotenv from 'dotenv';
dotenv.config()

import { Pool } from 'pg';
import { app } from './app';

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: parseInt(process.env.DBPORT as string),
});

const PORT = process.env.PORT;

if (process.env.NODE_ENV !== 'test') { //prevent port collision on tests
  app.listen(PORT, () => console.log(`Express - Listening on port ${PORT}!`));
}

export { pool }
