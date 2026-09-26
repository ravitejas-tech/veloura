/**
 * 01 · Occasions: expanding image panels.
 *
 * Headings support light formatting: wrap words in *asterisks* for the
 * italic gradient accent and use \n for a line break.
 */

export const occasionsSection = {
  number: "01",
  eyebrow: "Occasions",
  title: "Find the *moment*,\nwe'll find the gift.",
  lede: "Every box begins with a feeling. Hover a moment to open it. Each one is a shelf our florists and curators restock weekly.",
};

export type Occasion = {
  title: string;
  kicker: string;
  text: string;
  link: { label: string; href: string };
  image: { src: string; alt: string };
};

/** The first panel starts open. 3–6 panels look best. */
export const occasions: Occasion[] = [
  {
    title: "Birthdays",
    kicker: "Another trip around the sun",
    text: "Confetti-bright boxes, candles to wish on and cakes from our favourite pâtissiers.",
    link: { label: "Shop 48 gifts", href: "#edit" },
    image: {
      src: "https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?auto=format&fit=crop&w=1100&q=80",
      alt: "A frosted birthday cake topped with sparklers",
    },
  },
  {
    title: "Love & Romance",
    kicker: "For the one",
    text: "Long-stem roses, pearls that glow like candlelight and truffles worth sharing.",
    link: { label: "Shop 36 gifts", href: "#edit" },
    image: {
      src: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1100&q=80",
      alt: "A single blush rose in a glass vase against a mauve wall",
    },
  },
  {
    title: "Self-care",
    kicker: "Slow Sundays",
    text: "Botanical serums, bath rituals and lavender everything. Permission to pause.",
    link: { label: "Shop 52 gifts", href: "#edit" },
    image: {
      src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1100&q=80",
      alt: "An amber serum bottle on a wooden pedestal with palm shadows",
    },
  },
  {
    title: "Weddings",
    kicker: "Happily ever after",
    text: "Registry favourites, bridal-party boxes and keepsakes for the newlyweds.",
    link: { label: "Shop 29 gifts", href: "#edit" },
    image: {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1100&q=80",
      alt: "A long wedding table dressed with small floral arrangements",
    },
  },
  {
    title: "Thank You",
    kicker: "Gratitude, gift-wrapped",
    text: "Small gestures, big feelings: posies, sweets and notes that say it better.",
    link: { label: "Shop 40 gifts", href: "#edit" },
    image: {
      src: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1100&q=80",
      alt: "A soft peach and blush bouquet wrapped in kraft paper",
    },
  },
];
