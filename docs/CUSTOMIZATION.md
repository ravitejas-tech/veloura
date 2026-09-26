# Customisation

Nearly everything you'll want to change lives in **`src/content/`**. These are plain TypeScript files full of text, numbers and URLs. Edit a value, save, and the page updates. You don't need to change the components.

- [Headline formatting](#headline-formatting)
- [Brand, SEO and navigation](#brand-seo-and-navigation)
- [Section by section](#section-by-section)
- [Colours](#colours)
- [Fonts](#fonts)
- [Reordering, removing or duplicating sections](#reordering-removing-or-duplicating-sections)
- [Connecting a real cart and newsletter](#connecting-a-real-cart-and-newsletter)
- [Where the styles are](#where-the-styles-are)

---

## Headline formatting

Section titles support two small shortcuts:

| Write | Result |
| --- | --- |
| `*word*` | *word* in the italic lavender gradient |
| `\n` | a line break |

```ts
title: "Find the *moment*,\nwe'll find the gift.",
```

## Brand, SEO and navigation

| File | Contains |
| --- | --- |
| `src/content/site.ts` | Brand name, page title, meta description, keywords, site URL, share image, social links, currency |
| `src/content/navigation.ts` | Header links, the three footer link columns, the footer's bottom line |

Links that start with `#` scroll to a section on the page. The section ids are `occasions`, `edit`, `builder`, `story` and `notes`. Replace the `"#"` placeholders (Gift cards, Delivery, Returns…) with real URLs when you have those pages.

`{year}` in the footer's bottom line is replaced with the current year automatically.

## Section by section

### Hero: `src/content/hero.ts`

- `pill`: the "New · The Lavender Collection" badge.
- `title`: `lead` + `highlight` (the word with the hand-drawn underline) + two more `lines`.
- `subtitle`, `primaryCta`, `secondaryCta`.
- `proof`: avatars, star rating, review count, the animated **gifters** counter (just a number, e.g. `12400`), and the delivery chip.
- `image`: the arch photo. It's the first thing visitors see, so use a sharp portrait image of about 1100 × 1500.
- `toast`: the floating "Just gifted to Paris" card.
- `ribbons`: the words in the two crossing marquee ribbons and their separator symbols.

### 01 · Occasions: `src/content/occasions.ts`

Each panel has a `title`, `kicker` (the small uppercase line), `text`, `link` and `image`. The first panel starts open. Three to six panels look best. The panel numbers (01, 02…) are added automatically.

### 02 · The Lavender Edit: `src/content/products.ts`

```ts
{
  name: "Moonlit Pearl Strand",
  description: "Freshwater pearls, 14k clasp",
  price: 148,
  size: "tall",               // "regular" | "wide" | "tall" | "xl"
  badge: "Heirloom",          // optional corner label
  image: { src: "…", alt: "…" },
}
```

- **Tile sizes** on the 4-column desktop grid: `regular` 1×1, `wide` 2×1, `tall` 1×2, `xl` 2×2. The grid packs tiles automatically (`grid-auto-flow: dense`). The demo's mix of one `xl`, one `tall`, two `wide` and four `regular` fills it perfectly; if you change sizes, count the cells so the rows stay full.
- **Gift-card promo:** the last tile, `giftCardPromo`. It's always visible.
- Products also generate the **Product structured data** that Google reads, so keep names and prices accurate. See [SEO.md](SEO.md).

### 03 · Build a Box: `src/content/builder.ts`

- `builderSection`: headings, step labels, the default gift-tag note, `noteMaxLength`, and `boxFee` (the flat wrapping fee added to the total).
- `boxItems`: the six things a visitor can put in the box. `label` is shown on the button, `name` on the polaroid card. `thumb` (~160px) and `image` (~420px square) can be the same photo at two sizes.
- `ribbonColors`: the swatches. The first one is selected by default.
- `confettiColors`: the confetti palette. The chosen ribbon colour is added automatically.

### 04 · Our Studio: `src/content/story.ts`

- `storySteps`: each step's text is paired with the image at the same position. As a step scrolls into the middle of the screen, its image fades in and the progress bar grows. Four steps is ideal.
- `fieldQuote`: the full-width lavender-field quote (background photo, quote, emphasised line, attribution).

### 05 · Love notes, gallery and newsletter: `src/content/testimonials.ts`

- `testimonials`: the paper notes. `tilt` is the rotation (`"-4deg"`, `"3deg"` …). Four notes fill one desktop row.
- `moments`: the #hashtag gallery. Use portrait photos (25:32, e.g. 500 × 640).
- `newsletter`: headings, placeholder, button text, the success and error messages, and the wax-seal letter.

## Colours

All colours are CSS variables in **`src/styles/tokens.css`**:

```css
--lav-50 … --lav-500     /* lavender scale: backgrounds → accents */
--plum-600 … --plum-900  /* deep plum: text, buttons, dark sections */
--ink, --muted           /* body text */
--blush, --gold, --ivory /* extras */
```

To re-theme, change these values and keep light-to-dark order within each scale. A handful of decorative gradients and glows use hard-coded rgba values that match the palette. Search the CSS for `rgba(` if you change the hue a lot.

Also update `themeColor` and `backgroundColor` in `src/content/site.ts`; they tint the mobile browser bar.

## Fonts

Fonts are defined in **`src/app/fonts.ts`** and self-hosted through `next/font`:

| Token | Font | Used for |
| --- | --- | --- |
| `--serif` | Cormorant Garamond | Headlines, prices, logo |
| `--sans` | Manrope | Body text, buttons, UI |
| `--hand` | Caveat | Gift tag, love notes, form messages |

To use a different Google Font, change the import and the function call and keep the `variable` name:

```ts
import { Playfair_Display } from "next/font/google";

export const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  fallback: ["Times New Roman", "Georgia", "serif"],
  variable: "--font-serif",
});
```

For a font that isn't on Google Fonts, use [`next/font/local`](https://nextjs.org/docs/app/api-reference/components/font#local-fonts) with the same `variable` name.

## Reordering, removing or duplicating sections

`src/app/page.tsx` lists the sections in order:

```tsx
<Hero />
<Ribbons />
<Occasions />
<LavenderEdit />
…
```

Move a line to reorder, or delete it to remove a section. If you remove a section, also remove any header or footer links that point to its `#id` (`src/content/navigation.ts`).

## Connecting a real cart and newsletter

The template is a front end. Two places are ready for your integrations:

- **Bag / checkout:** `src/context/BagContext.tsx`. `addToBag()` is called by every "+" button and by Build-a-Box. Replace its body with your cart (Shopify Storefront, Snipcart, Stripe Payment Links, …).
- **Newsletter:** `src/components/sections/Newsletter.tsx`. Look for the `TODO` in `handleSubmit` and send the email to Mailchimp, ConvertKit, Klaviyo, Formspree or your own endpoint.

## Where the styles are

`src/styles/globals.css` imports one file per section, in cascade order:

| File | Section |
| --- | --- |
| `tokens.css` | Design tokens |
| `base.css`, `typography.css`, `buttons.css` | Shared foundations |
| `header.css` … `footer.css` | One per section, top to bottom |
| `bag-toast.css`, `reveal.css` | Toast and scroll-reveal animation |
| `responsive.css` | All breakpoints (1080px, 860px, 600px) |
| `reduced-motion.css` | Honours the OS "Reduce motion" setting |

Keep `responsive.css` and `reduced-motion.css` last so they override the section styles.
