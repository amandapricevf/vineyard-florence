import { address, contactPhone, contactPhoneUrl, directionsUrl, serviceTimes } from "../site-data";

/**
 * The visit details at the foot of the dropdown menu, shared by the home and
 * interior headers: when, where (tap for directions) and tap to call.
 */
export function MenuVisit() {
  return (
    <div className="menu-visit">
      <strong>{serviceTimes}</strong>
      <a href={directionsUrl} target="_blank" rel="noreferrer">
        {address.street}, {address.city}
        <span>Get directions ↗</span>
      </a>
      <a href={contactPhoneUrl}>
        {contactPhone}
        <span>Call us</span>
      </a>
    </div>
  );
}

/**
 * The menu panel sits after the header buttons in the page, so a keyboard user
 * who opens it would otherwise tab through Search, Watch, Give and Sign in
 * before reaching it. When it was opened from the keyboard (click detail 0),
 * move focus to its first link.
 */
export function focusMenuIfKeyboard(event: { detail: number }, opening: boolean) {
  if (!opening || event.detail !== 0) return;
  window.requestAnimationFrame(() => document.querySelector<HTMLElement>(".mobile-menu.is-open nav a")?.focus());
}

/**
 * Escape closes the header panels. If keyboard focus was inside one, send it
 * back to the button that opened it rather than dropping it on the page.
 */
export function returnFocusFromHeaderPanel() {
  const active = document.activeElement;
  if (active?.closest(".header-search")) document.querySelector<HTMLElement>(".search-toggle")?.focus();
  else if (active?.closest(".mobile-menu")) document.querySelector<HTMLElement>(".menu-toggle")?.focus();
}
