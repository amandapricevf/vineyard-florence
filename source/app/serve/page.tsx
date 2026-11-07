import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { ServeForm } from "./ServeForm";

export const metadata: Metadata = {
  title: "Serve On A Sunday | Vineyard Florence Church",
  description: "Sign up to volunteer on a Sunday with Kids, Students, First Impressions or the Media and Worship teams.",
};

export default function ServePage() {
  return (
    <main className="interior-page kids-form-page serve-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero">
        <p className="eyebrow light">Serve On A Sunday</p>
        <h1>Make Room<br /><em>For Others.</em></h1>
        <p>Serve on a Sunday, in Kids or Student Ministries, on our First Impressions Team or the Media and Worship teams. Tell us where you would like to help, and someone from the team will reach out.</p>
        <Link className="text-link light" href="/#pathway">← Back To Up, In &amp; Out</Link>
      </section>
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">Volunteer Sign-Up</span><h2>Find Your<br /><em>Place To Serve.</em></h2></div>
        <ServeForm />
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
