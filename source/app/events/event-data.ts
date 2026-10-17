/**
 * Every dated event on the site.
 *
 * The list is rendered by `EventsCalendar`, which drops anything already past
 * and promotes the soonest remaining event into the featured slot. That means
 * adding an event is just a matter of appending an entry here — no separate
 * edit to the "Next up" panel, and no stale event sitting at the top of the
 * page after its date passes.
 *
 * `isoDate` is the *start* day in church local time (`YYYY-MM-DD`). For a
 * multi-day event, set `endDate` as well so it stays listed until it is
 * genuinely over.
 */

export type ChurchEvent = {
  /** Start day, `YYYY-MM-DD`. Drives sorting and expiry. */
  isoDate: string;
  /** Last day of a multi-day event. Omit for single-day events. */
  endDate?: string;
  /** Three-letter month shown in the date block, e.g. "SEP". */
  month: string;
  /** Day number shown in the date block; may be a range like "17–19". */
  day: string;
  /** Small line under the date, e.g. "Saturday" or "Eight Wednesdays". */
  dateMeta: string;
  title: string;
  schedule: string;
  location: string;
  description: string;
  image: string;
  /** Intrinsic pixel size of `image`, so the browser can reserve space. */
  imageSize: { width: number; height: number };
  alt: string;
  primaryHref: string;
  primaryLabel: string;
  detailsHref?: string;
  /** Kicker shown when this event is in the featured slot. */
  category: string;
  /** Long-form date line for the featured panel, e.g. "Wednesday · August 19". */
  featuredDate: string;
  /** "When" value for the featured panel. Falls back to `schedule`. */
  featuredWhen?: string;
  /** "Where" value for the featured panel. Falls back to `location`. */
  featuredWhere?: string;
  /** Headline for the featured panel. Falls back to `title`. */
  featuredHeadline?: string;
  featuredHeadlineEmphasis?: string;
};

export const churchEvents: ChurchEvent[] = [
  {
    isoDate: "2026-09-16",
    endDate: "2026-11-04",
    month: "SEP",
    day: "16",
    dateMeta: "Eight Wednesdays",
    category: "Course",
    title: "VF Foundations Course",
    schedule: "September 16–November 4 · 7:00–8:30 PM",
    location: "Elementary Room · Vineyard Florence",
    description:
      "An eight-week pathway for anyone ready to strengthen their foundation, grow toward spiritual maturity and follow the Jesus way of life—UP, IN and OUT.",
    image: "/images/events/vf-foundations.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "VF eight week Foundations course announcement",
    primaryHref: "https://vineyardflorence.churchcenter.com/registrations/events/3809818",
    primaryLabel: "Register",
    detailsHref: "https://www.vineyardflorence.church/events/vf-foundations-course",
    featuredDate: "Wednesdays · September 16 – November 4",
    featuredHeadline: "Eight Weeks To Go",
    featuredHeadlineEmphasis: "Deeper.",
  },
  {
    isoDate: "2026-10-02",
    endDate: "2026-10-04",
    month: "OCT",
    day: "02–04",
    dateMeta: "Friday–Sunday",
    category: "Men of Courage",
    title: "Men Of Courage Camp",
    schedule: "October 2–4 · $50 per person",
    location: "13084 Highway 330 · Berry, KY",
    description:
      "A weekend of brotherhood, biblical truth, food and fun for men ages 16 and up, with special guest Zach Fowler. Scholarships are available.",
    image: "/images/events/men-of-courage-camp.webp",
    imageSize: { width: 1500, height: 1500 },
    alt: "Men of Courage Camp October 2 through 4 announcement",
    primaryHref: "https://vineyardflorence.churchcenter.com/registrations/events/3212367",
    primaryLabel: "Register",
    detailsHref: "https://www.vineyardflorence.church/events/men-of-courage-camp",
    featuredDate: "October 2–4",
    featuredHeadline: "A Weekend Of",
    featuredHeadlineEmphasis: "Brotherhood.",
  },
  {
    isoDate: "2026-10-29",
    endDate: "2026-11-01",
    month: "OCT",
    day: "29",
    dateMeta: "Through November 1",
    category: "Mission",
    title: "Red Bird Mission Trip",
    schedule: "October 29–November 1",
    location: "Red Bird Mission · Appalachia, Kentucky",
    description:
      "Serve through construction projects, the community store and practical help for neighbors in Appalachia. Cost is $180 for adults and $150 for students.",
    image: "/images/events/red-bird-mission.webp",
    imageSize: { width: 760, height: 760 },
    alt: "Red Bird Mission trip announcement",
    primaryHref: "https://vineyardflorence.churchcenter.com/registrations/events/3423004",
    primaryLabel: "Register",
    detailsHref:
      "https://www.vineyardflorence.church/events/red-bird-mission-trip-2s69m-jezb2-gws53-pntg6-h7y45-k9d7g-szn3p-7lff4",
    featuredDate: "October 29 – November 1",
    featuredHeadline: "Serve Our Neighbors In",
    featuredHeadlineEmphasis: "Appalachia.",
  },
  {
    isoDate: "2026-11-07",
    month: "NOV",
    day: "07",
    dateMeta: "Saturday",
    category: "Men of Courage",
    title: "Men Of Courage Breakfast",
    schedule: "November 7 · 9:00–11:00 AM",
    location: "Vineyard Florence",
    description:
      "A free breakfast and meaningful time of fellowship, connection and community for men ages 16 and up. You do not have to attend VF to join—bring a friend.",
    image: "/images/events/men-of-courage.webp",
    imageSize: { width: 1024, height: 768 },
    alt: "Vineyard Men of Courage announcement",
    primaryHref: "https://vineyardflorence.churchcenter.com/registrations/events/3859007",
    primaryLabel: "View Details",
    detailsHref: "https://www.vineyardflorence.church/events/men-of-courage-pyh3s",
    featuredDate: "Saturday · November 7",
    featuredHeadline: "Breakfast, Brotherhood,",
    featuredHeadlineEmphasis: "Belonging.",
  },
];

/** Ongoing programmes with no single date — always shown, never expire. */
export type Rhythm = {
  kicker: string;
  title: string;
  schedule: string;
  description: string;
  image: string;
  imageSize: { width: number; height: number };
  alt: string;
  href: string;
  cta: string;
};

export const rhythms: Rhythm[] = [
  {
    kicker: "For Newcomers",
    title: "Pastries With The Pastors",
    schedule: "Registration open · Next date shown at signup",
    description:
      "Meet the team, learn why VF exists, hear about its mission and values, and find your next connection point—with pastries provided.",
    image: "/images/events/pastries-with-pastors.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "Pastries with the Pastors announcement",
    href: "https://vineyardflorence.churchcenter.com/registrations",
    cta: "Check Upcoming Dates",
  },
  {
    kicker: "A Life Of Prayer",
    title: "Prayer Opportunities",
    schedule: "Daily, weekly and monthly rhythms",
    description:
      "Join weekday morning Zoom prayer, Monday night prayer, Wednesday Flow Prayer or the first-Saturday 24-Hour Prayer Canopy.",
    image: "/images/events/prayer-opportunities.webp",
    imageSize: { width: 400, height: 500 },
    alt: "Vineyard Florence prayer opportunities announcement",
    href: "https://www.vineyardflorence.church/events/prayer-opportunities",
    cta: "See prayer times",
  },
  {
    kicker: "For Our Neighbors",
    title: "VF’s Free Pantry",
    schedule: "Second Sunday + fourth Tuesday each month",
    description:
      "The pantry provides free groceries for neighbors in need and a practical way for volunteers to serve, prepare and pray together.",
    image: "/images/events/free-pantry.webp",
    imageSize: { width: 1024, height: 768 },
    alt: "Vineyard Florence free pantry announcement",
    href: "https://www.vineyardflorence.church/events/grocery-giveaway-rtljl-8nm3g",
    cta: "Pantry details",
  },
  {
    kicker: "A Public Yes",
    title: "Baptisms",
    schedule: "First Sunday of each month · 11:00 AM service",
    description:
      "Go public with your decision to follow Jesus and let the church celebrate with you. A baptism class begins at 10:30 AM before the second service.",
    image: "/images/events/baptisms.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "Vineyard Florence baptism announcement",
    href: "https://www.vineyardflorence.church/events/baptism-hhpw6-38z2j-b4lwh-2am79-xt9mk-enksl-4rh65-atla5-ajmxf-rdkx8-s6gm6-w9xgy-l7hph-htr73",
    cta: "Baptism Details",
  },
  {
    kicker: "Women At VF",
    title: "Women’s Ministry",
    schedule: "Gatherings, prayer and connection",
    description:
      "Find the latest opportunities for women to worship, pray, build relationships and encourage one another in following Jesus.",
    image: "/images/events/womens-ministry.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "Vineyard Florence Women’s Ministry announcement",
    href: "https://www.vineyardflorence.church/events/womens-ministry-xdzfd-andfe",
    cta: "Women’s Ministry Details",
  },
  {
    kicker: "Men At VF",
    title: "Men Of Courage",
    schedule: "Connection, discipleship and upcoming gatherings",
    description:
      "Men ages 16 and up are invited to pursue Jesus, build brotherhood and stay connected with upcoming breakfasts, camps and opportunities to serve.",
    image: "/images/events/men-of-courage.webp",
    imageSize: { width: 1024, height: 768 },
    alt: "Vineyard Men of Courage announcement",
    href: "https://www.vineyardflorence.church/events/men-of-courage-pyh3s",
    cta: "Men Of Courage Details",
  },
];

/** Sorted by start date, soonest first. */
export const sortedEvents: ChurchEvent[] = [...churchEvents].sort((a, b) =>
  a.isoDate.localeCompare(b.isoDate),
);

/** The last day an event should stay on the page. */
export function lastVisibleDay(event: ChurchEvent): string {
  return event.endDate ?? event.isoDate;
}

/** Events that have not finished yet, soonest first. */
export function upcomingEvents(today: string): ChurchEvent[] {
  return sortedEvents.filter((event) => lastVisibleDay(event) >= today);
}

/** Month range covering a list of events, e.g. "August through November". */
export function monthRangeLabel(events: ChurchEvent[]): string {
  if (events.length === 0) return "";
  const monthName = (iso: string) =>
    new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long" });
  const first = monthName(events[0].isoDate);
  const last = monthName(lastVisibleDay(events[events.length - 1]));
  return first === last ? first : `${first} through ${last}`;
}
