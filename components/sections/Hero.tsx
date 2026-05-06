"use client";

import CTAButton from "@/components/ui/CTAButton";
import HeroBackground from "@/components/ui/HeroBackground";

const COPY = {
  eyebrow: "Diagnóstico gratuito",
  h1First: "Sua clínica com",
  h1Accent: "agenda cheia",
  h1Rest: "de pacientes particulares. Sem depender de indicação.",
  subheadline:
    "Método TRINO da Lema Digital: anúncio, atendimento e processo comercial conectados num funil só. Diagnóstico estratégico gratuito de 30 minutos com o sócio.",
  trustLine: "Exclusivo para clínicas odontológicas",
  seals: [],
  stat: {
    number: "−81%",
    label: "no custo por conversão com o funil integrado",
  },
};

const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `hero-fade-up 0.55s ease-out ${delay}s both`,
});

export default function Hero() {
  return (
    <header className="relative overflow-hidden min-h-[100dvh] flex flex-col" style={{ background: "#0C0F1A" }}>
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Barra superior — degradê primário */}
      <div
        className="relative z-10 text-white text-center py-2.5 px-4 text-xs font-body font-medium tracking-widest uppercase"
        style={{ background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)" }}
      >
        {COPY.trustLine}
      </div>

      {/* Foto da clínica + overlays + animações bokeh */}
      <HeroBackground />

      {/* Linha diagonal decorativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <div
          className="absolute top-0 right-[38%] w-px h-full opacity-[0.06]"
          style={{ background: "linear-gradient(180deg, transparent 0%, #6A48F4 40%, transparent 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-24 lg:pb-28 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-center">
          {/* Coluna principal */}
          <div className="flex flex-col gap-5 lg:gap-7 max-w-2xl">
            <p
              style={fadeUp(0)}
              className="font-sub text-brand-primary text-base tracking-wide inline-flex items-center gap-2"
            >
              <span
                className="inline-block w-6 h-px"
                style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
                aria-hidden="true"
              />
              {COPY.eyebrow}
            </p>

            <h1
              style={fadeUp(0.1)}
              className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-[3.6rem] leading-[1.1] lg:leading-[1.05] tracking-tight"
            >
              {COPY.h1First}{" "}
              <span className="gradient-text">{COPY.h1Accent}</span>{" "}
              {COPY.h1Rest}
            </h1>

            <p
              style={fadeUp(0.2)}
              className="font-body text-gray-400 text-base lg:text-lg leading-relaxed"
            >
              {COPY.subheadline}
            </p>

            <div style={fadeUp(0.3)}>
              <CTAButton size="lg" />
              <p className="mt-3 text-gray-500 text-xs font-body">
                Poucas vagas por semana — 30 min com o sócio
              </p>
            </div>
          </div>

          {/* Card de stat — desktop */}
          <div
            className="hidden lg:flex flex-col items-center justify-center rounded-3xl p-10 min-w-[220px] gap-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(106,72,244,0.2)",
              backdropFilter: "blur(12px)",
              ...fadeUp(0.35),
            }}
          >
            <span
              className="font-headline leading-none gradient-text italic"
              style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 200 }}
            >
              {COPY.stat.number}
            </span>
            <p className="font-body text-gray-400 text-sm text-center leading-snug max-w-[160px]">
              {COPY.stat.label}
            </p>
            <div
              className="w-12 h-px mt-1"
              style={{ background: "linear-gradient(90deg, #6A48F4, #143E66)" }}
              aria-hidden="true"
            />
            <p className="font-sub text-brand-primary text-sm tracking-wide text-center">
              resultado real
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
