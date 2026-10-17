"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  address,
  churchCenterGivingUrl,
  churchCenterSignInUrl,
  directionsUrl,
  filterSearchIndex,
  goToSearchResult,
  logoSize,
  logoWhiteUrl,
  primaryNavigation,
  serviceTimes,
  youtubeUrl,
} from "../site-data";
import { SiteFooter } from "./SiteFooter";

export { SiteTicker } from "./SiteTicker";

/** Interior pages share the site footer; the reveal animation is home-only. */
export function InteriorFooter() {
  return <SiteFooter className="interior-footer" />;
}

export function InteriorHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => document.documentElement.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("search-open", searchOpen);
    const focusTimer = searchOpen
      ? window.setTimeout(() => document.getElementById("interior-search-input")?.focus(), 420)
      : 0;
    return () => {
      if (focusTimer) window.clearTimeout(focusTimer);
      document.documentElement.classList.remove("search-open");
    };
  }, [searchOpen]);

  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => filterSearchIndex(query), [query]);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  };

  const goTo = (href: string) => {
    closeAll();
    goToSearchResult(href);
  };

  return (
    <>
      <header className="site-header interior-site-header is-scrolled">
        <div className="header-left">
          <button
            className="header-icon-button menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="interior-site-navigation"
            aria-expanded={menuOpen}
            onClick={() => {
              setSearchOpen(false);
              setQuery("");
              setMenuOpen((open) => !open);
            }}
          >
            <span className="hamburger" aria-hidden="true"><i /><i /><i /></span>
            <span className="header-control-label">Menu</span>
          </button>
          <button
            className="header-icon-button search-toggle"
            type="button"
            aria-label={searchOpen ? "Close website search" : "Search this website"}
            aria-controls="interior-site-search"
            aria-expanded={searchOpen}
            onClick={() => {
              setMenuOpen(false);
              setSearchOpen((open) => !open);
              if (searchOpen) setQuery("");
            }}
          >
            <span className="search-symbol" aria-hidden="true" />
            <span className="header-control-label">Search</span>
          </button>
          <a className="header-icon-button header-link watch-button" href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="Watch Vineyard Florence on YouTube">
            <span className="play-symbol" aria-hidden="true" />
            <span className="header-link-label">Watch</span>
          </a>
        </div>
        <Link className="brand" href="/" aria-label="Vineyard Florence Church home" onClick={closeAll}>
          <img src={logoWhiteUrl} alt="Vineyard Florence Church" width={logoSize.width} height={logoSize.height} fetchPriority="high" decoding="async" />
        </Link>
        <div className="header-right">
          <a className="header-icon-button header-link give-button" href={churchCenterGivingUrl} target="_blank" rel="noreferrer" aria-label="Give to Vineyard Florence through Church Center">
            <span className="give-symbol" aria-hidden="true" />
            <span className="header-link-label">Give</span>
          </a>
          <a className="header-icon-button header-link sign-in-button" href={churchCenterSignInUrl} target="_blank" rel="noreferrer" aria-label="Sign in to Vineyard Florence Church Center">
            <span className="sign-in-symbol" aria-hidden="true"><i /></span>
            <span className="header-link-label sign-in-label">Sign in</span>
          </a>
        </div>
        <div className={`mobile-menu interior-mobile-menu ${menuOpen ? "is-open" : ""}`} id="interior-site-navigation">
          <nav aria-label="Primary navigation">
            {primaryNavigation.map((item) =>
              item.external ? (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                  <span className="nav-marker" aria-hidden="true"><i /><i /><i /></span> {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  <span className="nav-marker" aria-hidden="true"><i /><i /><i /></span> {item.label}
                </Link>
              ),
            )}
          </nav>
          <p>
            {serviceTimes}
            <br />
            <a href={directionsUrl} target="_blank" rel="noreferrer">
              {address.street} · {address.city}, {address.state} {address.zip} ↗
            </a>
          </p>
        </div>
      </header>

      <div
        className={`site-search interior-search ${searchOpen ? "is-open" : ""}`}
        id="interior-site-search"
        role="dialog"
        aria-modal="true"
        aria-hidden={!searchOpen}
        aria-label="Search Vineyard Florence"
      >
        <div className="search-shell">
          <div className="search-heading">
            <p className="eyebrow">Find Your Way</p>
            <h2>What Are You<br /><em>Looking For?</em></h2>
          </div>
          <form
            className="search-form"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              if (results[0]) goTo(results[0].href);
            }}
          >
            <label htmlFor="interior-search-input">Search Vineyard Florence</label>
            <div className="search-field">
              <span className="search-field-icon" aria-hidden="true" />
              <input
                id="interior-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try “staff,” “beliefs” or “service times”"
                autoComplete="off"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                  Clear
                </button>
              )}
            </div>
          </form>
          <div className="search-results" aria-live="polite">
            <div className="search-results-meta">
              <span>
                {normalizedQuery
                  ? `${results.length} ${results.length === 1 ? "result" : "results"}`
                  : "Popular places"}
              </span>
              <small>Press ESC to close</small>
            </div>
            {results.length ? (
              <div className="search-results-list">
                {results.map((item, index) => (
                  <Link href={item.href} key={item.title} onClick={closeAll}>
                    <span>0{index + 1}</span>
                    <div><strong>{item.title}</strong><p>{item.description}</p></div>
                    <b aria-hidden="true">↗</b>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="search-empty">
                <strong>No matches yet.</strong>
                <p>Try “staff,” “beliefs,” “Sunday” or “prayer.”</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
