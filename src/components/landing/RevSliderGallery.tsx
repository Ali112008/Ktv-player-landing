'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RevSliderGalleryProps {
  lang: string;
  isRTL: boolean;
}

const slides = [
  {
    src: '/screen-movies.webp',
    ar: 'أفلام ومسلسلات بلا حدود',
    en: 'Unlimited Movies & Series',
    emoji: '📺',
  },
  {
    src: '/screen-movie-detail.webp',
    ar: 'تفاصيل الفيلم الكاملة',
    en: 'Full Movie Details',
    emoji: '🎬',
  },
  {
    src: '/screen-series.webp',
    ar: 'أفضل مسلسلات TV',
    en: 'Top TV Series',
    emoji: '🎭',
  },
  {
    src: '/screen-series-list.webp',
    ar: 'تصفح المسلسلات بسهولة',
    en: 'Browse Series Easily',
    emoji: '📱',
  },
];

const AUTO_PLAY_INTERVAL = 4500;
const TRANSITION_DURATION = 600;

export default function RevSliderGallery({ lang, isRTL }: RevSliderGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    goTo(isRTL ? (current - 1 + total) % total : (current + 1) % total);
  }, [current, total, goTo, isRTL]);

  const goPrev = useCallback(() => {
    goTo(isRTL ? (current + 1) % total : (current - 1 + total) % total);
  }, [current, total, goTo, isRTL]);

  // Auto-play
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(goNext, AUTO_PLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goNext]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev();
      else goNext();
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null) e.preventDefault();
  };

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* Slider container — portrait-friendly with phone frame */}
      <div className="relative w-full max-w-sm sm:max-w-md mx-auto overflow-hidden rounded-3xl border-2 border-ktv-border-light bg-black shadow-2xl shadow-ktv-red/20">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl z-30" />

        {/* Slide viewport */}
        <div className="relative w-full aspect-[9/18] sm:aspect-[9/17] overflow-hidden">
          {slides.map((slide, index) => {
            const isActive = index === current;

            // Calculate offset for sliding transition
            const offset = index - current;
            let translateX = '0';
            let opacity = '1';
            if (offset < 0) {
              translateX = isRTL ? '100%' : '-100%';
              opacity = '0';
            } else if (offset > 0) {
              translateX = isRTL ? '-100%' : '100%';
              opacity = '0';
            }

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all ease-out ${
                  isActive ? 'z-10' : 'z-0'
                }`}
                style={{
                  transform: `translateX(${translateX})`,
                  opacity,
                  transitionDuration: `${TRANSITION_DURATION}ms`,
                }}
              >
                <img
                  src={slide.src}
                  alt={lang === 'ar' ? slide.ar : slide.en}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Gradient overlay at bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-ktv-bg-dark/90 via-ktv-bg-dark/30 to-transparent pointer-events-none" />

                {/* Text overlay */}
                <div
                  className={`absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-500 ${
                    isActive
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: isActive ? '200ms' : '0ms' }}
                >
                  <span className="text-2xl sm:text-3xl mb-1">{slide.emoji}</span>
                  <h3 className="text-base sm:text-lg font-bold text-ktv-text-strong drop-shadow-lg">
                    {lang === 'ar' ? slide.ar : slide.en}
                  </h3>
                </div>
              </div>
            );
          })}

          {/* Navigation arrows */}
          <button
            onClick={goPrev}
            className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-ktv-bg-dark/60 backdrop-blur-sm border border-ktv-border text-ktv-text hover:bg-ktv-bg-dark/80 hover:border-ktv-red/40 transition-all duration-200 rtl:left-auto rtl:right-1.5 sm:rtl:right-2"
            aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-ktv-bg-dark/60 backdrop-blur-sm border border-ktv-border text-ktv-text hover:bg-ktv-bg-dark/80 hover:border-ktv-red/40 transition-all duration-200 rtl:right-auto rtl:left-1.5 sm:rtl:left-2"
            aria-label={lang === 'ar' ? 'التالي' : 'Next'}
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          {/* Progress bar */}
          <div className="absolute top-0 inset-x-0 z-20 h-[2px] bg-ktv-border-faint">
            <div
              className="h-full bg-gradient-to-r from-ktv-red to-ktv-gold transition-all ease-linear"
              style={{
                width: isPaused ? `${((current + 1) / total) * 100}%` : '100%',
                transitionDuration: isPaused ? '0ms' : `${AUTO_PLAY_INTERVAL}ms`,
                transitionProperty: 'width',
              }}
              key={isPaused ? `paused-${current}` : `playing-${current}`}
            />
          </div>
        </div>

        {/* Phone bottom bar */}
        <div className="relative h-6 bg-black flex items-center justify-center z-30">
          <div className="w-1/3 h-1 bg-ktv-border rounded-full" />
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? 'w-8 h-2.5 bg-ktv-red'
                : 'w-2.5 h-2.5 bg-ktv-border hover:bg-ktv-text-muted'
            }`}
            aria-label={lang === 'ar' ? `الانتقال للشريحة ${index + 1}` : `Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute top-9 right-3 rtl:right-auto rtl:left-3 z-30">
          <span className="flex items-center gap-1 text-ktv-text-ghost text-[10px] sm:text-xs bg-ktv-bg-dark/50 backdrop-blur-sm px-2 py-1 rounded-full">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            {lang === 'ar' ? 'متوقف' : 'Paused'}
          </span>
        </div>
      )}
    </div>
  );
}
