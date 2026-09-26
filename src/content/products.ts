/**
 * 02 · The Lavender Edit: bestseller bento grid.
 *
 * Products also feed the Product structured data (JSON-LD) that search
 * engines read, so keep names, prices and descriptions accurate.
 */

export const editSection = {
  number: "02",
  eyebrow: "Bestsellers",
  title: "The Lavender *Edit*",
  lede: "Our most-gifted pieces this season. Hover to see them in full colour.",
};

/**
 * Tile size in the bento grid (4 columns on desktop):
 * - "regular": 1 × 1
 * - "wide":    2 × 1
 * - "tall":    1 × 2
 * - "xl":      2 × 2 (hero product, shows the longer description)
 */
export type TileSize = "regular" | "wide" | "tall" | "xl";

export type Product = {
  name: string;
  description: string;
  /** Price in whole units of siteConfig.currency. */
  price: number;
  size: TileSize;
  /** Optional badge in the top-left corner, e.g. "New". */
  badge?: string;
  image: { src: string; alt: string };
};

export const products: Product[] = [
  {
    name: "Lavender Dream Box",
    description: "Potted Provence lavender, pillow mist, linen sachet & a hand-poured candle.",
    price: 89,
    size: "xl",
    badge: "Signature",
    image: {
      src: "https://images.unsplash.com/photo-1565011523534-747a8601f10a?auto=format&fit=crop&w=1100&q=80",
      alt: "Fresh lavender in a pale stone pot",
    },
  },
  {
    name: "Moonlit Pearl Strand",
    description: "Freshwater pearls, 14k clasp",
    price: 148,
    size: "tall",
    badge: "Heirloom",
    image: {
      src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
      alt: "A pearl necklace resting in an open burgundy jewelry box",
    },
  },
  {
    name: "Velvet Peony Posy",
    description: "Same-day, hand-tied",
    price: 65,
    size: "regular",
    image: {
      src: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
      alt: "A cluster of blush pink garden roses",
    },
  },
  {
    name: "Amber Hour Candle",
    description: "Soy & beeswax, 60hr burn",
    price: 38,
    size: "regular",
    image: {
      src: "https://images.unsplash.com/photo-1570823635306-250abb06d4b3?auto=format&fit=crop&w=800&q=80",
      alt: "Hands cupping a glowing candle in a dark room",
    },
  },
  {
    name: "Heirloom Truffle Chest",
    description: "16 hand-painted truffles from a Belgian atelier",
    price: 42,
    size: "wide",
    badge: "New",
    image: {
      src: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=1100&q=80",
      alt: "A teal box of assorted handmade chocolate truffles",
    },
  },
  {
    name: "Sapphire Drop Earrings",
    description: "Sterling & lab sapphire",
    price: 124,
    size: "regular",
    image: {
      src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      alt: "Sapphire and crystal drop earrings on a monstera leaf",
    },
  },
  {
    name: "Golden Hour Oil",
    description: "Rosehip & jojoba facial oil",
    price: 72,
    size: "regular",
    image: {
      src: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
      alt: "A golden face oil dropper bottle on a wooden tray with eucalyptus",
    },
  },
  {
    name: "Dahlia Dusk Bunch",
    description: "Ten lilac-tipped stems, seasonal & locally grown",
    price: 58,
    size: "wide",
    image: {
      src: "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?auto=format&fit=crop&w=1100&q=80",
      alt: "A lilac-tipped dahlia in full bloom",
    },
  },
];

/** The gift-card promo tile at the end of the grid (always visible). */
export const giftCardPromo = {
  eyebrow: "Can't decide?",
  title: "Let them choose with *digital gift cards* from $25.",
  link: { label: "Send a gift card", href: "#" },
};
