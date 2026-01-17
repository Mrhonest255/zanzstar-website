import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SettingsProvider } from "@/lib/settings-context";
import { getSiteSettings } from "@/lib/site-settings";
import { OrganizationSchema, WebsiteSchema } from "@/components/SEO/StructuredData";

export const metadata: Metadata = {
  title: {
    default: "ZANZSTAR | Best Zanzibar Tours & Safari Packages 2026",
    template: "%s | ZANZSTAR Tours Zanzibar"
  },
  description: "Book the best Zanzibar tours, Tanzania safari packages, Stone Town excursions, spice tours, and beach holidays. Local experts with 5-star reviews. Free cancellation available.",
  keywords: ["Zanzibar tours", "Tanzania safari", "Stone Town tour", "Zanzibar spice tour", "Serengeti safari", "Zanzibar beach holidays", "Nungwi beach", "Prison Island tour", "Jozani Forest", "dolphin tour Zanzibar", "Zanzibar day trips", "best tours Zanzibar 2026"],
  authors: [{ name: "ZANZSTAR Tours" }],
  creator: "ZANZSTAR",
  publisher: "ZANZSTAR Tours",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://zanzstartours.com"),
  openGraph: {
    title: "ZANZSTAR | Best Zanzibar Tours & Safari Packages 2026",
    description: "Book the best Zanzibar tours, Tanzania safari packages, Stone Town excursions & beach holidays. Local experts, best prices guaranteed!",
    url: "https://zanzstartours.com",
    siteName: "ZANZSTAR Tours Zanzibar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZANZSTAR Tours - Best Zanzibar Tours & Safari"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ZANZSTAR | Best Zanzibar Tours & Safari Packages 2026",
    description: "Book the best Zanzibar tours, Tanzania safari packages, Stone Town excursions & beach holidays. Local experts, best prices guaranteed!",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://zanzstartours.com',
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="canonical" href="https://zanzstartours.com" />
        <OrganizationSchema
          name={settings.site_name}
          url="https://zanzstartours.com"
          phone={settings.contact_phone}
          email={settings.contact_email}
          address={settings.address}
          socialLinks={[
            settings.facebook_url,
            settings.instagram_url,
            settings.twitter_url,
            settings.youtube_url
          ].filter(Boolean)}
        />
        <WebsiteSchema />
      </head>
      <body className="font-sans">
        <SettingsProvider initialSettings={settings}>
          {children}
        </SettingsProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
