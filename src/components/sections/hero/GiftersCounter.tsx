"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/utils";

const START_DELAY = 900; // wait for the proof row to fade in
const DURATION = 1800;

/** Counts up from 0 to `target` with an ease-out curve, then adds "+". */
export function GiftersCounter({ target }: { target: number }) {
  const [text, setText] = useState("0");

  useEffect(() => {
    let frame = 0;
    const timer = setTimeout(() => {
      if (prefersReducedMotion()) return setText(`${target.toLocaleString()}+`);
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        setText(`${Math.round(target * eased).toLocaleString()}${p === 1 ? "+" : ""}`);
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, START_DELAY);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return <strong>{text}</strong>;
}
