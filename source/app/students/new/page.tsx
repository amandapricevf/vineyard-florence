import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../../components/InteriorChrome";
import { NewStudentForm } from "../StudentsForms";

export const metadata: Metadata = { title: "New To Vineyard Students | Vineyard Florence Church", description: "Let the Vineyard Students team know your student is coming to a gathering." };

export default function NewStudentPage() {
  return <main className="interior-page kids-form-page" id="top"><InteriorHeader />
    <section className="kids-form-hero students-form-hero"><p className="eyebrow light">Vineyard Students</p><h1>Come As<br /><em>You Are.</em></h1><p>Tell us a little about your student and our team will be ready to welcome your family.</p><Link className="text-link light" href="/students">← Back To Vineyard Students</Link></section>
    <section className="kids-form-shell"><div className="kids-form-heading"><span className="section-index">First Visit</span><h2>We’re Ready<br /><em>To Meet You.</em></h2></div><NewStudentForm /></section>
    <InteriorFooter /><SiteTicker />
  </main>;
}
