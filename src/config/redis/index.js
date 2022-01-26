/* eslint-disable no-console */
import { createClient } from 'redis';

const redisPort = process.env.IMS_REDIS_PORT;

export const client = createClient(redisPort);

export const connectRedis = async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
};
