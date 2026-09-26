"use client";

import type { ComponentPropsWithoutRef, ElementType, Ref } from "react";
import { revealDelay, useReveal } from "@/hooks/useReveal";
import { cx } from "@/lib/utils";

type RevealProps<T extends ElementType> = {
  /** HTML tag to render. Defaults to "div". */
  as?: T;
  /** Position among sibling reveals; each step adds a 90ms stagger. */
  order?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Fades and lifts its content in when scrolled into view.
 *
 *   <Reveal as="h2" className="section-title" order={1}>…</Reveal>
 */
export function Reveal<T extends ElementType = "div">({ as, order = 0, className, style, ...rest }: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref as Ref<HTMLElement>}
      className={cx(className, "reveal", revealed && "is-in")}
      style={{ ...style, ...revealDelay(order) }}
      {...rest}
    />
  );
}
