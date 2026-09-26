# Getting started

## Requirements

- **Node.js 20.9 or newer.** Check with `node -v`. Download it from [nodejs.org](https://nodejs.org) (choose the LTS version).
- A code editor. [VS Code](https://code.visualstudio.com) is recommended, because the TypeScript content files give you autocomplete and warn you about typos.

## 1. Install

Unzip the package, open a terminal in the project folder and run:

```bash
npm install
```

(`pnpm install`, `yarn` and `bun install` work too.)

## 2. Run the development server

```bash
npm run dev
```

Open <http://localhost:3000>. The page reloads instantly whenever you save a file in `src/`.

## 3. Set your site URL

Copy `.env.example` to `.env.local` and set your real domain:

```bash
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

This URL is used for the canonical link, social-share URLs, `sitemap.xml` and `robots.txt`. Set it in your hosting dashboard too (see [DEPLOYMENT.md](DEPLOYMENT.md)).

## 4. Build for production

```bash
npm run build
```

This creates the `out/` folder, a complete static website (HTML, CSS, JS, fonts, sitemap and robots.txt). Upload that folder to any host.

Preview the production build locally:

```bash
npm start           # serves out/ on http://localhost:3000
```

## 5. Check your work

```bash
npm run lint        # code style + common mistakes
npm run typecheck   # catches typos in content files (e.g. a missing price)
```

## Where to go next

- Change text, products, prices and photos: [CUSTOMIZATION.md](CUSTOMIZATION.md)
- Swap images: [IMAGES.md](IMAGES.md)
- Pre-launch SEO checklist: [SEO.md](SEO.md)
- Put it online: [DEPLOYMENT.md](DEPLOYMENT.md)

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm run build` fails with "Failed to fetch font" | The build downloads Google Fonts once, so it needs an internet connection. Retry when you're online. |
| Port 3000 is in use | `npm run dev -- -p 3001` |
| Changes to `.env.local` don't show up | Restart `npm run dev`. |
| Animations don't play | Your OS has "Reduce motion" turned on. The template respects it on purpose. |
