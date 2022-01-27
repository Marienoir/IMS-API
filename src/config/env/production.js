import 'dotenv/config';

export default {
  DATABASE_URL: process.env.IIMS_API_DATABASE_PROD_URL,
  NODE_ENV: process.env.IMS_API_NODE_ENV,
  TACCESS_TOKEN: process.env.IMS_API_ACCESS_SECRET,
  REFRESH_TOKEN: process.env.IMS_API_REFRESH_SECRET,
};
