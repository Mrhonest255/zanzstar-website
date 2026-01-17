"use client";
import { useEffect, useState } from "react";
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube,
  Eye,
  Lock,
  Bell,
  Palette,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { createAuthClient } from "@/lib/supabase/auth-client";

interface SiteSettings {
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

const defaultSettings: SiteSettings = {
  site_name: 'ZANZSTAR',
  tagline: 'Tours & Safari',
  contact_email: 'info@zanzstar.com',
  contact_phone: '+255 123 456 789',
  whatsapp_number: '+255 123 456 789',
  address: 'Stone Town, Zanzibar, Tanzania',
  facebook_url: 'https://facebook.com/zanzstar',
  instagram_url: 'https://instagram.com/zanzstar',
  twitter_url: 'https://twitter.com/zanzstar',
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

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'appearance' | 'seo' | 'notifications'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const supabase = createAuthClient();

  const booleanKeys = new Set<keyof SiteSettings>([
    'booking_enabled',
    'maintenance_mode',
    'email_notifications',
    'sms_notifications',
  ]);

  const typeForKey = (key: keyof SiteSettings): string => (booleanKeys.has(key) ? 'boolean' : 'string');
  const serializeValue = (key: keyof SiteSettings, value: any): string => {
    if (booleanKeys.has(key)) return value ? 'true' : 'false';
    return (value ?? '').toString();
  };

  const parseValue = (key: string, value: string | null): any => {
    if (value === null) return '';
    if (key === 'booking_enabled' || key === 'maintenance_mode' || key === 'email_notifications' || key === 'sms_notifications') {
      return value === 'true';
    }
    return value;
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        console.log('Loading settings from database...');
        const { data, error } = await supabase
          .from('site_settings')
          .select('key,value');

        console.log('Settings data:', data);
        console.log('Settings error:', error);

        if (error) throw error;

        const next = { ...defaultSettings };
        (data || []).forEach((row: any) => {
          const key = row.key as keyof SiteSettings;
          if (key in next) {
            (next as any)[key] = parseValue(row.key, row.value);
          }
        });
        console.log('Parsed settings:', next);
        setSettings(next);
      } catch (err) {
        console.error('Error loading site settings:', err);
      } finally {
        setIsLoadingSettings(false);
      }
    };

    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
    setSaveStatus('idle');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const entries = Object.entries(settings) as Array<[keyof SiteSettings, any]>;
      const payload = entries.map(([key, value]) => ({
        key,
        value: serializeValue(key, value),
        type: typeForKey(key),
      }));

      const { error } = await supabase
        .from('site_settings')
        .upsert(payload, { onConflict: 'key' });

      if (error) throw error;
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (err) {
      console.error('Error saving site settings:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'social', label: 'Social Media', icon: Instagram },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'seo', label: 'SEO', icon: Eye },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-gray-900">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Configure your website settings</p>
        </div>
        <div className="flex items-center gap-4">
          {isLoadingSettings && (
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              Loading...
            </span>
          )}
          {saveStatus === 'success' && (
            <span className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle size={18} /> Saved successfully
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle size={18} /> Failed to save
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-white rounded-2xl border border-gray-100 p-2 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6">
          {/* General */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-serif mb-4">General Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                    <input
                      type="text"
                      value={settings.site_name}
                      onChange={(e) => handleChange('site_name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => handleChange('tagline', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                    <select
                      value={settings.default_currency}
                      onChange={(e) => handleChange('default_currency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="TZS">TZS</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium">Enable Bookings</p>
                      <p className="text-sm text-gray-500">Allow customers to book tours</p>
                    </div>
                    <button
                      onClick={() => handleChange('booking_enabled', !settings.booking_enabled)}
                      className={`w-12 h-7 rounded-full transition-colors ${settings.booking_enabled ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.booking_enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                    <div>
                      <p className="font-medium text-red-700">Maintenance Mode</p>
                      <p className="text-sm text-red-600">Show maintenance page to visitors</p>
                    </div>
                    <button
                      onClick={() => handleChange('maintenance_mode', !settings.maintenance_mode)}
                      className={`w-12 h-7 rounded-full transition-colors ${settings.maintenance_mode ? 'bg-red-500' : 'bg-gray-300'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.maintenance_mode ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-lg font-serif mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail size={14} className="inline mr-2" />
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => handleChange('contact_email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone size={14} className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={settings.contact_phone}
                    onChange={(e) => handleChange('contact_phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={settings.whatsapp_number}
                    onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin size={14} className="inline mr-2" />
                    Address
                  </label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Media */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h2 className="text-lg font-serif mb-4">Social Media Links</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Facebook size={14} className="inline mr-2" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={settings.facebook_url}
                    onChange={(e) => handleChange('facebook_url', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Instagram size={14} className="inline mr-2" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={settings.instagram_url}
                    onChange={(e) => handleChange('instagram_url', e.target.value)}
                    placeholder="https://instagram.com/yourprofile"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Twitter size={14} className="inline mr-2" />
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    value={settings.twitter_url}
                    onChange={(e) => handleChange('twitter_url', e.target.value)}
                    placeholder="https://twitter.com/yourprofile"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Youtube size={14} className="inline mr-2" />
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={settings.youtube_url}
                    onChange={(e) => handleChange('youtube_url', e.target.value)}
                    placeholder="https://youtube.com/@yourchannel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-serif mb-4">Appearance Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.primary_color}
                        onChange={(e) => handleChange('primary_color', e.target.value)}
                        className="w-14 h-12 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.primary_color}
                        onChange={(e) => handleChange('primary_color', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={settings.secondary_color}
                        onChange={(e) => handleChange('secondary_color', e.target.value)}
                        className="w-14 h-12 rounded-lg border border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.secondary_color}
                        onChange={(e) => handleChange('secondary_color', e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                  <ImageUpload
                    value={settings.logo_url}
                    onChange={(url) => handleChange('logo_url', url)}
                    aspectRatio="square"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                  <ImageUpload
                    value={settings.favicon_url}
                    onChange={(url) => handleChange('favicon_url', url)}
                    aspectRatio="square"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h2 className="text-lg font-serif mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={settings.meta_title}
                    onChange={(e) => handleChange('meta_title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-gray-500 mt-1">{settings.meta_title.length}/60 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={settings.meta_description}
                    onChange={(e) => handleChange('meta_description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">{settings.meta_description.length}/160 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Analytics ID</label>
                  <input
                    type="text"
                    value={settings.google_analytics_id}
                    onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">SEO Preview</h4>
                  <div className="bg-white rounded-lg p-3 text-sm">
                    <p className="text-blue-600 hover:underline cursor-pointer">{settings.meta_title}</p>
                    <p className="text-green-600 text-xs">https://zanzstar.com</p>
                    <p className="text-gray-600 text-xs mt-1">{settings.meta_description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-serif mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive booking and inquiry emails</p>
                  </div>
                  <button
                    onClick={() => handleChange('email_notifications', !settings.email_notifications)}
                    className={`w-12 h-7 rounded-full transition-colors ${settings.email_notifications ? 'bg-primary' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.email_notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive SMS for urgent bookings</p>
                  </div>
                  <button
                    onClick={() => handleChange('sms_notifications', !settings.sms_notifications)}
                    className={`w-12 h-7 rounded-full transition-colors ${settings.sms_notifications ? 'bg-primary' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.sms_notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
