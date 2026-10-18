import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { HouseGroupForm } from "./HouseGroupForm";

export const metadata: Metadata = {
  title: "Join A House Group | Vineyard Florence Church",
  description: "Tell us which Vineyard Florence House Group you would like to know more about, and our team will help you connect.",
};

export default function JoinAHouseGroupPage() {
  return (
    <main className="interior-page kids-form-page house-group-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero house-group-hero">
        <p className="eyebrow light">The Primary Place We Grow</p>
        <h1>Join A<br /><em>House Group.</em></h1>
        <p>Choose a group that fits your week, and someone from our team will reach out to help you get connected.</p>
        <Link className="text-link light" href="/discipleship">← Back To Discipleship</Link>
      </section>
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">House Group Interest</span><h2>Find Your<br /><em>People.</em></h2></div>
        <HouseGroupForm />
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
