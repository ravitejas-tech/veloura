/**
 * Global brand + SEO settings.
 *
 * Everything search engines and social networks read about the site lives
 * here: title, description, canonical URL, share image, social profiles.
 * See docs/SEO.md for a walkthrough.
 */

/** Used when no site URL is configured. Replace it with your domain. */
const FALLBACK_URL = "https://veloura.example.com";

/**
 * The production URL, from the first of these that is set (blank values are
 * ignored):
 *   1. NEXT_PUBLIC_SITE_URL (.env.local or your host's dashboard)
 *   2. VERCEL_PROJECT_PRODUCTION_URL (set automatically on Vercel)
 *   3. FALLBACK_URL above
 * "https://" is added if missing, and a trailing slash is removed.
 */
function resolveSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || FALLBACK_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).href.replace(/\/$/, "");
  } catch {
    throw new Error(
      `Invalid site URL "${raw}". Set NEXT_PUBLIC_SITE_URL to your full domain, e.g. https://www.your-domain.com`,
    );
  }
}

export const siteConfig = {
  /** Brand name used in the logo, footer, structured data and page title. */
  name: "Veloura",
  /** Legal / trading name shown in the footer copyright line. */
  legalName: "Veloura Gifting Studio",
  tagline: "The Art of Thoughtful Gifting",

  /**
   * Production URL, without a trailing slash. Used for canonical links,
   * sitemap.xml, robots.txt and Open Graph URLs.
   * See resolveSiteUrl() above for where it comes from.
   */
  url: resolveSiteUrl(),

  /** <title> of the home page (keep it under ~60 characters). */
  title: "Veloura | The Art of Thoughtful Gifting",
  /** Meta description (keep it between ~120 and 160 characters). */
  description:
    "Veloura is a lavender-scented gifting studio. Hand-wrapped boxes, fresh florals, fine jewelry and self-care, curated for every moment worth remembering.",
  keywords: [
    "gift boxes",
    "luxury gifts",
    "lavender gifts",
    "same-day flower delivery",
    "custom gift box",
    "jewelry gifts",
    "self-care gifts",
    "birthday gifts",
    "anniversary gifts",
    "wedding gifts",
  ],
  /** BCP 47 language tag for <html lang> and Open Graph locale. */
  language: "en",
  locale: "en_US",
  /** Browser UI colour on mobile. */
  themeColor: "#efe9f8",
  /** Background colour for the installable web-app manifest. */
  backgroundColor: "#faf7fe",
  /** ISO 4217 currency used for product prices in structured data. */
  currency: "USD",

  /**
   * Image shown when the site is shared on social media / messaging apps.
   * Recommended size: 1200 × 630. Can be an absolute URL or a path in /public.
   */
  ogImage: {
    url: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=1200&h=630&q=80",
    width: 1200,
    height: 630,
    alt: "A Provence lavender field at dusk, the signature Veloura mood",
  },

  /** Optional Twitter / X handle, e.g. "@veloura". Leave empty to omit. */
  twitterHandle: "" as string,

  /** Social profiles. Used in the footer and in Organization structured data. */
  socials: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Pinterest", href: "#", icon: "pinterest" },
    { label: "TikTok", href: "#", icon: "tiktok" },
  ],
} as const;

export type SocialIcon = (typeof siteConfig.socials)[number]["icon"];
