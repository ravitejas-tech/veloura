/**
 * Inline SVG icons. They inherit size / stroke from the surrounding CSS
 * (e.g. `.icon-btn svg`, `.btn svg`), so they carry no styling of their own.
 */

import type { SocialIcon } from "@/content/site";

type IconProps = { "aria-hidden"?: boolean };

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function BagIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 8h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}

/** The four-point sparkle brand mark. */
export function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5c.6 4.7 2.9 7.4 7.5 8.5-4.6 1.1-6.9 3.8-7.5 8.5-.6-4.7-2.9-7.4-7.5-8.5 4.6-1.1 6.9-3.8 7.5-8.5Z" />
      <circle cx="19.5" cy="19.5" r="1.6" />
    </svg>
  );
}

export function SocialIconSvg({ name }: { name: SocialIcon }) {
  switch (name) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
        </svg>
      );
    case "pinterest":
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M11 8.5c2.8-.8 5 .7 4.6 3.2-.4 2.3-2.4 3.4-3.8 2.6M11.5 10l-2 11" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24">
          <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.6 2.3 4.2 5 4.5" />
        </svg>
      );
  }
}
