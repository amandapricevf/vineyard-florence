import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { PrayerRequestForm } from "./PrayerRequestForm";

export const metadata: Metadata = {
  title: "Request Prayer | Vineyard Florence Church",
  description: "Share a confidential prayer request with the Vineyard Florence prayer team.",
};

export default function PrayerRequestPage() {
  return (
    <main className="interior-page kids-form-page prayer-request-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero prayer-request-hero">
        <p className="eyebrow light">Let Us Pray With You</p>
        <h1>You Are Not<br /><em>Alone.</em></h1>
        <p>Share what is happening, choose who may see your request and let our prayer team stand with you.</p>
        <Link className="text-link light" href="/prayer">← Back To The Prayer Hub</Link>
      </section>
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">Confidential Prayer Request</span><h2>Bring What Is<br /><em>On Your Heart.</em></h2></div>
        <PrayerRequestForm />
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
