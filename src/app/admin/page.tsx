'use client';

import { useState, useEffect, useCallback } from 'react';
import { SiteConfig, DEFAULT_CONFIG } from '@/lib/site-config';

// ─── Session constants ──────────────────────────────
const SESSION_KEY = 'ktv_admin_session';

interface AdminSession {
  password: string;
}

function getStoredSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    return session;
  } catch {
    return null;
  }
}

function storeSession(password: string) {
  const session: AdminSession = {
    password,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Field definitions for the form ──────────────────────────
const FIELD_GROUPS = [
  {
    title: '📱 الواتساب',
    titleEn: 'WhatsApp',
    fields: [
      { key: 'whatsappNumber' as keyof SiteConfig, label: 'رقم الواتساب', labelEn: 'WhatsApp Number', placeholder: '212602251813', type: 'text', required: true },
    ],
  },
  {
    title: '🌐 الموقع',
    titleEn: 'Website',
    fields: [
      { key: 'siteUrl' as keyof SiteConfig, label: 'رابط الموقع', labelEn: 'Site URL', placeholder: 'https://ktvplayer.com', type: 'text', required: true },
      { key: 'siteTitle' as keyof SiteConfig, label: 'عنوان الموقع', labelEn: 'Site Title', placeholder: 'KTV Player', type: 'text', required: false },
      { key: 'siteDescription' as keyof SiteConfig, label: 'وصف الموقع', labelEn: 'Site Description', placeholder: '', type: 'textarea', required: false },
      { key: 'ogImagePath' as keyof SiteConfig, label: 'رابط صورة المعاينة (OG)', labelEn: 'OG Image Path', placeholder: '/og-image.jpg', type: 'text', required: false },
    ],
  },
  {
    title: '📸 السوشيال ميديا',
    titleEn: 'Social Media',
    hint: 'سيب فاضي لو مش عايز تعرضه',
    hintEn: 'Leave empty to hide',
    fields: [
      { key: 'tiktok' as keyof SiteConfig, label: 'تيك توك', labelEn: 'TikTok', placeholder: 'https://tiktok.com/@...', type: 'text', required: false },
      { key: 'instagram' as keyof SiteConfig, label: 'انستاجرام', labelEn: 'Instagram', placeholder: 'https://instagram.com/...', type: 'text', required: false },
      { key: 'snapchat' as keyof SiteConfig, label: 'سناب شات', labelEn: 'Snapchat', placeholder: 'https://snapchat.com/add/...', type: 'text', required: false },
      { key: 'facebook' as keyof SiteConfig, label: 'فيسبوك', labelEn: 'Facebook', placeholder: 'https://facebook.com/...', type: 'text', required: false },
      { key: 'youtube' as keyof SiteConfig, label: 'يوتيوب', labelEn: 'YouTube', placeholder: 'https://youtube.com/@...', type: 'text', required: false },
      { key: 'twitter' as keyof SiteConfig, label: 'تويتر / X', labelEn: 'Twitter / X', placeholder: 'https://x.com/...', type: 'text', required: false },
    ],
  },
  {
    title: '📲 روابط التحميل',
    titleEn: 'Download Links',
    fields: [
      { key: 'androidLink' as keyof SiteConfig, label: 'رابط أندرويد', labelEn: 'Android Link', placeholder: 'https://play.google.com/...', type: 'text', required: false },
      { key: 'iosLink' as keyof SiteConfig, label: 'رابط آيفون', labelEn: 'iOS Link', placeholder: 'https://apps.apple.com/...', type: 'text', required: false },
      { key: 'tvAppCode' as keyof SiteConfig, label: 'كود التطبيق للتلفزيون', labelEn: 'TV App Code', placeholder: '9562862', type: 'text', required: false },
    ],
  },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  // ─── Restore session on mount ─────────────────────────
  useEffect(() => {
    const session = getStoredSession();
    if (session) {
      setPassword(session.password);
      setAuthenticated(true);
    }
  }, []);

  // ─── Load config on mount (if authenticated) ──────────────
  const loadConfig = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      if (data.success && data.config) {
        setConfig(data.config);
      }
    } catch {
      setMessage({ type: 'error', text: 'فشل في تحميل الإعدادات' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadConfig();
  }, [authenticated, loadConfig]);

  // ─── Login handler ────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    // Verify password by trying to fetch config with it
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({}), // Just verifying, won't overwrite
      });
      const data = await res.json();
      if (res.status === 401) {
        setMessage({ type: 'error', text: lang === 'ar' ? 'كلمة المرور غلط' : 'Wrong password' });
        return;
      }
      // Password is valid — store session
      storeSession(password);
      setAuthenticated(true);
    } catch {
      setMessage({ type: 'error', text: lang === 'ar' ? 'خطأ في الاتصال' : 'Connection error' });
    }
  };

  // ─── Save handler ─────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(config),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: lang === 'ar' ? 'تم الحفظ بنجاح! ✅' : 'Saved successfully! ✅' });
      } else {
        setMessage({ type: 'error', text: data.error || (lang === 'ar' ? 'فشل في الحفظ' : 'Failed to save') });
      }
    } catch {
      setMessage({ type: 'error', text: lang === 'ar' ? 'خطأ في الاتصال' : 'Connection error' });
    } finally {
      setSaving(false);
    }
  };

  // ─── Update a single field ────────────────────────────────
  const updateField = (key: keyof SiteConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  // ─── Reset to defaults ────────────────────────────────────
  const handleReset = () => {
    if (confirm(lang === 'ar' ? 'هل أنت متأكد؟ هيرجع كل حاجة للافتراضي' : 'Reset all to defaults?')) {
      setConfig(DEFAULT_CONFIG);
    }
  };

  // ─── Logout ────────────────────────────────────────────
  const handleLogout = () => {
    clearSession();
    setAuthenticated(false);
    setPassword('');
  };

  // ─── LOGIN SCREEN ─────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <img src="/ktv-logo.webp" alt="KTV" className="w-16 h-16 rounded-xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-2">لوحة تحكم الموقع</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور / Password"
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a25] border border-[rgba(255,255,255,0.1)] text-white placeholder-gray-500 focus:outline-none focus:border-[#e00000] transition-colors"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#e00000] hover:bg-[#ff2a2a] text-white font-bold transition-colors"
            >
              دخول / Login
            </button>
          </form>
          {message && (
            <div className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium ${
              message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0a0f]/95 backdrop-blur border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/ktv-logo.webp" alt="KTV" className="w-8 h-8 rounded-lg" />
            <span className="font-bold">
              KTV <span className="text-[#e00000]">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-3 py-1.5 rounded-lg bg-[#1a1a25] text-sm text-gray-300 hover:bg-[#252535] transition-colors border border-[rgba(255,255,255,0.06)]"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-[#1a1a25] text-sm text-gray-400 hover:text-red-400 hover:bg-[#252535] transition-colors border border-[rgba(255,255,255,0.06)]"
            >
              {lang === 'ar' ? 'خروج' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Message */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
              message.type === 'success'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="animate-spin w-8 h-8 border-2 border-[#e00000] border-t-transparent rounded-full mx-auto mb-4" />
            {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
          </div>
        ) : (
          <>
            {/* Field Groups */}
            {FIELD_GROUPS.map((group) => (
              <div key={group.title} className="mb-8">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-white">{lang === 'ar' ? group.title : group.titleEn}</h2>
                  {group.hint && (
                    <p className="text-xs text-gray-500 mt-1">
                      {lang === 'ar' ? group.hint : group.hintEn}
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  {group.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm text-gray-300 mb-1.5">
                        {lang === 'ar' ? field.label : field.labelEn}
                        {field.required && <span className="text-red-400 mr-1">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={config[field.key] as string}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl bg-[#1a1a25] border border-[rgba(255,255,255,0.08)] text-white placeholder-gray-600 focus:outline-none focus:border-[#e00000] transition-colors text-sm resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={config[field.key] as string}
                          onChange={(e) => updateField(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-xl bg-[#1a1a25] border border-[rgba(255,255,255,0.08)] text-white placeholder-gray-600 focus:outline-none focus:border-[#e00000] transition-colors text-sm"
                          dir="ltr"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3.5 rounded-xl bg-[#e00000] hover:bg-[#ff2a2a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold transition-colors text-base"
              >
                {saving
                  ? lang === 'ar'
                    ? 'جاري الحفظ...'
                    : 'Saving...'
                  : lang === 'ar'
                    ? '💾 حفظ التغييرات'
                    : '💾 Save Changes'}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3.5 rounded-xl bg-[#1a1a25] hover:bg-[#252535] text-gray-400 hover:text-white font-medium transition-colors border border-[rgba(255,255,255,0.06)] text-sm"
              >
                {lang === 'ar' ? 'إعادة تعيين' : 'Reset'}
              </button>
            </div>

            {/* Hint */}
            <p className="text-xs text-gray-600 mt-4 text-center">
              {lang === 'ar'
                ? 'التغييرات تتنفذ فوراً على الموقع'
                : 'Changes take effect immediately on the site'}
            </p>
          </>
        )}
      </main>
    </div>
  );
}
