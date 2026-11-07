"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  churchCenterSignInUrl,
  logoSize,
  logoWhiteUrl,
  primaryNavigation,
  youtubeUrl,
} from "../site-data";
import { GiveMenu } from "./GiveMenu";
import { HeaderSearch } from "./HeaderSearch";
import { MenuVisit, focusMenuIfKeyboard, returnFocusFromHeaderPanel } from "./MenuVisit";
import { SiteFooter } from "./SiteFooter";

export { SiteTicker } from "./SiteTicker";

/** Interior pages share the site footer; the reveal animation is home-only. */
export function InteriorFooter() {
  return <SiteFooter className="interior-footer" />;
}

export function InteriorHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        returnFocusFromHeaderPanel();
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The menu is a dropdown: a click anywhere outside it closes it.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!(event.target as Element).closest?.(".mobile-menu, .menu-toggle")) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
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
            onClick={(event) => {
              setSearchOpen(false);
              setMenuOpen((open) => !open);
              focusMenuIfKeyboard(event, !menuOpen);
            }}
          >
            <span className="hamburger" aria-hidden="true"><i /><i /><i /></span>
            <span className="header-control-label">{menuOpen ? "Close" : "Menu"}</span>
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
            }}
          >
            <span className="search-symbol" aria-hidden="true" />
            <span className="header-control-label">{searchOpen ? "Close" : "Search"}</span>
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
          <GiveMenu />
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
          <MenuVisit />
        </div>
        <HeaderSearch id="interior-site-search" open={searchOpen} onClose={closeSearch} />
      </header>

    </>
  );
}
