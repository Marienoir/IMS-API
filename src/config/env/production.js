import 'dotenv/config';

export default {
  DATABASE_URL: process.env.IIMS_API_DATABASE_PROD_URL,
  NODE_ENV: process.env.IMS_API_NODE_ENV,
  TOKEN: process.env.IMS_API_TOKEN_KEY,
};
