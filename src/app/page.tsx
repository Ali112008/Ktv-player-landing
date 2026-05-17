'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Tv,
  Film,
  Drama,
  Sparkles,
  Zap,
  Diamond,
  Smartphone,
  Apple,
  Monitor,
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
        className="relative min-h-screen flex items-center justify-center hero-bg pt-16"
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

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-white/30" />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section id="features" className="relative py-16 sm:py-20 md:py-28">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ktv-red/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ktv-bg-dark via-ktv-bg-card/30 to-ktv-bg-dark" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative rounded-2xl bg-ktv-bg-card border border-white/5 p-6 sm:p-8 card-hover overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ktv-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative mb-4 sm:mb-5">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                    >
                      <span className="text-xl sm:text-2xl">{feature.emoji}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-ktv-red transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              );
            })}
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
            {/* Left - App showcase mockup */}
            <div className="flex-1 w-full">
              <div className="relative max-w-sm mx-auto">
                {/* Phone mockup */}
                <div className="relative w-full aspect-[9/16] rounded-[2rem] border-2 border-white/10 bg-gradient-to-b from-ktv-bg-card to-ktv-bg-dark overflow-hidden shadow-2xl">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 py-2 bg-black/40">
                    <span className="text-xs text-white/50">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2 rounded-sm bg-white/30" />
                      <div className="w-3 h-2 rounded-sm bg-white/20" />
                    </div>
                  </div>

                  {/* App content mockup */}
                  <div className="p-4">
                    {/* Logo area */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-ktv-red flex items-center justify-center">
                        <span className="text-white text-xs font-bold">KTV</span>
                      </div>
                      <span className="text-white/80 text-sm font-semibold">KTV Player</span>
                    </div>

                    {/* Live badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-2 py-0.5 bg-ktv-red rounded text-[10px] text-white font-bold animate-pulse">
                        LIVE
                      </div>
                      <span className="text-white/50 text-xs">
                        {lang === 'ar' ? 'قنوات مباشرة' : 'Live Channels'}
                      </span>
                    </div>

                    {/* Thumbnail grid */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {[
                        'bg-gradient-to-br from-red-900 to-red-700',
                        'bg-gradient-to-br from-amber-900 to-amber-700',
                        'bg-gradient-to-br from-purple-900 to-purple-700',
                        'bg-gradient-to-br from-cyan-900 to-cyan-700',
                      ].map((color, i) => (
                        <div
                          key={i}
                          className={`aspect-video rounded-lg ${color} flex items-center justify-center`}
                        >
                          <Play className="w-4 h-4 text-white/60" />
                        </div>
                      ))}
                    </div>

                    {/* Movie section */}
                    <div className="mb-3">
                      <div className="text-white/60 text-xs mb-2">
                        {lang === 'ar' ? 'أحدث الأفلام' : 'Latest Movies'}
                      </div>
                      <div className="flex gap-2 overflow-hidden">
                        {[0, 1, 3].map((i) => (
                          <div
                            key={i}
                            className="w-14 h-20 rounded-lg bg-gradient-to-b from-gray-700 to-gray-900 flex-shrink-0"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Series section */}
                    <div>
                      <div className="text-white/60 text-xs mb-2">
                        {lang === 'ar' ? 'مسلسلات مميزة' : 'Featured Series'}
                      </div>
                      <div className="flex gap-2 overflow-hidden">
                        {[0, 1, 3].map((i) => (
                          <div
                            key={i}
                            className="w-14 h-20 rounded-lg bg-gradient-to-b from-rose-800 to-rose-950 flex-shrink-0"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-3 bg-black/60 backdrop-blur-sm border-t border-white/5">
                    <Tv className="w-4 h-4 text-ktv-red" />
                    <Film className="w-4 h-4 text-white/30" />
                    <Drama className="w-4 h-4 text-white/30" />
                    <Sparkles className="w-4 h-4 text-white/30" />
                  </div>
                </div>

                {/* Glow effect behind phone */}
                <div className="absolute -inset-4 bg-ktv-red/10 rounded-3xl blur-3xl -z-10" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Android */}
            <motion.a
              href="https://play.google.com/store/apps/details?id=com.ktvplayer.ktv"
              target="_blank"
              rel="noopener noreferrer"
              className="group download-btn rounded-2xl bg-ktv-bg-card border border-white/5 p-6 sm:p-8 text-center cursor-pointer block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 mb-4 shadow-lg">
                <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                {t('downloadAndroid')}
              </h3>
              <p className="text-white/40 text-sm mb-4">Google Play Store</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium border border-green-500/20">
                <ExternalLink className="w-4 h-4" />
                {lang === 'ar' ? 'تحميل مباشر' : 'Direct Download'}
              </div>
            </motion.a>

            {/* iOS */}
            <motion.a
              href="https://apps.apple.com/us/app/ktv-player/id6764389973?l=ar"
              target="_blank"
              rel="noopener noreferrer"
              className="group download-btn rounded-2xl bg-ktv-bg-card border border-white/5 p-6 sm:p-8 text-center cursor-pointer block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 mb-4 shadow-lg">
                <Apple className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                {t('downloadIos')}
              </h3>
              <p className="text-white/40 text-sm mb-4">App Store</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                <ExternalLink className="w-4 h-4" />
                {lang === 'ar' ? 'تحميل مباشر' : 'Direct Download'}
              </div>
            </motion.a>

            {/* TV */}
            <motion.div
              className="group download-btn rounded-2xl bg-ktv-bg-card border border-white/5 p-6 sm:p-8 text-center cursor-pointer sm:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 mb-4 shadow-lg">
                <Monitor className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">
                {t('downloadTv')}
              </h3>
              <p className="text-white/40 text-sm mb-3">{t('downloadTvNote')}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-bold border border-amber-500/20 font-mono">
                {t('tvAppCode')}: 9562862
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
