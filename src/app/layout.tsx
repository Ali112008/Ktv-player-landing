import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WHATSAPP_LINK, APP_LINKS, SITE_URL, SOCIAL_LINKS } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SITE_URL is now imported from @/lib/config

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ===== Title & Description =====
  title: {
    default: "KTV Player — عالم الترفيه بين يديك | Best IPTV Streaming App",
    template: "%s | KTV Player",
  },
  description:
    "KTV Player - أفضل تطبيق IPTV لمشاهدة القنوات المباشرة، أحدث الأفلام، والمسلسلات بجودة عالية بدون تقطيع. حمّل الآن لأندرويد، آيفون، والسمارت تيفي. Best IPTV app for live TV, movies & series in HD quality.",
  keywords: [
    // English
    "KTV Player",
    "IPTV",
    "IPTV app",
    "live TV",
    "streaming app",
    "watch movies online",
    "TV series streaming",
    "smart TV app",
    "free streaming",
    "live channels",
    "4K streaming",
    "Arabic TV",
    "Arabic IPTV",
    "Middle East TV",
    // Arabic
    "تطبيق مشاهدة",
    "أفلام أونلاين",
    "مسلسلات",
    "قنوات مباشرة",
    "بث مباشر",
    "مشاهدة مجانية",
    "تطبيق ترفيه",
    "تيفي مباشر",
    "أندرويد تيفي",
    "سمارت تيفي",
  ],
  authors: [{ name: "KTV Player", url: SITE_URL }],
  creator: "KTV Player",
  publisher: "KTV Player",
  category: "Entertainment",

  // ===== Favicon & Icons =====
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/ktv-logo.webp", type: "image/webp" },
    ],
    apple: [
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
  },

  // ===== Open Graph (Facebook, WhatsApp, LinkedIn, etc.) =====
  openGraph: {
    title: "KTV Player — عالم الترفيه بين يديك | Entertainment at Your Fingertips",
    description:
      "شاهد أفضل القنوات المباشرة، أحدث الأفلام، والمسلسلات بجودة عالية بدون تقطيع. حمّل KTV Player الآن مجاناً! Watch the best live channels, movies & series in HD quality.",
    url: SITE_URL,
    siteName: "KTV Player",
    locale: "ar_SA",
    localeAlternate: ["en_US"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1344,
        height: 768,
        alt: "KTV Player — Best IPTV Streaming App for Live TV, Movies & Series",
        type: "image/png",
      },
    ],
  },

  // ===== Twitter / X Card =====
  twitter: {
    card: "summary_large_image",
    site: "@ktvplayer",
    title: "KTV Player — عالم الترفيه بين يديك",
    description:
      "شاهد أفضل القنوات المباشرة، أحدث الأفلام، والمسلسلات بجودة عالية. حمّل KTV Player الآن مجاناً!",
    images: [
      {
        url: "/og-image.png",
        width: 1344,
        height: 768,
        alt: "KTV Player — Best IPTV Streaming App",
      },
    ],
  },

  // ===== App Links (Mobile deep linking) =====
  appLinks: {
    android: {
      package: "com.ktvplayer.ktv",
      app_name: "KTV Player",
    },
    ios: {
      app_store_id: "6764389973",
      app_name: "KTV Player",
    },
  },

  // ===== Robots & Crawling =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ===== Alternates (Canonical + hreflang) =====
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ar-SA": `${SITE_URL}/`,
      "en-US": `${SITE_URL}/`,
    },
  },

  // ===== Verification placeholders (to be filled by client) =====
  verification: {
    // google: "GOOGLE_SITE_VERIFICATION_CODE",
    // yandex: "YANDEX_VERIFICATION_CODE",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for the app
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "KTV Player",
        operatingSystem: "Android, iOS, Smart TV",
        applicationCategory: "EntertainmentApplication",
        description:
          "Best IPTV streaming app for live TV channels, movies, and series in HD & 4K quality with zero buffering.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "50000",
          bestRating: "5",
          worstRating: "1",
        },
        installUrl: APP_LINKS.android,
        screenshot: `${SITE_URL}/og-image.png`,
      },
      {
        "@type": "WebSite",
        name: "KTV Player",
        url: SITE_URL,
        potentialAction: {
          "@type": "DownloadAction",
          target: APP_LINKS.android,
        },
      },
      {
        "@type": "Organization",
        name: "KTV Player",
        url: SITE_URL,
        logo: `${SITE_URL}/ktv-logo.webp`,
        sameAs: [
          ...Object.values(SOCIAL_LINKS).filter(url => url !== ''),
          WHATSAPP_LINK,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: WHATSAPP_LINK,
        },
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://play.google.com" />
        <link rel="dns-prefetch" href="https://apps.apple.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Apply saved theme before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('ktv-theme');
                if (theme === 'light' || theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', theme);
                } else {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              } catch(e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            `,
          }}
        />

        {/* Pixel tracking placeholder - will be configured by client */}
        {/*
          TODO: Add tracking pixels here before closing head tag:
          - TikTok Pixel: <script> tag from TikTok Ads Manager
          - Snapchat Pixel: <script> tag from Snapchat Ads Manager
          - Meta/Facebook Pixel: <script> tag from Meta Ads Manager
          - Google Analytics: <script> tag from GA4
        */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
