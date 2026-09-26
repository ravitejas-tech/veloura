/**
 * 04 · Our Studio: sticky scroll story, plus the lavender-field quote.
 *
 * Each step is paired with the image at the same position; the image swaps
 * as the step scrolls into the middle of the screen.
 */

export const storySection = {
  number: "04",
  eyebrow: "Our studio",
  title: "From our table\nto their *doorstep*.",
};

export const storySteps = [
  {
    title: "Curated at dawn",
    text: "Our florists visit growers before sunrise. Only stems at their peak, and pieces from 60+ independent makers, make it onto our shelves.",
    image: {
      src: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1000&q=80",
      alt: "A florist's shopfront overflowing with buckets of fresh flowers",
    },
  },
  {
    title: "Wrapped by hand",
    text: "Every box is layered with tissue, dried lavender and a satin ribbon, tied by one of our wrappers. No plastic, no rush, no two quite alike.",
    image: {
      src: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1000&q=80",
      alt: "Hands presenting a kraft-wrapped gift tied with twine",
    },
  },
  {
    title: "Delivered, gently",
    text: "Same-day across the city, 48 hours nationwide and tracked worldwide, in a cushioned outer box that keeps the bow perfectly crisp.",
    image: {
      src: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1000&q=80",
      alt: "A cream gift box tied with a bright pink satin ribbon",
    },
  },
  {
    title: "Remembered, always",
    text: "We'll quietly remind you before next year's date, so the people you love never feel forgotten.",
    image: {
      src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80",
      alt: "Hands holding a heart-shaped arrangement of bright flowers",
    },
  },
];

/** Full-bleed brand quote over the lavender field. */
export const fieldQuote = {
  background: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=2200&q=80",
  quote: "A good gift is like lavender on a summer evening.",
  emphasis: "You notice it long after it's gone.",
  cite: "Élise Moreau, founder",
};
