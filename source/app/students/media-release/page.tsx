import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../../components/InteriorChrome";
import { StudentMediaReleaseForm } from "../StudentsForms";

export const metadata: Metadata = { title: "Vineyard Students Media Release | Vineyard Florence Church", description: "Submit website and social-media permission for your student at Vineyard Florence." };

export default function StudentMediaReleasePage() {
  return <main className="interior-page kids-form-page" id="top"><InteriorHeader />
    <section className="kids-form-hero students-form-hero"><p className="eyebrow light">Vineyard Students</p><h1>Website &amp;<br /><em>Media Release.</em></h1><p>Tell us where Vineyard Florence has permission to share images that include your student.</p><Link className="text-link light" href="/students">← Back To Vineyard Students</Link></section>
    <section className="kids-form-shell"><div className="kids-form-heading"><span className="section-index">Permission Form</span><h2>Clear Choices.<br /><em>Your Permission.</em></h2></div><StudentMediaReleaseForm /></section>
    <InteriorFooter /><SiteTicker />
  </main>;
}
