# Veloura: Lavender Gifting Landing Page

A one-page landing site for a gift shop, florist, jeweller or self-care brand. It has soft lavender tones, editorial serif type and a lot of small motion: an interactive **Build-a-Box** gift builder, expanding occasion panels, a bento product grid and a sticky scroll story.

Built with **Next.js 16 (App Router)**, **React 19** and **TypeScript**. It exports to plain static HTML, so it can be hosted anywhere.

---

## Features

- **Fully prerendered HTML:** every word is in the page source, so search engines and AI crawlers can read it.
- **SEO ready:** title and meta description, canonical URL, Open Graph and Twitter cards, JSON-LD structured data (store, website, products and prices), `sitemap.xml`, `robots.txt`, a web-app manifest and a favicon. Lighthouse SEO score: **100**.
- **All content in one folder:** every headline, product, price, image and link is in typed files under `src/content/`. You don't need to touch any components to rebrand.
- **One file per section** for both components and styles, so everything is easy to find.
- **Design tokens:** colours, fonts, radius, shadows and easing are CSS variables in a single file.
- **Self-hosted Google Fonts** through `next/font`. Visitors' browsers never contact Google, and text appears faster.
- **Interactive:**
  - Build-a-Box: animated gift box, fanned photo cards, ribbon colours, a live gift tag and confetti.
  - Add-to-bag counter and toast.
  - Newsletter form with validation.
  - Mobile menu.
- **Accessible:** semantic landmarks, labelled controls, keyboard-operable panels and a visible focus ring. All motion switches off when "Reduce motion" is enabled on the device.
- **Responsive**, with dedicated layouts for tablet (≤1080px), mobile navigation (≤860px) and phone (≤600px).
- **No UI framework and no Tailwind:** hand-written CSS that is easy to read and change.

## Quick start

Requirements: **Node.js 20.9 or newer**.

```bash
npm install
npm run dev        # http://localhost:3000
```

Build the production site:

```bash
npm run build      # outputs a static site to /out
npm start          # preview /out locally
```

Full details: [docs/GETTING-STARTED.md](docs/GETTING-STARTED.md).

## Scripts

| Command             | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                    |
| `npm run build`     | Production build, a static export to `out/`           |
| `npm start`         | Serves the `out/` folder locally to preview the build |
| `npm run lint`      | ESLint (Next.js + TypeScript rules)                   |
| `npm run typecheck` | TypeScript type check                                 |

## Project structure

```
src/
├── app/                      Next.js App Router
│   ├── layout.tsx            <html>, fonts, SEO metadata, header/footer
│   ├── page.tsx              Home page: the list of sections, in order
│   ├── fonts.ts              Google Fonts (self-hosted via next/font)
│   ├── sitemap.ts            /sitemap.xml
│   ├── robots.ts             /robots.txt
│   ├── manifest.ts           /manifest.webmanifest
│   └── icon.svg              Favicon
│
├── content/                  ← EDIT THESE to change text, images, prices, links
│   ├── site.ts               Brand name, SEO title/description, URL, share image, socials
│   ├── navigation.ts         Header links, footer columns, copyright line
│   ├── hero.ts               Hero + marquee ribbons
│   ├── occasions.ts          01 · Occasions panels
│   ├── products.ts           02 · The Lavender Edit products, gift-card promo
│   ├── builder.ts            03 · Build-a-Box items, ribbon colours, fees
│   ├── story.ts              04 · Our Studio steps + lavender field quote
│   └── testimonials.ts       05 · Love notes, #Moments gallery, newsletter
│
├── components/
│   ├── layout/               Header, Footer
│   ├── sections/             One component per page section
│   │   ├── hero/             Hero, animated counter, parallax art
│   │   ├── lavender-edit/    Filterable bento grid, product card
│   │   └── builder/          Build-a-Box, its state (boxReducer) and confetti
│   ├── seo/                  JSON-LD structured data
│   └── ui/                   Reveal (scroll animation), RichText, Icons, BagToast
│
├── context/BagContext.tsx    Bag counter + toast shared state
├── hooks/useReveal.ts        Scroll-reveal hook
├── lib/utils.ts              Small helpers
└── styles/                   One CSS file per section, imported in order by globals.css
    ├── tokens.css            ← colours, fonts, spacing: re-theme here
    └── …
```

## Documentation

| Guide                                             | Covers                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------ |
| [Getting started](docs/GETTING-STARTED.md)        | Installing, running, building, previewing                                 |
| [Customisation](docs/CUSTOMIZATION.md)            | Editing every section, headings, colours, fonts, adding/removing sections |
| [Images](docs/IMAGES.md)                          | Replacing photos, recommended sizes, using your own files                 |
| [SEO](docs/SEO.md)                                | Launch checklist, metadata, structured data, sitemap, share image          |
| [Deployment](docs/DEPLOYMENT.md)                  | Vercel, Netlify, Cloudflare Pages, GitHub Pages, cPanel / Apache, Nginx   |
| [Changelog](CHANGELOG.md)                         | Version history                                                           |

## Five-minute rebrand

1. `src/content/site.ts`: set your brand name, title, description and share image.
2. `.env.local`: set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` (copy `.env.example`).
3. `src/styles/tokens.css`: change the `--lav-*` and `--plum-*` colours.
4. `src/content/*.ts`: replace the copy, products and photos.
5. `npm run build`, then upload `out/`.

## Browser support

The latest two versions of Chrome, Edge, Safari (macOS and iOS) and Firefox.

## License

Veloura is commercial software. © 2026 Raviteja Salva.

- **[LICENSE.md](LICENSE.md):** what your purchase lets you do. In short: one license covers one website for you or one client, you may modify it freely, and you may not resell or redistribute it as a template. If you bought through a marketplace with its own license (e.g. Envato), that license governs.
- **[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md):** the open-source software, fonts and photo service Veloura uses, with their licenses.

## Credits

- Designed & developed by **Raviteja Salva**.

- Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Manrope](https://fonts.google.com/specimen/Manrope) and [Caveat](https://fonts.google.com/specimen/Caveat), all under the SIL Open Font License.
- Demo photography: [Unsplash](https://unsplash.com), under the [Unsplash License](https://unsplash.com/license). Images are loaded from Unsplash's CDN for the demo; replace them with your own before launch (see [docs/IMAGES.md](docs/IMAGES.md)).
- Built with [Next.js](https://nextjs.org) and [React](https://react.dev).
