/**
 * ============================================================
 *  KTV Player — Centralized Configuration
 * ============================================================
 *
 *  This file provides TWO ways to access config:
 *
 *  1. Static exports (DEFAULT values) — used for SSR/SSG at build time
 *  2. getSiteConfig() — reads from Upstash Redis at runtime,
 *     falls back to defaults if Redis is unavailable
 *
 *  The Admin page at /admin lets the client edit these
 *  values from the browser without touching any code.
 * ============================================================
 */

import { DEFAULT_CONFIG, SiteConfig } from './site-config';
import { getConfigFromRedis } from './redis';

// ─── Static exports (defaults, always available) ──────────
export const WHATSAPP_NUMBER = DEFAULT_CONFIG.whatsappNumber;
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const SOCIAL_LINKS = {
  tiktok: DEFAULT_CONFIG.tiktok,
  instagram: DEFAULT_CONFIG.instagram,
  snapchat: DEFAULT_CONFIG.snapchat,
  facebook: DEFAULT_CONFIG.facebook,
  youtube: DEFAULT_CONFIG.youtube,
  twitter: DEFAULT_CONFIG.twitter,
} as const;

export const ACTIVE_SOCIAL_LINKS = Object.entries(SOCIAL_LINKS)
  .filter(([, url]) => url !== '')
  .map(([platform, url]) => ({ platform, url }));

export const APP_LINKS = {
  android: DEFAULT_CONFIG.androidLink,
  ios: DEFAULT_CONFIG.iosLink,
} as const;

export const TV_APP_CODE = DEFAULT_CONFIG.tvAppCode;
export const SITE_URL = DEFAULT_CONFIG.siteUrl;
export const PROJECT_VERSION = '1.0.0';

// ─── Dynamic config loader ────────────────────────────────
// Call this in server components / API routes to get the
// latest config from Redis (with fallback to defaults)

let cachedConfig: SiteConfig | null = null;
let cacheTime = 0;
const CACHE_TTL = 30_000; // 30 seconds cache

export async function getSiteConfig(): Promise<SiteConfig> {
  // Return cached if fresh
  if (cachedConfig && Date.now() - cacheTime < CACHE_TTL) {
    return cachedConfig;
  }

  try {
    const remote = await getConfigFromRedis<Partial<SiteConfig>>();
    if (remote) {
      cachedConfig = { ...DEFAULT_CONFIG, ...remote };
      cacheTime = Date.now();
      return cachedConfig;
    }
  } catch {
    // fall through to defaults
  }

  cachedConfig = DEFAULT_CONFIG;
  cacheTime = Date.now();
  return cachedConfig;
}

// ─── Helper to derive computed values from config ──────────
export function deriveFromConfig(config: SiteConfig) {
  return {
    whatsappLink: `https://wa.me/${config.whatsappNumber}`,
    socialLinks: {
      tiktok: config.tiktok,
      instagram: config.instagram,
      snapchat: config.snapchat,
      facebook: config.facebook,
      youtube: config.youtube,
      twitter: config.twitter,
    },
    activeSocialLinks: Object.entries({
      tiktok: config.tiktok,
      instagram: config.instagram,
      snapchat: config.snapchat,
      facebook: config.facebook,
      youtube: config.youtube,
      twitter: config.twitter,
    })
      .filter(([, url]) => url !== '')
      .map(([platform, url]) => ({ platform, url })),
    appLinks: {
      android: config.androidLink,
      ios: config.iosLink,
    },
    tvAppCode: config.tvAppCode,
  };
}
