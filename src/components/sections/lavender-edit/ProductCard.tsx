"use client";

import { useState } from "react";
import type { Product, TileSize } from "@/content/products";
import { useBag } from "@/context/BagContext";
import { formatPrice } from "@/lib/utils";
import { BentoTile } from "./BentoTile";

const SIZE_CLASS: Record<TileSize, string | undefined> = {
  regular: undefined,
  wide: "card-wide",
  tall: "card-tall",
  xl: "card-xl",
};

const ADDED_FEEDBACK = 1400; // ms the "+" shows a tick after adding

type ProductCardProps = {
  product: Product;
  order: number;
};

export function ProductCard({ product, order }: ProductCardProps) {
  const { addToBag } = useBag();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToBag(1, `✦ ${product.name} added to your bag`);
    setAdded(true);
    setTimeout(() => setAdded(false), ADDED_FEEDBACK);
  };

  return (
    <BentoTile className={SIZE_CLASS[product.size]} order={order}>
      <div className="card-media tint">
        <img src={product.image.src} alt={product.image.alt} loading="lazy" decoding="async" />
        {product.badge && <span className="tag-pill">{product.badge}</span>}
      </div>
      <div className="card-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="card-buy">
          <span className="price">{formatPrice(product.price)}</span>
          <button
            className={added ? "add-btn added" : "add-btn"}
            aria-label={`Add ${product.name} to bag`}
            onClick={handleAdd}
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </BentoTile>
  );
}
