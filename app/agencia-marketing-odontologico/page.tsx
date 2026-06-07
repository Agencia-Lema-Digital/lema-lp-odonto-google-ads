import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import LandingPageBody from "@/components/sections/LandingPageBody";
import { PAGES_CONFIG } from "@/lib/pages-config";

const config = PAGES_CONFIG["/agencia-marketing-odontologico"];

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

export default function AgenciaMarketingOdontologicoPage() {
  return (
    <>
      <link rel="preload" as="image" href="/_next/image?url=%2Fimages%2Fclinic-hero.png&w=640&q=75" fetchPriority="high" />
      <main>
        <Hero content={config.hero} />
        <LandingPageBody />
      </main>
    </>
  );
}
