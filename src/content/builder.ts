/**
 * 03 · Build a Box: the interactive gift box builder.
 */

export const builderSection = {
  number: "03",
  eyebrow: "Build a box",
  title: "Make it *unmistakably* theirs.",
  steps: {
    items: { numeral: "i.", label: "Choose what goes inside" },
    ribbon: { numeral: "ii.", label: "Pick a ribbon" },
    note: { numeral: "iii.", label: "Write the note" },
  },
  /** Placeholder + default text on the hanging gift tag. */
  defaultNote: "Made with love, just for you.",
  /** Max characters for the gift note. */
  noteMaxLength: 48,
  /** Flat fee added to every custom box (wrapping + ribbon + card). */
  boxFee: 12,
  emptyText: "Your box is empty. Add a little something.",
  totalLabel: "Total",
  addButton: "Add box to bag",
};

export type BoxItem = {
  /** Unique key. */
  id: string;
  /** Short label on the pick button. */
  label: string;
  /** Name written on the polaroid card that pops out of the box. */
  name: string;
  price: number;
  /** Small square thumbnail on the pick button (~160px). */
  thumb: string;
  /** Larger square photo for the polaroid card (~420px). */
  image: string;
};

/** Works best with 6 items (3 × 2 grid). */
export const boxItems: BoxItem[] = [
  {
    id: "candle",
    label: "Candle",
    name: "Amber candle",
    price: 38,
    thumb: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=160&q=70",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=420&h=420&q=80",
  },
  {
    id: "roses",
    label: "Roses",
    name: "Garden roses",
    price: 65,
    thumb: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=160&q=70",
    image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=420&h=420&q=80",
  },
  {
    id: "truffles",
    label: "Truffles",
    name: "Truffles",
    price: 42,
    thumb: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=160&q=70",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=420&h=420&q=80",
  },
  {
    id: "pendant",
    label: "Pendant",
    name: "Pendant",
    price: 96,
    thumb: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=160&q=70",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=420&h=420&q=80",
  },
  {
    id: "serum",
    label: "Serum",
    name: "Serum",
    price: 54,
    thumb: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=160&q=70",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=420&h=420&q=80",
  },
  {
    id: "lavender",
    label: "Lavender",
    name: "Lavender sachet",
    price: 24,
    thumb: "https://images.unsplash.com/photo-1565011523534-747a8601f10a?auto=format&fit=crop&w=160&q=70",
    image: "https://images.unsplash.com/photo-1565011523534-747a8601f10a?auto=format&fit=crop&w=420&h=420&q=80",
  },
];

/** Ribbon colours. The first one is selected by default. */
export const ribbonColors = [
  { name: "Lavender", color: "#b69ce3" },
  { name: "Blush", color: "#efb7cc" },
  { name: "Champagne", color: "#dcbf85" },
  { name: "Sage", color: "#a7c4b5" },
  { name: "Ivory", color: "#f6f1ff" },
];

/** Confetti palette (the selected ribbon colour is added automatically). */
export const confettiColors = ["#cdb4f0", "#ae91de", "#efb7cc", "#f6d79a", "#ffffff", "#a7c4b5"];
