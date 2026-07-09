"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { CopyVariantContext, type CopyVariant } from "@/lib/copy-variant-context";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";

// Widget de WhatsApp (FAB + mini-form) — client-only, carrega após a hidratação
const WhatsAppWidget = dynamic(() => import("@/components/ui/WhatsAppWidget"), { ssr: false });

// As seções carregam via dynamic(ssr:false), então a âncora (#secao) na URL pode
// chegar antes do elemento existir no DOM. Este hook tenta rolar até a âncora,
// repetindo por alguns segundos enquanto as seções montam, e re-tenta a cada
// mudança de hash (clique em sitelink sem recarregar a página).
function useHashScroll() {
  useEffect(() => {
    let raf = 0;
    let timer: ReturnType<typeof setInterval> | undefined;

    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      let attempts = 0;
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        const el = document.getElementById(id);
        attempts++;
        if (el) {
          raf = requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
          clearInterval(timer);
        } else if (attempts > 40) {
          // ~6s de tentativas (40 × 150ms); desiste se a seção nunca montar
          clearInterval(timer);
        }
      }, 150);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      if (timer) clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function SectionPlaceholder({ height }: { height: string }) {
  return <div style={{ minHeight: height }} />;
}

const AudienceFilter = dynamic(() => import("@/components/sections/AudienceFilter"), { ssr: false, loading: () => <SectionPlaceholder height="300px" /> });
const PainStrip      = dynamic(() => import("@/components/sections/PainStrip"),      { ssr: false, loading: () => <SectionPlaceholder height="200px" /> });
const TransitionStrip = dynamic(() => import("@/components/sections/TransitionStrip"), { ssr: false, loading: () => <SectionPlaceholder height="160px" /> });
const SocialProof    = dynamic(() => import("@/components/sections/SocialProof"),    { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const HowItWorks     = dynamic(() => import("@/components/sections/HowItWorks"),     { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const AboutFounders  = dynamic(() => import("@/components/sections/AboutFounders"),  { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const FAQ            = dynamic(() => import("@/components/sections/FAQ"),            { ssr: false, loading: () => <SectionPlaceholder height="300px" /> });
const LeadForm       = dynamic(() => import("@/components/sections/LeadForm"),       { ssr: false, loading: () => <SectionPlaceholder height="500px" /> });
const Footer         = dynamic(() => import("@/components/sections/Footer"),         { ssr: false, loading: () => <SectionPlaceholder height="120px" /> });

interface LandingPageBodyProps {
  // Ângulo de copy: "assessoria" (/assessoria) ou "diagnostico" (raiz backup)
  copyVariant?: CopyVariant;
}

export default function LandingPageBody({ copyVariant = "assessoria" }: LandingPageBodyProps) {
  useHashScroll();
  return (
    <CopyVariantContext.Provider value={copyVariant}>
      <StickyMobileCTA />
      <WhatsAppWidget />
      {/* Ordem: dor → qualifica → prova → transição → método → autoridade → form → FAQ */}
      <PainStrip />
      <AudienceFilter />
      {/* SocialProof inclui os cases (seção unificada) */}
      <SocialProof />
      <TransitionStrip />
      <HowItWorks />
      <AboutFounders />
      <LeadForm />
      <FAQ />
      <Footer tagline="Assessoria de Marketing e Vendas para empresas que faturam +R$35k/mês." />
    </CopyVariantContext.Provider>
  );
}
