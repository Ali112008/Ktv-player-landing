/**
 * ============================================================
 *  KTV Player — Redis Configuration (Upstash Redis)
 * ============================================================
 *
 *  Reads from the env vars that Vercel KV integration creates:
 *    KV_REST_API_URL   (= UPSTASH_REDIS_REST_URL)
 *    KV_REST_API_TOKEN (= UPSTASH_REDIS_REST_TOKEN)
 *
 *  Also falls back to UPSTASH_* env vars for local development.
 *  If neither is set, all Redis calls fail gracefully
 *  and the site uses hardcoded defaults.
 * ============================================================
 */

import { Redis } from '@upstash/redis';
import { REDIS_KEY } from './site-config';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  // Vercel KV integration uses KV_REST_API_URL / KV_REST_API_TOKEN
  // Local dev or manual setup may use UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn('[redis] Missing KV_REST_API_URL or KV_REST_API_TOKEN — using defaults');
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
