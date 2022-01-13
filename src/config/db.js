import pgp from 'pg-promise';
import dotenv from 'dotenv';
import promise from 'bluebird';
import env from './env';

dotenv.config();

const pg = pgp({
  promiseLib: promise,
  noWarnings: true,
});

const db = pg(env.DATABASE_URL);

export default db;
