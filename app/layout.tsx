import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Zanzstar | Luxury Concierge & Tours Zanzibar",
  description: "Connecting you to the best on the island. Premium Zanzibar experiences, luxury transfers, and exclusive boutique stays.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
