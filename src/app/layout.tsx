import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KTV Player — عالم الترفيه بين يديك | Entertainment at Your Fingertips",
  description:
    "KTV Player - Enjoy live TV channels, latest movies, top series in high quality with no buffering. Download now for Android, iOS, and Smart TVs.",
  keywords: [
    "KTV Player",
    "IPTV",
    "Live TV",
    "Movies",
    "Series",
    "Streaming",
    "Arabic TV",
    "مشاهدة",
    "أفلام",
    "مسلسلات",
    "قنوات مباشرة",
  ],
  authors: [{ name: "KTV Player" }],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/ktv-logo.webp", type: "image/webp" },
    ],
    apple: "/favicon-192.png",
  },
  openGraph: {
    title: "KTV Player — عالم الترفيه بين يديك",
    description:
      "Enjoy the best live TV channels, latest movies, and top series in high quality with no buffering.",
    url: "https://ktvplayer.com",
    siteName: "KTV Player",
    type: "website",
    images: [
      {
        url: "/ktv-logo.webp",
        width: 480,
        height: 480,
        alt: "KTV Player",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KTV Player — Entertainment at Your Fingertips",
    description:
      "Enjoy the best live TV channels, latest movies, and top series in high quality.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Pixel tracking placeholder - will be configured by client */}
        {/* 
          TODO: Add tracking pixels here before closing head tag:
          - TikTok Pixel: <script> tag from TikTok Ads Manager
          - Snapchat Pixel: <script> tag from Snapchat Ads Manager
          - Any additional tracking codes
        */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
