"use client";

import { useEffect, useRef, useState } from "react";
import { occasions, occasionsSection } from "@/content/occasions";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cx, hasFinePointer } from "@/lib/utils";

/** 01 · Occasions: panels expand on hover (desktop), tap or keyboard focus. */
export function Occasions() {
  const [openIndex, setOpenIndex] = useState(0);
  const finePointer = useRef(false);

  useEffect(() => {
    finePointer.current = hasFinePointer();
  }, []);

  return (
    <section className="occasions section" id="occasions">
      <div className="section-head split">
        <div>
          <Reveal as="p" className="eyebrow">
            <span className="num">{occasionsSection.number}</span> {occasionsSection.eyebrow}
          </Reveal>
          <Reveal as="h2" className="section-title" order={1}>
            <RichText text={occasionsSection.title} />
          </Reveal>
        </div>
        <Reveal as="p" className="section-lede">
          {occasionsSection.lede}
        </Reveal>
      </div>

      <Reveal className="panels" id="panels">
        {occasions.map((occasion, i) => (
          <article
            key={occasion.title}
            className={cx("panel", i === openIndex && "is-open")}
            tabIndex={0}
            onMouseEnter={() => finePointer.current && setOpenIndex(i)}
            onClick={() => setOpenIndex(i)}
            onFocus={() => setOpenIndex(i)}
          >
            <img src={occasion.image.src} alt={occasion.image.alt} loading="lazy" decoding="async" />
            <div className="panel-label">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {occasion.title}
            </div>
            <div className="panel-body">
              <p className="panel-kicker">{occasion.kicker}</p>
              <h3>{occasion.title}</h3>
              <p>{occasion.text}</p>
              <a href={occasion.link.href} className="panel-link">
                {occasion.link.label} <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
