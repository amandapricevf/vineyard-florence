import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./interior.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vineyard Florence Church",
  description: "Love God. Make disciples. Impact the world. Join Vineyard Florence Church in Northern Kentucky.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
