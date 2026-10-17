import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../../components/InteriorChrome";
import { StudentServeForm } from "../StudentsForms";

export const metadata: Metadata = { title: "Serve With Vineyard Students | Vineyard Florence Church", description: "Start a conversation about serving with Vineyard Students." };

export default function StudentServePage() {
  return <main className="interior-page kids-form-page" id="top"><InteriorHeader />
    <section className="kids-form-hero students-form-hero"><p className="eyebrow light">Vineyard Students</p><h1>Invest In<br /><em>The Next Generation.</em></h1><p>Start a conversation about helping students encounter Jesus, build friendships and grow as lifelong disciples.</p><Link className="text-link light" href="/students">← Back To Vineyard Students</Link></section>
    <section className="kids-form-shell"><div className="kids-form-heading"><span className="section-index">Serve With Students</span><h2>Tell Us<br /><em>About You.</em></h2></div><StudentServeForm /></section>
    <InteriorFooter /><SiteTicker />
  </main>;
}
