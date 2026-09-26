"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll reveal: returns a ref and `revealed`, which flips to true (once)
 * when the element scrolls into view. Pair it with the `reveal` / `is-in`
 * classes from src/styles/reveal.css, or just use the <Reveal> component.
 */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

/**
 * Staggers elements that reveal together: the nth reveal-sibling waits
 * n × 90ms (capped at 6 steps). Order 0 has no delay.
 */
export function revealDelay(order = 0) {
  return order > 0 ? { transitionDelay: `${Math.min(order, 6) * 90}ms` } : undefined;
}
