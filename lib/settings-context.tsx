"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createAuthClient } from "@/lib/supabase/auth-client";

export interface SiteSettings {
  site_name: string;
  tagline: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address: string;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  youtube_url: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string;
  favicon_url: string;
  default_currency: string;
  booking_enabled: boolean;
  maintenance_mode: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  meta_title: string;
  meta_description: string;
  google_analytics_id: string;
}

export const defaultSettings: SiteSettings = {
  site_name: 'ZANZSTAR',
  tagline: 'Tours & Safari',
  contact_email: 'info@zanzstar.com',
  contact_phone: '+255 656 443 740',
  whatsapp_number: '+255 656 443 740',
  address: 'Stone Town, Zanzibar, Tanzania',
  facebook_url: 'https://facebook.com/zanzstar',
  instagram_url: 'https://instagram.com/zanzstar',
  twitter_url: '',
  youtube_url: '',
  primary_color: '#2d5a52',
  secondary_color: '#4aa58d',
  logo_url: '/logo.svg',
  favicon_url: '/favicon.ico',
  default_currency: 'USD',
  booking_enabled: true,
  maintenance_mode: false,
  email_notifications: true,
  sms_notifications: false,
  meta_title: 'ZANZSTAR - Premium Zanzibar Tours & Safari',
  meta_description: 'Experience the ultimate Zanzibar adventure with ZANZSTAR. Tours, safaris, and exclusive experiences.',
  google_analytics_id: '',
};

interface SettingsContextType {
  settings: SiteSettings;
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  isLoading: true,
  refreshSettings: async () => {},
});

export function useSettings() {
  return useContext(SettingsContext);
}

function parseValue(key: string, value: string | null): any {
  if (value === null) return '';
  if (['booking_enabled', 'maintenance_mode', 'email_notifications', 'sms_notifications'].includes(key)) {
    return value === 'true';
  }
  return value;
}

export function SettingsProvider({ children, initialSettings }: { children: ReactNode; initialSettings?: SiteSettings }) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings || defaultSettings);
  const [isLoading, setIsLoading] = useState(!initialSettings);
  const supabase = createAuthClient();

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key,value');

      if (error) throw error;

      const next = { ...defaultSettings };
      (data || []).forEach((row: any) => {
        const key = row.key as keyof SiteSettings;
        if (key in next) {
          (next as any)[key] = parseValue(row.key, row.value);
        }
      });
      setSettings(next);
    } catch (err) {
      console.error('Error fetching site settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!initialSettings) {
      fetchSettings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshSettings = async () => {
    setIsLoading(true);
    await fetchSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, isLoading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
