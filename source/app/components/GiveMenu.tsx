"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { churchCenterGivingUrl, everyOrgCryptoGivingUrl, stockGiftUrl } from "../site-data";

/**
 * The header's Give pill. It opens a small dropdown with the ways to give,
 * shared by the home and interior headers.
 */
export function GiveMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target as Element).closest?.(".give-menu")) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (panelRef.current?.contains(document.activeElement)) buttonRef.current?.focus();
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="give-menu">
      <button
        ref={buttonRef}
        className="header-icon-button header-link give-button"
        type="button"
        aria-label={open ? "Close giving options" : "Give to Vineyard Florence"}
        aria-expanded={open}
        aria-controls="give-options"
        onClick={(event) => {
          setOpen(!open);
          // Opened from the keyboard: start on the first option.
          if (!open && event.detail === 0) {
            window.requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus());
          }
        }}
      >
        <span className="give-symbol" aria-hidden="true" />
        <span className="header-link-label">Give</span>
      </button>
      <div ref={panelRef} className={`give-options ${open ? "is-open" : ""}`} id="give-options">
        <a href={churchCenterGivingUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
          Traditional Giving <span>Church Center ↗</span>
        </a>
        <a href={everyOrgCryptoGivingUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
          Crypto <span>Every.org ↗</span>
        </a>
        <Link href={stockGiftUrl} onClick={() => setOpen(false)}>
          Stocks <span>Tell us about your gift ↗</span>
        </Link>
      </div>
    </div>
  );
}
