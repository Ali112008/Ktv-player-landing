'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface AutoScrollGalleryProps {
  lang: string;
  isRTL: boolean;
}

const galleryItems = [
  {
    src: '/screen-movies.webp',
    ar: '📺 أفلام ومسلسلات بلا حدود',
    en: '📺 Unlimited Movies & Series',
  },
  {
    src: '/screen-movie-detail.webp',
    ar: '🎬 تفاصيل الفيلم الكاملة',
    en: '🎬 Full Movie Details',
  },
  {
    src: '/screen-series.webp',
    ar: '🎭 أفضل مسلسلات TV',
    en: '🎭 Top TV Series',
  },
  {
    src: '/screen-series-list.webp',
    ar: '📱 تصفح المسلسلات',
    en: '📱 Browse Series',
  },
];

export default function AutoScrollGallery({ lang, isRTL }: AutoScrollGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animFrameRef = useRef<number>(0);
  const scrollPosRef = useRef(0);
  const speed = 0.6; // pixels per frame (~60fps)

  const tick = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (!isPaused) {
      // In RTL, scroll from right to left (same visual direction)
      // In LTR, scroll from right to left too
      scrollPosRef.current += speed;

      // When we've scrolled past the first set, reset seamlessly
      const halfWidth = el.scrollWidth / 2;
      if (scrollPosRef.current >= halfWidth) {
        scrollPosRef.current -= halfWidth;
      }

      el.style.transform = `translateX(${-scrollPosRef.current}px)`;
    }

    animFrameRef.current = requestAnimationFrame(tick);
  }, [isPaused]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [tick]);

  const renderCard = (item: typeof galleryItems[0], index: number) => (
    <div key={index} className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px]">
      <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-xl shadow-ktv-red/5 bg-ktv-bg-card group/card transition-all duration-500 hover:border-ktv-red/30 hover:shadow-ktv-red/20">
        <img
          src={item.src}
          alt={lang === 'ar' ? item.ar : item.en}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover/card:scale-105"
          draggable={false}
        />
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-white/80 text-xs sm:text-sm font-medium">
            {lang === 'ar' ? item.ar : item.en}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-ktv-bg-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-ktv-bg-dark to-transparent z-10 pointer-events-none" />

      {/* Scroll viewport */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollerRef}
          className="flex gap-4 sm:gap-6 will-change-transform"
        >
          {/* Original set */}
          {galleryItems.map((item, i) => renderCard(item, i))}
          {/* Duplicate set for seamless loop */}
          {galleryItems.map((item, i) => renderCard(item, i + 100))}
        </div>
      </div>

      {/* Pause indicator */}
      <div className={`flex items-center justify-center mt-3 transition-opacity duration-300 ${isPaused ? 'opacity-60' : 'opacity-0'}`}>
        <span className="text-white/30 text-[10px] sm:text-xs flex items-center gap-1.5">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            {isPaused ? (
              <>
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </>
            ) : (
              <polygon points="5,3 19,12 5,21" />
            )}
          </svg>
          {isPaused
            ? (lang === 'ar' ? 'متوقف - حرك الماوس للخارج للاستمرار' : 'Paused - move cursor away to resume')
            : (lang === 'ar' ? 'يتحرك تلقائياً' : 'Auto-scrolling')}
        </span>
      </div>
    </motion.div>
  );
}
