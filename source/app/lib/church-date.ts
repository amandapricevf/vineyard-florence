/**
 * Date helpers anchored to the church's own timezone.
 *
 * The site is a static export, so any date computed at build time is frozen
 * into the HTML. Anything that needs to be correct *today* has to be computed
 * in the browser instead — these helpers are what the client components use.
 *
 * Everything compares whole days as `YYYY-MM-DD` strings in America/New_York,
 * so a visitor in California at 10pm still sees the same "today" the church
 * office would.
 */

export const CHURCH_TIME_ZONE = "America/New_York";

const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: CHURCH_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today in church local time, as `YYYY-MM-DD`. */
export function churchToday(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD, which sorts and compares lexicographically.
  return dayFormatter.format(now);
}

/**
 * True when `isoDate` (a `YYYY-MM-DD` string) is today or still to come.
 * An event stays visible for the whole of its own day rather than vanishing
 * at midnight UTC while it is still happening.
 */
export function isUpcoming(isoDate: string, today: string = churchToday()): boolean {
  return isoDate >= today;
}

/** True when a message with this last-visible day should still be shown. */
export function isActive(expires: string | null | undefined, today: string = churchToday()): boolean {
  if (!expires) return true;
  return expires >= today;
}
