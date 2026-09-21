import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { CustomCursor } from "@/components/site/custom-cursor-loader";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Texcroft — Apparel Manufacturing & Garment Sourcing, Tiruppur",
    template: "%s | Texcroft",
  },
  description:
    "Texcroft is a full-service apparel production company in Tiruppur, India. Low MOQ from 50 pieces — fabric sourcing, sampling, bulk manufacturing, quality control and global dispatch under one accountable team.",
  metadataBase: new URL("https://texcroft.com"),
  openGraph: {
    type: "website",
    siteName: "Texcroft",
    title: "Texcroft — Apparel Manufacturing & Garment Sourcing, Tiruppur",
    description: "Low MOQ garment manufacturing from 50 pieces. Sourcing, sampling, production, QC and global dispatch — one accountable team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Texcroft — Apparel Manufacturing & Garment Sourcing, Tiruppur",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <div className="tx-site flex min-h-screen flex-col">
          <CustomCursor />
          <SiteHeader />
          {/* Header is `fixed`, not `sticky` (so it can overlay the homepage's
              dark hero transparently) — every page reserves the same space
              here, and the homepage hero pulls itself back up under the
              header via a matching negative margin (see Hero's outer
              section). */}
          <main className="flex-1 pt-[76px]">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
