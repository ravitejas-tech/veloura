"use client";

import { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { boxItems, builderSection, ribbonColors, type BoxItem } from "@/content/builder";
import { useBag } from "@/context/BagContext";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cssVars, cx, formatPrice } from "@/lib/utils";
import { createBoxReducer, initialBoxState } from "./boxReducer";
import { useCelebration } from "./useCelebration";

const boxReducer = createBoxReducer(boxItems);

const CARD_EXIT = 500; // ms: .gift-card.is-leaving transition
const LID_CLOSE_DELAY = 350; // finale: cards tuck in, then the lid shuts
const FINALE_DELAY = 900; // finale: confetti + "added to bag"

/** 03 · Build a Box: pick items, a ribbon and a note; watch the box fill up. */
export function BuildABox() {
  const { steps } = builderSection;
  const [state, dispatch] = useReducer(boxReducer, initialBoxState);
  const [ribbon, setRibbon] = useState(ribbonColors[0].color);
  const [note, setNote] = useState("");
  const { giftRef, glowRef, confettiRef, celebrate } = useCelebration();
  const { addToBag } = useBag();

  const { count, itemsTotal, many } = state.view;

  // warm the cache so a card never pops up blank
  useEffect(() => {
    boxItems.forEach((item) => {
      new Image().src = item.image;
    });
  }, []);

  // `is-open` is toggled on the element directly (not via className) so it
  // never wipes the replayable `hop` animation class added by celebrate().
  useLayoutEffect(() => {
    giftRef.current?.classList.toggle("is-open", count > 0);
  }, [count, giftRef]);

  const togglePick = (item: BoxItem) => {
    const adding = !state.selected.includes(item.id);
    const outgoing = state.cards.find((c) => c.itemId === item.id && !c.leaving);
    dispatch({ type: "toggle", itemId: item.id, viewportWidth: window.innerWidth });
    if (adding) celebrate();
    else if (outgoing) setTimeout(() => dispatch({ type: "remove", uid: outgoing.uid }), CARD_EXIT);
  };

  // finale: everything tucks into the box, the lid snaps shut, confetti everywhere
  const addBoxToBag = () => {
    const itemCount = state.selected.length;
    const outgoing = state.cards.filter((c) => !c.leaving);
    dispatch({ type: "finalize" });
    outgoing.forEach((c) => setTimeout(() => dispatch({ type: "remove", uid: c.uid }), CARD_EXIT));
    setTimeout(() => dispatch({ type: "render", viewportWidth: window.innerWidth }), LID_CLOSE_DELAY);
    setTimeout(() => {
      celebrate(true);
      addToBag(1, `✦ Your custom box (${itemCount} ${itemCount === 1 ? "item" : "items"}) is in the bag`);
    }, FINALE_DELAY);
  };

  return (
    <section className="builder" id="builder">
      <div className="builder-glow" aria-hidden="true"></div>
      <div className="builder-inner">
        <div className="builder-copy">
          <Reveal as="p" className="eyebrow light">
            <span className="num">{builderSection.number}</span> {builderSection.eyebrow}
          </Reveal>
          <Reveal as="h2" className="section-title light" order={1}>
            <RichText text={builderSection.title} />
          </Reveal>

          <Reveal className="step" order={2}>
            <p className="step-label">
              <span>{steps.items.numeral}</span> {steps.items.label}
            </p>
            <div className="picks" id="picks">
              {boxItems.map((item) => (
                <button
                  key={item.id}
                  className="pick"
                  aria-pressed={state.selected.includes(item.id)}
                  onClick={() => togglePick(item)}
                >
                  <img src={item.thumb} alt="" loading="lazy" decoding="async" />
                  <span>
                    {item.label}
                    <em>{formatPrice(item.price)}</em>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="step" order={3}>
            <p className="step-label">
              <span>{steps.ribbon.numeral}</span> {steps.ribbon.label}
            </p>
            <div className="swatches" id="swatches">
              {ribbonColors.map((swatch) => (
                <button
                  key={swatch.color}
                  className={cx("swatch", swatch.color === ribbon && "is-active")}
                  style={cssVars({ "--c": swatch.color })}
                  aria-label={`${swatch.name} ribbon`}
                  aria-pressed={swatch.color === ribbon}
                  onClick={() => setRibbon(swatch.color)}
                ></button>
              ))}
            </div>
          </Reveal>

          <Reveal className="step" order={4}>
            <label className="step-label" htmlFor="note">
              <span>{steps.note.numeral}</span> {steps.note.label}
            </label>
            <input
              id="note"
              className="note-input"
              maxLength={builderSection.noteMaxLength}
              placeholder={builderSection.defaultNote}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Reveal>
        </div>

        <Reveal className="builder-stage">
          <div className="gift" id="gift" ref={giftRef} style={cssVars({ "--ribbon": ribbon })}>
            <div className="gift-glow" ref={glowRef} aria-hidden="true"></div>
            <div className={cx("gift-items", many && "many")}>
              {state.cards.map((card) => {
                const item = boxItems.find((i) => i.id === card.itemId)!;
                return (
                  <figure
                    key={card.uid}
                    className={cx("gift-card", card.isNew && "is-new", card.leaving && "is-leaving")}
                    style={cssVars(
                      { "--x": `${card.x}px`, "--r": `${card.r}deg`, "--y": `${card.y}px` },
                      { zIndex: card.z || undefined },
                    )}
                    onAnimationEnd={(e) => e.target === e.currentTarget && dispatch({ type: "settled", uid: card.uid })}
                  >
                    <img src={item.image} alt={item.name} />
                    <figcaption>{item.name}</figcaption>
                  </figure>
                );
              })}
            </div>
            <div className="gift-lid">
              <div className="bow">
                <i></i>
                <i></i>
                <b></b>
              </div>
            </div>
            <div className="gift-base"></div>
            <div className="gift-tag">
              <span className="tag-hole"></span>
              <p id="tagText">{note.trim() || builderSection.defaultNote}</p>
            </div>
            <div className="confetti" ref={confettiRef} aria-hidden="true"></div>
          </div>
          <div className="gift-shadow"></div>

          <div className="summary">
            <div>
              <p className="summary-count">
                {count
                  ? `${count} ${count === 1 ? "treasure" : "treasures"} · includes ${formatPrice(builderSection.boxFee)} hand-wrapping`
                  : builderSection.emptyText}
              </p>
              <p className="summary-total">
                <span>{builderSection.totalLabel}</span>{" "}
                <strong>{count ? formatPrice(itemsTotal + builderSection.boxFee) : formatPrice(0)}</strong>
              </p>
            </div>
            <button className="btn btn-light" disabled={count === 0 || state.locked} onClick={addBoxToBag}>
              {builderSection.addButton}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
