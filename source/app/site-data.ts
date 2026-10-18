/**
 * Single source of truth for site-wide content.
 *
 * Anything that appears in more than one place — navigation, the search index,
 * contact details, service times, the news ticker — lives here so the home page
 * and the interior pages can never drift apart again.
 */

/* ------------------------------------------------------------------ */
/* Brand + contact                                                     */
/* ------------------------------------------------------------------ */

export const logoUrl = "/brand/vineyard-florence-church-logo.png";
export const logoWhiteUrl = "/brand/vineyard-florence-church-logo-white.png";

/** Intrinsic size of both logo files, used for width/height attributes. */
export const logoSize = { width: 1085, height: 367 } as const;

/**
 * TODO (confirm with the church): the original build used two different
 * addresses — office@vineyardflorence.com on the home page and
 * info@vineyardflorence.church on the interior pages. Only one is correct.
 * Set it here once and it updates everywhere.
 */
export const contactEmail = "info@vineyardflorence.church";
export const contactPhone = "859-689-0777";
export const contactPhoneUrl = "tel:+18596890777";

export const address = {
  name: "Vineyard Florence",
  street: "7101 Pleasant Valley Road",
  city: "Florence",
  state: "KY",
  zip: "41042",
} as const;

export const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Vineyard%20Florence%2C%207101%20Pleasant%20Valley%20Road%2C%20Florence%2C%20KY%2041042";

export const serviceTimes = "Sundays at 9 & 11 AM";

export const churchCenterSignInUrl = "https://vineyardflorence.churchcenter.com/login";
export const churchCenterGivingUrl = "https://vineyardflorence.churchcenter.com/giving";
export const everyOrgCryptoGivingUrl =
  "https://www.every.org/vineyardchristian?code=fd2ab74c#/donate";
export const vinedresserUrl = "https://www.thevinedresser.org/";
export const churchCenterHomeUrl = "https://vineyardflorence.churchcenter.com/";
export const churchCenterGroupsUrl = "https://vineyardflorence.churchcenter.com/groups";
export const houseGroupInterestUrl = "https://vineyardflorence.churchcenter.com/people/forms/688987";
export const eventsUrl = "/events";
export const prayerRequestUrl = "/prayer-request";
export const contactFormUrl = "/contact";

/** Link to the contact form with its subject line pre-filled. */
export const contactFormLink = (subject: string) => `${contactFormUrl}?subject=${encodeURIComponent(subject)}`;
export const youtubeUrl = "https://www.youtube.com/@VineyardFlorence";
export const facebookUrl = "https://www.facebook.com/vineyardflorence";
export const instagramUrl = "https://www.instagram.com/vineyardflorence";
export const spotifyPodcastUrl = "https://open.spotify.com/show/2IGMUuutUKP9Junu8YZnnt";
export const applePodcastUrl = "https://podcasts.apple.com/no/podcast/vineyard-florence/id1479721753";
export const celebrateRecoveryUrl = "https://celebraterecovery.com/";
export const mensHealthySexualityUrl = "https://menshealthysexuality.com/";
export const latviaFacebookUrl = "https://www.facebook.com/share/1cmcu4t5Cq/?mibextid=wwXIfr";

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = { label: string; href: string; external?: boolean };

export const primaryNavigation: NavItem[] = [
  { label: "New Here", href: "/#what-to-expect" },
  { label: "Discipleship", href: "/discipleship" },
  { label: "Events", href: "/events" },
  { label: "Sermons", href: "/sermons" },
  { label: "Staff", href: "/staff" },
  { label: "Beliefs", href: "/beliefs" },
  { label: "Find A House Group", href: churchCenterGroupsUrl, external: true },
];

export const footerExploreLinks: NavItem[] = [
  { label: "Discipleship", href: "/discipleship" },
  { label: "Find A House Group", href: churchCenterGroupsUrl, external: true },
  { label: "I'm New", href: "/#what-to-expect" },
  { label: "Next Steps", href: "/connect" },
  { label: "Ministries", href: "/ministries" },
  { label: "Vineyard Kids", href: "/kids" },
  { label: "Vineyard Students", href: "/students" },
  { label: "MERP", href: "/merp" },
  { label: "Prayer", href: "/prayer" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Staff", href: "/staff" },
  { label: "Beliefs", href: "/beliefs" },
  { label: "Our Church", href: "/#impact" },
  { label: "Plan A Visit", href: "/#visit" },
  { label: "FAQs", href: "/#faq" },
  { label: "Give", href: churchCenterGivingUrl, external: true },
];

/* ------------------------------------------------------------------ */
/* Search index                                                        */
/* ------------------------------------------------------------------ */

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string;
};

/**
 * One index for every search box on the site. Hrefs are always root-relative
 * so a result behaves the same whether the visitor searched from the home page
 * or an interior page — use `resolveSearchHref` when navigating.
 */
export const searchIndex: SearchItem[] = [
  { title: "Discipleship At Vineyard Florence", description: "Find your path into a House Group, explore leadership and use practical tools for making disciples.", href: "/discipleship", keywords: "discipleship gather grow go pathway follow jesus community foundations leader resources discovery bible study waha" },
  { title: "House Group Leadership", description: "Explore hosting, co-leading, training, leading or launching a House Group.", href: "/discipleship#leader-path", keywords: "host house group co-lead leader training launch new group discipleship" },
  { title: "Discipleship Books And PDFs", description: "Browse Vineyard Florence's practical guides and recommended discipleship reading.", href: "/discipleship#resources", keywords: "discipleship resources pdf books recommended reading prayer model guide" },
  { title: "Start A Discovery Group", description: "Use Waha to explore Scripture with people curious about God and faith.", href: "/discipleship#discovery-group", keywords: "discovery bible study group waha faith curious start" },
  { title: "Find A House Group", description: "Find the primary place for friendship, care, worship and becoming more like Jesus together.", href: churchCenterGroupsUrl, keywords: "house groups small groups join community friendship discipleship table grow" },
  { title: "Sunday Service Archive", description: "Browse every Vineyard Florence livestream by date and watch each full service on YouTube.", href: "/sermons", keywords: "sermons services livestreams messages teaching bible watch dates" },
  { title: "New To Vineyard Florence", description: "What to expect, when to arrive and a welcoming place to begin.", href: "/#what-to-expect", keywords: "new here welcome first visit church beliefs coffee service length" },
  { title: "Take A Next Step", description: "Visit, join a House Group, explore events, request prayer, give or sign in.", href: "/connect", keywords: "connect next step church center groups events visit give sign in" },
  { title: "Ministries", description: "Find Vineyard Kids, Students, House Groups, recovery, Men’s and Women’s Ministries, and MERP.", href: "/ministries", keywords: "ministries kids students youth men women celebrate recovery mens healthy sexuality mhs house groups merp refugee partnership" },
  { title: "MERP — Middle Eastern Refugee Partnership", description: "Making disciples who make disciples among people on the move. Explore church planting, local leadership and humanitarian relief, and find ways to partner, pray or give.", href: "/merp", keywords: "merp middle eastern refugee partnership asylum seekers global mission outreach turkey greece north macedonia cyprus humanitarian relief church planting partner pray give" },
  { title: "Latvia", description: "Explore Latvia ministry updates on Facebook.", href: latviaFacebookUrl, keywords: "latvia ministry global mission outreach facebook" },
  { title: "Up, In & Out", description: "Our whole-life pathway for loving God, making disciples and impacting the world.", href: "/#pathway", keywords: "discipleship connect up in out love god community" },
  { title: "Prayer Hub", description: "Request prayer, join a gathering or learn Vineyard's five-step prayer model.", href: "/prayer", keywords: "pray healing holy spirit gathering request five step model" },
  { title: "Contact Us", description: "Send the Vineyard Florence team a question or message.", href: contactFormUrl, keywords: "contact email question message ask help office reach" },
  { title: "Submit A Prayer Request", description: "Share a confidential prayer request with the Vineyard Florence prayer team.", href: prayerRequestUrl, keywords: "request prayer form confidential care pastoral help" },
  { title: "VF Foundations", description: "Go deeper through Vineyard Florence's eight-week Foundations course.", href: "/discipleship#resources", keywords: "foundations course class eight week 8 week deeper" },
  { title: "Upcoming Events", description: "Explore courses, gatherings, camps, baptisms and life at VF.", href: "/events", keywords: "events calendar alpha baptism upcoming foundations camp pantry" },
  { title: "Outreach & Mission", description: "See how Vineyard Florence serves Northern Kentucky and communities beyond it.", href: "/#impact", keywords: "outreach mission serve volunteer vinedresser foster kinship" },
  { title: "Sunday Services", description: "Join us Sundays at 9:00 or 11:00 AM. Services last about 75–80 minutes.", href: "/#what-to-expect", keywords: "service times sunday 9am 11am duration location directions visit communion" },
  { title: "Frequently Asked Questions", description: "Straight answers about what to wear, kids, worship, giving, prayer and your first Sunday.", href: "/#faq", keywords: "faq questions dress code clothes kids first visit worship giving money prayer new singled out" },
  { title: "Vineyard Kids", description: "A safe, fun and Spirit-led place for infants through fifth grade, with first-visit details and pre-registration.", href: "/kids", keywords: "children kids family childcare sunday nursery toddler preschool elementary register check in" },
  { title: "Register For Vineyard Kids", description: "Pre-register your child before your first Sunday visit.", href: "/kids/register", keywords: "kids child preregister registration first visit family parent guardian" },
  { title: "Vineyard Kids Media Release", description: "Submit website and social-media permission for your child.", href: "/kids/media-release", keywords: "kids child photo video media release permission consent" },
  { title: "Vineyard Students", description: "Weekly gatherings, parent resources and clear next steps for sixth through twelfth grade students.", href: "/students", keywords: "youth teenagers middle school high school students ascend class wednesday" },
  { title: "New To Vineyard Students", description: "Tell the Students team your family is coming to a gathering.", href: "/students/new", keywords: "student first visit new youth coming register" },
  { title: "Vineyard Students Parent Newsletter", description: "Sign up for student-ministry news, reminders and parent updates.", href: "/students/newsletter", keywords: "student youth parent newsletter updates schedule" },
  { title: "Celebrate Recovery", description: "A Christ-centered recovery community for finding healing and freedom.", href: "/ministries#celebrate-recovery", keywords: "recovery celebrate recovery healing freedom support" },
  { title: "Men’s Healthy Sexuality", description: "Resources and community helping men pursue wholeness and healthy sexuality.", href: "/ministries#mens-healthy-sexuality", keywords: "men mens healthy sexuality mhs wholeness" },
  { title: "Men’s Ministry", description: "Find connection, discipleship and opportunities for men at Vineyard Florence.", href: "/ministries#men", keywords: "men mens ministry men of courage" },
  { title: "Women’s Ministry", description: "Find connection, encouragement and gatherings for women at Vineyard Florence.", href: "/ministries#women", keywords: "women womens ministry gatherings" },
  { title: "Meet The Staff", description: "Meet the pastors, directors and ministry leaders who serve Vineyard Florence.", href: "/staff", keywords: "staff team pastors leaders people" },
  { title: "What We Believe", description: "Explore the mission, values and beliefs that shape Vineyard Florence.", href: "/beliefs", keywords: "beliefs theology values gospel up in out mission" },
  { title: "Give To Vineyard Florence", description: "Give simply and securely—and see how generosity moves beyond the walls of the church.", href: "/#give", keywords: "giving give donate generosity online church center mission community" },
  { title: "Contact Vineyard Florence", description: "Ask a question or start a conversation with Vineyard Florence.", href: "/#footer", keywords: "email contact office conversation question" },
];

/** Case-insensitive match across title, description and keywords. */
export function filterSearchIndex(query: string, fallbackCount = 4): SearchItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return searchIndex.slice(0, fallbackCount);
  return searchIndex.filter((item) =>
    `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(normalized),
  );
}

/**
 * Navigate to a search result. A root-relative hash link such as `/#prayer`
 * becomes a plain hash change when the visitor is already on the home page,
 * so searching from home scrolls instead of triggering a full reload.
 */
export function goToSearchResult(href: string): void {
  if (href.startsWith("/#") && window.location.pathname.replace(/\/$/, "") === "") {
    window.location.hash = href.slice(1);
    return;
  }
  window.location.assign(href);
}

/* ------------------------------------------------------------------ */
/* News ticker                                                         */
/* ------------------------------------------------------------------ */

/**
 * The sticky ticker at the bottom of every page.
 *
 * `expires` is the last day the message should be shown (church local time).
 * Once that day passes the ticker hides itself in the browser, so a stale
 * announcement never sits on a live site waiting for someone to notice.
 * Set `expires: null` for a message with no end date.
 */
export const tickerMessage = {
  kicker: "Latest",
  lead: "Breaking News:",
  copy: "Vineyard Florence is expanding to two services, Sunday 9am & 11am starting 8/16",
  label:
    "Breaking News: Vineyard Florence is expanding to two services, Sunday 9 AM and 11 AM starting August 16",
  href: "/#visit",
  expires: "2026-08-30" as string | null,
};
