"use client";

import { useBag } from "@/context/BagContext";
import { cx } from "@/lib/utils";

/** "✦ … added to your bag" pill that slides up from the bottom. */
export function BagToast() {
  const { toast } = useBag();
  return (
    <div className={cx("toast-bag", toast.visible && "show")} role="status" aria-live="polite">
      {toast.message}
    </div>
  );
}
