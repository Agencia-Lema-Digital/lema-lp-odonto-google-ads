"use client";

import { useRef } from "react";
import FadeInSection from "@/components/ui/FadeInSection";
import NativeLeadForm from "@/components/ui/NativeLeadForm";
import { SmileDesignArc, OcclusalGrid } from "@/components/ui/DentalAccents";
import { AdSignal, DataGrid } from "@/components/ui/GeneralistAccents";
import { useBodyVariant } from "@/lib/body-variant-context";

const COPY = {
  eyebrow: "Poucas vagas por semana",
  headingMain: "Pronto para o",
  headingAccent: "diagnóstico gratuito?",
  // Duas frases — quebradas em linhas separadas apenas no desktop (ver render)
  subLine1: "Preencha em 2 minutos.",
  subLine2: "A gente te liga em até 1 dia útil para confirmar a reunião.",
};

export default function LeadForm() {
  const variant = useBodyVariant();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="lead-form"
      ref={sectionRef}
      className="relative py-10 lg:py-16 scroll-mt-20 overflow-hidden"
      aria-labelledby="lead-form-heading"
      style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #F5F1EA 100%)" }}
    >
      {/* Linha de topo */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />
      {variant === "general" ? (
        <>
          <AdSignal className="absolute left-[-1%] top-[6%] w-52 h-auto text-[#6A48F4] pointer-events-none" opacity={0.065} />
          <DataGrid className="absolute right-[-1%] bottom-[4%] w-44 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.055} />
        </>
      ) : (
        <>
          <SmileDesignArc className="absolute left-[-1%] top-[6%] w-72 h-auto text-[#6A48F4] pointer-events-none" opacity={0.065} />
          <OcclusalGrid className="absolute right-[-1%] bottom-[4%] w-44 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.055} />
        </>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-6">
          <p className="font-sub text-brand-primary text-base tracking-wide mb-4 inline-flex items-center justify-center gap-2">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            {COPY.eyebrow}
          </p>
          <h2
            id="lead-form-heading"
            className="font-headline font-bold text-brand-text text-3xl sm:text-4xl lg:text-5xl text-balance mb-4 leading-tight"
          >
            {COPY.headingMain}{" "}
            <span className="gradient-text">{COPY.headingAccent}</span>
          </h2>
          <p className="font-body text-gray-600 text-base lg:text-lg">
            {COPY.subLine1}{" "}
            <br className="hidden lg:block" />
            {COPY.subLine2}
          </p>
        </FadeInSection>

        <FadeInSection delay={0.15}>
          <div
            className="overflow-hidden rounded-2xl bg-white"
            style={{ boxShadow: "0 4px 32px rgba(106,72,244,0.10)" }}
          >
            <NativeLeadForm />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.25} className="mt-6 text-center">
          <p className="font-body text-gray-400 text-xs">
            Seus dados são confidenciais e protegidos pela LGPD. Não enviamos spam.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
