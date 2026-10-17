"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the visitor has asked their operating system to reduce motion.
 *
 * The stylesheet already honours this preference for CSS animations, but the
 * home page also drives motion from JavaScript — smooth scrolling, parallax,
 * the intro curtain and the hero carousel — and none of that is reachable from
 * a media query. This hook lets those effects opt out too.
 *
 * It starts as `false` so the server render and the first client render agree,
 * then corrects after mount. The listener stays attached because the setting
 * can be toggled while the page is open.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    setPrefersReducedMotion(media.matches);

    const onChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}
