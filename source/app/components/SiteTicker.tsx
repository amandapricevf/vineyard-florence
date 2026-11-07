"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { tickerMessage } from "../site-data";
import { isActive } from "../lib/church-date";

/**
 * The sticky announcement bar.
 *
 * The message carries an expiry date. Because this is a static export, the
 * check has to happen in the browser — so the ticker renders on the server and
 * removes itself after mount if the announcement has passed. That ordering
 * keeps the markup identical on both sides of hydration.
 */
export function SiteTicker() {
  const [expired, setExpired] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const collapsedRef = useRef(false);
  const reopenedAt = useRef<number | null>(null);
  const barRef = useRef<HTMLAnchorElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isActive(tickerMessage.expires)) setExpired(true);
  }, []);

  // Once the visitor scrolls down, the moving message rolls left and tucks
  // behind the "Latest" tab, which stays put. Back at the top of the page it
  // opens again. If they open it by hand, it stays open until they scroll a
  // good way further down.
  useEffect(() => {
    if (expired) return;
    const set = (next: boolean) => {
      if (next === collapsedRef.current) return;
      collapsedRef.current = next;
      setCollapsed(next);
    };
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (y < 120) { reopenedAt.current = null; set(false); }
        else if (y > lastY && !collapsedRef.current) {
          const from = reopenedAt.current;
          if (from === null || y > from + 400) { reopenedAt.current = null; set(true); }
        }
        lastY = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, [expired]);

  // A click on the collapsed tab opens the bar instead of following the link.
  // It is caught in the capture phase so that page-level link handlers (the
  // home page's smooth scrolling) never see it.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!collapsedRef.current || !barRef.current?.contains(event.target as Node)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      reopenedAt.current = window.scrollY;
      collapsedRef.current = false;
      setCollapsed(false);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [expired]);

  // The collapsed bar is clipped to exactly the width of the "Latest" tab.
  useEffect(() => {
    const bar = barRef.current, kicker = kickerRef.current;
    if (!bar || !kicker) return;
    const measure = () => bar.style.setProperty("--news-kicker-w", `${kicker.offsetWidth}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(kicker);
    return () => observer.disconnect();
  }, [expired]);

  if (expired) return null;

  return (
    <Link
      ref={barRef}
      className={`sticky-news${collapsed ? " is-collapsed" : ""}`}
      href={tickerMessage.href}
      data-no-navigate={collapsed ? "" : undefined}
      aria-label={collapsed ? `Show announcement: ${tickerMessage.label}` : tickerMessage.label}
    >
      <span className="sticky-news-kicker" ref={kickerRef}>
        <i aria-hidden="true" /> {tickerMessage.kicker}
      </span>
      <span className="sticky-news-window" aria-hidden="true">
        <span className="sticky-news-track">
          {[0, 1, 2, 3].map((item) => (
            <span className="sticky-news-copy" key={item}>
              {tickerMessage.lead ? <strong>{tickerMessage.lead}</strong> : null} {tickerMessage.copy}
              <i>✦</i>
            </span>
          ))}
        </span>
      </span>
      <span className="sticky-news-arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}
