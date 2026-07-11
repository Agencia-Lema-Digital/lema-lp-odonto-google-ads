import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import LandingPageBody from "@/components/sections/LandingPageBody";
import KeywordMarquee from "@/components/ui/KeywordMarquee";
import { PAGES_CONFIG } from "@/lib/pages-config";

const config = PAGES_CONFIG["/gestao-de-trafego-pago"];

// Marquee reordenado: termos de tráfego primeiro (espelha a intenção de busca do Grupo 2)
const MARQUEE_TRAFEGO = [
  "Tráfego pago",
  "Google Ads",
  "Meta Ads",
  "Anúncios que vendem",
  "Criativos em vídeo",
  "CRM de vendas",
  "Processo comercial",
  "Follow-up estruturado",
  "Funil integrado",
  "Vendas previsíveis",
  "Gestão de conteúdo",
  "Esteira de serviços",
  "Programa de indicação",
  "Avaliações online",
  "Marketing e vendas",
];

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
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lema Digital — Gestão de Tráfego Pago" }],
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

export default function GestaoDeTrafegoPagoPage() {
  return (
    // page-trafego: CTAs verdes (experimento de conversão) — ver globals.css
    <main className="page-general page-trafego">
      <Hero content={config.hero} />
      <KeywordMarquee keywords={MARQUEE_TRAFEGO} />
      <LandingPageBody copyVariant="trafego" />
    </main>
  );
}
