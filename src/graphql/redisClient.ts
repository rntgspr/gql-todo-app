import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL,
});
client.on("error", (err) => console.log("Redis Client Error", err));

/**
 * wraps a redix function within a connected client;
 * @param callback given callback function
 * @returns such given callback;
 */
const withConnection = async (callback?: any) => {
  if (!client.isOpen) {
    await client.connect();
  }
  return callback ? callback() : null;
};

/**
 * Stores an item on Redis, JSON converted;
 * @param key given item key;
 * @param item givem item data;
 * @returns void;
 */
export const setItem = async (key: string, item: any): Promise<void> => {
  await withConnection();
  await client.set(key, JSON.stringify(item));
  await client.disconnect();
  return void 0;
};

/**
 * Gets a given Redis key value, JSON converted;
 * @param key give key;
 * @returns item object;
 */
export const getItem = async <T>(key: string): Promise<T> => {
  await withConnection();
  const result = await client.get(key);
  await client.disconnect();
  const output = JSON.parse(result ?? "null");
  return output;
};

/**
 * Deletes an item on Redis;
 * @param key given item key;
 * @returns void;
 */
export const delItem = async (key: string): Promise<void> => {
  await withConnection();
  await client.del(key);
  await client.disconnect();
  return void 0;
};
