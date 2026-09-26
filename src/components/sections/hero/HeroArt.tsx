"use client";

import { useEffect, useRef } from "react";
import { hero } from "@/content/hero";
import { hasFinePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * Arch photo + floating "just gifted" toast. Layers with `data-depth`
 * drift with the mouse (desktop only, disabled for reduced motion).
 */
export function HeroArt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const art = ref.current;
    if (!art || !hasFinePointer() || prefersReducedMotion()) return;

    const layers = [...art.querySelectorAll<HTMLElement>("[data-depth]")];
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf: number | null = null;

    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth);
        layer.style.translate = `${cx * depth * 22}px ${cy * depth * 22}px`;
      });
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : null;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (window.scrollY > window.innerHeight) return;
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero-art" id="heroArt" ref={ref}>
      <figure className="arch arch-main" data-depth="0.35">
        <img src={hero.image.src} alt={hero.image.alt} fetchPriority="high" />
      </figure>

      <div className="toast" data-depth="0.6">
        <img src={hero.toast.image} alt="" />
        <div>
          <p className="toast-title">{hero.toast.title}</p>
          <p className="toast-meta">
            <span className="pulse"></span>
            {hero.toast.meta}
          </p>
        </div>
      </div>
    </div>
  );
}
