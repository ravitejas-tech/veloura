"use client";

import { useEffect, useRef, useState } from "react";
import { storySection, storySteps } from "@/content/story";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cx } from "@/lib/utils";

/** 04 · Our Studio: the arch image swaps as each step crosses mid-screen. */
export function Story() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="story section" id="story">
      <div className="story-visual">
        <div className="story-frame">
          {storySteps.map((step, i) => (
            <img
              key={step.image.src}
              className={cx(i === active && "is-active") || undefined}
              src={step.image.src}
              alt={step.image.alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
        <div className="story-progress" aria-hidden="true">
          <i id="storyBar" style={{ width: `${((active + 1) / storySteps.length) * 100}%` }}></i>
        </div>
      </div>

      <div className="story-steps">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">
            <span className="num">{storySection.number}</span> {storySection.eyebrow}
          </Reveal>
          <Reveal as="h2" className="section-title" order={1}>
            <RichText text={storySection.title} />
          </Reveal>
        </div>
        {storySteps.map((step, i) => (
          <article
            key={step.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={cx("story-step", i === active && "is-active")}
            data-step={i}
          >
            <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
