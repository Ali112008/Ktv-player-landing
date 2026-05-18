/**
 * ============================================================
 *  KTV Player — Dynamic Site Configuration (Upstash Redis)
 * ============================================================
 *
 *  All editable settings are stored here as defaults.
 *  At runtime, the site reads from Upstash Redis first,
 *  and falls back to these defaults if Redis is empty.
 *
 *  The Admin page at /admin lets the client edit these
 *  values from the browser without touching any code.
 * ============================================================
 */

export interface SiteConfig {
  // ─── WhatsApp ─────────────────────────────────
  whatsappNumber: string;

  // ─── Social Media ─────────────────────────────
  tiktok: string;
  instagram: string;
  snapchat: string;
  facebook: string;
  youtube: string;
  twitter: string;

  // ─── App Store Links ──────────────────────────
  androidLink: string;
  iosLink: string;
  tvAppCode: string;

  // ─── Site ─────────────────────────────────────
  siteUrl: string;
  siteTitle: string;
  siteDescription: string;

  // ─── OG Image ─────────────────────────────────
  ogImagePath: string;
}

export const DEFAULT_CONFIG: SiteConfig = {
  whatsappNumber: '212602251813',

  tiktok: 'https://www.tiktok.com/@ktv2026',
  instagram: '',
  snapchat: '',
  facebook: '',
  youtube: '',
  twitter: '',

  androidLink: 'https://play.google.com/store/apps/details?id=com.ktvplayer.ktv',
  iosLink: 'https://apps.apple.com/app/ktv-player/id6764389973',
  tvAppCode: '9562862',

  siteUrl: 'https://ktvplayer.com',
  siteTitle: 'KTV Player — عالم الترفيه بين يديك | Best IPTV Streaming App',
  siteDescription:
    'KTV Player - أفضل تطبيق IPTV لمشاهدة القنوات المباشرة، أحدث الأفلام، والمسلسلات بجودة عالية بدون تقطيع. حمّل الآن لأندرويد، آيفون، والسمارت تيفي.',

  ogImagePath: '/og-image.jpg',
};

// Redis key for site config
export const REDIS_KEY = 'site:config';

// Admin password from env
export const ADMIN_PASSWORD_ENV_KEY = 'ADMIN_PASSWORD';
