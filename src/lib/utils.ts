import type { CSSProperties } from "react";

/** Typed inline CSS custom properties: style={cssVars({ "--i": 1 })}. */
export function cssVars(vars: Record<`--${string}`, string | number>, extra?: CSSProperties) {
  return { ...vars, ...extra } as CSSProperties;
}

/** Join class names, skipping falsy values. */
export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** "$89" style price label. */
export function formatPrice(value: number) {
  return `$${value}`;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True for mouse / trackpad users (hover-capable, precise pointer). */
export function hasFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

export const random = (min: number, max: number) => min + Math.random() * (max - min);

/** Re-trigger a CSS animation by removing and re-adding its class. */
export function replayClass(el: HTMLElement, className: string) {
  el.classList.remove(className);
  void el.offsetWidth; // force reflow so the animation restarts
  el.classList.add(className);
}
