"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { BodyVariantContext, type BodyVariant } from "@/lib/body-variant-context";
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
const PainPoints     = dynamic(() => import("@/components/sections/PainPoints"),     { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const TrinoMethod    = dynamic(() => import("@/components/sections/TrinoMethod"),    { ssr: false, loading: () => <SectionPlaceholder height="600px" /> });
const SocialProof    = dynamic(() => import("@/components/sections/SocialProof"),    { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const CaseStudies    = dynamic(() => import("@/components/sections/CaseStudies"),    { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const HowItWorks     = dynamic(() => import("@/components/sections/HowItWorks"),     { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const AboutFounders  = dynamic(() => import("@/components/sections/AboutFounders"),  { ssr: false, loading: () => <SectionPlaceholder height="400px" /> });
const FAQ            = dynamic(() => import("@/components/sections/FAQ"),            { ssr: false, loading: () => <SectionPlaceholder height="300px" /> });
const LeadForm       = dynamic(() => import("@/components/sections/LeadForm"),       { ssr: false, loading: () => <SectionPlaceholder height="500px" /> });
const FinalCTA       = dynamic(() => import("@/components/sections/FinalCTA"),       { ssr: false, loading: () => <SectionPlaceholder height="200px" /> });
const Footer         = dynamic(() => import("@/components/sections/Footer"),         { ssr: false, loading: () => <SectionPlaceholder height="120px" /> });

interface LandingPageBodyProps {
  variant?: BodyVariant;
}

export default function LandingPageBody({ variant = "odonto" }: LandingPageBodyProps) {
  useHashScroll();
  return (
    <BodyVariantContext.Provider value={variant}>
      <StickyMobileCTA />
      {variant === "general" && <WhatsAppWidget />}
      {variant === "general" ? (
        /* Ordem general: dor → qualifica → prova → transição → como funciona →
           autoridade → form → FAQ. TrinoMethod oculto nesta página (decidir depois
           se volta ou fica só em outras rotas). FAQ movido para o final, antes do footer. */
        <>
          <PainStrip />
          <AudienceFilter />
          {/* SocialProof agora inclui os cases (seção unificada) */}
          <SocialProof />
          <TransitionStrip />
          <HowItWorks />
          <AboutFounders />
          <LeadForm />
          <FAQ />
        </>
      ) : (
        /* Ordem odonto (original) */
        <>
          <AudienceFilter />
          <PainPoints />
          <TrinoMethod />
          <SocialProof />
          <CaseStudies />
          <HowItWorks />
          <AboutFounders />
          <FAQ />
          <LeadForm />
          <FinalCTA />
        </>
      )}
      <Footer tagline={variant === "general" ? "Assessoria de Marketing e Vendas para empresas que faturam +R$35k/mês." : undefined} />
    </BodyVariantContext.Provider>
  );
}
