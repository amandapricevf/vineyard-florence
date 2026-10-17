import type { Metadata } from "next";
import { InteriorFooter, InteriorHeader, SiteTicker } from "../components/InteriorChrome";
import { SermonDirectory } from "./SermonDirectory";

export const metadata: Metadata = {
  title: "Sermons | Vineyard Florence Church",
  description: "Browse every archived Vineyard Florence Church Sunday livestream, newest first, with the original date and a direct link to watch each full service.",
};

export default function SermonsPage() {
  return (
    <main className="sermons-page" id="top">
      <InteriorHeader />
      <SermonDirectory />
      <InteriorFooter />
      <SiteTicker />
    </main>
  );
}
