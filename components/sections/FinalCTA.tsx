"use client";

import FadeInSection from "@/components/ui/FadeInSection";
import { SmileDesignArc, GoldenRatioSpiral, OcclusalGrid } from "@/components/ui/DentalAccents";
import { TrendChart, AdSignal, FunnelLines } from "@/components/ui/GeneralistAccents";
import { useBodyVariant } from "@/lib/body-variant-context";

const COPY_ODONTO = {
  heading: "Vamos diagnosticar seu funil em 30 minutos.",
  subheading:
    "Você sai do diagnóstico com clareza exata de onde está o gargalo da sua clínica. Mesmo que a gente não trabalhe junto depois, você leva o plano de ação. Sem custo. Sem compromisso. Sem proposta forçada.",
  ctaLabel: "Quero meu diagnóstico gratuito",
  microcopy: "30 minutos com o sócio · Análise honesta do seu funil · Sem proposta forçada",
  stats: [
    { value: "80%", label: "show rate" },
    { value: "−81%", label: "custo por conversão" },
    { value: "+30%", label: "taxa de fechamento" },
  ],
};

const COPY_GENERAL = {
  heading: "Vamos diagnosticar seu funil em 30 minutos.",
  subheading:
    "Você sai do diagnóstico com clareza exata de onde está o gargalo entre o lead chegar e a venda acontecer. Mesmo que a gente não trabalhe junto depois, você leva o plano de ação. Sem custo. Sem compromisso. Sem proposta forçada.",
  ctaLabel: "Quero meu diagnóstico gratuito",
  microcopy: "30 minutos com o sócio · Análise honesta do seu funil · Sem proposta forçada",
  stats: [
    { value: "−81%", label: "custo por conversão" },
    { value: "+30%", label: "taxa de fechamento" },
    { value: "CPL", label: "claro e mensurável" },
  ],
};

export default function FinalCTA() {
  const variant = useBodyVariant();
  const COPY = variant === "general" ? COPY_GENERAL : COPY_ODONTO;
  return (
    <section
      className="relative py-14 lg:py-28 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
      }}
    >
      {variant === "general" ? (
        <>
          <TrendChart className="absolute right-[-2%] top-[5%] w-96 h-auto text-white pointer-events-none" opacity={0.09} />
          <AdSignal className="absolute left-[-2%] bottom-[3%] w-52 h-auto text-white pointer-events-none" opacity={0.06} />
          <FunnelLines className="absolute right-[-1%] bottom-[4%] w-36 h-auto text-white pointer-events-none hidden lg:block" opacity={0.07} />
        </>
      ) : (
        <>
          <SmileDesignArc className="absolute right-[-2%] top-[5%] w-96 h-auto text-white pointer-events-none" opacity={0.09} />
          <GoldenRatioSpiral className="absolute left-[-2%] bottom-[3%] w-52 h-auto text-white pointer-events-none" opacity={0.06} />
          <OcclusalGrid className="absolute right-[-1%] bottom-[4%] w-40 h-auto text-white pointer-events-none hidden lg:block" opacity={0.07} />
        </>
      )}

      {/* Padrão de grade sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          {/* Mini stats com divisores */}
          <div className="flex items-center justify-center gap-0 mb-10 lg:mb-14">
            {COPY.stats.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1 px-4 lg:px-10">
                  <span className="font-headline font-bold text-white text-xl lg:text-3xl leading-none">
                    {s.value}
                  </span>
                  <span className="font-body text-white/60 text-[10px] lg:text-xs uppercase tracking-wider text-center">
                    {s.label}
                  </span>
                </div>
                {i < COPY.stats.length - 1 && (
                  <div className="w-px h-8 lg:h-10 bg-white/20 flex-shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {/* Divisor */}
          <div className="w-16 h-px bg-white/20 mx-auto mb-8 lg:mb-14" aria-hidden="true" />

          <h2 className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-5xl text-balance mb-6 leading-tight">
            {COPY.heading}
          </h2>
          <p className="font-body text-white/70 text-base lg:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {COPY.subheading}
          </p>

          {/* CTA com fundo branco sobre o fundo colorido */}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: "cta_click", cta_label: COPY.ctaLabel });
                document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="inline-flex items-center justify-center rounded-[8px] bg-white text-brand-primary font-body font-bold min-h-[52px] px-10 py-4 text-base md:text-lg cursor-pointer hover:bg-brand-soft transition-colors mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.20)" }}
            aria-label={COPY.ctaLabel}
          >
            {COPY.ctaLabel}
          </button>

          <p className="font-body text-white/50 text-sm">
            {COPY.microcopy}
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
