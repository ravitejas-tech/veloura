import { Fragment } from "react";
import { ribbons } from "@/content/hero";

/**
 * Two crossing marquee ribbons. Each track is rendered twice so the CSS
 * `marquee` animation (translateX -50%) loops seamlessly; the copy is
 * hidden from screen readers.
 */
export function Ribbons() {
  return (
    <section className="ribbons" aria-label="Occasions we wrap for">
      <div className="ribbon ribbon-back">
        <div className="ribbon-track">
          <RibbonItems {...ribbons.back} />
          <RibbonItems {...ribbons.back} hidden />
        </div>
      </div>
      <div className="ribbon ribbon-front">
        <div className="ribbon-track reverse">
          <RibbonItems {...ribbons.front} />
          <RibbonItems {...ribbons.front} hidden />
        </div>
      </div>
    </section>
  );
}

function RibbonItems({ items, separator, hidden }: { items: string[]; separator: string; hidden?: boolean }) {
  const aria = hidden ? { "aria-hidden": true } : {};
  return items.map((item) => (
    <Fragment key={item}>
      <span {...aria}>{item}</span>
      <b {...aria}>{separator}</b>
    </Fragment>
  ));
}
