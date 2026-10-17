import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";

export const metadata: Metadata = {
  title: "Vineyard Students | Vineyard Florence Church",
  description: "A Spirit-led community where sixth through twelfth grade students learn the Bible, follow Jesus and build lifelong faith.",
};

const studentLinks = [
  ["01", "New To Vineyard Students", "Tell us about your student before their first gathering so our team can be ready to welcome them.", "/students/new", "Let Us Know You’re Coming"],
  ["02", "Serve With Students", "Start a conversation about helping students encounter Jesus, build friendships and grow as disciples.", "/students/serve", "Explore Serving"],
  ["03", "Parent Newsletter", "Receive student-ministry news, schedule reminders and helpful updates directly from the team.", "/students/newsletter", "Join The Newsletter"],
  ["04", "Website & Social Media Release", "Choose whether Vineyard Florence may use photos or video that include your student.", "/students/media-release", "Open The Media Release"],
] as const;

const reelPhotos = [
  ["/images/vineyard-florence/students-reel-01.webp", "Vineyard Florence students and leaders spending time together outdoors"],
  ["/images/vineyard-florence/students-reel-02.webp", "Vineyard Florence Students arriving together for a group outing"],
  ["/images/vineyard-florence/students-reel-03.webp", "Students enjoying bumper cars during a Vineyard Florence outing"],
  ["/images/vineyard-florence/students-reel-04.webp", "Vineyard Florence Students playing a group game"],
  ["/images/vineyard-florence/students-reel-05.webp", "Vineyard Florence Students gathered outside together"],
  ["/images/vineyard-florence/students-reel-06.webp", "Students taking part in an outdoor team activity"],
  ["/images/vineyard-florence/students-reel-07.webp", "Vineyard Florence Students laughing together on a group outing"],
  ["/images/vineyard-florence/students-reel-08.webp", "Vineyard Florence Students visiting an ice cream shop"],
  ["/images/vineyard-florence/students-reel-09.webp", "Students and leaders posing together during a summer outing"],
  ["/images/vineyard-florence/students-reel-10.webp", "Vineyard Florence Students sharing a memorable evening together"],
] as const;

export default function VineyardStudentsPage() {
  return (
    <main className="interior-page students-page" id="top">
      <InteriorHeader />

      <section className="students-hero">
        <img src="/images/vineyard-florence/vineyard-students.webp" alt="Vineyard Florence students spending time together" width="1600" height="1200" />
        <div className="students-hero-overlay" />
        <div className="students-hero-copy">
          <p className="eyebrow light">6th–12th Grade</p>
          <h1>Faith That<br /><em>Becomes Their Own.</em></h1>
          <p>Real friendships, honest questions and a Spirit-led environment where students learn the Bible and follow Jesus together.</p>
          <div className="students-hero-actions">
            <Link className="button button-light" href="/students/new">Let Us Know You’re Coming <span aria-hidden="true">→</span></Link>
            <a className="text-link light" href="#weekly-rhythm">See The Weekly Rhythm <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <aside className="students-hero-schedule" aria-label="Vineyard Students schedule">
          <span>Weekly</span>
          <strong>Sunday</strong>
          <b>Ascend Class · 9:00 AM First Service</b>
          <strong>Wednesday</strong>
          <b>7:00–8:30 PM</b>
        </aside>
      </section>

      <section className="students-intro">
        <span className="section-index">01 — Vineyard Students</span>
        <div>
          <p className="eyebrow">Love God. Make Disciples. Share Jesus.</p>
          <h2>Students Following<br /><em>Jesus For A Lifetime.</em></h2>
        </div>
        <p>At Vineyard Florence, students experience an exciting environment where they learn about Jesus and the Bible in a Spirit-led way. The heartbeat of Vineyard Students is to love God, make lifelong disciples of Jesus and share Jesus with the world around us. We are committed to partnering with parents and guardians as they disciple their students.</p>
      </section>

      <section className="students-rhythm" id="weekly-rhythm">
        <div className="students-rhythm-heading">
          <span className="section-index">02 — The Weekly Rhythm</span>
          <h2>Two Places To<br /><em>Grow Together.</em></h2>
        </div>
        <div className="students-rhythm-grid">
          <article><span>Sunday</span><h3>Ascend Class</h3><strong>During The 9:00 AM Service</strong><p>A Sunday-morning environment helping students go deeper in Scripture and grow as disciples of Jesus.</p></article>
          <article><span>Wednesday</span><h3>Student Gathering</h3><strong>7:00–8:30 PM</strong><p>Students gather for community, worship, biblical teaching and a chance to respond to what God is doing.</p></article>
        </div>
      </section>

      <section className="students-action-paths" aria-label="Vineyard Students forms and next steps">
        <div className="students-action-heading"><p className="eyebrow light">Students And Families</p><h2>A Clear<br /><em>Next Step.</em></h2></div>
        {studentLinks.map(([number, title, copy, href, cta]) => (
          <article key={href}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
            <Link href={href}>{cta} <span aria-hidden="true">→</span></Link>
          </article>
        ))}
      </section>

      <section className="students-photo-reel" aria-labelledby="student-reel-title">
        <div className="students-reel-heading">
          <span className="section-index">03 — Life Together</span>
          <h2 id="student-reel-title">More Than A Gathering.<br /><em>Memories That Stick.</em></h2>
          <p>Faith grows through shared life—on Wednesdays, Sundays and everywhere the adventure takes us.</p>
        </div>
        <div className="students-reel-window">
          <div className="students-reel-track">
            {[0, 1].map((copy) => (
              <div className="students-reel-group" aria-hidden={copy === 1} key={copy}>
                {reelPhotos.map(([src, alt], index) => (
                  <figure key={src} className={`students-reel-photo students-reel-photo-${(index % 4) + 1}`}>
                    <img src={src} alt={copy === 0 ? alt : ""} width="1200" height="900" loading="lazy" decoding="async" draggable="false" />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="students-social">
        <p className="eyebrow">Follow Vineyard Florence Students (VFStudents)</p>
        <a href="https://www.instagram.com/vf.students/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
        <a href="https://www.facebook.com/vineyardflorencestudents" target="_blank" rel="noreferrer">Facebook <span aria-hidden="true">↗</span></a>
        <a href="https://www.youtube.com/@VineyardFlorenceStudents" target="_blank" rel="noreferrer">YouTube <span aria-hidden="true">↗</span></a>
      </section>

      <section className="students-pastor">
        <img src="/images/vineyard-florence/amanda-students.jpeg" alt="Amanda Price enjoying a game with a Vineyard Florence student" loading="lazy" decoding="async" />
        <div>
          <p className="eyebrow light">Meet Amanda</p>
          <h2>Here For Students.<br /><em>Here For Families.</em></h2>
          <p>Hi, I’m Amanda! I am the Associate and Student Pastor at Vineyard Florence. I am passionate about making disciples and helping parents disciple their kids so Jesus is known and His Kingdom is built. I’m excited to see how God is working in and through our students and families at VF.</p>
          <a className="button button-light" href="mailto:amanda.price@vineyardflorence.church">Email Amanda <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
