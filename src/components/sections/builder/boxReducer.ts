import type { BoxItem } from "@/content/builder";

/**
 * State for the Build-a-Box gift.
 *
 * `selected` updates immediately (it drives the pick buttons), while `view`
 * (summary, open lid, card layout) is only recomputed by `renderBox`, so the
 * "add to bag" finale can let the cards tuck away before the lid closes.
 */

export type GiftCard = {
  uid: number;
  itemId: string;
  isNew: boolean;
  leaving: boolean;
  x: number;
  y: number;
  r: number;
  z: number;
};

export type BoxState = {
  selected: string[];
  cards: GiftCard[];
  view: { count: number; itemsTotal: number; many: boolean };
  /** Keeps "Add box to bag" disabled while the finale plays. */
  locked: boolean;
  nextUid: number;
};

export type BoxAction =
  | { type: "toggle"; itemId: string; viewportWidth: number }
  | { type: "finalize" }
  | { type: "render"; viewportWidth: number }
  | { type: "settled"; uid: number }
  | { type: "remove"; uid: number };

export const initialBoxState: BoxState = {
  selected: [],
  cards: [],
  view: { count: 0, itemsTotal: 0, many: false },
  locked: false,
  nextUid: 1,
};

export function createBoxReducer(items: BoxItem[]) {
  const priceOf = (id: string) => items.find((item) => item.id === id)?.price ?? 0;

  /** Fan the cards like a hand: spread and tilt shrink as more are added. */
  const renderBox = (state: BoxState, viewportWidth: number): BoxState => {
    const n = state.selected.length;
    const mid = (n - 1) / 2;
    const maxSpread = viewportWidth < 600 ? 170 : 240;
    const step = n > 1 ? Math.min(64, maxSpread / (n - 1)) : 0;
    const tilt = n > 1 ? Math.min(12, 36 / (n - 1)) : 0;

    const cards = state.cards.map((card) => {
      const i = card.leaving ? -1 : state.selected.indexOf(card.itemId);
      if (i < 0) return card; // leaving cards keep their last position
      const off = i - mid;
      return { ...card, x: off * step, r: off * tilt, y: off * off * 5, z: i + 1 };
    });

    return {
      ...state,
      cards,
      view: {
        count: n,
        itemsTotal: state.selected.reduce((sum, id) => sum + priceOf(id), 0),
        many: n >= 4, // captions would only peek out between cards
      },
      locked: false,
    };
  };

  return function boxReducer(state: BoxState, action: BoxAction): BoxState {
    switch (action.type) {
      case "toggle": {
        const on = !state.selected.includes(action.itemId);
        const next: BoxState = on
          ? {
              ...state,
              selected: [...state.selected, action.itemId],
              cards: [
                ...state.cards,
                { uid: state.nextUid, itemId: action.itemId, isNew: true, leaving: false, x: 0, y: 0, r: 0, z: 0 },
              ],
              nextUid: state.nextUid + 1,
            }
          : {
              ...state,
              selected: state.selected.filter((id) => id !== action.itemId),
              cards: state.cards.map((c) =>
                c.itemId === action.itemId && !c.leaving ? { ...c, leaving: true, isNew: false } : c,
              ),
            };
        return renderBox(next, action.viewportWidth);
      }
      case "finalize":
        return {
          ...state,
          selected: [],
          cards: state.cards.map((c) => (c.leaving ? c : { ...c, leaving: true, isNew: false })),
          locked: true,
        };
      case "render":
        return renderBox(state, action.viewportWidth);
      case "settled":
        return { ...state, cards: state.cards.map((c) => (c.uid === action.uid ? { ...c, isNew: false } : c)) };
      case "remove":
        return { ...state, cards: state.cards.filter((c) => c.uid !== action.uid) };
    }
  };
}
