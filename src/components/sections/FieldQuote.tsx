"use client";

import { useEffect, useRef } from "react";
import { fieldQuote } from "@/content/story";
import { Reveal } from "@/components/ui/Reveal";
import { prefersReducedMotion } from "@/lib/utils";

/** Full-bleed brand quote; the lavender field drifts slower than the page. */
export function FieldQuote() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    const field = bg?.parentElement;
    if (!bg || !field || prefersReducedMotion()) return;

    let ticking = false;
    const update = () => {
      const r = field.getBoundingClientRect();
      const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      bg.style.transform = `translate3d(0, ${progress * -12}%, 0) scale(1.05)`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="field" aria-label="Brand promise">
      <div
        className="field-bg"
        id="fieldBg"
        ref={bgRef}
        style={{ backgroundImage: `url('${fieldQuote.background}')` }}
      ></div>
      <div className="field-overlay"></div>
      <Reveal as="blockquote" className="field-quote">
        <span className="quote-mark">“</span>
        {fieldQuote.quote} <em>{fieldQuote.emphasis}</em>
        <cite>{fieldQuote.cite}</cite>
      </Reveal>
    </section>
  );
}
