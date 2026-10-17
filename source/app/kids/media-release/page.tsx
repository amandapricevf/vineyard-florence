import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../../components/InteriorChrome";
import { KidsMediaReleaseForm } from "../KidsForms";

export const metadata: Metadata = {
  title: "Vineyard Kids Media Release | Vineyard Florence Church",
  description: "Submit a website and social media release for your child at Vineyard Florence.",
};

export default function KidsMediaReleasePage() {
  return (
    <main className="interior-page kids-form-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero">
        <p className="eyebrow light">Vineyard Kids</p>
        <h1>Website &amp;<br /><em>Media Release.</em></h1>
        <p>Tell us where Vineyard Florence has permission to share images that include your child.</p>
        <Link className="text-link light" href="/kids">← Back To Vineyard Kids</Link>
      </section>
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">Permission Form</span><h2>Clear Choices.<br /><em>Your Permission.</em></h2></div>
        <KidsMediaReleaseForm />
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
