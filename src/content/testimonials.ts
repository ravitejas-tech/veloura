/**
 * 05 · Love Notes (testimonials), the #VelouraMoments gallery and the
 * newsletter envelope.
 */

export const notesSection = {
  number: "05",
  eyebrow: "Love notes",
  title: "Words from the *unwrapped*.",
};

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  avatar: string;
  /** Paper tilt, e.g. "-4deg". */
  tilt: string;
};

/** Four notes fill one row on desktop. */
export const testimonials: Testimonial[] = [
  {
    quote: "“My sister cried before she even opened it. The bow alone was a work of art.”",
    name: "Maya R.",
    detail: "Gifted the Lavender Dream Box",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=70",
    tilt: "-4deg",
  },
  {
    quote: "“Ordered at 11am, it was at her door by 4. The note was written in real ink. Unreal service.”",
    name: "Daniel K.",
    detail: "Gifted the Velvet Peony Posy",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=70",
    tilt: "3deg",
  },
  {
    quote: "“I built a box for my mum's 60th. She keeps the ribbon on her dresser. Enough said.”",
    name: "Priya S.",
    detail: "Built a custom box",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=70",
    tilt: "-2deg",
  },
  {
    quote: "“The pearls came in a box so lovely my wife now uses it for her rings.”",
    name: "Marcus L.",
    detail: "Gifted the Moonlit Pearl Strand",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=70",
    tilt: "5deg",
  },
];

export const moments = {
  title: "#VelouraMoments",
  text: "Tag us to be featured and we'll send a little thank-you.",
  /** Portrait photos (25:32) for the scrolling gallery. */
  images: [
    { src: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=500&h=640&q=75", alt: "A single pink tulip on a pink background" },
    { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=500&h=640&q=75", alt: "Two gold wedding bands resting on a ribbon" },
    { src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&w=500&h=640&q=75", alt: "Pale cherry blossoms against a soft blue sky" },
    { src: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=500&h=640&q=75", alt: "A pile of delicate gold jewelry" },
    { src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=500&h=640&q=75", alt: "Pink tulips in a clear glass vase" },
    { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&h=640&q=75", alt: "Makeup brushes and blush compacts on a peach background" },
    { src: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=500&h=640&q=75", alt: "A lush bouquet of roses and wildflowers" },
    { src: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=500&h=640&q=75", alt: "A glass perfume bottle glowing gold on white linen" },
  ],
};

export const newsletter = {
  eyebrow: "Letters from Veloura",
  title: "A little post, *once a month*.",
  lede: "Seasonal edits, early access to limited boxes, and a gentle nudge before the birthdays that matter. 10% off your first gift.",
  placeholder: "your@email.com",
  button: "Seal it ✦",
  invalidMessage: "Hmm, that address looks a little off.",
  successMessage: "Sealed with love. Check your inbox for 10% off ✦",
  /** Letter on the wax seal. */
  sealLetter: "V",
};
