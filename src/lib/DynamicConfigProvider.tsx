'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteConfig, DEFAULT_CONFIG } from '@/lib/site-config';
import { deriveFromConfig } from '@/lib/config';

interface DynamicConfig extends SiteConfig {
  // Derived values
  whatsappLink: string;
  socialLinks: Record<string, string>;
  activeSocialLinks: { platform: string; url: string }[];
  appLinks: { android: string; ios: string };
  tvAppCode: string;
}

const DynamicConfigContext = createContext<DynamicConfig | null>(null);

export function DynamicConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<DynamicConfig | null>(null);

  const loadConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      if (data.success && data.config) {
        const derived = deriveFromConfig(data.config);
        setConfig({ ...data.config, ...derived });
      } else {
        // Use defaults
        const derived = deriveFromConfig(DEFAULT_CONFIG);
        setConfig({ ...DEFAULT_CONFIG, ...derived });
      }
    } catch {
      // Use defaults on error
      const derived = deriveFromConfig(DEFAULT_CONFIG);
      setConfig({ ...DEFAULT_CONFIG, ...derived });
    }
  }, []);

  useEffect(() => {
    loadConfig();
    // Refresh config every 60 seconds
    const interval = setInterval(loadConfig, 60_000);
    return () => clearInterval(interval);
  }, [loadConfig]);

  if (!config) {
    // Still loading — return defaults to avoid layout shift
    const derived = deriveFromConfig(DEFAULT_CONFIG);
    const defaultDynamic: DynamicConfig = { ...DEFAULT_CONFIG, ...derived };
    return (
      <DynamicConfigContext.Provider value={defaultDynamic}>
        {children}
      </DynamicConfigContext.Provider>
    );
  }

  return (
    <DynamicConfigContext.Provider value={config}>
      {children}
    </DynamicConfigContext.Provider>
  );
}

export function useDynamicConfig(): DynamicConfig {
  const context = useContext(DynamicConfigContext);
  if (!context) {
    // Fallback
    const derived = deriveFromConfig(DEFAULT_CONFIG);
    return { ...DEFAULT_CONFIG, ...derived };
  }
  return context;
}
