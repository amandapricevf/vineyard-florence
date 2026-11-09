import { contactTopicLink, turkeyDinnerApplicationUrl, womenOfWarfareUrl } from "../site-data";

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
  /** Church Center registration page; the old website's event pages are retired. */
  primaryHref: string;
  primaryLabel: string;
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
    featuredDate: "October 2–4",
    featuredHeadline: "A Weekend Of",
    featuredHeadlineEmphasis: "Brotherhood.",
  },
  {
    isoDate: "2026-10-25",
    month: "OCT",
    day: "25",
    dateMeta: "Sunday",
    category: "Women’s Ministry",
    title: "Women’s Fall For Jesus Party",
    schedule: "October 25 · 5:30–8:00 PM · Free",
    location: "Vineyard Florence",
    description:
      "An evening hosted by VF’s Women’s Ministry. Join us for snacks, fun games and more—we would love to celebrate and get to know each other better.",
    image: "/images/events/womens-fall-for-jesus-party.webp",
    imageSize: { width: 1072, height: 1500 },
    alt: "Ladies, you are invited to the Fall for Jesus Party at Vineyard Florence Church, Sunday October 25th at 5:30 PM",
    primaryHref: "https://vineyardflorence.churchcenter.com/registrations/events/3910383",
    primaryLabel: "Register",
    featuredDate: "Sunday · October 25",
    featuredWhen: "5:30–8:00 PM",
    featuredHeadline: "Ladies, You Are",
    featuredHeadlineEmphasis: "Invited.",
  },
  {
    isoDate: "2026-10-28",
    month: "OCT",
    day: "28",
    dateMeta: "Wednesday",
    category: "Kids + Students",
    title: "Hallelujah Harvest Party",
    schedule: "October 28 · 6:00–7:30 PM · Free",
    location: "Vineyard Florence",
    description:
      "An evening filled with fun and fellowship! Kids and teens will eat some delicious food, play fall games, enter a costume contest and more.",
    image: "/images/events/hallelujah-harvest-party.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "Hallelujah Harvest Party, October 28, 6:00 to 7:30 PM: games, treats, costume contest and more",
    primaryHref: "https://vineyardflorence.churchcenter.com/registrations/signups/3937820",
    primaryLabel: "Register",
    featuredDate: "Wednesday · October 28",
    featuredWhen: "6:00–7:30 PM",
    featuredHeadline: "Games, Treats And",
    featuredHeadlineEmphasis: "Costumes.",
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
    featuredDate: "October 29 – November 1",
    featuredHeadline: "Serve Our Neighbors In",
    featuredHeadlineEmphasis: "Appalachia.",
  },
  {
    isoDate: "2026-11-06",
    endDate: "2026-11-08",
    month: "NOV",
    day: "06–08",
    dateMeta: "Friday–Sunday",
    category: "Vineyard Students",
    title: "The Outpouring Youth Conference",
    schedule: "November 6–8 · $189 until October 9, then $199",
    location: "Camp Chautauqua · Miamisburg, OH",
    description:
      "A youth conference for 6th–12th graders to encounter God and be equipped to live on mission, with dynamic worship and teaching, group activities and games, and time to reflect, connect and grow.",
    image: "/images/events/the-outpouring.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "The Outpouring youth conference logo",
    primaryHref: "https://www.theoutpouringretreat.com/",
    primaryLabel: "Register",
    featuredDate: "November 6–8",
    featuredWhere: "Camp Chautauqua · 10550 Camp Trail · Miamisburg, OH",
    featuredHeadline: "One Encounter Can",
    featuredHeadlineEmphasis: "Change A Life.",
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
    primaryLabel: "Register",
    featuredDate: "Saturday · November 7",
    featuredHeadline: "Breakfast, Brotherhood,",
    featuredHeadlineEmphasis: "Belonging.",
  },
  {
    isoDate: "2026-11-22",
    month: "NOV",
    day: "22",
    dateMeta: "Sunday",
    category: "Outreach",
    title: "Turkey Dinner Giveaway",
    schedule: "November 22 · Distribution & prayer 1:30–2:30 PM",
    location: "Vineyard Florence",
    description:
      "Help bless families in need with a complete Thanksgiving meal. Sponsor a $25 meal bag (text \"$25 Thanksgiving\" to 1-833-263-0025, or give online to the Thanksgiving fund), or pick up a bag and shopping list at the church doors and return it filled by November 16. Need a meal? Apply and someone will reach out within two business days.",
    image: "/images/events/turkey-dinner-giveaway.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "Turkey Dinner Giveaway announcement",
    primaryHref: turkeyDinnerApplicationUrl,
    primaryLabel: "Apply For A Meal",
    featuredDate: "Sunday · November 22",
    featuredWhen: "Prep 12:30 PM · Distribution & prayer 1:30–2:30 PM",
    featuredHeadline: "A Thanksgiving Meal For",
    featuredHeadlineEmphasis: "Every Table.",
  },
  {
    isoDate: "2026-11-22",
    month: "NOV",
    day: "22",
    dateMeta: "Sunday evening",
    category: "Women Of Warfare",
    title: "Women Of Warfare Sunday Evening Service",
    schedule: "November 22 · 6:30 PM",
    location: "Vineyard Florence",
    description:
      "A Women of Warfare Ministries evening service with guest speaker Renee McKnight, a mother of two, evangelist and woman marked by revival fire. After years of addiction, abuse, jails, rehabs and devastating loss, she encountered the delivering power of Jesus Christ and was forever changed. Pray, heal, deliver.",
    image: "/images/events/women-of-warfare-nov-22.webp",
    imageSize: { width: 1024, height: 1536 },
    alt: "Women of Warfare Ministries: guest speaker Renee McKnight, Sunday November 22 at 6:30 PM at Vineyard Florence Church",
    primaryHref: womenOfWarfareUrl,
    primaryLabel: "Women Of Warfare On Facebook",
    featuredDate: "Sunday · November 22",
    featuredWhen: "6:30 PM",
    featuredHeadline: "Pray. Heal.",
    featuredHeadlineEmphasis: "Deliver.",
  },
  {
    isoDate: "2026-12-05",
    month: "DEC",
    day: "05",
    dateMeta: "Saturday",
    category: "Men of Courage",
    title: "Men Of Courage Breakfast",
    schedule: "December 5 · 9:00 AM",
    location: "Vineyard Florence",
    description:
      "A hearty breakfast and a meaningful time of fellowship, connection and community for men ages 16 and up. Whether you attend our church or not, you are welcome—so bring a friend.",
    image: "/images/events/men-of-courage-breakfast-dec.webp",
    imageSize: { width: 1024, height: 768 },
    alt: "Men of Courage Breakfast, Saturday at 9:00 AM. Register online under events",
    primaryHref: "https://vineyardflorence.churchcenter.com/registrations/events/3859007",
    primaryLabel: "Register",
    featuredDate: "Saturday · December 5",
    featuredWhen: "9:00 AM",
    featuredHeadline: "Breakfast, Brotherhood,",
    featuredHeadlineEmphasis: "Belonging.",
  },
  {
    isoDate: "2026-12-06",
    month: "DEC",
    day: "06",
    dateMeta: "Sunday",
    category: "Women’s Ministry",
    title: "Women’s Christmas Celebration PJ Party",
    schedule: "December 6 · 5:30 PM",
    location: "Vineyard Florence",
    description:
      "Wear your favorite holiday PJs and bring a dessert to share; food and drinks are provided. Bring a new or gently used purse with a Christmas card of encouragement inside for the lucky lady who wins your bag!",
    image: "/images/events/womens-christmas-pj-party.webp",
    imageSize: { width: 1024, height: 768 },
    alt: "Women’s Ministry Christmas Celebration PJ Party, December 6th at 5:30 PM at The Vineyard Florence",
    primaryHref: "https://vineyardflorence.churchcenter.com/registrations/events/3919473",
    primaryLabel: "Register",
    featuredDate: "Sunday · December 6",
    featuredWhen: "5:30 PM",
    featuredHeadline: "Celebrate Our Savior",
    featuredHeadlineEmphasis: "Together.",
  },
];

/** The in-page anchor for an event, e.g. "turkey-dinner-giveaway" (used by links like the ticker's). */
export function eventAnchor(event: ChurchEvent): string {
  return event.title.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** Ongoing programmes with no single date — always shown, never expire. */
export type Rhythm = {
  /** Optional in-page anchor id for linking straight to this card. */
  id?: string;
  kicker: string;
  title: string;
  schedule: string;
  description: string;
  image: string;
  imageSize: { width: number; height: number };
  alt: string;
  /** Optional button. Omit both for a card with no link. */
  href?: string;
  cta?: string;
};

export const rhythms: Rhythm[] = [
  {
    kicker: "For Newcomers",
    title: "Pastries With The Pastors",
    schedule: "For people new to VF · Next date shown at signup",
    description:
      "Meet the team, learn why VF exists, hear about its mission and values, and find your next connection point—with pastries provided.",
    image: "/images/events/pastries-with-pastors.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "Pastries with the Pastors announcement",
    href: "https://vineyardflorence.churchcenter.com/registrations/events/3919050",
    cta: "Sign Up For The Next One",
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
    href: "/prayer",
    cta: "See prayer times",
  },
  {
    kicker: "For Our Neighbors",
    title: "VF’s Free Pantry",
    schedule: "Fourth Tuesday of each month · 6:00–7:30 PM",
    description:
      "The pantry provides free groceries for neighbors in need and a practical way for volunteers to serve, prepare and pray together.",
    image: "/images/events/free-pantry.webp",
    imageSize: { width: 1024, height: 768 },
    alt: "Vineyard Florence free pantry announcement",
    href: "/free-pantry",
    cta: "Pantry Details",
  },
  {
    kicker: "A Public Yes",
    title: "Baptisms",
    schedule: "First Sunday of each month · 11:00 AM service · Next: December 6",
    description:
      "Go public with your decision to follow Jesus and let the church celebrate with you. A baptism class begins at 10:30 AM before the second service.",
    image: "/images/events/baptisms.webp",
    imageSize: { width: 1500, height: 844 },
    alt: "Vineyard Florence baptism announcement",
    href: "/baptisms",
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
    href: "/ministries#women",
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
    href: contactTopicLink("men-of-courage"),
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
