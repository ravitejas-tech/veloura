/*!
 * Veloura: The Art of Thoughtful Gifting
 * Copyright (c) 2026 Raviteja Salva. All rights reserved.
 * Licensed under the Veloura Template License: see LICENSE.md.
 * Third-party components: see THIRD-PARTY-NOTICES.md.
 */

import type { Metadata, Viewport } from "next";
import { preconnect } from "react-dom";
import { siteConfig } from "@/content/site";
import { BagProvider } from "@/context/BagContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BagToast } from "@/components/ui/BagToast";
import { fontVariables } from "./fonts";
import "@/styles/globals.css";

/**
 * Site-wide <head> tags. All values come from src/content/site.ts.
 * See docs/SEO.md.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: siteConfig.locale,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage.url],
    ...(siteConfig.twitterHandle ? { site: siteConfig.twitterHandle, creator: siteConfig.twitterHandle } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // product and lifestyle photos are served from Unsplash's CDN
  preconnect("https://images.unsplash.com");

  return (
    // the inline script below adds the "js" class before first paint
    <html lang={siteConfig.language} className={fontVariables} suppressHydrationWarning>
      <head>
        {/* Scroll-reveal styles only apply when JS runs, so no-JS visitors and crawlers see everything. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <BagProvider>
          <Header />
          {children}
          <Footer />
          <BagToast />
        </BagProvider>
      </body>
    </html>
  );
}
