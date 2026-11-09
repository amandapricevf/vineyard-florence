import type { ReactNode } from "react";
import Link from "next/link";
import { TriadMark } from "./TriadMark";
import {
  bibleReadingPlanUrl,
  contactTopicLink,
  freePantryUrl,
  houseGroupInterestUrl,
  latviaFacebookUrl,
  prayerZoomUrl,
  resetHouseUrl,
  vinedresserUrl,
  volunteerUrl,
  wahaUrl,
  womenOfWarfareUrl,
} from "../site-data";

/** How each movement is lived out at VF: concrete rhythms and next steps. */
const waysToLiveItOut: ReactNode[][] = [
  [
    <>We pray together daily on <a href={prayerZoomUrl} target="_blank" rel="noreferrer">Zoom from <span className="nowrap">6:30–7:00am ↗</span></a></>,
    <>We worship on Sunday mornings together at 9:00am &amp; 11:00am weekly (in person and online)</>,
    <><a href={bibleReadingPlanUrl} target="_blank" rel="noreferrer">Daily Bible Reading Plan ↗</a></>,
    <>We fast as a church weekly from Sunday evenings after dinner until dinner on Mondays. See our social media for prayer points.</>,
  ],
  [
    <><Link href={houseGroupInterestUrl}>Join a House Group →</Link></>,
    <>Lead or start a Discovery Bible Study: get the <a href={wahaUrl} target="_blank" rel="noreferrer">Waha app ↗</a></>,
    <>Connect to a recovery ministry at VF: <Link href="/ministries/celebrate-recovery">Celebrate Recovery</Link>, <Link href="/ministries/mens-healthy-sexuality">Men’s Healthy Sexuality</Link>, <Link href="/ministries/alcoholics-anonymous">AA</Link>, <Link href="/ministries/griefshare">GriefShare</Link>, <Link href={contactTopicLink("men-of-courage")}>Men of Courage</Link>, <a href={womenOfWarfareUrl} target="_blank" rel="noreferrer">Women of Warfare ↗</a></>,
    <>Serve on a Sunday, in Kids or Student Ministries, on our First Impressions Team or Media/Worship Team: <Link href={volunteerUrl}>Sign up to volunteer →</Link></>,
  ],
  [
    <>Serve at VF with one of our outreach ministries: <Link href={freePantryUrl}>Monthly Grocery Giveaways</Link>, <Link href={resetHouseUrl}>Local Reset Ministries sober-living house</Link>, <a href={vinedresserUrl} target="_blank" rel="noreferrer">The Vinedresser Foster and Kinship ↗</a>, <Link href="/events">other outreach events</Link> and more.</>,
    <>Go on a mission trip with us to Appalachia at <Link href="/events">Red Bird</Link>, or globally to <Link href="/merp">Greece</Link> or <a href={latviaFacebookUrl} target="_blank" rel="noreferrer">Latvia ↗</a>.</>,
  ],
];

const movements = [
  {
    mark: "UP",
    title: "Love God",
    points: ["Passionate Worship", "Personal And Shared Prayer", "Scripture And Spiritual Practices", "An Expectant Life With God"],
  },
  {
    mark: "IN",
    title: "Make Disciples",
    points: ["Authentic Community", "Growth Through Obedience", "Serving One Another", "Life Shared With Intention"],
  },
  {
    mark: "OUT",
    title: "Impact The World",
    points: ["Sharing The Gospel", "Serving Our Community", "Seeking People Far From God", "Local And Global Mission"],
  },
];

/** The three full-width Up / In / Out panels, each with its "How We Live It Out" list. */
export function MovementStack() {
  return (
    <section className="movement-stack" aria-label="Up, in and out">
      {movements.map((movement, index) => (
        <article className="movement-panel" key={movement.mark}>
          <div className="movement-mark"><TriadMark index={(index + 1) as 1 | 2 | 3} label={movement.title} /><strong>{movement.mark}</strong></div>
          <div className="movement-copy">
            <p className="eyebrow">{movement.title}</p>
            <ul>{movement.points.map((point) => <li key={point}>{point}</li>)}</ul>
            <div className="movement-ways">
              <p className="eyebrow">How We Live It Out</p>
              <ul>{waysToLiveItOut[index].map((way, wayIndex) => <li key={wayIndex}>{way}</li>)}</ul>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
