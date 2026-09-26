import { editSection, giftCardPromo, products } from "@/content/products";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { BentoTile } from "./BentoTile";
import { ProductCard } from "./ProductCard";

/** 02 · The Lavender Edit: bento grid of bestsellers. */
export function LavenderEdit() {
  return (
    <section className="edit section" id="edit">
      <div className="section-head center">
        <Reveal as="p" className="eyebrow">
          <span className="num">{editSection.number}</span> {editSection.eyebrow}
        </Reveal>
        <Reveal as="h2" className="section-title" order={1}>
          <RichText text={editSection.title} />
        </Reveal>
        <Reveal as="p" className="section-lede" order={2}>
          {editSection.lede}
        </Reveal>
      </div>

      <div className="bento" id="bento">
        {products.map((product, i) => (
          <ProductCard key={product.name} product={product} order={i} />
        ))}

        <BentoTile className="card-wide card-promo" order={products.length}>
          <span className="promo-star" aria-hidden="true">
            ✦
          </span>
          <p className="eyebrow">{giftCardPromo.eyebrow}</p>
          <h3>
            <RichText text={giftCardPromo.title} />
          </h3>
          <a href={giftCardPromo.link.href} className="panel-link">
            {giftCardPromo.link.label} <span>→</span>
          </a>
        </BentoTile>
      </div>
    </section>
  );
}
