'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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
} from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import ParticleBackground from '@/components/landing/ParticleBackground';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';
import LanguageToggle from '@/components/landing/LanguageToggle';

function LandingContent() {
  const { t, isRTL, lang } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div
      className={`min-h-screen bg-ktv-bg-dark text-white overflow-x-hidden ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-ktv-bg-dark/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/ktv-logo.webp"
                alt="KTV Player"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
              />
              <span className="text-lg sm:text-xl font-bold">
                KTV <span className="text-ktv-red">Player</span>
              </span>
            </motion.div>

            {/* Nav Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                {t('navFeatures')}
              </a>
              <a
                href="#download"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                {t('navDownload')}
              </a>
              <a
                href="https://wa.me/212602251813"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                {t('navContact')}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Language Toggle */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LanguageToggle />
            </motion.div>
          </div>
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section
        ref={heroRef}
        className="relative min-h-[110vh] sm:min-h-[115vh] flex flex-col items-center justify-center hero-bg pt-20 pb-10"
      >
        <ParticleBackground />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ktv-bg-dark/50 to-ktv-bg-dark z-[1]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ktv-red/5 via-transparent to-ktv-gold/5 z-[1]" />

        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-ktv-red/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-ktv-gold/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="mb-6 sm:mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-ktv-red/20 rounded-3xl blur-xl" />
              <img
                src="/ktv-logo.webp"
                alt="KTV Player"
                className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-2xl drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="gradient-text">KTV</span>
            <span className="text-white"> — </span>
            <br className="sm:hidden" />
            <span className="text-white/90">
              {lang === 'ar' ? 'عالم الترفيه بين يديك' : 'Entertainment at Your Fingertips'}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {t('heroSubtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <a
              href="#download"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-ktv-red hover:bg-ktv-red-light text-white font-bold text-base sm:text-lg transition-all duration-300 red-glow hover:scale-105"
            >
              <Play className="w-5 h-5" fill="white" />
              {t('heroCta')}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
            <a
              href="https://wa.me/212602251813"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-ktv-gold/50 text-white font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              {t('heroContact')}
            </a>
          </motion.div>

        </motion.div>

        {/* Scroll indicator - below content */}
        <motion.div
          className="relative z-10 mt-8 sm:mt-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-white/30" />
        </motion.div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="relative py-16 sm:py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/30 to-ktv-bg-dark" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-ktv-red/10 text-ktv-red text-xs sm:text-sm font-semibold mb-4 border border-ktv-red/20"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              {t('featuresTitle')}
            </motion.span>
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
            <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
              {t('featuresSubtitle')}
            </p>
          </motion.div>

          {/* Features Grid - Icon on Top Centered Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative rounded-2xl bg-ktv-bg-card border border-white/[0.06] hover:border-ktv-red/30 p-6 sm:p-7 transition-all duration-500 overflow-hidden cursor-default text-center"
              >
                {/* Hover gradient sweep */}
                <div className="absolute inset-0 bg-gradient-to-b from-ktv-red/[0.07] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex flex-col items-center">
                  {/* Icon - centered on top */}
                  <div
                    className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg mb-4 transition-transform duration-500 group-hover:scale-110`}
                  >
                    <span className="text-2xl sm:text-3xl">{feature.emoji}</span>
                    {/* Glow ring on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Text - centered below icon */}
                  <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-ktv-red transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/45 text-xs sm:text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-ktv-red to-ktv-gold transition-all duration-700" />
              </motion.div>
            ))}
          </motion.div>

          {/* Features CTA */}
          <motion.div
            className="mt-8 sm:mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="#download"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ktv-red hover:bg-ktv-red-light text-white font-bold text-sm sm:text-base transition-all duration-300 red-glow-sm hover:scale-105"
            >
              {lang === 'ar' ? 'جربها بنفسك الآن' : 'Try It Yourself Now'}
              <ChevronDown className="w-4 h-4 rotate-[-90deg] rtl:rotate-90 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==================== SHOWCASE SECTION ==================== */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ktv-red/5 via-ktv-bg-dark to-ktv-gold/5" />
        <div className="absolute inset-0 animate-shimmer" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Left - Real App Screenshots in Phone Frames */}
            <div className="flex-1 w-full">
              <div className="relative flex items-center justify-center gap-3 sm:gap-4">
                {/* Phone Frame 1 - Movie Detail */}
                <motion.div
                  className="relative w-[42%]"
                  initial={{ opacity: 0, x: isRTL ? 30 : -30, rotate: -3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                >
                  <div className="relative w-full rounded-[1.5rem] border-2 border-white/15 bg-black overflow-hidden shadow-2xl shadow-ktv-red/20">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10" />
                    <img
                      src="/screen-movie-detail.webp"
                      alt={lang === 'ar' ? 'تفاصيل الفيلم في KTV Player' : 'Movie Details in KTV Player'}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>

                {/* Phone Frame 2 - Series List (center, slightly forward) */}
                <motion.div
                  className="relative w-[46%] z-10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  whileHover={{ scale: 1.05, zIndex: 20 }}
                >
                  <div className="relative w-full rounded-[1.5rem] border-2 border-white/15 bg-black overflow-hidden shadow-2xl shadow-ktv-red/30">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10" />
                    <img
                      src="/screen-series.webp"
                      alt={lang === 'ar' ? 'مسلسلات TV في KTV Player' : 'TV Series in KTV Player'}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  {/* Glow behind center phone */}
                  <div className="absolute -inset-6 bg-ktv-red/15 rounded-3xl blur-3xl -z-10" />
                </motion.div>

                {/* Phone Frame 3 - Series Grid (behind, tilted) */}
                <motion.div
                  className="relative w-[42%] hidden sm:block"
                  initial={{ opacity: 0, x: isRTL ? -30 : 30, rotate: 3 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                >
                  <div className="relative w-full rounded-[1.5rem] border-2 border-white/15 bg-black overflow-hidden shadow-2xl shadow-ktv-red/20">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10" />
                    <img
                      src="/screen-series-list.webp"
                      alt={lang === 'ar' ? 'قائمة المسلسلات في KTV Player' : 'Series List in KTV Player'}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </motion.div>
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
              <p className="text-white/50 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                {lang === 'ar'
                  ? 'مع KTV Player، لن تحتاج لتطبيقات متعددة. كل ما تبحث عنه من ترفيه موجود في تطبيق واحد بتصميم أنيق وسهل الاستخدام. قنوات مباشرة، أفلام، مسلسلات، والمزيد.'
                  : 'With KTV Player, you won\'t need multiple apps. Everything you\'re looking for in entertainment is available in one app with an elegant, easy-to-use design. Live channels, movies, series, and more.'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { num: '500+', label: lang === 'ar' ? 'قناة مباشرة' : 'Live Channels' },
                  { num: '10K+', label: lang === 'ar' ? 'فيلم ومسلسل' : 'Movies & Series' },
                  { num: '4K', label: lang === 'ar' ? 'جودة عالية' : 'HD Quality' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center md:text-start p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="text-xl sm:text-2xl font-black text-ktv-red">
                      {stat.num}
                    </div>
                    <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== APP GALLERY SECTION ==================== */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/20 to-ktv-bg-dark" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
            <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto">
              {lang === 'ar'
                ? 'شاهد بنفسك كيف يبدو تطبيق KTV Player من الداخل'
                : 'See for yourself what KTV Player looks like from the inside'}
            </p>
          </motion.div>

          {/* Wide Feature Screenshot */}
          <motion.div
            className="mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-ktv-red/10 group">
              <img
                src="/screen-features-wide.webp"
                alt={lang === 'ar' ? 'مميزات KTV Player - بث سلس وأفلام ومسلسلات' : 'KTV Player Features - Smooth Streaming, Movies & Series'}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ktv-bg-dark/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Scrollable Gallery Row */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Gallery container with scroll */}
            <div
              id="app-gallery"
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {/* Screenshot 1 - Movies Promo */}
              <motion.div
                className="flex-shrink-0 w-[260px] sm:w-[300px] snap-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-xl bg-ktv-bg-card group">
                  <img
                    src="/screen-movies.webp"
                    alt={lang === 'ar' ? 'أفلام ومسلسلات بلا حدود' : 'Unlimited Movies & Series'}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">
                      {lang === 'ar' ? '📺 أفلام ومسلسلات بلا حدود' : '📺 Unlimited Movies & Series'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Screenshot 2 - Movie Detail */}
              <motion.div
                className="flex-shrink-0 w-[260px] sm:w-[300px] snap-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-xl bg-ktv-bg-card group">
                  <img
                    src="/screen-movie-detail.webp"
                    alt={lang === 'ar' ? 'تفاصيل الفيلم الكاملة' : 'Full Movie Details'}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">
                      {lang === 'ar' ? '🎬 تفاصيل الفيلم الكاملة' : '🎬 Full Movie Details'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Screenshot 3 - TV Series */}
              <motion.div
                className="flex-shrink-0 w-[260px] sm:w-[300px] snap-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-xl bg-ktv-bg-card group">
                  <img
                    src="/screen-series.webp"
                    alt={lang === 'ar' ? 'أفضل مسلسلات TV' : 'Top TV Series'}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">
                      {lang === 'ar' ? '🎭 أفضل مسلسلات TV' : '🎭 Top TV Series'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Screenshot 4 - Series List */}
              <motion.div
                className="flex-shrink-0 w-[260px] sm:w-[300px] snap-center"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-xl bg-ktv-bg-card group">
                  <img
                    src="/screen-series-list.webp"
                    alt={lang === 'ar' ? 'تصفح المسلسلات' : 'Browse Series'}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-white/80 text-xs sm:text-sm font-medium">
                      {lang === 'ar' ? '📱 تصفح المسلسلات' : '📱 Browse Series'}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Scroll hint arrows */}
            <div className="flex items-center justify-center gap-3 mt-4 sm:hidden">
              <span className="text-white/30 text-xs">
                {lang === 'ar' ? '← اسحب للمزيد →' : '← Swipe for more →'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== DOWNLOAD SECTION ==================== */}
      <section id="download" className="relative py-16 sm:py-20 md:py-28">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-gold/30 to-transparent" />

        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ktv-red/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full bg-ktv-gold/10 text-ktv-gold text-xs sm:text-sm font-semibold mb-4 border border-ktv-gold/20"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              {t('downloadTitle')}
            </motion.span>
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
            <p className="text-white/50 text-base sm:text-lg">
              {t('downloadSubtitle')}
            </p>
          </motion.div>

          {/* Download Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {/* Android */}
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.ktvplayer.ktv"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl bg-ktv-bg-card border border-white/[0.06] hover:border-green-500/40 p-6 sm:p-7 text-center cursor-pointer block overflow-hidden transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03, borderColor: 'rgba(34,197,94,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Google Play Badge Style */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 512 512" fill="none">
                    <path d="M49.6 16.7C41.5 21.5 36 30.3 36 40.5V471.5C36 481.7 41.5 490.5 49.6 495.3L49.9 495.6L279.2 256L49.9 16.4L49.6 16.7Z" fill="#2196F3"/>
                    <path d="M370.4 347.2L279.2 256L49.6 495.3C56.2 500 64.8 502.5 74 501.5C83.2 500.5 92.2 496.5 99.5 490.5L370.4 347.2Z" fill="#F44336"/>
                    <path d="M370.4 164.8L99.5 21.5C92.2 15.5 83.2 11.5 74 10.5C64.8 9.5 56.2 12 49.6 16.7L279.2 256L370.4 164.8Z" fill="#4CAF50"/>
                    <path d="M460.8 228.8L370.4 164.8L279.2 256L370.4 347.2L460.8 283.2C474.4 275.2 483.2 263.2 483.2 256C483.2 248.8 474.4 236.8 460.8 228.8Z" fill="#FFC107"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{lang === 'ar' ? 'متاح على' : 'GET IT ON'}</div>
                    <div className="text-base sm:text-lg font-bold text-white leading-tight">Google Play</div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-green-400 transition-colors duration-300">
                  {t('downloadAndroid')}
                </h3>
                <p className="text-white/35 text-xs sm:text-sm mb-4">{lang === 'ar' ? 'لأجهزة أندرويد 5.0+' : 'For Android 5.0+'}</p>

                {/* CTA Button */}
                <div className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20 group-hover:bg-green-500/20 group-hover:border-green-500/40 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {lang === 'ar' ? 'تحميل مجاني' : 'Free Download'}
                </div>
              </div>
            </motion.a>

            {/* iOS */}
            <motion.a
              href="https://apps.apple.com/us/app/ktv-player/id6764389973?l=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl bg-ktv-bg-card border border-white/[0.06] hover:border-blue-500/40 p-6 sm:p-7 text-center cursor-pointer block overflow-hidden transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03, borderColor: 'rgba(59,130,246,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* App Store Badge Style */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <svg className="w-9 h-9 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.86 9.28 4.84C10.56 4.81 11.78 5.72 12.55 5.72C13.31 5.72 14.8 4.62 16.36 4.8C17.06 4.83 18.92 5.09 20.07 6.83C19.96 6.9 17.62 8.28 17.65 11.14C17.68 14.56 20.6 15.68 20.63 15.69C20.6 15.77 20.15 17.35 19.01 18.98L18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{lang === 'ar' ? 'حمّل من' : 'Download on the'}</div>
                    <div className="text-base sm:text-lg font-bold text-white leading-tight">App Store</div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-blue-400 transition-colors duration-300">
                  {t('downloadIos')}
                </h3>
                <p className="text-white/35 text-xs sm:text-sm mb-4">{lang === 'ar' ? 'لأجهزة iPhone و iPad' : 'For iPhone & iPad'}</p>

                {/* CTA Button */}
                <div className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-blue-500/10 text-blue-400 text-sm font-bold border border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  {lang === 'ar' ? 'تحميل مجاني' : 'Free Download'}
                </div>
              </div>
            </motion.a>

            {/* TV */}
            <motion.div
              className="group relative rounded-2xl bg-ktv-bg-card border border-white/[0.06] hover:border-amber-500/40 p-6 sm:p-7 text-center cursor-pointer sm:col-span-2 lg:col-span-1 overflow-hidden transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Smart TV Badge */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">{lang === 'ar' ? 'متاح على' : 'AVAILABLE ON'}</div>
                    <div className="text-base sm:text-lg font-bold text-white leading-tight">Smart TV</div>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-1.5 group-hover:text-amber-400 transition-colors duration-300">
                  {t('downloadTv')}
                </h3>
                <p className="text-white/35 text-xs sm:text-sm mb-4">{t('downloadTvNote')}</p>

                {/* App Code */}
                <div className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-amber-500/10 text-amber-400 text-sm font-bold border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300">
                  <span className="text-white/50 text-xs">{t('tvAppCode')}:</span>
                  <span className="font-mono tracking-wider">9562862</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* WhatsApp CTA */}
          <motion.div
            className="mt-10 sm:mt-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/20">
              <p className="text-white/70 text-base sm:text-lg font-medium">
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
          </motion.div>
        </div>
      </section>

      {/* ==================== POWERFUL CTA SECTION ==================== */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-ktv-red/10 via-ktv-bg-dark to-ktv-gold/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ktv-bg-dark via-transparent to-ktv-bg-dark" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-ktv-red/8 rounded-full blur-[150px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-ktv-red" />
              <div className="w-2 h-2 rounded-full bg-ktv-red animate-pulse" />
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-ktv-red" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-white/55 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              {t('ctaSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <a
                href="#download"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-ktv-red hover:bg-ktv-red-light text-white font-black text-base sm:text-lg transition-all duration-300 red-glow hover:scale-105"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6" fill="white" />
                {t('ctaDownload')}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </a>
              <a
                href="https://wa.me/212602251813"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-[#25D366]/25"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                {t('ctaWhatsapp')}
              </a>
            </div>

            {/* Trust indicators */}
            <motion.div
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/30 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-ktv-gold" />
                {lang === 'ar' ? 'تحميل فوري' : 'Instant Download'}
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-ktv-gold" />
                {lang === 'ar' ? 'مجاني بالكامل' : 'Completely Free'}
              </span>
              <span className="flex items-center gap-1.5">
                <Diamond className="w-3.5 h-3.5 text-ktv-gold" />
                {lang === 'ar' ? 'بدون إعلانات مزعجة' : 'No Annoying Ads'}
              </span>
            </motion.div>

            {/* Decorative line bottom */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-ktv-gold/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-ktv-gold/50" />
              <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-ktv-gold/50" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative py-8 sm:py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Logo & Copyright */}
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
                <p className="text-white/30 text-xs">
                  © 2025 KTV Player. {t('footerRights')}.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-white/30 text-xs sm:text-sm">{t('footerFollowUs')}</span>
              <a
                href="https://www.tiktok.com/@ktv2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-ktv-red/30 transition-all duration-300 text-sm text-white/60 hover:text-white"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.22 8.22 0 004.76 1.51V6.84a4.85 4.85 0 01-1-.15z" />
                </svg>
                TikTok
              </a>
            </div>
          </div>

          {/* Pixel tracking placeholder */}
          {/* 
            TODO: Add tracking pixels here
            - TikTok Pixel
            - Snapchat Pixel
            - Facebook Pixel (if needed)
          */}
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <LandingContent />
    </LanguageProvider>
  );
}
