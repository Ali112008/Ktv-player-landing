/**
 * ============================================================
 *  KTV Player — Centralized Configuration
 * ============================================================
 *
 *  صاحب الموقع يقدر يغير أي حاجة من هنا بس:
 *  - رقم الواتساب
 *  - روابط السوشيال ميديا (تيك توك، انستجرام، سناب شات)
 *  - روابط تحميل التطبيق
 *  - رقم التطبيق للتلفزيون
 *
 *  Just change the values below — the whole site will update.
 * ============================================================
 */

// ─── WhatsApp ────────────────────────────────────────────────
// الرقم بدون + أو مسافات (مثال: 212602251813)
export const WHATSAPP_NUMBER = '212602251813';

// رابط الواتساب التلقائي (لا تحتاج تغييره)
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// ─── Social Media ────────────────────────────────────────────
// حط الرابط أو خليه فاضي '' عشان يختفي من الموقع
export const SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@ktv2026',
  instagram: '',     // مثال: 'https://www.instagram.com/ktvplayer'
  snapchat: '',      // مثال: 'https://www.snapchat.com/add/ktvplayer'
} as const;

// روابط السوشيال المفعلة بس (اللي مش فاضية)
export const ACTIVE_SOCIAL_LINKS = Object.entries(SOCIAL_LINKS)
  .filter(([, url]) => url !== '')
  .map(([platform, url]) => ({ platform, url }));

// ─── App Store Links ────────────────────────────────────────
export const APP_LINKS = {
  android: 'https://play.google.com/store/apps/details?id=com.ktvplayer.ktv',
  ios: 'https://apps.apple.com/app/ktv-player/id6764389973',
} as const;

// ─── TV App Code ─────────────────────────────────────────────
export const TV_APP_CODE = '9562862';

// ─── Site URL ────────────────────────────────────────────────
export const SITE_URL = 'https://ktvplayer.com';
