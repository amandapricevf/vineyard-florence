"use client";

import { useEffect, useState, type ReactNode } from "react";
import { isActive } from "../lib/church-date";

/**
 * Shows `children` through `lastDay` (church local time) and `afterwards`
 * from the next day on. Used for pages tied to a yearly event, such as a QR
 * code page, so they archive themselves without being deleted.
 *
 * The site is a static export, so the date check runs in the browser after
 * mount; the server always renders `children`, which keeps hydration clean.
 */
export function SeasonalContent({
  lastDay,
  children,
  afterwards,
}: {
  lastDay: string;
  children: ReactNode;
  afterwards: ReactNode;
}) {
  const [over, setOver] = useState(false);

  useEffect(() => {
    if (!isActive(lastDay)) setOver(true);
  }, [lastDay]);

  return <>{over ? afterwards : children}</>;
}
