"use client";

import { useEffect, useRef, useState } from "react";
import { headerLinks } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { useBag } from "@/context/BagContext";
import { BagIcon, LogoMark, SearchIcon } from "@/components/ui/Icons";
import { cx, replayClass } from "@/lib/utils";

/** Floating glass pill navigation with mobile menu and bag counter. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cx("nav", scrolled && "is-scrolled")} id="nav">
      <a href="#" className="logo" aria-label={`${siteConfig.name} home`}>
        <LogoMark />
        <span>{siteConfig.name}</span>
      </a>

      <nav className={cx("nav-links", menuOpen && "open")} id="navLinks" aria-label="Primary">
        {headerLinks.map((link) => (
          <a key={link.href + link.label} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <button className="icon-btn" aria-label="Search">
          <SearchIcon />
        </button>
        <BagButton />
        <button
          className="icon-btn menu-btn"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="navLinks"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

function BagButton() {
  const { count } = useBag();
  const countRef = useRef<HTMLSpanElement>(null);

  // pop the counter every time something lands in the bag
  useEffect(() => {
    if (count > 0 && countRef.current) replayClass(countRef.current, "bump");
  }, [count]);

  return (
    <button className="icon-btn bag" aria-label={`Shopping bag: ${count} ${count === 1 ? "item" : "items"}`}>
      <BagIcon />
      <span className="bag-count" ref={countRef}>
        {count}
      </span>
    </button>
  );
}
