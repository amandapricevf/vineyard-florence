import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../../components/InteriorChrome";
import { StudentNewsletterForm } from "../StudentsForms";

export const metadata: Metadata = { title: "Vineyard Students Parent Newsletter | Vineyard Florence Church", description: "Sign up for Vineyard Students news, reminders and parent updates." };

export default function StudentNewsletterPage() {
  return <main className="interior-page kids-form-page" id="top"><InteriorHeader />
    <section className="kids-form-hero students-form-hero"><p className="eyebrow light">Vineyard Students</p><h1>Stay In<br /><em>The Loop.</em></h1><p>Receive schedule reminders, student-ministry news and helpful updates from the Vineyard Students team.</p><Link className="text-link light" href="/students">← Back To Vineyard Students</Link></section>
    <section className="kids-form-shell"><div className="kids-form-heading"><span className="section-index">Parent Newsletter</span><h2>News For<br /><em>Your Family.</em></h2></div><StudentNewsletterForm /></section>
    <InteriorFooter /><SiteTicker />
  </main>;
}
