import { Caveat, Cormorant_Garamond, Manrope } from "next/font/google";

/**
 * Google Fonts, downloaded at build time and self-hosted by next/font
 * (no request to Google from the visitor's browser).
 *
 * Each font exposes a CSS variable holding its full font stack, which
 * src/styles/tokens.css maps to the design tokens --serif, --sans and --hand.
 * The explicit `fallback` lists keep the design's exact fallback fonts, so
 * symbols the web fonts don't include (→ ✦ ❀ ★) render just like the design.
 *
 * Options must be written as literals (a next/font rule), so the fallback
 * lists are repeated rather than shared.
 *
 * To swap a font: change the import + call, keep the `variable` name.
 */

export const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: "normal",
  display: "swap",
  fallback: ["Times New Roman", "Georgia", "serif"],
  variable: "--font-serif",
});

/**
 * Italics are loaded separately with only the weights the design uses
 * (300–500). Bold italic text, such as the Build-a-Box step numerals, then
 * renders in Medium italic, exactly as intended.
 */
export const serifItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: "italic",
  display: "swap",
  fallback: ["Times New Roman", "Georgia", "serif"],
  variable: "--font-serif-italic",
});

export const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  variable: "--font-sans",
});

export const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  fallback: ["Segoe Print", "Bradley Hand", "cursive"],
  variable: "--font-hand",
});

export const fontVariables = [serif.variable, serifItalic.variable, sans.variable, hand.variable].join(" ");
