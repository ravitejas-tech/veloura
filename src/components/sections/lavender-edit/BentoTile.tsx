"use client";

import type { ReactNode } from "react";
import { revealDelay, useReveal } from "@/hooks/useReveal";
import { cx } from "@/lib/utils";

type BentoTileProps = {
  className?: string;
  /** Position in the grid, used for the scroll-reveal stagger. */
  order: number;
  children: ReactNode;
};

/** A bento grid tile that fades in as it scrolls into view. */
export function BentoTile({ className, order, children }: BentoTileProps) {
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <article ref={ref} className={cx("card", className, "reveal", revealed && "is-in")} style={revealDelay(order)}>
      {children}
    </article>
  );
}
