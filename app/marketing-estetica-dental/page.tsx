import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import LandingPageBody from "@/components/sections/LandingPageBody";
import { PAGES_CONFIG } from "@/lib/pages-config";

const config = PAGES_CONFIG["/marketing-estetica-dental"];

export const metadata: Metadata = {
  title: config.meta.title,
  description: config.meta.description,
  alternates: { canonical: config.meta.canonical },
  robots: { index: true, follow: true },
  openGraph: {
    title: config.meta.title,
    description: config.meta.description,
    url: config.meta.canonical,
    siteName: "Lema Digital",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lema Digital — Marketing para Clínicas Odontológicas" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.meta.title,
    description: config.meta.description,
    images: ["/og-image.png"],
  },
};

export default function MarketingEsteticaDentalPage() {
  return (
    <main>
      <Hero content={config.hero} />
      <LandingPageBody />
    </main>
  );
}
