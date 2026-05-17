'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 rtl:right-auto rtl:left-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
    >
      <a
        href="https://wa.me/212602251813"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] transition-all duration-300 shadow-lg whatsapp-pulse"
        aria-label={t('whatsappTooltip')}
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="white" />
        
        {/* Tooltip */}
        <span className="absolute right-full rtl:right-auto rtl:left-full mr-3 rtl:mr-0 rtl:ml-3 whitespace-nowrap bg-[#12121a] text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-white/10">
          {t('whatsappTooltip')}
        </span>
      </a>
    </motion.div>
  );
}
