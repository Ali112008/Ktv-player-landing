'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  Tv,
  Film,
  Drama,
  Sparkles,
  Zap,
  Diamond,
  ChevronDown,
  MessageCircle,
  ExternalLink,
  Play,
  ArrowUp,
  Menu,
  X,
  Star,
  Download,
  UserPlus,
  MonitorPlay,
} from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import { ThemeProvider } from '@/hooks/useTheme';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';
import LanguageToggle from '@/components/landing/LanguageToggle';
import ThemeToggle from '@/components/landing/ThemeToggle';
import MarqueeGallery from '@/components/landing/MarqueeGallery';

/* ========== CSS-based fade-in on scroll (IntersectionObserver) ========== */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '-30px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ========== Animated Counter Component ========== */
function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const step = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const formatNumber = () => {
    if (suffix === 'K+') {
      return count >= 10000 ? `${Math.round(count / 1000)}K+` : `${count}+`;
    }
    return `${count}${suffix}`;
  };

  return <span ref={ref}>{formatNumber()}</span>;
}

function LandingContent() {
  const { t, isRTL, lang } = useLanguage();

  // ========== Scroll reveal refs ==========
  const revealHero = useScrollReveal();
  const revealShowcase = useScrollReveal();
  const revealHowItWorks = useScrollReveal();
  const revealFeatures = useScrollReveal();
  const revealGallery = useScrollReveal();
  const revealTestimonials = useScrollReveal();
  const revealDownload = useScrollReveal();

  // ========== Mobile menu state ==========
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ========== Scroll-to-top visibility + Navbar scroll style ==========
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          setShowScrollTop(window.scrollY > scrollHeight * 0.5);
          // Navbar scroll style
          const nav = document.getElementById('main-nav');
          if (nav) {
            if (window.scrollY > 50) {
              nav.classList.add('nav-scrolled');
            } else {
              nav.classList.remove('nav-scrolled');
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const features = [
    {
      icon: Tv,
      title: t('feature1Title'),
      desc: t('feature1Desc'),
      color: 'from-red-500 to-red-700',
      emoji: '📺',
    },
    {
      icon: Film,
      title: t('feature2Title'),
      desc: t('feature2Desc'),
      color: 'from-amber-500 to-amber-700',
      emoji: '🎬',
    },
    {
      icon: Drama,
      title: t('feature3Title'),
      desc: t('feature3Desc'),
      color: 'from-purple-500 to-purple-700',
      emoji: '🎭',
    },
    {
      icon: Sparkles,
      title: t('feature4Title'),
      desc: t('feature4Desc'),
      color: 'from-cyan-500 to-cyan-700',
      emoji: '✨',
    },
    {
      icon: Zap,
      title: t('feature5Title'),
      desc: t('feature5Desc'),
      color: 'from-yellow-500 to-yellow-700',
      emoji: '⚡',
    },
    {
      icon: Diamond,
      title: t('feature6Title'),
      desc: t('feature6Desc'),
      color: 'from-rose-500 to-rose-700',
      emoji: '💎',
    },
  ];

  const testimonials = [
    {
      name: 'Ahmed',
      country: '🇲🇦',
      avatar: '/avatar-ahmed.png',
      reviewEn: "Best IPTV app I've ever used! The quality is amazing and zero buffering.",
      reviewAr: 'أفضل تطبيق IPTV استخدمته! الجودة مذهلة وبدون أي تقطيع.',
      gradient: 'from-ktv-red to-amber-500',
    },
    {
      name: 'Sarah',
      country: '🇸🇦',
      avatar: '/avatar-sarah.png',
      reviewEn: 'Finally an app that has everything. Movies, series, live TV - all in one place.',
      reviewAr: 'أخيراً تطبيق فيه كل شيء. أفلام ومسلسلات وقنوات مباشرة - كلهم في مكان واحد.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Omar',
      country: '🇦🇪',
      avatar: '/avatar-omar.png',
      reviewEn: "The 4K quality is incredible. It's like having a cinema in my pocket!",
      reviewAr: 'جودة 4K مذهلة. كأنني أحمل سينما في جيبي!',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Fatima',
      country: '🇪🇬',
      avatar: '/avatar-fatima.png',
      reviewEn: 'I canceled my cable subscription after trying KTV Player. Way more content for a fraction of the price!',
      reviewAr: 'ألغيت اشتراك الكابل بعد ما جربت KTV Player. محتوى أكثر بكثير بسعر أقل بكثير!',
      gradient: 'from-rose-500 to-orange-500',
    },
    {
      name: 'Khalid',
      country: '🇰🇼',
      avatar: '/avatar-khalid.png',
      reviewEn: 'The interface is so clean and easy to use. My whole family loves it, even the kids can navigate it!',
      reviewAr: 'الواجهة نظيفة وسهلة الاستخدام. عائلتي كلها تحبه، حتى الأطفال يقدرون يستخدمونه!',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      icon: Download,
      title: lang === 'ar' ? 'حمّل التطبيق' : 'Download the App',
      desc: lang === 'ar' ? 'حمّل KTV Player من Google Play أو App Store في ثواني' : 'Download KTV Player from Google Play or App Store in seconds',
      color: 'from-green-500 to-emerald-600',
      emoji: '📲',
    },
    {
      step: 2,
      icon: UserPlus,
      title: lang === 'ar' ? 'سجّل حسابك' : 'Create Your Account',
      desc: lang === 'ar' ? 'أنشئ حسابك بسهولة وابدأ تجربتك المجانية' : 'Create your account easily and start your free trial',
      color: 'from-blue-500 to-indigo-600',
      emoji: '👤',
    },
    {
      step: 3,
      icon: MonitorPlay,
      title: lang === 'ar' ? 'استمتع بالمشاهدة' : 'Enjoy Watching',
      desc: lang === 'ar' ? 'استمتع بآلاف الأفلام والمسلسلات والقنوات المباشرة' : 'Enjoy thousands of movies, series, and live channels',
      color: 'from-ktv-red to-rose-600',
      emoji: '🎬',
    },
  ];

  // Close mobile menu and smooth scroll to section
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 64;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 200);
  }, []);

  const handleDesktopNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const navHeight = 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <div
      className={`min-h-screen bg-ktv-bg-dark text-ktv-text overflow-x-hidden ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Navigation Bar */}
      <nav id="main-nav" className="fixed top-0 left-0 right-0 z-40 bg-ktv-bg-dark/80 backdrop-blur-xl border-b border-ktv-border-faint transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/ktv-logo.webp"
                alt="KTV Player"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
              />
              <span className="text-lg sm:text-xl font-bold">
                KTV <span className="text-ktv-red">Player</span>
              </span>
            </div>

            {/* Nav Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                onClick={(e) => handleDesktopNavClick(e, 'features')}
                className="text-ktv-text-secondary hover:text-ktv-text transition-colors text-sm cursor-pointer"
              >
                {t('navFeatures')}
              </a>
              <a
                href="#download"
                onClick={(e) => handleDesktopNavClick(e, 'download')}
                className="text-ktv-text-secondary hover:text-ktv-text transition-colors text-sm cursor-pointer"
              >
                {t('navDownload')}
              </a>
              <a
                href="https://wa.me/212602251813"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ktv-text-secondary hover:text-ktv-text transition-colors text-sm flex items-center gap-1"
              >
                {t('navContact')}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Right side: toggles + hamburger */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>

              <button
                className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg bg-ktv-surface hover:bg-ktv-surface-hover border border-ktv-border-faint transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-ktv-text" />
                ) : (
                  <Menu className="w-5 h-5 text-ktv-text" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========== MOBILE HAMBURGER MENU ========== */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-ktv-bg-dark/95 backdrop-blur-xl border-b border-ktv-border-faint animate-fade-in">
            <div className="px-4 py-4 flex flex-col gap-3">
              <a
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-ktv-text-secondary hover:text-ktv-text transition-colors text-sm py-2 cursor-pointer"
              >
                {t('navFeatures')}
              </a>
              <a
                href="#download"
                onClick={(e) => handleNavClick(e, 'download')}
                className="text-ktv-text-secondary hover:text-ktv-text transition-colors text-sm py-2 cursor-pointer"
              >
                {t('navDownload')}
              </a>
              <a
                href="https://wa.me/212602251813"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-ktv-text-secondary hover:text-ktv-text transition-colors text-sm py-2 flex items-center gap-1"
              >
                {t('navContact')}
                <ExternalLink className="w-3 h-3" />
              </a>
              <div className="flex items-center gap-2 pt-2 border-t border-ktv-border-faint">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section
        ref={revealHero}
        className="relative min-h-screen flex flex-col items-center justify-center hero-bg pt-20 pb-10 scroll-reveal"
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ktv-bg-dark/50 to-ktv-bg-dark z-[1]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ktv-red/5 via-transparent to-ktv-gold/5 z-[1]" />

        {/* Decorative blurred circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 bg-ktv-red/10 rounded-full blur-[40px] will-change-transform" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-ktv-gold/10 rounded-full blur-[30px] will-change-transform" />

        {/* Hero sparkles */}
        <div className="hero-sparkle z-[2]" />
        <div className="hero-sparkle z-[2]" />
        <div className="hero-sparkle z-[2]" />
        <div className="hero-sparkle z-[2]" />
        <div className="hero-sparkle z-[2]" />
        <div className="hero-sparkle z-[2]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Logo */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-ktv-red/20 rounded-3xl blur-lg" />
              <img
                src="/ktv-logo.webp"
                alt="KTV Player"
                className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-2xl drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-shimmer">KTV</span>
            <span className="text-ktv-text"> — </span>
            <br className="sm:hidden" />
            <span className="text-ktv-text-strong">
              {lang === 'ar' ? 'عالم الترفيه بين يديك' : 'Entertainment at Your Fingertips'}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl text-ktv-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            {t('heroSubtitle')}
          </p>

          {/* Urgency Badge */}
          <div
            className="flex justify-center mb-4 sm:mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ktv-surface/80 backdrop-blur border border-ktv-red/20 text-xs sm:text-sm text-ktv-text-secondary animate-pulse-subtle">
              {lang === 'ar' ? '🔥 انضم لأكتر من 50,000 مستخدم نشط' : '🔥 Join 50,000+ Active Users'}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.ktvplayer.ktv"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-ktv-red hover:bg-ktv-red-light text-white font-bold text-base sm:text-lg transition-all duration-300 red-glow glow-pulse hover:scale-105"
            >
              <Play className="w-5 h-5" fill="white" />
              {t('heroCta')}
            </a>
            <a
              href="https://wa.me/212602251813"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-ktv-surface hover:bg-ktv-surface-hover border border-ktv-border hover:border-ktv-gold/50 text-ktv-text font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              {t('heroContact')}
            </a>
          </div>

          {/* Social Proof Badge */}
          <a
            href="#testimonials"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('testimonials');
              if (el) {
                const navHeight = 64;
                const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
            className="group mt-5 sm:mt-6 inline-flex items-center gap-2 text-ktv-text-muted hover:text-ktv-gold transition-colors duration-300 text-xs sm:text-sm cursor-pointer animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-ktv-text-strong">4.9</span>
            <span>/ 5</span>
            <span className="text-ktv-border">—</span>
            <span className="underline decoration-ktv-text-muted/30 group-hover:decoration-ktv-gold/50 underline-offset-2">
              {lang === 'ar' ? 'شوف آراء العملاء' : 'Read Customer Reviews'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="relative z-10 mt-8 sm:mt-12 animate-bounce-slow">
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-ktv-text-ghost" />
        </div>
      </section>

      {/* ==================== SHOWCASE SECTION ==================== */}
      <section ref={revealShowcase} className="relative py-16 sm:py-20 overflow-hidden scroll-reveal">
        <div className="absolute inset-0 bg-gradient-to-r from-ktv-red/5 via-ktv-bg-dark to-ktv-gold/5" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Left - Real App Screenshots in Phone Frames */}
            <div className="flex-1 w-full">
              <div className="relative flex items-center justify-center gap-3 sm:gap-4">
                {/* Phone Frame 1 */}
                <div className="relative w-[42%] float-phone-1 hover:rotate-0 hover:scale-105 transition-transform duration-500">
                  <div className="relative w-full rounded-[1.5rem] border-2 border-ktv-border-light bg-black overflow-hidden shadow-2xl shadow-ktv-red/20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10" />
                    <img
                      src="/screen-movie-detail.webp"
                      alt={lang === 'ar' ? 'تفاصيل الفيلم في KTV Player' : 'Movie Details in KTV Player'}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* Phone Frame 2 (center) */}
                <div className="relative w-[46%] z-10 float-phone-2 hover:scale-105 transition-transform duration-500">
                  <div className="relative w-full rounded-[1.5rem] border-2 border-ktv-border-light bg-black overflow-hidden shadow-2xl shadow-ktv-red/30">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10" />
                    <img
                      src="/screen-series.webp"
                      alt={lang === 'ar' ? 'مسلسلات TV في KTV Player' : 'TV Series in KTV Player'}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-ktv-red/10 rounded-3xl blur-xl -z-10" />
                </div>

                {/* Phone Frame 3 */}
                <div className="relative w-[42%] hidden sm:block float-phone-3 hover:rotate-0 hover:scale-105 transition-transform duration-500">
                  <div className="relative w-full rounded-[1.5rem] border-2 border-ktv-border-light bg-black overflow-hidden shadow-2xl shadow-ktv-red/20">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10" />
                    <img
                      src="/screen-series-list.webp"
                      alt={lang === 'ar' ? 'قائمة المسلسلات في KTV Player' : 'Series List in KTV Player'}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="flex-1 text-center md:text-start">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                {lang === 'ar' ? (
                  <>
                    كل الترفيه{' '}
                    <span className="gradient-text">في مكان واحد</span>
                  </>
                ) : (
                  <>
                    All Entertainment{' '}
                    <span className="gradient-text">in One Place</span>
                  </>
                )}
              </h2>
              <p className="text-ktv-text-muted text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                {lang === 'ar'
                  ? 'مع KTV Player، لن تحتاج لتطبيقات متعددة. كل ما تبحث عنه من ترفيه موجود في تطبيق واحد بتصميم أنيق وسهل الاستخدام. قنوات مباشرة، أفلام، مسلسلات، والمزيد.'
                  : 'With KTV Player, you won\'t need multiple apps. Everything you\'re looking for in entertainment is available in one app with an elegant, easy-to-use design. Live channels, movies, series, and more.'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { target: 500, suffix: '+', label: lang === 'ar' ? 'قناة مباشرة' : 'Live Channels' },
                  { target: 10000, suffix: 'K+', label: lang === 'ar' ? 'فيلم ومسلسل' : 'Movies & Series' },
                  { target: 4, suffix: 'K', label: lang === 'ar' ? 'جودة عالية' : 'HD Quality' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center md:text-start p-3 sm:p-4 rounded-xl bg-ktv-surface border border-ktv-border-faint stagger-child stat-glow"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="text-xl sm:text-2xl font-black text-ktv-red">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs sm:text-sm text-ktv-text-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS SECTION ==================== */}
      <section ref={revealHowItWorks} className="relative py-16 sm:py-20 md:py-24 scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/20 to-ktv-bg-dark" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ktv-red/10 text-ktv-red text-xs sm:text-sm font-semibold mb-4 border border-ktv-red/20">
              {lang === 'ar' ? 'كيف يعمل' : 'How It Works'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  ابدأ في{' '}
                  <span className="gradient-text-red">ثلاث خطوات</span>{' '}
                  بسيطة
                </>
              ) : (
                <>
                  Get Started in{' '}
                  <span className="gradient-text-red">3 Simple</span>{' '}
                  Steps
                </>
              )}
            </h2>
            <p className="text-ktv-text-muted text-base sm:text-lg max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'تجربة KTV Player سهلة وسريعة. حمّل التطبيق وابدأ المشاهدة فوراً'
                : 'Getting started with KTV Player is quick and easy. Download the app and start watching instantly'}
            </p>
          </div>

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="hidden lg:block absolute top-1/2 left-[16.67%] right-[16.67%] h-[2px] -translate-y-1/2 border-t-2 border-dashed border-ktv-border-subtle z-0" />

            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="relative z-10 stagger-child"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-ktv-red/30 p-6 sm:p-7 transition-all duration-300 overflow-hidden cursor-default text-center tilt-card icon-bounce-hover">
                  <div className="absolute inset-0 bg-gradient-to-b from-ktv-red/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex flex-col items-center">
                    <div className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto w-7 h-7 rounded-full bg-ktv-red text-white text-xs font-black flex items-center justify-center shadow-lg">
                      {step.step}
                    </div>

                    <div
                      className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110 icon-target`}
                    >
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-ktv-red transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-ktv-text-dim text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-ktv-red to-ktv-gold transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section ref={revealFeatures} id="features" className="relative py-16 sm:py-20 md:py-28 scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/30 to-ktv-bg-dark" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ktv-red/10 text-ktv-red text-xs sm:text-sm font-semibold mb-4 border border-ktv-red/20">
              {t('featuresTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  تجربة مشاهدة{' '}
                  <span className="gradient-text-red">استثنائية</span> تجمع بين
                  كل ما تحب
                </>
              ) : (
                <>
                  An{' '}
                  <span className="gradient-text-red">Exceptional</span>{' '}
                  Viewing Experience
                </>
              )}
            </h2>
            <p className="text-ktv-text-muted text-base sm:text-lg max-w-2xl mx-auto">
              {t('featuresSubtitle')}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-ktv-red/30 p-6 sm:p-7 transition-all duration-300 overflow-hidden cursor-default text-center stagger-child tilt-card icon-bounce-hover"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-ktv-red/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex flex-col items-center">
                  <div
                    className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110 icon-target`}
                  >
                    <span className="text-2xl sm:text-3xl">{feature.emoji}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-ktv-red transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-ktv-text-dim text-xs sm:text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-ktv-red to-ktv-gold transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* Features CTA */}
          <div className="mt-8 sm:mt-10 text-center stagger-child" style={{ animationDelay: '0.5s' }}>
            <a
              href="#download"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ktv-red hover:bg-ktv-red-light text-white font-bold text-sm sm:text-base transition-all duration-300 red-glow-sm hover:scale-105"
            >
              {lang === 'ar' ? 'جربها بنفسك الآن' : 'Try It Yourself Now'}
              <ChevronDown className="w-4 h-4 rotate-[-90deg] rtl:rotate-90 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ==================== APP GALLERY SECTION ==================== */}
      <section ref={revealGallery} className="relative py-16 sm:py-20 md:py-24 overflow-hidden scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/20 to-ktv-bg-dark" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  لمحة عن{' '}
                  <span className="gradient-text-red">التطبيق</span>
                </>
              ) : (
                <>
                  App{' '}
                  <span className="gradient-text-red">Preview</span>
                </>
              )}
            </h2>
            <p className="text-ktv-text-muted text-base sm:text-lg max-w-xl mx-auto">
              {lang === 'ar'
                ? 'شاهد بنفسك كيف يبدو تطبيق KTV Player من الداخل'
                : 'See for yourself what KTV Player looks like from the inside'}
            </p>
          </div>

          {/* Wide Feature Screenshot */}
          <div className="mb-8 sm:mb-10 stagger-child">
            <div className="relative rounded-2xl border border-ktv-border overflow-hidden shadow-2xl shadow-ktv-red/10 group">
              <img
                src="/screen-features-wide.webp"
                alt={lang === 'ar' ? 'مميزات KTV Player - بث سلس وأفلام ومسلسلات' : 'KTV Player Features - Smooth Streaming, Movies & Series'}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ktv-bg-dark/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Marquee Gallery */}
          <MarqueeGallery lang={lang} isRTL={isRTL} />
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section ref={revealTestimonials} id="testimonials" className="relative py-16 sm:py-20 md:py-24 overflow-hidden scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/20 to-ktv-bg-dark" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ktv-red/10 text-ktv-red text-xs sm:text-sm font-semibold mb-4 border border-ktv-red/20">
              ⭐ {t('testimonialsTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  ماذا يقول{' '}
                  <span className="gradient-text-red">عملاؤنا</span>
                </>
              ) : (
                <>
                  What Our{' '}
                  <span className="gradient-text-red">Customers</span>{' '}
                  Say
                </>
              )}
            </h2>
            <p className="text-ktv-text-muted text-base sm:text-lg max-w-2xl mx-auto">
              {t('testimonialsSubtitle')}
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-ktv-red/20 p-6 sm:p-7 transition-all duration-300 stagger-child"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-ktv-border-subtle group-hover:ring-ktv-red/30 transition-all duration-300">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base text-ktv-text flex items-center gap-1.5">
                      {testimonial.name}
                      <span className="text-base">{testimonial.country}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-ktv-text-dim text-sm sm:text-base leading-relaxed">
                  &ldquo;{lang === 'ar' ? testimonial.reviewAr : testimonial.reviewEn}&rdquo;
                </p>

                <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-ktv-red to-ktv-gold transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DOWNLOAD SECTION ==================== */}
      <section ref={revealDownload} id="download" className="relative py-16 sm:py-20 md:py-28 scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-gold/30 to-transparent" />

        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-ktv-red/5 rounded-full blur-[60px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ktv-gold/10 text-ktv-gold text-xs sm:text-sm font-semibold mb-4 border border-ktv-gold/20">
              {t('downloadTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  حمّل التطبيق{' '}
                  <span className="gradient-text-red">مجاناً</span>
                </>
              ) : (
                <>
                  Download the App for{' '}
                  <span className="gradient-text-red">Free</span>
                </>
              )}
            </h2>
            <p className="text-ktv-text-muted text-base sm:text-lg">
              {t('downloadSubtitle')}
            </p>
            {/* Urgency Text */}
            <p className="mt-3 text-ktv-gold text-sm sm:text-base font-semibold">
              {lang === 'ar' ? '⏰ عرض محدود - اشترك الآن واحصل على شهر مجاني!' : '⏰ Limited Offer - Subscribe now and get 1 month free!'}
            </p>
          </div>

          {/* Download Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Android */}
            <a
              href="https://play.google.com/store/apps/details?id=com.ktvplayer.ktv"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-green-500/40 p-6 sm:p-7 text-center cursor-pointer block overflow-hidden transition-all duration-300 hover:scale-[1.03] animated-border-glow dl-card-shine stagger-child"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 512 512" fill="none">
                    <path d="M49.6 16.7C41.5 21.5 36 30.3 36 40.5V471.5C36 481.7 41.5 490.5 49.6 495.3L49.9 495.6L279.2 256L49.9 16.4L49.6 16.7Z" fill="#2196F3"/>
                    <path d="M370.4 347.2L279.2 256L49.6 495.3C56.2 500 64.8 502.5 74 501.5C83.2 500.5 92.2 496.5 99.5 490.5L370.4 347.2Z" fill="#F44336"/>
                    <path d="M370.4 164.8L99.5 21.5C92.2 15.5 83.2 11.5 74 10.5C64.8 9.5 56.2 12 49.6 16.7L279.2 256L370.4 164.8Z" fill="#4CAF50"/>
                    <path d="M460.8 228.8L370.4 164.8L279.2 256L370.4 347.2L460.8 283.2C474.4 275.2 483.2 263.2 483.2 256C483.2 248.8 474.4 236.8 460.8 228.8Z" fill="#FFC107"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-xs text-ktv-text-faint uppercase tracking-wider">{lang === 'ar' ? 'متاح على' : 'GET IT ON'}</div>
                    <div className="text-base sm:text-lg font-bold text-ktv-text leading-tight">Google Play</div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-green-400 transition-colors duration-300">
                  {t('downloadAndroid')}
                </h3>
                <p className="text-ktv-text-weak text-xs sm:text-sm mb-4">{lang === 'ar' ? 'لأجهزة أندرويد 5.0+' : 'For Android 5.0+'}</p>

                <div className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20 group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {lang === 'ar' ? 'تحميل مجاني' : 'Free Download'}
                </div>
              </div>
            </a>

            {/* iOS */}
            <a
              href="https://apps.apple.com/us/app/ktv-player/id6764389973?l=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-blue-500/40 p-6 sm:p-7 text-center cursor-pointer block overflow-hidden transition-all duration-300 hover:scale-[1.03] animated-border-glow dl-card-shine stagger-child"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <svg className="w-9 h-9 sm:w-10 sm:h-10 text-ktv-text" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.72 12.55 5.72C13.31 5.72 14.8 4.62 16.36 4.8C17.06 4.83 18.92 5.09 20.07 6.83C19.96 6.9 17.62 8.28 17.65 11.14C17.68 14.56 20.6 15.68 20.63 15.69C20.6 15.77 20.15 17.35 19.01 18.98L18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-xs text-ktv-text-faint uppercase tracking-wider">{lang === 'ar' ? 'حمّل من' : 'Download on the'}</div>
                    <div className="text-base sm:text-lg font-bold text-ktv-text leading-tight">App Store</div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-blue-400 transition-colors duration-300">
                  {t('downloadIos')}
                </h3>
                <p className="text-ktv-text-weak text-xs sm:text-sm mb-4">{lang === 'ar' ? 'لأجهزة iPhone و iPad' : 'For iPhone & iPad'}</p>

                <div className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {lang === 'ar' ? 'تحميل مجاني' : 'Free Download'}
                </div>
              </div>
            </a>

            {/* TV */}
            <div
              className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-amber-500/40 p-6 sm:p-7 text-center cursor-pointer sm:col-span-2 lg:col-span-1 overflow-hidden transition-all duration-300 hover:scale-[1.03] animated-border-glow dl-card-shine stagger-child"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-xs text-ktv-text-faint uppercase tracking-wider">{lang === 'ar' ? 'متاح على' : 'AVAILABLE ON'}</div>
                    <div className="text-base sm:text-lg font-bold text-ktv-text leading-tight">Smart TV</div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-amber-400 transition-colors duration-300">
                  {t('downloadTv')}
                </h3>
                <p className="text-ktv-text-weak text-xs sm:text-sm mb-4">{t('downloadTvNote')}</p>

                <div className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-amber-500/10 text-amber-400 text-sm font-bold border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300">
                  <span className="text-ktv-text-muted text-xs">{t('tvAppCode')}:</span>
                  <span className="font-mono tracking-wider">9562862</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-10 sm:mt-14 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/20">
              <p className="text-ktv-text-medium text-base sm:text-lg font-medium">
                📲 {t('heroContact')}
              </p>
              <a
                href="https://wa.me/212602251813"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative py-8 sm:py-12 border-t border-ktv-border-faint">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/ktv-logo.webp"
                alt="KTV Player"
                className="w-8 h-8 rounded-lg"
              />
              <div>
                <span className="font-bold text-sm sm:text-base">
                  KTV <span className="text-ktv-red">Player</span>
                </span>
                <p className="text-ktv-text-ghost text-xs">
                  © 2026 KTV Player. {t('footerRights')}.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-ktv-text-ghost text-xs sm:text-sm">{t('footerFollowUs')}</span>
              <a
                href="https://www.tiktok.com/@ktv2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ktv-surface hover:bg-ktv-surface-hover border border-ktv-border-faint hover:border-ktv-red/30 transition-all duration-300 text-sm text-ktv-text-secondary hover:text-ktv-text"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.22 8.22 0 004.76 1.51V6.84a4.85 4.85 0 01-1-.15z" />
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ========== SCROLL TO TOP BUTTON ========== */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} z-30 w-11 h-11 rounded-full bg-ktv-surface border border-ktv-border hover:bg-ktv-surface-hover hover:border-ktv-red/30 flex items-center justify-center transition-all duration-300 shadow-lg animate-fade-in`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 text-ktv-text" />
        </button>
      )}

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LandingContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
