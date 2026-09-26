# Images

## Demo images

The demo photos are loaded from **Unsplash's CDN** (`images.unsplash.com`) and are free to use under the [Unsplash License](https://unsplash.com/license). They are **not included in the download**. Replace them with your own product and brand photography before launch.

Every image URL is in `src/content/*.ts`. Each one sits next to its `alt` text.

## Using your own images

**Option 1: put files in `/public`.**

```
public/
└── images/
    ├── hero.jpg
    └── products/pearl-strand.jpg
```

```ts
image: { src: "/images/products/pearl-strand.jpg", alt: "A pearl necklace in an open jewelry box" },
```

**Option 2: use any image CDN** (Cloudinary, imgix, Shopify, your own CDN): paste the full URL.

If you use a CDN other than Unsplash, update the `preconnect(...)` line in `src/app/layout.tsx` to point to it, so the browser connects to it early.

## Recommended sizes

| Where | File | Size (px) | Shape |
| --- | --- | --- | --- |
| Hero arch | `hero.ts` → `image` | 1100 × 1500 | Portrait 11:15 |
| Hero toast / avatars | `hero.ts` | 120 × 120 / 96 × 96 | Square |
| Occasion panels | `occasions.ts` | 1100 wide | Any (cropped to fit) |
| Product tiles: `xl`, `wide` | `products.ts` | 1100 wide | Landscape |
| Product tiles: `regular`, `tall` | `products.ts` | 800 wide | Any (cropped to fit) |
| Build-a-Box thumbnail / card | `builder.ts` → `thumb` / `image` | 160 / 420 × 420 | Square |
| Story steps | `story.ts` | 1000 wide | Portrait works best |
| Lavender field quote | `story.ts` → `fieldQuote.background` | 2200 wide | Landscape |
| Love-note avatars | `testimonials.ts` | 120 × 120 | Square |
| #Moments gallery | `testimonials.ts` → `moments.images` | 500 × 640 | Portrait 25:32 |
| Social share image | `site.ts` → `ogImage` | 1200 × 630 | Landscape |

Save photos as **JPEG or WebP at 75–85% quality**. Every image is cropped with `object-fit: cover`, so it never stretches; keep the subject near the centre.

## Alt text (important for SEO and accessibility)

Describe what's in the photo in a short sentence:

- ✅ `"A pearl necklace resting in an open burgundy jewelry box"`
- ❌ `"image1"`, `"product photo"`, `"pearls pearls buy pearls"`

Purely decorative images (avatars next to a name, duplicated gallery copies) intentionally use an empty `alt=""`.

## Why plain `<img>` instead of `next/image`?

The design's layouts and animations are tuned to plain `<img>` elements: the clip-path wipe on the hero arch, the fanned Build-a-Box cards, and the cross-fading story frames. Plain images also work with **any** image host and with the static export, with no image server needed. Below-the-fold images use `loading="lazy"`, and the hero image uses `fetchpriority="high"` for a fast first paint.

The ESLint rule that suggests `next/image` is switched off for this reason in `eslint.config.mjs`. If you deploy on Vercel and want automatic resizing, you can switch individual images to [`next/image`](https://nextjs.org/docs/app/api-reference/components/image) with a [custom loader](https://nextjs.org/docs/app/api-reference/config/next-config-js/images#custom-loaders).
