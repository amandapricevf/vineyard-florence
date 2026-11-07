"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * Hides the fixed site header while the visitor scrolls down and brings it
 * back as soon as they scroll up, move the mouse to the top of the window,
 * or tab into the header. It never hides near the top of the page or while
 * one of its dropdowns (menu, search, give) is open.
 */
export function useAutoHideHeader(headerRef: RefObject<HTMLElement | null>) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let lastY = window.scrollY;
    let isHidden = false;
    let pointerNearTop = false;
    let frame = 0;

    const set = (next: boolean) => {
      if (next === isHidden) return;
      isHidden = next;
      setHidden(next);
    };
    const somethingOpen = () =>
      Boolean(header.querySelector('.is-open, [aria-expanded="true"]')) ||
      Boolean(header.querySelector(":focus-visible"));

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < header.offsetHeight * 1.5) set(false);
        else if (delta > 4 && !pointerNearTop && !somethingOpen()) set(true);
        else if (delta < -4) set(false);
        lastY = y;
      });
    };

    // A mouse that moves into the band where the header lives brings it back.
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerNearTop = event.clientY <= header.offsetHeight + 24;
      if (pointerNearTop) set(false);
    };
    const onPointerLeaveWindow = () => { pointerNearTop = false; };
    const onFocusIn = () => set(false);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveWindow);
    header.addEventListener("focusin", onFocusIn);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeaveWindow);
      header.removeEventListener("focusin", onFocusIn);
    };
  }, [headerRef]);

  return hidden;
}
