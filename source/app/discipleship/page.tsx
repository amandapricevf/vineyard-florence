import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { TriadMark } from "../components/TriadMark";
import { DiscipleshipStages } from "./DiscipleshipStages";
import { MovementStack } from "../components/MovementStack";
import {
  contactTopicLink,
  churchCenterGroupsUrl,
  houseGroupInterestUrl,
  wahaUrl,
} from "../site-data";

export const metadata: Metadata = {
  title: "Discipleship | Vineyard Florence Church",
  description:
    "Find a House Group, explore House Group leadership and access practical disciple-making tools from Vineyard Florence.",
};

const leaderEmailUrl = contactTopicLink("lead-house-group");

const leaderPath = [
  {
    step: "01",
    title: "Host A House Group",
    copy: "Open your home or another welcoming space so a group has a place to gather.",
    action: "Ask About Hosting",
    topic: "host-house-group",
  },
  {
    step: "02",
    title: "Co-Lead A House Group",
    copy: "Serve alongside a leader, learn the rhythm and help people feel known.",
    action: "Ask About Co-Leading",
    topic: "co-lead-house-group",
  },
  {
    step: "03",
    title: "Join Leader Training",
    copy: "Tell us you are interested in House Group leader training and ask about the next opportunity.",
    action: "Ask About Training",
    topic: "house-group-leader-training",
  },
  {
    step: "04",
    title: "Lead A House Group",
    copy: "Help a group practice prayer, Scripture, care and following Jesus in everyday life.",
    action: "Explore Leading",
    topic: "lead-house-group",
  },
  {
    step: "05",
    title: "Launch A New House Group",
    copy: "Ready to make room for more people? Start a conversation about launching a new group.",
    action: "Explore A New Group",
    topic: "launch-house-group",
  },
] as const;

const recommendedBooks = [
  { title: "The Cost of Discipleship", author: "Dietrich Bonhoeffer" },
  { title: "Life Together", author: "Dietrich Bonhoeffer" },
  { title: "Loving God", author: "Chuck Colson" },
  { title: "Small Is Big, Slow Is Fast", author: "Caesar Kalinowski" },
  { title: "Building a Discipling Culture", author: "Mike Breen" },
  { title: "Emotionally Healthy Discipleship", author: "Peter Scazzero" },
  { title: "Cabbages in the Desert", author: "Aila Tasse & Dave Coles" },
  { title: "Training for Trainers (T4T)", author: "Ying and Grace Kai" },
  { title: "Miraculous Movements", author: "Jerry Trousdale" },
  { title: "Living Fire", author: "Aychi BR with David Coles" },
  { title: "From Megachurch to Movement", author: "Chris Galanos" },
  { title: "Always Enough", author: "Heidi Baker" },
  { title: "Compelled by Love", author: "Heidi Baker" },
  { title: "Chasing the Dragon", author: "Jackie Pullinger" },
  { title: "The Celebration of Discipline", author: "Richard Foster" },
  { title: "Called and Committed", author: "David Watson" },
  { title: "The Divine Conspiracy", author: "Dallas Willard" },
  { title: "The Pursuit of God", author: "A. W. Tozer" },
  { title: "Radical: Taking Back Your Faith from the American Dream", author: "David Platt" },
  { title: "Practicing the Way: Be with Jesus. Become like Him. Do as He Did", author: "John Mark Comer" },
  { title: "A Long Obedience in the Same Direction", author: "Eugene Peterson" },
  { title: "The Pursuit of Holiness", author: "Jerry Bridges" },
  { title: "Dark Night of the Soul", author: "St. John of the Cross" },
  { title: "The Imitation of Christ", author: "Thomas à Kempis" },
  { title: "Contagious Disciple-Making", author: "David and Paul Watson" },
  { title: "No Compromise", author: "Melody and Keith Green" },
  { title: "Discipleshift", author: "Jim Putman, Bobby Harrington & Robert Coleman" },
  { title: "The Trellis and the Vine", author: "Colin Marshall & Tony Payne" },
  { title: "The Complete Book on Discipleship", author: "Bill Hull" },
  { title: "Letters to the Church", author: "Francis Chan" },
  { title: "The Jesus Strategy", author: "Tom Marshall" },
  { title: "Growing True Disciples", author: "George Barna" },
  { title: "The Radical Disciple", author: "John Stott" },
  { title: "Bhojpuri Breakthrough: A Movement That Keeps Multiplying", author: "Victor John with Dave Coles" },
  { title: "Sacrilege", author: "Hugh Halter" },
  { title: "Cultivating a Life for God: Multiplying Disciples Through Life Transformation Groups", author: "Neil Cole" },
  { title: "The Forgotten Ways", author: "Alan Hirsch" },
  { title: "Designed to Lead", author: "Eric Geiger and Kevin Peck" },
  { title: "The Heavenly Man", author: "Brother Yun" },
] as const;

/**
 * The resource library in three groups that follow Up, In and Out, holding
 * only the resources the church chose for each group. `external` marks apps
 * that open another site rather than a VF guide.
 */
const resourceGroups = [
  {
    movement: "Up",
    label: "Prayer",
    description: "Make room to meet with God, hear His voice and pray with Scripture.",
    links: [
      { title: "Learning To Hear God’s Voice", note: "Practice listening and responding to God", href: "/resources/discipleship/Learning-to-Hear-Gods-Voice.pdf" },
      { title: "Alone Time With God", note: "A personal prayer guide", href: "/resources/discipleship/Alone-Time-wGod-Prayer-Guide.pdf" },
      { title: "Prayer Hexagon", note: "Pray through the interactive guide on our Prayer page", href: "/prayer#learn" },
      { title: "Lectio Divina App", note: "Daily Lectio Divina prayer on your phone", href: "https://lectio365.com/the-app/", external: true },
    ],
  },
  {
    movement: "In",
    label: "Together",
    description: "Grow with others in House Groups and Discovery Bible Studies, and pray for disciple-making movements.",
    links: [
      { title: "DMM Prayers", note: "Pray for disciple-making movements", href: "/resources/discipleship/DMM-Prayers.pdf" },
      { title: "Waha App", note: "Start a Discovery Bible Study", href: "https://waha.app/eng", external: true },
    ],
  },
  {
    movement: "Out",
    label: "Serving Others",
    description: "Join God’s mission: pray for His Kingdom, pray for people and serve those far from Him.",
    links: [
      { title: "Kingdom Prayer", note: "A guide to praying for God’s Kingdom", href: "/resources/discipleship/Kingdom-Prayer-DMM.pdf" },
      { title: "5 Step Prayer Model", note: "Learn to pray for someone", href: "/resources/discipleship/Vineyard-5-Step-Prayer-Model.pdf" },
      { title: "Bless App", note: "Love and bless the people around you", href: "https://www.theblessapp.com/", external: true },
    ],
  },
] as const;

export default function DiscipleshipPage() {
  return (
    <main className="interior-page discipleship-page" id="top">
      <InteriorHeader />

      <section className="discipleship-hero">
        <img
          src="/images/vineyard-florence/house-groups-table.webp"
          alt="Friends sharing conversation around a table at Vineyard Florence"
          width={1440}
          height={960}
          fetchPriority="high"
          decoding="async"
        />
        <div className="discipleship-hero-shade" />
        <div className="discipleship-hero-copy">
          <p className="eyebrow light">This Is More Than Attending Church</p>
          <h1>Don&apos;t Just Attend.<br /><em>Become A Disciple.</em></h1>
          <p>Follow Jesus with people who will know you, challenge you and help you do what Jesus did. Your next step can start today.</p>
          <div className="discipleship-hero-actions">
            <a className="button button-light" href={houseGroupInterestUrl}>Find My House Group <span aria-hidden="true">↗</span></a>
            <a className="text-link light" href="#pathway">Show Me The Path <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <aside className="discipleship-hero-punch">
          <span>One Decision.</span>
          <strong>A Different<br />Direction.</strong>
          <p>Find Your Next Step.</p>
        </aside>
      </section>

      <section className="discipleship-manifesto">
        <span className="section-index">01 — The Invitation</span>
        <div>
          <p className="eyebrow">Jesus Did Not Say “Come And Watch”</p>
          <h2>He Said,<br /><em>“Follow Me.”</em></h2>
        </div>
        <p>Discipleship is the lifelong process of becoming more like Jesus—and helping someone else do the same. It is not a class you finish. It is a life you practice with God and other people.</p>
      </section>

      <div className="discipleship-transition">
        <p>We do this in <em>three ways.</em></p>
        <span><b>Up</b> · <b>In</b> · <b>Out</b> <i aria-hidden="true">↓</i></span>
      </div>

      <MovementStack />

      <DiscipleshipStages />

      <section className="discipleship-groups">
        <div className="discipleship-groups-image">
          <img src="/images/vineyard-florence/house-groups.webp" alt="A Vineyard Florence House Group sharing life together" width={1400} height={1400} loading="lazy" decoding="async" />
          <span>THE PRIMARY PLACE WE GROW</span>
        </div>
        <div className="discipleship-groups-copy">
          <p className="eyebrow light">Rows Are Good. Circles Change Lives.</p>
          <h2>Get Around<br /><em>A Table.</em></h2>
          <p>House Groups are the bread and butter of how we become disciples and make disciples at VF. They are where friendship becomes real, care becomes personal and following Jesus becomes part of ordinary life.</p>
          <ul>
            <li><span>01</span> Be known—not lost in a crowd.</li>
            <li><span>02</span> Practice Scripture, prayer and obedience.</li>
            <li><span>03</span> Discover how God can use your life.</li>
          </ul>
          <div className="discipleship-groups-actions">
            <a className="button button-light" href={houseGroupInterestUrl}>Help Me Find A Group <span aria-hidden="true">↗</span></a>
            <a className="text-link light" href={churchCenterGroupsUrl} target="_blank" rel="noreferrer">Check Out House Groups <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="discipleship-lead" id="lead">
        <div>
          <span className="section-index">03 — Multiply</span>
          <p className="eyebrow">Maybe The Next Group Starts With You</p>
          <h2>You Don&apos;t Need<br />All The Answers.<br /><em>You Need A Yes.</em></h2>
        </div>
        <div className="discipleship-lead-copy">
          <p>House Group leaders create space for people to meet Jesus, hear His voice and take their next step. Vineyard Florence can help you discern the call, prepare and lead with coaching—not alone.</p>
          <div className="discipleship-lead-list">
            <span>Follow Jesus authentically</span>
            <span>Welcome people generously</span>
            <span>Make room for Scripture and the Spirit</span>
            <span>Help others take action</span>
          </div>
          <a className="button button-dark" href={leaderEmailUrl}>I Want To Explore Leadership <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="discipleship-leader-path" id="leader-path">
        <div className="discipleship-leader-heading">
          <p className="eyebrow light">There Is More Than One Way To Begin</p>
          <h2>From Making Room<br />To <em>Making Disciples.</em></h2>
          <p>Explore the role that fits your season. These links start a conversation with the VF team so you can learn what each step involves.</p>
        </div>
        <div className="discipleship-leader-steps">
          {leaderPath.map((item) => (
            <a key={item.step} href={contactTopicLink(item.topic)}>
              <span>{item.step}</span>
              <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              <strong>{item.action} <b aria-hidden="true">↗</b></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="discipleship-discovery" id="discovery-group">
        <div><span className="section-index">04 — Discovery Groups</span><p className="eyebrow">For People Curious About God And Faith</p><h2>Start With<br /><em>A Question.</em></h2></div>
        <div><p>Invite a few people to explore Scripture together. You do not need to give a lecture or have every answer. Waha offers a free Discovery Bible Study app and disciple-making course to help you start a Discovery Group.</p><a className="button button-dark" href={wahaUrl} target="_blank" rel="noreferrer">Start A Discovery Group With Waha <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="discipleship-resources" id="resources">
        <div className="discipleship-resources-heading">
          <span className="section-index">05 — Resource Library</span>
          <div><p className="eyebrow">Tools You Can Use This Week</p><h2>Learn It.<br /><em>Live It. Give It Away.</em></h2></div>
          <p>House Groups, Discovery Bible Studies and recovery ministries are primary places we make disciples. These tools follow Up, In and Out: prayer, life together and serving others. Each one opens in a new tab.</p>
        </div>

        <div className="discipleship-resource-groups">
          {resourceGroups.map((group, groupIndex) => (
            <section key={group.label}>
              <header><TriadMark index={(groupIndex + 1) as 1 | 2 | 3} /><div><p className="eyebrow">{group.movement}</p><h3>{group.label}</h3><p>{group.description}</p></div></header>
              <div>
                {group.links.map((resource) => (
                  <a key={resource.title} href={resource.href} target="_blank" rel="noreferrer" data-kind={"external" in resource ? "app" : "guide"}>
                    <div><strong>{resource.title}</strong><span>{resource.note}</span></div>
                    <b aria-hidden="true">↗</b>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="discipleship-resource-more">
          <div><p className="eyebrow light">Use The Tools Together</p><h3>Try The Interactive Prayer Hexagon And Learn To Pray For Someone.</h3></div>
          <Link className="button button-light" href="/prayer#learn">Explore The Prayer Hub <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="discipleship-books" id="books">
          <div className="discipleship-books-heading">
            <div><p className="eyebrow">Ryan&apos;s Recommended Reading</p><h3>Books For The<br /><em>Long Road.</em></h3></div>
            <p>Read one with a friend or House Group. These are recommended titles, not downloads or purchase links; ask a local library or bookseller for a copy.</p>
          </div>
          <details>
            <summary><span>Explore All {recommendedBooks.length} Books</span><b aria-hidden="true">+</b></summary>
            <ol>
              {recommendedBooks.map((book, index) => (
                <li key={book.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{book.title}</strong><small>{book.author}</small></div></li>
              ))}
            </ol>
          </details>
        </div>
      </section>

      <section className="discipleship-final">
        <p className="eyebrow light">Your Move</p>
        <h2>Information Won&apos;t<br />Change Your Life.<br /><em>A Next Step Will.</em></h2>
        <p>Start with a House Group. Bring your real life. Follow Jesus with people. Then help someone else do the same.</p>
        <div>
          <a className="button button-light" href={houseGroupInterestUrl}>Find My House Group <span aria-hidden="true">↗</span></a>
          <Link className="text-link light" href="/prayer">Begin With Prayer <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
