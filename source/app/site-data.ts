/**
 * Single source of truth for site-wide content.
 *
 * Anything that appears in more than one place — navigation, the search index,
 * contact details, service times, the news ticker — lives here so the home page
 * and the interior pages can never drift apart again.
 */

import { findContactTopic } from "./contact/contact-topics";

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
export const houseGroupInterestUrl = "/join-a-house-group";
export const eventsUrl = "/events";
export const prayerRequestUrl = "/prayer-request";
export const stockGiftUrl = "/give-stock";
export const contactFormUrl = "/contact";

/** Link to the general contact form with its subject line pre-filled. */
export const contactFormLink = (subject: string) => `${contactFormUrl}?subject=${encodeURIComponent(subject)}`;

/**
 * Link to the contact form for one topic in `contact/contact-topics.json`.
 * An unknown topic fails the build rather than shipping a broken link.
 */
export function contactTopicLink(topic: string): string {
  if (!findContactTopic(topic)) throw new Error(`Unknown contact topic "${topic}" — add it to app/contact/contact-topics.json`);
  return `${contactFormUrl}?topic=${topic}`;
}
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
  { label: "Ministries", href: "/ministries" },
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
  { title: "Sunday Services", description: "Join us Sundays at 9:00 or 11:00 AM. Services last about 75–80 minutes.", href: "/#what-to-expect", keywords: "service times sunday 9am 11am duration location directions visit communion" },
  { title: "Sunday Service Archive", description: "Browse every Vineyard Florence livestream by date and watch each full service on YouTube.", href: "/sermons", keywords: "sermons services livestreams messages teaching bible watch dates" },
  { title: "New To Vineyard Florence", description: "What to expect, when to arrive and a welcoming place to begin.", href: "/#what-to-expect", keywords: "new here welcome first visit church beliefs coffee service length" },
  { title: "Take A Next Step", description: "Visit, join a House Group, explore events, request prayer, give or sign in.", href: "/connect", keywords: "connect next step church center groups events visit give sign in" },
  { title: "Ministries", description: "Find Vineyard Kids, Students, House Groups, recovery, Men’s and Women’s Ministries, and MERP.", href: "/ministries", keywords: "ministries kids students youth men women celebrate recovery mens healthy sexuality mhs house groups merp refugee partnership" },
  { title: "MERP — Middle Eastern Refugee Partnership", description: "Making disciples who make disciples among people on the move. Explore church planting, local leadership and humanitarian relief, and find ways to partner, pray or give.", href: "/merp", keywords: "merp middle eastern refugee partnership asylum seekers global mission outreach turkey greece north macedonia cyprus humanitarian relief church planting partner pray give" },
  { title: "Latvia", description: "Explore Latvia ministry updates on Facebook.", href: latviaFacebookUrl, keywords: "latvia ministry global mission outreach facebook" },
  { title: "Up, In & Out", description: "Our whole-life pathway for loving God, making disciples and impacting the world.", href: "/#pathway", keywords: "discipleship connect up in out love god community" },
  { title: "Prayer Hub", description: "Request prayer, join a gathering or learn Vineyard's five-step prayer model.", href: "/prayer", keywords: "pray healing holy spirit gathering request five step model" },
  { title: "Join A House Group", description: "Tell us which House Group you would like to know more about and we will help you connect.", href: houseGroupInterestUrl, keywords: "house group small group join sign up interest form community" },
  { title: "Contact Us", description: "Send the Vineyard Florence team a question or message.", href: contactFormUrl, keywords: "contact email question message ask help office reach" },
  { title: "Submit A Prayer Request", description: "Share a confidential prayer request with the Vineyard Florence prayer team.", href: prayerRequestUrl, keywords: "request prayer form confidential care pastoral help" },
  { title: "VF Foundations", description: "Go deeper through Vineyard Florence's eight-week Foundations course.", href: "/discipleship#resources", keywords: "foundations course class eight week 8 week deeper" },
  { title: "Baptisms", description: "Go public with your faith. Baptisms happen on the first Sunday of each month during the 11:00 AM service.", href: "/baptisms", keywords: "baptism baptized baptize water dunk public faith class kids again" },
  { title: "VF’s Free Pantry", description: "Free groceries for neighbors in need on the fourth Tuesday of each month, 6:00–7:30 PM.", href: "/free-pantry", keywords: "pantry food groceries free grocery giveaway hungry need help serve volunteer tuesday" },
  { title: "Upcoming Events", description: "Explore courses, gatherings, camps, baptisms and life at VF.", href: "/events", keywords: "events calendar alpha baptism upcoming foundations camp pantry" },
  { title: "Outreach & Mission", description: "See how Vineyard Florence serves Northern Kentucky and communities beyond it.", href: "/#impact", keywords: "outreach mission serve volunteer vinedresser foster kinship" },
  { title: "Frequently Asked Questions", description: "Straight answers about what to wear, kids, worship, giving, prayer and your first Sunday.", href: "/#faq", keywords: "faq questions dress code clothes kids first visit worship giving money prayer new singled out" },
  { title: "Vineyard Kids", description: "A safe, fun and Spirit-led place for infants through fifth grade, with first-visit details and pre-registration.", href: "/kids", keywords: "children kids family childcare sunday nursery toddler preschool elementary register check in" },
  { title: "Register For Vineyard Kids", description: "Pre-register your child before your first Sunday visit.", href: "/kids/register", keywords: "kids child preregister registration first visit family parent guardian" },
  { title: "Vineyard Kids Media Release", description: "Submit website and social-media permission for your child.", href: "/kids/media-release", keywords: "kids child photo video media release permission consent" },
  { title: "Vineyard Students", description: "Weekly gatherings, parent resources and clear next steps for sixth through twelfth grade students.", href: "/students", keywords: "youth group teenagers middle school high school students ascend class wednesday" },
  { title: "New To Vineyard Students", description: "Tell the Students team your family is coming to a gathering.", href: "/students/new", keywords: "student first visit new youth coming register" },
  { title: "Vineyard Students Parent Newsletter", description: "Sign up for student-ministry news, reminders and parent updates.", href: "/students/newsletter", keywords: "student youth parent newsletter updates schedule" },
  { title: "Celebrate Recovery", description: "A Christ-centered recovery community for finding healing and freedom.", href: "/ministries#celebrate-recovery", keywords: "recovery celebrate recovery healing freedom support" },
  { title: "Men’s Healthy Sexuality", description: "Resources and community helping men pursue wholeness and healthy sexuality.", href: "/ministries#mens-healthy-sexuality", keywords: "men mens healthy sexuality mhs wholeness" },
  { title: "Men’s Ministry", description: "Find connection, discipleship and opportunities for men at Vineyard Florence.", href: "/ministries#men", keywords: "men mens ministry group men of courage" },
  { title: "Women’s Ministry", description: "Find connection, encouragement and gatherings for women at Vineyard Florence.", href: "/ministries#women", keywords: "women womens ministry group gatherings ladies" },
  { title: "Meet The Staff", description: "Meet the pastors, directors and ministry leaders who serve Vineyard Florence.", href: "/staff", keywords: "staff team pastors leaders people" },
  { title: "What We Believe", description: "Explore the mission, values and beliefs that shape Vineyard Florence.", href: "/beliefs", keywords: "beliefs theology values gospel up in out mission" },
  { title: "Give Stock", description: "Tell us about a gift of stock and we will reach out about how to donate it.", href: stockGiftUrl, keywords: "stock stocks shares securities donate give gift broker ticker appreciated" },
  { title: "Give To Vineyard Florence", description: "Give simply and securely—and see how generosity moves beyond the walls of the church.", href: "/#give", keywords: "giving give donate generosity online church center mission community" },
  { title: "Contact Vineyard Florence", description: "Ask a question or start a conversation with Vineyard Florence.", href: "/#footer", keywords: "email contact office conversation question" },
];

/*
 * Search understands everyday questions ("how do I register my kids?"), not
 * just exact phrases. Filler words are ignored, word endings are loosened
 * (register / registration, kid / kids) and common synonyms are expanded, then
 * every page is scored on how many of the remaining words it covers.
 */

/** Words that carry no meaning for finding a page. */
const searchStopWords = new Set(
  ("a about am an and any are at be can could do does find for from get go "
  + "have help how i im in info information is it know learn me more my need "
  + "of on or our page please see should show some tell that the there this "
  + "to us want we what when where which who will with you your "
  + "vineyard florence vf church").split(" "),
);

/** Each group is treated as the same idea; the first word is the canonical one. */
const searchSynonyms: string[][] = [
  ["kid", "kids", "child", "children", "childrens", "nursery", "toddler", "baby", "babies", "son", "daughter", "preschool", "elementary"],
  ["student", "students", "youth", "teen", "teens", "teenager", "teenagers"],
  ["register", "registration", "signup", "sign", "enroll", "enrol", "preregister", "join"],
  ["give", "giving", "donate", "donation", "tithe", "tithing", "offering", "money"],
  ["service", "services", "sunday", "sundays", "times", "worship"],
  ["sermon", "sermons", "message", "messages", "livestream", "watch", "video", "online"],
  ["group", "groups", "smallgroup", "housegroup"],
  ["contact", "email", "phone", "call", "office", "ask", "question", "questions"],
  ["staff", "pastor", "pastors", "team", "leader", "leaders"],
  ["direction", "directions", "address", "location", "park", "parking", "map"],
  ["event", "events", "calendar", "happening", "upcoming"],
  ["volunteer", "serve", "serving", "outreach"],
  ["new", "visit", "visiting", "visitor", "first"],
];

const synonymLookup = new Map<string, string[]>();
for (const group of searchSynonyms) for (const word of group) synonymLookup.set(word, group);

function searchWords(text: string): string[] {
  return text.toLowerCase().replace(/[’']/g, "").split(/[^a-z0-9]+/).filter(Boolean);
}

/** Loosen common English endings so "registration" and "register" meet. */
function stem(word: string): string {
  let result = word;
  if (result.length > 4 && result.endsWith("ies")) result = `${result.slice(0, -3)}y`;
  else if (result.length > 3 && result.endsWith("s") && !result.endsWith("ss")) result = result.slice(0, -1);
  for (const ending of ["ation", "ing", "ed", "er"]) {
    if (result.length - ending.length >= 4 && result.endsWith(ending)) return result.slice(0, -ending.length);
  }
  return result;
}

function wordsMatch(queryWord: string, pageWord: string): boolean {
  if (queryWord === pageWord) return true;
  const a = stem(queryWord);
  const b = stem(pageWord);
  if (a === b) return true;
  // Shared beginnings of five or more letters: "regist(er)" / "regist(ration)".
  const shared = Math.min(a.length, b.length);
  return shared >= 5 && a.slice(0, 5) === b.slice(0, 5);
}

function fieldContains(fieldWords: string[], variants: string[]): boolean {
  return variants.some((variant) => fieldWords.some((word) => wordsMatch(variant, word)));
}

/**
 * The single best page for a search, or `null` when nothing fits.
 * Title matches count most, then keywords, then the description; a page
 * that covers every meaningful word in the search gets a bonus.
 */
export function findSearchResult(query: string): SearchItem | null {
  const terms = searchWords(query).filter((word) => !searchStopWords.has(word));
  if (!terms.length) return null;

  let best: SearchItem | null = null;
  let bestScore = 0;
  for (const item of searchIndex) {
    const title = searchWords(item.title);
    const keywords = searchWords(item.keywords);
    const description = searchWords(item.description);
    let score = 0;
    let matched = 0;
    for (const term of terms) {
      const variants = synonymLookup.get(term) ?? [term];
      const exact = [term];
      const points = fieldContains(title, exact) ? 4
        : fieldContains(title, variants) ? 3
        : fieldContains(keywords, exact) ? 2.5
        : fieldContains(keywords, variants) ? 2
        : fieldContains(description, variants) ? 1
        : 0;
      if (points) matched += 1;
      score += points;
    }
    if (matched === terms.length) score += 2;
    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }
  return best;
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
  /** Optional bold lead-in before the copy; leave empty for none. */
  lead: "",
  copy: "Announcement placeholder",
  label: "Announcement placeholder",
  href: "/#visit",
  expires: null as string | null,
};
