/**
 * Header + footer navigation.
 *
 * `href` values starting with "#" scroll to a section on the home page.
 * The section ids are: occasions, edit, builder, story, notes.
 * Replace the "#" placeholders with real pages when you add them.
 */

export type NavLink = { label: string; href: string };

export const headerLinks: NavLink[] = [
  { label: "Shop", href: "#edit" },
  { label: "Occasions", href: "#occasions" },
  { label: "Build a Box", href: "#builder" },
  { label: "Our Studio", href: "#story" },
  { label: "Love Notes", href: "#notes" },
];

export const footer = {
  blurb: "A lavender-scented gifting studio for the moments worth remembering.",
  columns: [
    {
      title: "Shop",
      links: [
        { label: "Bestsellers", href: "#edit" },
        { label: "Occasions", href: "#occasions" },
        { label: "Build a box", href: "#builder" },
        { label: "Gift cards", href: "#" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Delivery", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Track order", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "Our story", href: "#story" },
        { label: "Makers", href: "#" },
        { label: "Corporate gifting", href: "#" },
        { label: "Journal", href: "#" },
      ],
    },
  ] satisfies { title: string; links: NavLink[] }[],
  /** Small print along the bottom edge. `{year}` is replaced with the current year at build time. */
  bottomLine: ["© {year} Veloura Gifting Studio", "Photography via Unsplash", "Developed by Raviteja Salva"],
};
