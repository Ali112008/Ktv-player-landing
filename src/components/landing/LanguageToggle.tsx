'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-ktv-surface hover:bg-ktv-surface-hover border border-ktv-border hover:border-ktv-red/50 transition-all duration-300 text-sm font-medium active:scale-95"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-ktv-red" />
      <span className="text-ktv-text-medium">{lang === 'ar' ? 'EN' : 'عربي'}</span>
    </button>
  );
}
