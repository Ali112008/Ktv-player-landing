import { Redis } from '@upstash/redis';
import { REDIS_KEY } from './site-config';

// Create Redis client — uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN env vars
// If these are not set, all Redis calls will throw and we fall back to defaults
let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    console.warn('[redis] Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN — using defaults');
    return null;
  }
  redis = new Redis({ url, token });
  return redis;
}

export async function getConfigFromRedis<T>(): Promise<T | null> {
  try {
    const client = getRedis();
    if (!client) return null;
    const data = await client.get<T>(REDIS_KEY);
    return data;
  } catch (error) {
    console.error('[redis] Failed to read config, using defaults:', error);
    return null;
  }
}

export async function setConfigInRedis<T>(config: T): Promise<boolean> {
  try {
    const client = getRedis();
    if (!client) return false;
    await client.set(REDIS_KEY, JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('[redis] Failed to write config:', error);
    return false;
  }
}
