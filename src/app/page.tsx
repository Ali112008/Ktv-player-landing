'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import {
  ChevronDown,
  MessageCircle,
  ExternalLink,
  Play,
  ArrowUp,
  Menu,
  X,
  Star,
} from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';
import LanguageToggle from '@/components/landing/LanguageToggle';
import ThemeToggle from '@/components/landing/ThemeToggle';
import MarqueeGallery from '@/components/landing/MarqueeGallery';
import { WHATSAPP_LINK, APP_LINKS, TV_APP_CODE, ACTIVE_SOCIAL_LINKS } from '@/lib/config';

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

/* ========== Card Spotlight Mouse Tracker ========== */
function useCardSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);
  return ref;
}

/* ========== Typing Text Hook ========== */
function useTypingText(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return { displayed, done, ref };
}

/* ========== Confetti Trigger ========== */
function triggerConfetti(e: React.MouseEvent) {
  const burst = document.createElement('div');
  burst.style.position = 'fixed';
  burst.style.left = e.clientX + 'px';
  burst.style.top = e.clientY + 'px';
  burst.style.pointerEvents = 'none';
  burst.style.zIndex = '9999';
  document.body.appendChild(burst);

  const colors = ['#e00000', '#d4a017', '#ffffff', '#ff2a2a', '#f5c842'];

  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    const angle = (Math.PI * 2 * i) / 25;
    const distance = 60 + Math.random() * 80;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 40;
    const rotate = Math.random() * 720 - 360;
    particle.style.setProperty('--confetti-x', `${x}px`);
    particle.style.setProperty('--confetti-y', `${y}px`);
    particle.style.setProperty('--confetti-rotate', `${rotate}deg`);
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.width = `${4 + Math.random() * 6}px`;
    particle.style.height = `${4 + Math.random() * 6}px`;
    burst.appendChild(particle);
  }

  setTimeout(() => {
    burst.remove();
  }, 1500);
}

function LandingContent() {
  const { t, isRTL, lang } = useLanguage();

  // ========== Scroll reveal refs ==========
  const { isDark } = useTheme();

  const revealHero = useScrollReveal();
  const revealGallery = useScrollReveal();
  const revealDownload = useScrollReveal();
  const revealComparison = useScrollReveal();
  const revealTestimonials = useScrollReveal();
  const revealFaq = useScrollReveal();

  // ========== Card spotlight refs ==========
  const spotlightTestimonials = useCardSpotlight();

  // ========== Mobile menu state ==========
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ========== FAQ accordion state ==========
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ========== Typing text for hero subtitle ==========
  const heroSubtitleText = t('heroSubtitle');
  const { displayed: typedSubtitle, done: typingDone, ref: typingRef } = useTypingText(heroSubtitleText, 40);

  // ========== Scroll-to-top visibility + Navbar scroll style ==========
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          setShowScrollTop(window.scrollY > scrollHeight * 0.5);
          const nav = document.getElementById('main-nav');
          if (nav) {
            if (window.scrollY > 50) {
              nav.classList.add('nav-scrolled');
            } else {
              nav.classList.remove('nav-scrolled');
            }
          }
          const progressBar = document.getElementById('scroll-progress');
          if (progressBar) {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
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

  const faqItems = [
    { q: t('faqQ2'), a: t('faqA2') },
    { q: t('faqQ3'), a: t('faqA3') },
    { q: t('faqQ4'), a: t('faqA4') },
    { q: t('faqQ5'), a: t('faqA5') },
  ];

  const comparisonRows = [
    { feature: t('compPrice'), ktv: '✅', cable: '❌', other: '⚠️' },
    { feature: t('compChannels'), ktv: '✅', cable: '❌', other: '⚠️' },
    { feature: t('compMovies'), ktv: '✅', cable: '❌', other: '⚠️' },
    { feature: t('comp4k'), ktv: '✅', cable: '❌', other: '❌' },
    { feature: t('compNoBuffer'), ktv: '✅', cable: '❌', other: '⚠️' },
    { feature: t('compMultiDevice'), ktv: '✅', cable: '❌', other: '❌' },
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
      {/* Scroll Progress Bar */}
      <div className="scroll-progress" id="scroll-progress" />

      {/* Navigation Bar */}
      <nav
        id="main-nav"
        className="fixed left-0 right-0 z-40 bg-ktv-bg-dark/80 backdrop-blur-xl border-b border-ktv-border-faint transition-all duration-300 top-0"
      >
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
                href="#gallery"
                onClick={(e) => handleDesktopNavClick(e, 'gallery')}
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
                href={WHATSAPP_LINK}
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

        {/* ========== MOBILE HAMBURGER MENU OVERLAY ========== */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-[-1] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* ========== MOBILE HAMBURGER MENU ========== */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-ktv-bg-dark/95 backdrop-blur-xl border-b border-ktv-border-faint">
            <div className="px-4 py-4 flex flex-col gap-3">
              <a
                href="#gallery"
                onClick={(e) => handleNavClick(e, 'gallery')}
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
                href={WHATSAPP_LINK}
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
        </div>
      </nav>


      {/* ==================== HERO SECTION ==================== */}
      <section
        ref={revealHero}
        className="relative min-h-screen flex flex-col items-center justify-center hero-bg pt-20 pb-10 scroll-reveal overflow-hidden"
      >
        {/* Aurora Borealis Effect */}
        <div className="aurora-bg z-[0]" />

        {/* Hero Background Image */}
        <img
          src={isDark ? '/hero-bg-light.jpg' : '/hero-bg-dark.png'}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-[0] hero-bg-image"
          aria-hidden="true"
        />

        {/* Glowing Orbs */}
        <div className="glow-orb glow-orb-1" style={{ top: '15%', left: '10%' }} />
        <div className="glow-orb glow-orb-2" style={{ top: '60%', right: '5%' }} />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ktv-bg-dark/60 to-ktv-bg-dark z-[1]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ktv-red/5 via-transparent to-ktv-gold/5 z-[1]" />

        {/* Decorative blurred circles removed - was covering hero background image */}

        {/* Hero sparkles */}
        <div className="hero-sparkle z-[2]" />
        <div className="hero-sparkle z-[2]" />
        <div className="hero-sparkle z-[2]" />

        {/* Particle dots */}
        <div className="particle particle-1 z-[2]" style={{ top: '25%', left: '20%' }} />
        <div className="particle particle-2 z-[2]" style={{ top: '45%', right: '15%' }} />
        <div className="particle particle-3 z-[2]" style={{ bottom: '30%', left: '40%' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Logo */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-ktv-red/20 rounded-3xl blur-xl scale-110" />
              <img
                src="/ktv-logo.webp"
                alt="KTV Player"
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl drop-shadow-2xl z-10"
              />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-shimmer glitch-text" data-text="KTV">KTV</span>
            <span className="text-ktv-text"> — </span>
            <br className="sm:hidden" />
            <span className="text-ktv-text-strong">
              {lang === 'ar' ? 'عالم الترفيه بين يديك' : 'Entertainment at Your Fingertips'}
            </span>
          </h1>

          {/* Subtitle with Typing Effect */}
          <p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="hero-subtitle-bg">
              <span ref={typingRef} className="typing-text">{typedSubtitle}</span>
              <span className={`typing-cursor-blink ${typingDone ? 'cursor-fade' : ''}`} />
            </span>
          </p>

          {/* Urgency Badge */}
          <div
            className="flex justify-center items-center mb-4 sm:mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ktv-surface/80 backdrop-blur border border-ktv-red/20 text-xs sm:text-sm text-ktv-text-secondary animate-pulse-subtle badge-premium">
              {lang === 'ar' ? '🔥 انضم لأكتر من 50,000 مستخدم نشط' : '🔥 Join 50,000+ Active Users'}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('download');
                if (el) {
                  const navHeight = 64;
                  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-ktv-red hover:bg-ktv-red-light text-white font-bold text-base sm:text-lg transition-all duration-300 red-glow glow-pulse hover:scale-105 magnetic-btn"
            >
              <Play className="w-5 h-5" fill="white" />
              {t('heroCta')}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-whatsapp-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-ktv-surface hover:bg-ktv-surface-hover border border-ktv-border hover:border-ktv-gold/50 text-ktv-text font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 neon-pulse"
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

      {/* ==================== APP GALLERY SECTION ==================== */}
      <section ref={revealGallery} id="gallery" className="relative py-16 sm:py-20 md:py-24 overflow-hidden scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/20 to-ktv-bg-dark grid-pattern" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  لمحة عن{' '}
                  <span className="gradient-text-red glow-highlight">التطبيق</span>
                </>
              ) : (
                <>
                  App{' '}
                  <span className="gradient-text-red glow-highlight">Preview</span>
                </>
              )}
            </h2>
            <p className="text-ktv-text-muted text-base sm:text-lg max-w-xl mx-auto">
              {lang === 'ar'
                ? 'شاهد بنفسك كيف يبدو تطبيق KTV Player من الداخل'
                : 'See for yourself what KTV Player looks like from the inside'}
            </p>
          </div>

          {/* Marquee Gallery */}
          <MarqueeGallery lang={lang} isRTL={isRTL} />
        </div>
      </section>

      {/* ==================== DOWNLOAD SECTION ==================== */}
      <section ref={revealDownload} id="download" className="relative py-16 sm:py-20 md:py-28 scroll-reveal overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-gold/30 to-transparent diagonal-reveal" />

        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-ktv-red/5 rounded-full blur-[60px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ktv-gold/10 text-ktv-gold text-xs sm:text-sm font-semibold mb-4 border border-ktv-gold/20 badge-premium">
              {t('downloadTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  حمّل التطبيق{' '}
                  <span className="gradient-text-red glow-highlight">مجاناً</span>
                </>
              ) : (
                <>
                  Download the App for{' '}
                  <span className="gradient-text-red glow-highlight">Free</span>
                </>
              )}
            </h2>
            <p className="text-ktv-text-muted text-base sm:text-lg">
              {t('downloadSubtitle')}
            </p>
          </div>

          {/* Download Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Android */}
            <div
              className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-green-500/40 p-6 sm:p-7 text-center overflow-hidden transition-all duration-300 hover:scale-[1.03] animated-border-glow dl-card-shine stagger-child hover-lift"
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

                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerConfetti}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20 group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-all duration-300 magnetic-btn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {lang === 'ar' ? 'تحميل مجاني' : 'Free Download'}
                </a>
              </div>
            </div>

            {/* iOS */}
            <div
              className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-blue-500/40 p-6 sm:p-7 text-center overflow-hidden transition-all duration-300 hover:scale-[1.03] animated-border-glow dl-card-shine stagger-child hover-lift"
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

                <a
                  href="https://apps.apple.com/us/app/ktv-player/id6764389973?l=ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={triggerConfetti}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300 magnetic-btn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {lang === 'ar' ? 'تحميل مجاني' : 'Free Download'}
                </a>
              </div>
            </div>

            {/* TV */}
            <div
              className="group relative rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-amber-500/40 p-6 sm:p-7 text-center cursor-pointer sm:col-span-2 lg:col-span-1 overflow-hidden transition-all duration-300 hover:scale-[1.03] animated-border-glow dl-card-shine stagger-child hover-lift"
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
                  <span className="font-mono tracking-wider">{TV_APP_CODE}</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-10 sm:mt-14 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/20 hover-lift">
              <p className="text-ktv-text-medium text-base sm:text-lg font-medium">
                📲 {t('heroContact')}
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#25D366]/20 magnetic-btn"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMPARISON TABLE SECTION ==================== */}
      <section ref={revealComparison} className="relative py-16 sm:py-20 md:py-24 scroll-reveal grid-pattern">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-gold/30 to-transparent diagonal-reveal" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/10 to-ktv-bg-dark" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ktv-gold/10 text-ktv-gold text-xs sm:text-sm font-semibold mb-4 border border-ktv-gold/20 badge-premium">
              ⚡ {t('comparisonTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  <span className="gradient-text-red glow-highlight">قارن بين</span>{' '}
                  الخيارات
                </>
              ) : (
                <>
                  <span className="gradient-text-red glow-highlight">Compare</span>{' '}
                  Options
                </>
              )}
            </h2>
            <p className="text-ktv-text-muted text-base sm:text-lg max-w-xl mx-auto">
              {t('comparisonSubtitle')}
            </p>
          </div>

          {/* Comparison Table */}
          <div className="comparison-wrapper animated-border-glow stagger-child">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="text-ktv-text-secondary">{t('comparisonFeature')}</th>
                  <th className="comparison-highlight">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-ktv-red">{t('comparisonKtv')}</span>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-ktv-red/20 text-ktv-red text-[10px] font-bold uppercase tracking-wider">
                        {t('comparisonBest')}
                      </span>
                    </div>
                  </th>
                  <th className="text-ktv-text-secondary">{t('comparisonCable')}</th>
                  <th className="text-ktv-text-secondary">{t('comparisonOther')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={index}>
                    <td className="text-ktv-text-medium text-xs sm:text-sm">{row.feature}</td>
                    <td className="comparison-highlight text-lg">{row.ktv}</td>
                    <td className="text-lg">{row.cable}</td>
                    <td className="text-lg">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      <section ref={revealTestimonials} id="testimonials" className="relative py-16 sm:py-20 md:py-24 overflow-hidden scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/20 to-transparent diagonal-reveal" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/20 to-ktv-bg-dark" />

        <div ref={spotlightTestimonials} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 card-spotlight">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ktv-red/10 text-ktv-red text-xs sm:text-sm font-semibold mb-4 border border-ktv-red/20 badge-premium">
              ⭐ {t('testimonialsTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  ماذا يقول{' '}
                  <span className="gradient-text-red glow-highlight">عملاؤنا</span>
                </>
              ) : (
                <>
                  What Our{' '}
                  <span className="gradient-text-red glow-highlight">Customers</span>{' '}
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
                className="group relative glass-card rounded-2xl bg-ktv-bg-card border border-ktv-border-subtle hover:border-ktv-red/20 p-6 sm:p-7 transition-all duration-300 animated-border-glow dl-card-shine stagger-child hover-lift"
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

      {/* ==================== FAQ ACCORDION SECTION ==================== */}
      <section ref={revealFaq} className="relative py-16 sm:py-20 md:py-24 scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/20 to-transparent diagonal-reveal" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/10 to-ktv-bg-dark" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-ktv-red/10 text-ktv-red text-xs sm:text-sm font-semibold mb-4 border border-ktv-red/20 badge-premium">
              ❓ {t('faqTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {lang === 'ar' ? (
                <>
                  <span className="gradient-text-red glow-highlight">أسئلة شائعة</span>
                </>
              ) : (
                <>
                  <span className="gradient-text-red glow-highlight">Frequently Asked</span>{' '}
                  Questions
                </>
              )}
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="flex flex-col gap-3">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`faq-item animated-border-glow ${openFaq === index ? 'faq-open' : ''}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left rtl:text-right cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="text-sm sm:text-base font-semibold text-ktv-text-strong">
                    {item.q}
                  </span>
                  <ChevronDown className="w-5 h-5 text-ktv-text-muted faq-chevron" />
                </button>
                <div className="faq-answer">
                  <p className="text-ktv-text-dim text-sm sm:text-base leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
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

            <div className="flex items-center gap-3">
              <span className="text-ktv-text-ghost text-xs sm:text-sm">{t('footerFollowUs')}</span>
              {ACTIVE_SOCIAL_LINKS.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ktv-surface hover:bg-ktv-surface-hover border border-ktv-border-faint hover:border-ktv-red/30 transition-all duration-300 text-sm text-ktv-text-secondary hover:text-ktv-text"
                >
                  {platform === 'tiktok' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.22 8.22 0 004.76 1.51V6.84a4.85 4.85 0 01-1-.15z" />
                    </svg>
                  )}
                  {platform === 'instagram' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  )}
                  {platform === 'snapchat' && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.166 3c.796 0 3.495.223 4.769 3.073.426.925.355 2.477.295 3.725l-.014.278c-.022.42-.04.788-.022 1.016.046.558.254.767.457.81.203.043.51-.06.886-.393a.75.75 0 01.998 1.12c-.563.5-1.177.84-1.794.84-.12 0-.238-.012-.355-.04-.5-.118-.853-.49-1.018-1.056a5.868 5.868 0 01-.133-1.078l-.004-.166c-.028-.668.01-1.348.024-1.933.05-2.09-.09-3.235-.354-3.81C15.083 4.54 13.156 4.5 12.166 4.5h-.332c-.99 0-2.917.04-3.86 2.006-.263.575-.405 1.72-.354 3.81.013.585.052 1.265.024 1.933l-.004.166a5.868 5.868 0 01-.133 1.078c-.165.566-.518.938-1.018 1.055a1.592 1.592 0 01-.355.041c-.617 0-1.231-.34-1.794-.84a.75.75 0 01.998-1.12c.376.333.683.437.886.394.203-.044.411-.253.457-.81.018-.23 0-.597-.022-1.017l-.014-.278c-.06-1.248-.131-2.8.295-3.725C8.663 3.223 11.362 3 12.158 3h.008zM5.907 15.25c.38.358.516.87.349 1.336-.298.833-1.26 1.36-2.138 1.648a.75.75 0 01-.496-1.415c.406-.142.768-.338.992-.527-.316-.14-.676-.347-.898-.654a.75.75 0 011.224-.868c.166.234.536.42.875.518a1.3 1.3 0 00.092-.038zM18.093 15.25c.031.015.062.027.092.038.339-.098.709-.284.875-.518a.75.75 0 011.224.868c-.222.307-.582.514-.898.654.224.19.586.385.992.527a.75.75 0 01-.496 1.415c-.878-.288-1.84-.815-2.138-1.648-.167-.467-.031-.978.349-1.336zM12 18.5c.895 0 1.576.267 2.06.566.244.15.44.32.58.498.123.156.243.37.243.604 0 .207-.085.547-.373.835-.27.27-.734.558-1.47.778A8.303 8.303 0 0112 22.25a8.303 8.303 0 01-1.04-.169c-.736-.22-1.2-.508-1.47-.778-.288-.288-.373-.628-.373-.835 0-.233.12-.448.244-.604.14-.178.335-.347.579-.498.484-.3 1.165-.566 2.06-.566z"/>
                    </svg>
                  )}
                  {t(`footer${platform.charAt(0).toUpperCase() + platform.slice(1)}` as any)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>


      {/* ========== SCROLL TO TOP BUTTON ========== */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-24 ${isRTL ? 'left-6' : 'right-6'} z-30 w-11 h-11 rounded-full bg-ktv-surface border border-ktv-border hover:bg-ktv-surface-hover hover:border-ktv-red/30 flex items-center justify-center transition-all duration-300 shadow-lg animate-fade-in magnetic-btn`}
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
