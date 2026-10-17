import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../../components/InteriorChrome";
import { KidsRegistrationForm } from "../KidsForms";

export const metadata: Metadata = {
  title: "Pre-Register For Vineyard Kids | Vineyard Florence Church",
  description: "Pre-register your child for Vineyard Kids before your first Sunday visit.",
};

export default function KidsRegistrationPage() {
  return (
    <main className="interior-page kids-form-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero">
        <p className="eyebrow light">Vineyard Kids</p>
        <h1>Pre-Register<br /><em>Your Child.</em></h1>
        <p>Complete this form before Sunday and our Kids team will be ready to help your family check in.</p>
        <Link className="text-link light" href="/kids">← Back To Vineyard Kids</Link>
      </section>
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">Family Registration</span><h2>Tell Us About<br /><em>Your Family.</em></h2></div>
        <KidsRegistrationForm />
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
