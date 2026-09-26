"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

/**
 * Shopping-bag state shared by the header counter, product cards, the box
 * builder and the "added to bag" toast.
 *
 * This is a front-end demo: it only counts items. Hook `addToBag` up to your
 * cart / checkout (Shopify, Stripe, Snipcart…) to make it real.
 */

type BagContextValue = {
  count: number;
  toast: { message: string; visible: boolean };
  addToBag: (quantity: number, message: string) => void;
};

const BagContext = createContext<BagContextValue | null>(null);

const TOAST_DURATION = 2400;

export function BagProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState({ message: "", visible: false });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const addToBag = useCallback((quantity: number, message: string) => {
    setCount((c) => c + quantity);
    setToast({ message, visible: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), TOAST_DURATION);
  }, []);

  const value = useMemo(() => ({ count, toast, addToBag }), [count, toast, addToBag]);
  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error("useBag must be used inside <BagProvider>");
  return ctx;
}
