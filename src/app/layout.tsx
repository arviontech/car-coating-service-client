// ./app/layout.tsx

import { StoreProvider } from "@/Provider/StoreProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CeramicShield Pro | Premium Ceramic Coating Services",
  description:
    "Professional ceramic coating services to protect and enhance your vehicle with long-lasting shine and protection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDetailing",
            name: "CeramicShield Pro",
            image: "/images/logo.jpg",
            description: "Premium ceramic coating services in Rajshahi",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Main St",
              addressLocality: "Your City",
              addressRegion: "Your State",
              postalCode: "12345",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "40.7128",
              longitude: "-74.0060",
            },
            telephone: "+1234567890",
            openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00",
            priceRange: "$$$",
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "299-599",
            },
          })}
        </script>
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <main className="flex-1">{children}</main>
          <Toaster richColors position="top-center" />
        </StoreProvider>
      </body>
    </html>
  );
}
