# SEO

Veloura is built so search engines see the whole page. Every section is **prerendered to static HTML** at build time, so crawlers (and AI answer engines) read the full text without running JavaScript. The demo scores **100** in Lighthouse's SEO audit.

## Launch checklist

- [ ] **Site URL.** Set `NEXT_PUBLIC_SITE_URL` in `.env.local` and in your host's environment variables, e.g. `https://www.your-domain.com` (no trailing slash).
- [ ] **Title and description.** `src/content/site.ts` → `title` (≈ 50–60 characters) and `description` (≈ 120–160 characters). Put your brand name and what you sell first.
- [ ] **Keywords.** `site.ts` → `keywords`. Search engines give these little weight, but a few accurate ones don't hurt.
- [ ] **Share image.** `site.ts` → `ogImage`: 1200 × 630, with your brand visible. This is what shows up on WhatsApp, iMessage, LinkedIn, Facebook and X.
- [ ] **Social profiles.** `site.ts` → `socials`. Real `https://` links are added to the structured data (`sameAs`) automatically.
- [ ] **Twitter / X handle** (optional): `site.ts` → `twitterHandle`.
- [ ] **Products.** Accurate names, descriptions, prices and `currency` in `site.ts`.
- [ ] **Alt text** on every replaced image (see [IMAGES.md](IMAGES.md)).
- [ ] **Favicon.** Replace `src/app/icon.svg` with your mark. An SVG or a 512 × 512 PNG named `icon.png` both work.
- [ ] **Placeholder links.** Replace the `"#"` links in `src/content/navigation.ts` with real pages, or remove them.
- [ ] After deploying, submit `https://your-domain.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters).
- [ ] Validate the structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results).

## What's generated for you

| Output | Source | Notes |
| --- | --- | --- |
| `<title>`, meta description, keywords | `src/app/layout.tsx` ← `site.ts` | |
| Canonical URL | `layout.tsx` | Prevents duplicate-content issues (www vs non-www, query strings) |
| Open Graph + Twitter card | `layout.tsx` | Large image cards |
| `robots` meta | `layout.tsx` | Index + follow, large image previews allowed |
| `theme-color`, viewport | `layout.tsx` → `viewport` | |
| JSON-LD structured data | `src/components/seo/StructuredData.tsx` | `OnlineStore`, `WebSite`, and an `ItemList` of `Product`s with `Offer` prices |
| `/sitemap.xml` | `src/app/sitemap.ts` | Add new pages here |
| `/robots.txt` | `src/app/robots.ts` | Allows all crawlers, links the sitemap |
| `/manifest.webmanifest` | `src/app/manifest.ts` | Name and colours for "Add to Home Screen" |
| Favicon | `src/app/icon.svg` | |
| `<html lang>` | `site.ts` → `language` | |

## On-page structure

- One `<h1>` (the hero headline), then an `<h2>` per section and `<h3>` for items. Keep this order if you add sections.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<section>`s with ids, `<footer>`.
- All buttons and icon links have accessible names; the gallery and marquee duplicates are hidden from assistive technology.
- Fonts are self-hosted and preloaded, images below the fold load lazily, and the page has no layout shift. All of this helps Core Web Vitals, which feed into rankings.

## Adding more pages

1. Create `src/app/<page-name>/page.tsx`.
2. Export page-specific metadata from it:

   ```tsx
   export const metadata = {
     title: "Corporate Gifting | Veloura",
     description: "…",
     alternates: { canonical: "/corporate-gifting" },
   };
   ```

3. Add the URL to `src/app/sitemap.ts`.

## Structured data and reviews

The demo intentionally doesn't publish star-rating (`aggregateRating`) markup. Google only allows review markup for **genuine** reviews collected on your site, and fake ratings can lead to a manual penalty. When you have real reviews, add `aggregateRating` to the products in `StructuredData.tsx`.

## A note on the Lighthouse performance score

Lighthouse's lab test simulates a slow phone. There, the "Largest Contentful Paint" element is the animated **"Loved by 12,400+ gifters"** counter: every tick of the count-up is a new paint. Real visitors see the hero immediately. If you want a higher lab score, set the counter to render its final value (see `src/components/sections/hero/GiftersCounter.tsx`).

Serve the site with compression and long-lived caching for `/_next/static/*`. Vercel, Netlify and Cloudflare Pages do this automatically; for Apache and Nginx, see [DEPLOYMENT.md](DEPLOYMENT.md).
