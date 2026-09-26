import { notesSection, testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cssVars } from "@/lib/utils";

/** 05 · Love Notes: testimonials pinned like handwritten paper notes. */
export function LoveNotes() {
  return (
    <section className="notes section" id="notes">
      <div className="section-head center">
        <Reveal as="p" className="eyebrow">
          <span className="num">{notesSection.number}</span> {notesSection.eyebrow}
        </Reveal>
        <Reveal as="h2" className="section-title" order={1}>
          <RichText text={notesSection.title} />
        </Reveal>
      </div>

      <div className="note-wall">
        {testimonials.map((note, i) => (
          <Reveal as="figure" key={note.name} className="paper" order={i} style={cssVars({ "--r": note.tilt })}>
            <span className="washi" aria-hidden="true"></span>
            <blockquote>{note.quote}</blockquote>
            <figcaption>
              <img src={note.avatar} alt="" loading="lazy" decoding="async" />
              <div>
                <strong>{note.name}</strong>
                <span>{note.detail}</span>
              </div>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
