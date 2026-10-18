import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Vineyard Florence Church",
  description: "Send the Vineyard Florence team a question or message.",
};

export default function ContactPage() {
  return (
    <main className="interior-page kids-form-page contact-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero contact-hero">
        <p className="eyebrow light">We Would Love To Hear From You</p>
        <h1>Start A<br /><em>Conversation.</em></h1>
        <p>Ask a question or tell us what you are looking for. A real person from our team will get back to you.</p>
        <Link className="text-link light" href="/connect">← Back To Connect</Link>
      </section>
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">Contact Vineyard Florence</span><h2>How Can We<br /><em>Help You?</em></h2></div>
        <ContactForm />
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
