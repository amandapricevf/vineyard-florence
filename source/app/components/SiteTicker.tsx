"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!isActive(tickerMessage.expires)) setExpired(true);
  }, []);

  if (expired) return null;

  return (
    <Link className="sticky-news" href={tickerMessage.href} aria-label={tickerMessage.label}>
      <span className="sticky-news-kicker">
        <i aria-hidden="true" /> {tickerMessage.kicker}
      </span>
      <span className="sticky-news-window" aria-hidden="true">
        <span className="sticky-news-track">
          {[0, 1, 2, 3].map((item) => (
            <span className="sticky-news-copy" key={item}>
              <strong>{tickerMessage.lead}</strong> {tickerMessage.copy}
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
