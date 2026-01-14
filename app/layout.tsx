import type { Metadata } from "next";
import "./globals.css";

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
      </body>
    </html>
  );
}
