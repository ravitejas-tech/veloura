/**
 * Hero (first screen).
 */

export const hero = {
  pill: { tag: "New", label: "The Lavender Collection ’26", href: "#edit" },

  /**
   * The headline is three lines. `highlight` is the italic word on line one
   * that gets the hand-drawn swash underline.
   */
  title: {
    lead: "Gifts that",
    highlight: "linger",
    lines: ["long after the", "ribbon falls."],
  },

  subtitle:
    "Hand-wrapped boxes, just-cut florals, heirloom jewelry and slow self-care, curated in our lavender studio and delivered with a handwritten note.",

  primaryCta: { label: "Explore the collection", href: "#edit" },
  secondaryCta: { label: "Build your own box", href: "#builder" },

  proof: {
    /** Decorative customer faces next to the rating. */
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=70",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=70",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=96&h=96&q=70",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&q=70",
    ],
    rating: "4.9",
    reviews: "(2,300 reviews)",
    /** Animated counter: "Loved by 12,400+ gifters". */
    gifters: 12400,
    chip: { title: "Same-day delivery", text: "in 40+ cities" },
  },

  image: {
    src: "https://images.unsplash.com/photo-1600759487717-62bbb608106e?auto=format&fit=crop&w=1100&h=1500&q=85",
    alt: "Rows of lavender in Provence beneath a soft pink dawn sky",
  },

  /** Floating "just gifted" notification over the hero image. */
  toast: {
    image: "https://images.unsplash.com/photo-1682418948083-0c2b615875df?auto=format&fit=crop&w=120&h=120&q=70",
    title: "Lavender Dream Box",
    meta: "Just gifted to Paris · 2 min ago",
  },

  scrollCue: { label: "scroll to unwrap", href: "#occasions" },
};

/** The two crossing marquee ribbons under the hero. */
export const ribbons = {
  back: {
    items: ["Birthdays", "Anniversaries", "Weddings", "Thank-yous", "New babies", "Just because"],
    separator: "✦",
  },
  front: {
    items: ["Free gift note", "Same-day florals", "Plastic-free wrapping", "Ships worldwide", "Hand-tied bows"],
    separator: "❀",
  },
};
