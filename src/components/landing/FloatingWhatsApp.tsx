'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { MessageCircle } from 'lucide-react';
import { useDynamicConfig } from '@/lib/DynamicConfigProvider';

// ─── Social icon SVGs (white versions for colored backgrounds) ──────────
const SOCIAL_ICONS: Record<string, { svg: React.ReactNode; bgColor: string; hoverBgColor: string; label: string }> = {
  tiktok: {
    bgColor: '#000000',
    hoverBgColor: '#1a1a1a',
    label: 'TikTok',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.93a8.28 8.28 0 0 0 4.76 1.5V7a4.83 4.83 0 0 1-1-.31z"/>
      </svg>
    ),
  },
  instagram: {
    bgColor: '#E4405F',
    hoverBgColor: '#c73650',
    label: 'Instagram',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  snapchat: {
    bgColor: '#FFFC00',
    hoverBgColor: '#e6e300',
    label: 'Snapchat',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8">
        <path d="M12.166 3c.796 0 3.495.223 4.769 3.073.426.925.355 2.477.295 3.725l-.014.278c-.022.42-.04.788-.022 1.016.046.558.254.767.457.81.203.043.51-.06.886-.393a.75.75 0 01.998 1.12c-.563.5-1.177.84-1.794.84-.12 0-.238-.012-.355-.04-.5-.118-.853-.49-1.018-1.056a5.868 5.868 0 01-.133-1.078l-.004-.166c-.028-.668.01-1.348.024-1.933.05-2.09-.09-3.235-.354-3.81C15.083 4.54 13.156 4.5 12.166 4.5h-.332c-.99 0-2.917.04-3.86 2.006-.263.575-.405 1.72-.354 3.81.013.585.052 1.265.024 1.933l-.004.166a5.868 5.868 0 01-.133 1.078c-.165.566-.518.938-1.018 1.055a1.592 1.592 0 01-.355.041c-.617 0-1.231-.34-1.794-.84a.75.75 0 01.998-1.12c.376.333.683.437.886.394.203-.044.411-.253.457-.81.018-.23 0-.597-.022-1.017l-.014-.278c-.06-1.248-.131-2.8.295-3.725C8.663 3.223 11.362 3 12.158 3h.008zM5.907 15.25c.38.358.516.87.349 1.336-.298.833-1.26 1.36-2.138 1.648a.75.75 0 01-.496-1.415c.406-.142.768-.338.992-.527-.316-.14-.676-.347-.898-.654a.75.75 0 011.224-.868c.166.234.536.42.875.518a1.3 1.3 0 00.092-.038zM18.093 15.25c.031.015.062.027.092.038.339-.098.709-.284.875-.518a.75.75 0 011.224.868c-.222.307-.582.514-.898.654.224.19.586.385.992.527a.75.75 0 01-.496 1.415c-.878-.288-1.84-.815-2.138-1.648-.167-.467-.031-.978.349-1.336zM12 18.5c.895 0 1.576.267 2.06.566.244.15.44.32.58.498.123.156.243.37.243.604 0 .207-.085.547-.373.835-.27.27-.734.558-1.47.778A8.303 8.303 0 0112 22.25a8.303 8.303 0 01-1.04-.169c-.736-.22-1.2-.508-1.47-.778-.288-.288-.373-.628-.373-.835 0-.233.12-.448.244-.604.14-.178.335-.347.579-.498.484-.3 1.165-.566 2.06-.566z"/>
      </svg>
    ),
  },
  facebook: {
    bgColor: '#1877F2',
    hoverBgColor: '#1565cc',
    label: 'Facebook',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  youtube: {
    bgColor: '#FF0000',
    hoverBgColor: '#cc0000',
    label: 'YouTube',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  twitter: {
    bgColor: '#000000',
    hoverBgColor: '#1a1a1a',
    label: 'X (Twitter)',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 sm:w-8 sm:h-8">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
};

export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  const { whatsappLink: WHATSAPP_LINK, activeSocialLinks } = useDynamicConfig();

  return (
    <div className="fixed bottom-6 right-6 z-50 rtl:right-auto rtl:left-6 flex flex-col-reverse items-center gap-3">
      {/* WhatsApp Button (always at bottom) */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] transition-all duration-300 shadow-lg whatsapp-pulse"
        aria-label={t('whatsappTooltip')}
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="white" />

        {/* Tooltip */}
        <span className="absolute right-full rtl:right-auto rtl:left-full mr-3 rtl:mr-0 rtl:ml-3 whitespace-nowrap bg-ktv-bg-card text-ktv-text text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-ktv-border">
          {t('whatsappTooltip')}
        </span>
      </a>

      {/* Social Media Icons (above WhatsApp) - same prominent style */}
      {activeSocialLinks.map(({ platform, url }) => {
        const iconData = SOCIAL_ICONS[platform];
        if (!iconData) return null;
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 social-float"
            style={{ backgroundColor: iconData.bgColor }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = iconData.hoverBgColor;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = iconData.bgColor;
            }}
            aria-label={iconData.label}
          >
            {/* Snapchat has yellow bg, so use dark icon instead of white */}
            <span className={platform === 'snapchat' ? 'text-black' : 'text-white'}>
              {iconData.svg}
            </span>

            {/* Tooltip */}
            <span className="absolute right-full rtl:right-auto rtl:left-full mr-3 rtl:mr-0 rtl:ml-3 whitespace-nowrap bg-ktv-bg-card text-ktv-text text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-ktv-border">
              {iconData.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
