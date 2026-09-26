"use client";

import { useCallback, useRef } from "react";
import { confettiColors } from "@/content/builder";
import { prefersReducedMotion, random, replayClass } from "@/lib/utils";

/**
 * Confetti burst + glow ring + box "hop".
 *
 * Confetti pieces are plain DOM nodes appended to the confetti layer and
 * removed when their CSS animation ends. Up to ~90 short-lived particles
 * would be wasteful as React state, so this stays imperative on purpose.
 */
export function useCelebration() {
  const giftRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const burst = useCallback((count: number, spreadX: number, height: number) => {
    const gift = giftRef.current;
    const layer = confettiRef.current;
    if (!gift || !layer || prefersReducedMotion()) return;

    const ribbon = getComputedStyle(gift).getPropertyValue("--ribbon").trim();
    const colors = [...confettiColors, ribbon];

    for (let i = 0; i < count; i++) {
      const star = i % 7 === 0;
      const el = document.createElement(star ? "b" : "i");
      if (star) el.textContent = "✦";
      const w = star ? random(12, 20) : random(6, 11);
      const round = !star && Math.random() < 0.35;
      el.style.cssText = [
        `--w:${w}px`,
        `--h:${round ? w : w * random(1.4, 2.2)}px`,
        `--br:${round ? "50%" : "2px"}`,
        `--c:${colors[Math.floor(Math.random() * colors.length)]}`,
        `--dx:${random(-spreadX, spreadX)}px`,
        `--dy:${-random(height * 0.45, height)}px`,
        `--fall:${random(180, 320)}px`,
        `--rot:${random(-900, 900)}deg`,
        `--dur:${random(1.3, 2.1)}s`,
      ].join(";");
      el.addEventListener("animationend", () => el.remove());
      layer.appendChild(el);
    }
  }, []);

  /** Small celebration when an item is added; `big` for the finale. */
  const celebrate = useCallback(
    (big = false) => {
      burst(big ? 90 : 34, big ? 320 : 190, big ? 380 : 280);
      if (glowRef.current) replayClass(glowRef.current, "flash");
      if (giftRef.current) replayClass(giftRef.current, "hop");
    },
    [burst],
  );

  return { giftRef, glowRef, confettiRef, celebrate };
}
