"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { homePopup } from "../site-data";
import { isInWindow } from "../lib/church-date";

/**
 * A dated announcement pop-up for the home page (settings in site-data.ts).
 *
 * It opens only inside its date window, only once the intro animation has
 * finished (`ready`), and only for visitors who have not closed it before.
 * Closing it is remembered in this browser; if storage is unavailable it
 * simply shows once per visit.
 */
export function HomePopup({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const storageKey = `vf-popup-closed-${homePopup.id}`;

  useEffect(() => {
    if (!ready || !homePopup.starts) return;
    if (!isInWindow(homePopup.starts, homePopup.expires)) return;
    try {
      if (window.localStorage.getItem(storageKey)) return;
    } catch {
      // Storage blocked: still show it.
    }
    const timer = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(timer);
  }, [ready, storageKey]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      // Storage blocked: it will show again next visit.
    }
  }, [storageKey]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div style={styles.backdrop} onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={homePopup.title}
        style={styles.panel}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" aria-label="Close announcement" style={styles.close} onClick={close}>
          ×
        </button>
        <a href={homePopup.href} onClick={close}>
          <img
            src={homePopup.image}
            alt={homePopup.alt}
            width={homePopup.imageSize.width}
            height={homePopup.imageSize.height}
            style={styles.image}
          />
        </a>
        <div style={styles.actions}>
          <a className="button button-dark" href={homePopup.href} onClick={close}>
            {homePopup.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  backdrop: {
    position: "fixed",
    inset: 0,
    zIndex: 2000,
    background: "rgba(21, 21, 21, 0.62)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  panel: {
    position: "relative",
    width: "min(520px, 100%)",
    maxHeight: "calc(100vh - 32px)",
    overflowY: "auto",
    background: "#f1efe9",
    borderRadius: 18,
    boxShadow: "0 24px 70px rgba(0, 0, 0, 0.35)",
    padding: 14,
  },
  image: {
    display: "block",
    width: "100%",
    height: "auto",
    borderRadius: 10,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 14,
  },
  close: {
    position: "absolute",
    top: 22,
    right: 22,
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255, 255, 255, 0.92)",
    color: "#151515",
    fontSize: 26,
    lineHeight: "38px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 1,
  },
};
