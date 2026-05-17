'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface MarqueeGalleryProps {
  lang: string;
  isRTL: boolean;
}

const screenshots = [
  {
    src: '/screen-movies.webp',
    ar: 'أفلام ومسلسلات بلا حدود',
    en: 'Unlimited Movies & Series',
  },
  {
    src: '/screen-movie-detail.webp',
    ar: 'تفاصيل الفيلم الكاملة',
    en: 'Full Movie Details',
  },
  {
    src: '/screen-series.webp',
    ar: 'أفضل مسلسلات TV',
    en: 'Top TV Series',
  },
  {
    src: '/screen-series-list.webp',
    ar: 'تصفح المسلسلات بسهولة',
    en: 'Browse Series Easily',
  },
];

const SPEED = 0.7; // pixels per frame

export default function MarqueeGallery({ lang, isRTL }: MarqueeGalleryProps) {
  const setRef = useRef<HTMLDivElement>(null);
  const set2Ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Measure the actual width of one full set INCLUDING the gap after it
  // by measuring the distance from start of set1 to start of set2
  useEffect(() => {
    const measure = () => {
      if (setRef.current && set2Ref.current) {
        const oneSetWidth = set2Ref.current.offsetLeft - setRef.current.offsetLeft;
        if (oneSetWidth > 0) setWidthRef.current = oneSetWidth;
      }
    };
    // Small delay to ensure layout is complete
    const timer = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Animation loop - uses refs only, no state updates for smooth 60fps
  const animate = useCallback(() => {
    if (!isPaused && setWidthRef.current > 0) {
      offsetRef.current += SPEED;

      // Seamless reset: when we've scrolled exactly one set width (including gap),
      // reset back. Since set2 starts where set1+gap ends, and they have identical content,
      // resetting by exactly one set width is completely invisible to the user.
      if (offsetRef.current >= setWidthRef.current) {
        offsetRef.current -= setWidthRef.current;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const renderPhone = (item: typeof screenshots[0], key: string) => (
    <div key={key} className="shrink-0 group">
      <div className="relative w-[160px] sm:w-[190px] md:w-[210px] lg:w-[230px] rounded-[1.4rem] sm:rounded-[1.6rem] border-2 border-ktv-border-light bg-black overflow-hidden shadow-2xl shadow-ktv-red/20 transition-transform duration-500 group-hover:scale-[1.04] group-hover:shadow-ktv-red/40">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[2.2%] bg-black rounded-b-xl z-10" />
        {/* Screenshot */}
        <img
          src={item.src}
          alt={lang === 'ar' ? item.ar : item.en}
          className="w-full h-auto object-cover object-top"
          draggable={false}
        />
        {/* Phone bottom bar */}
        <div className="absolute bottom-0 inset-x-0 h-[2.5%] bg-black/80 flex items-center justify-center z-10">
          <div className="w-[25%] h-[22%] bg-ktv-border rounded-full" />
        </div>
        {/* Hover overlay with label */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 z-20">
          <span className="text-white text-xs sm:text-sm font-semibold px-3 py-1.5 bg-ktv-red/80 rounded-full backdrop-blur-sm">
            {lang === 'ar' ? item.ar : item.en}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-ktv-bg-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-ktv-bg-dark to-transparent z-10 pointer-events-none" />

      {/* Marquee track - forced LTR so translateX(-) always moves right-to-left */}
      <div
        ref={trackRef}
        className="flex items-center gap-5 sm:gap-7 md:gap-9"
        style={{
          direction: 'ltr',
          willChange: 'transform',
        }}
      >
        {/* Set 1 - MEASURED (this is the width we reset at) */}
        <div ref={setRef} className="flex items-center gap-5 sm:gap-7 md:gap-9">
          {screenshots.map((item, i) => renderPhone(item, `s1-${i}`))}
        </div>
        {/* Set 2 - identical, provides seamless continuation */}
        <div ref={set2Ref} className="flex items-center gap-5 sm:gap-7 md:gap-9">
          {screenshots.map((item, i) => renderPhone(item, `s2-${i}`))}
        </div>
        {/* Set 3 - buffer so reset is never visible */}
        <div className="flex items-center gap-5 sm:gap-7 md:gap-9">
          {screenshots.map((item, i) => renderPhone(item, `s3-${i}`))}
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-ktv-red/5 rounded-full blur-[60px] pointer-events-none" />
    </div>
  );
}
