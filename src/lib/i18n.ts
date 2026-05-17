export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Hero Section
    heroTitle: 'KTV — عالم الترفيه بين يديك',
    heroSubtitle: 'استمتع بأفضل القنوات التلفزيونية، أحدث الأفلام، وأقوى المسلسلات بجودة عالية وبدون تقطيع',
    heroCta: 'حمّل التطبيق الآن',
    heroContact: 'تواصل للاشتراك',

    // Features Section
    featuresTitle: 'لماذا KTV Player؟',
    featuresSubtitle: 'تجربة مشاهدة استثنائية تجمع بين كل ما تحب',
    feature1Title: 'قنوات تلفزيونية مباشرة',
    feature1Desc: 'شاهد أهم القنوات التلفزيونية على الهواء مباشرة من أي مكان في العالم',
    feature2Title: 'أحدث الأفلام',
    feature2Desc: 'مكتبة ضخمة من أحدث الأفلام العالمية والعربية تُحدّث باستمرار',
    feature3Title: 'أقوى المسلسلات',
    feature3Desc: 'تابع أشهر المسلسلات العالمية والعربية بحلقاتها الكاملة',
    feature4Title: 'جودة عالية',
    feature4Desc: 'استمتع بمشاهدة بجودة Full HD و 4K مع دعم للصوت المحيطي',
    feature5Title: 'تشغيل سريع بدون تقطيع',
    feature5Desc: 'تقنية بث متطورة تضمن لك تجربة سلسة بدون أي تأخير',
    feature6Title: 'تجربة مشاهدة مختلفة تماماً',
    feature6Desc: 'واجهة سهلة الاستخدام مصممة خصيصاً لتمنحك أفضل تجربة ترفيهية',

    // Download Section
    downloadTitle: 'حمّل KTV Player الآن',
    downloadSubtitle: 'متاح على جميع أجهزتك المفضلة',
    downloadAndroid: 'تحميل للأندرويد',
    downloadIos: 'تحميل للآيفون',
    downloadTv: 'تحميل للتلفزيون',
    downloadTvNote: 'استخدم رابط التحميل ثم أدخل رقم التطبيق',
    tvAppCode: 'رقم التطبيق',
    orScan: 'أو امسح الكود',

    // WhatsApp
    whatsappTooltip: 'تواصل للاشتراك على الخاص',

    // Footer
    footerRights: 'جميع الحقوق محفوظة',
    footerFollowUs: 'تابعنا على',
    footerTiktok: 'تيك توك',

    // Language
    switchLang: 'English',

    // Nav
    navFeatures: 'المميزات',
    navDownload: 'التحميل',
    navContact: 'تواصل معنا',
  },
  en: {
    // Hero Section
    heroTitle: 'KTV — Entertainment at Your Fingertips',
    heroSubtitle: 'Enjoy the best live TV channels, latest movies, and top series in high quality with no buffering',
    heroCta: 'Download Now',
    heroContact: 'Contact to Subscribe',

    // Features Section
    featuresTitle: 'Why KTV Player?',
    featuresSubtitle: 'An exceptional viewing experience that brings together everything you love',
    feature1Title: 'Live TV Channels',
    feature1Desc: 'Watch the most important TV channels live from anywhere in the world',
    feature2Title: 'Latest Movies',
    feature2Desc: 'A massive library of the latest international and Arabic movies, updated regularly',
    feature3Title: 'Top Series',
    feature3Desc: 'Follow the most popular international and Arabic series with complete episodes',
    feature4Title: 'High Quality',
    feature4Desc: 'Enjoy Full HD and 4K viewing quality with surround sound support',
    feature5Title: 'Fast Playback, No Buffering',
    feature5Desc: 'Advanced streaming technology ensures a smooth experience with zero delay',
    feature6Title: 'A Completely Different Experience',
    feature6Desc: 'A user-friendly interface designed specifically to give you the best entertainment experience',

    // Download Section
    downloadTitle: 'Download KTV Player Now',
    downloadSubtitle: 'Available on all your favorite devices',
    downloadAndroid: 'Download for Android',
    downloadIos: 'Download for iOS',
    downloadTv: 'Download for TV',
    downloadTvNote: 'Use the download link then enter the app code',
    tvAppCode: 'App Code',
    orScan: 'Or scan the code',

    // WhatsApp
    whatsappTooltip: 'Contact us to subscribe',

    // Footer
    footerRights: 'All Rights Reserved',
    footerFollowUs: 'Follow us on',
    footerTiktok: 'TikTok',

    // Language
    switchLang: 'العربية',

    // Nav
    navFeatures: 'Features',
    navDownload: 'Download',
    navContact: 'Contact Us',
  },
} as const;

export type TranslationKey = keyof typeof translations.ar;
