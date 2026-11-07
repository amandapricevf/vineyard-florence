import type { Metadata } from "next";
import Link from "next/link";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { StockGiftForm } from "./StockGiftForm";

export const metadata: Metadata = {
  title: "Give Stock | Vineyard Florence Church",
  description: "Tell Vineyard Florence about a gift of stock, and we will reach out about how to donate it.",
};

export default function GiveStockPage() {
  return (
    <main className="interior-page kids-form-page stock-gift-page" id="top">
      <InteriorHeader />
      <section className="kids-form-hero">
        <p className="eyebrow light">Ways To Give</p>
        <h1>Give<br /><em>Stock.</em></h1>
        <p>We appreciate your interest in donating stock to Vineyard Florence Church. We need to gather some basic information for our stock broker, and then we will reach out shortly to discuss how to donate the stock.</p>
        <Link className="text-link light" href="/#give">← Back To Giving</Link>
      </section>
      <section className="kids-form-shell">
        <div className="kids-form-heading"><span className="section-index">Stock Gift Details</span><h2>A Few Details<br /><em>To Get Started.</em></h2></div>
        <StockGiftForm />
      </section>
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
