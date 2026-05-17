'use client';

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

export default function MarqueeGallery({ lang, isRTL }: MarqueeGalleryProps) {
  // 4 copies: 2 visible + 2 offscreen for seamless infinite loop
  const items = [...screenshots, ...screenshots, ...screenshots, ...screenshots];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-ktv-bg-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-ktv-bg-dark to-transparent z-10 pointer-events-none" />

      {/* Marquee track */}
      <div
        className={`flex items-center gap-5 sm:gap-7 md:gap-9 marquee-track ${
          isRTL ? 'marquee-rtl' : 'marquee-ltr'
        }`}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="shrink-0 group"
          >
            {/* Phone frame */}
            <div className="relative w-[160px] sm:w-[190px] md:w-[210px] lg:w-[230px] rounded-[1.4rem] sm:rounded-[1.6rem] border-2 border-ktv-border-light bg-black overflow-hidden shadow-2xl shadow-ktv-red/20 transition-transform duration-500 group-hover:scale-[1.04] group-hover:shadow-ktv-red/40">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[2.2%] bg-black rounded-b-xl z-10" />

              {/* Screenshot */}
              <img
                src={item.src}
                alt={lang === 'ar' ? item.ar : item.en}
                className="w-full h-auto object-cover object-top"
                draggable={false}
                loading={index < screenshots.length ? 'eager' : 'lazy'}
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
        ))}
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-ktv-red/5 rounded-full blur-[60px] pointer-events-none" />
    </div>
  );
}
