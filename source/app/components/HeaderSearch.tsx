"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contactFormLink, findSearchResult, goToSearchResult } from "../site-data";

/**
 * A search bar that drops down under the header's Search button. Pressing
 * Enter goes straight to the best-matching page; there is no results list.
 */
export function HeaderSearch({ id, open, onClose }: { id: string; open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    // Wait a frame so the panel is visible; hidden inputs cannot take focus.
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target as Element).closest?.(".header-search, .search-toggle")) onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, onClose]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query.trim()) return;
    const match = findSearchResult(query);
    if (!match) {
      setNotFound(query.trim());
      return;
    }
    setQuery("");
    onClose();
    goToSearchResult(match.href);
  }

  return (
    <div className={`header-search ${open ? "is-open" : ""}`} id={id} aria-hidden={!open}>
      <form role="search" onSubmit={submit}>
        <label className="visually-hidden" htmlFor={`${id}-input`}>Search Vineyard Florence</label>
        <input
          ref={inputRef}
          id={`${id}-input`}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setNotFound("");
          }}
          placeholder="What are you looking for?"
          autoComplete="off"
          tabIndex={open ? 0 : -1}
        />
        <button type="submit" tabIndex={open ? 0 : -1}>Search</button>
      </form>
      {notFound ? (
        <p className="header-search-empty" role="status">
          We couldn’t find a page for “{notFound}”.{" "}
          <Link href={contactFormLink(notFound)} onClick={onClose} tabIndex={open ? 0 : -1}>Ask us instead →</Link>
        </p>
      ) : null}
    </div>
  );
}
