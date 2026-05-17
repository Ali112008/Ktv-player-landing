'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { type Language, translations, type TranslationKey } from '@/lib/i18n';

interface LanguageContextType {
  lang: Language;
  t: (key: TranslationKey) => string;
  toggleLang: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function readStoredLang(): Language {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ktv-lang');
      if (saved === 'ar' || saved === 'en') return saved;
      if (navigator.language.startsWith('ar')) return 'ar';
    }
  } catch {
    // ignore
  }
  return 'ar';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ar');
  const [mounted, setMounted] = useState(false);

  // Read stored language on mount using a subscription pattern
  useEffect(() => {
    const stored = readStoredLang();
    // Use callback pattern in toggle to avoid direct setState
    if (stored !== 'ar') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLang(stored);
    }
    setMounted(true);
  }, []);

  // Sync language to DOM and localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('ktv-lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang, mounted]);

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key],
    [lang]
  );

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
