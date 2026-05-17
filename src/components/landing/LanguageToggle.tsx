'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <motion.button
      onClick={toggleLang}
      className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-ktv-red/50 transition-all duration-300 text-sm font-medium"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-ktv-red" />
      <span className="text-white/80">{lang === 'ar' ? 'EN' : 'عربي'}</span>
    </motion.button>
  );
}
