import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: {
    default: "ZANZSTAR | Luxury Tours & Concierge Zanzibar",
    template: "%s | ZANZSTAR Tours"
  },
  description: "Premium Zanzibar tours, luxury concierge services, exclusive villas, and unforgettable safari experiences. Your gateway to the best of East Africa.",
  keywords: ["Zanzibar tours", "luxury travel", "safari Tanzania", "Zanzibar concierge", "Stone Town tours", "Serengeti safari", "beach holidays"],
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
    title: "ZANZSTAR | Luxury Tours & Concierge Zanzibar",
    description: "Premium Zanzibar tours, luxury concierge services, exclusive villas, and unforgettable safari experiences.",
    url: "https://zanzstartours.com",
    siteName: "ZANZSTAR Tours",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZANZSTAR | Luxury Tours & Concierge Zanzibar",
    description: "Premium Zanzibar tours, luxury concierge services, exclusive villas, and unforgettable safari experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
