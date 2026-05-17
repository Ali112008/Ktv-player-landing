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
      {/* Slide viewport */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] lg:aspect-[21/8] overflow-hidden rounded-2xl border border-ktv-border bg-ktv-bg-card">
        {/* Background subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-ktv-red/5 via-ktv-bg-card to-ktv-gold/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-ktv-red/5 rounded-full blur-[60px] pointer-events-none" />

        {slides.map((slide, index) => {
          const isActive = index === current;
          const isPrev = index === (current - 1 + total) % total;
          const isNext = index === (current + 1) % total;

          let translateClass = 'translate-x-full opacity-0';
          if (isActive) translateClass = 'translate-x-0 opacity-100';
          else if (isPrev) translateClass = isRTL ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0';
          else if (isNext) translateClass = isRTL ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0';

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all ease-out ${
                isActive ? 'z-10' : 'z-0'
              } ${translateClass}`}
              style={{
                transitionDuration: `${TRANSITION_DURATION}ms`,
              }}
            >
              {/* Phone frame mockup — centered in the wide slider */}
              <div className={`absolute inset-0 flex items-center justify-center ${isActive ? 'rev-phone-enter' : ''}`}>
                <div className="relative w-[22%] sm:w-[18%] md:w-[14%] lg:w-[12%] aspect-[9/19.5] rounded-[1.2rem] sm:rounded-[1.5rem] border-2 border-ktv-border-light bg-black overflow-hidden shadow-2xl shadow-ktv-red/30">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2.5%] bg-black rounded-b-xl z-10" />

                  {/* Screenshot inside phone */}
                  <img
                    src={slide.src}
                    alt={lang === 'ar' ? slide.ar : slide.en}
                    className={`w-full h-full object-cover object-top ${
                      isActive ? 'rev-kenburns' : ''
                    }`}
                    draggable={false}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  {/* Phone bottom bar */}
                  <div className="absolute bottom-0 inset-x-0 h-[3%] bg-black/80 flex items-center justify-center z-10">
                    <div className="w-[30%] h-[25%] bg-ktv-border rounded-full" />
                  </div>
                </div>

                {/* Glow behind phone */}
                <div className="absolute w-[30%] sm:w-[24%] md:w-[18%] lg:w-[16%] aspect-square bg-ktv-red/15 rounded-full blur-[40px] pointer-events-none" />
              </div>

              {/* Text overlay at bottom */}
              <div
                className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 md:p-8 flex flex-col items-center text-center transition-all duration-500 ${
                  isActive
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: isActive ? '200ms' : '0ms' }}
              >
                <span className="text-2xl sm:text-3xl mb-1">{slide.emoji}</span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ktv-text-strong drop-shadow-lg">
                  {lang === 'ar' ? slide.ar : slide.en}
                </h3>
              </div>
            </div>
          );
        })}

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-ktv-bg-dark/60 backdrop-blur-sm border border-ktv-border text-ktv-text hover:bg-ktv-bg-dark/80 hover:border-ktv-red/40 transition-all duration-200 rtl:left-auto rtl:right-2 sm:rtl:right-3"
          aria-label={lang === 'ar' ? 'السابق' : 'Previous'}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-ktv-bg-dark/60 backdrop-blur-sm border border-ktv-border text-ktv-text hover:bg-ktv-bg-dark/80 hover:border-ktv-red/40 transition-all duration-200 rtl:right-auto rtl:left-2 sm:rtl:left-3"
          aria-label={lang === 'ar' ? 'التالي' : 'Next'}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" />
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
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-20">
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
