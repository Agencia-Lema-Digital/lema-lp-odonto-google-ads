"use client";

import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";
import { CephalometricLines, XRayFragment, ProbeGrid } from "@/components/ui/DentalAccents";
import { TrendChart, FunnelLines, ROASArrow } from "@/components/ui/GeneralistAccents";
import { useBodyVariant } from "@/lib/body-variant-context";

const COPY_ODONTO = {
  eyebrow: "Você vai conversar com gente que entende do seu nicho.",
  headingMain: "Você fala com sócio.",
  headingAccent: "Não com atendente de agência.",
  subheading:
    "A Lema Digital é uma assessoria especializada em clínicas odontológicas premium. Não atendemos qualquer clínica, só quem se encaixa no perfil de método aplicado e resultado mensurável.",
  founders: [
    {
      name: "Maurílio Moreira",
      role: "Sócio — Estratégia, Marketing & Vendas",
      bio: "Estrategista de marketing, vendas e tráfego. Conduz a estratégia comercial das clínicas atendidas pela Lema. É quem vai conversar com você no diagnóstico.",
      photo: "/images/maurilio.jpg",
      initial: "M",
    },
    {
      name: "Letícia Marques",
      role: "Sócia — Atração Orgânica & Customer Success",
      bio: "Lidera atração orgânica, conteúdo e o sucesso do cliente. Garante que a estratégia se traduza em resultados para a sua clínica.",
      photo: "/images/leticia.jpg",
      initial: "L",
    },
  ],
  closing:
    "Time especializado. Você fala com sócio e não com atendente de agência.",
};

const COPY_GENERAL = {
  eyebrow: "Você vai conversar com gente que entende de marketing e vendas.",
  headingMain: "Você fala com sócio.",
  headingAccent: "Não com atendente de agência.",
  subheading:
    "A Lema Digital é uma assessoria de marketing e vendas para empresas que querem crescer com previsibilidade. Não atendemos qualquer negócio — só quem está pronto para estruturar o funil e medir resultado de verdade.",
  founders: [
    {
      name: "Maurílio Moreira",
      role: "Sócio — Estratégia, Marketing & Vendas",
      bio: "Estrategista de marketing, vendas e tráfego. Conduz a estratégia comercial dos clientes da Lema. É quem vai conversar com você no diagnóstico.",
      photo: "/images/maurilio.jpg",
      initial: "M",
    },
    {
      name: "Letícia Marques",
      role: "Sócia — Atração Orgânica & Customer Success",
      bio: "Lidera atração orgânica, conteúdo e o sucesso do cliente. Garante que a estratégia se traduza em resultados reais e previsíveis para o seu negócio.",
      photo: "/images/leticia.jpg",
      initial: "L",
    },
  ],
  closing:
    "Time especializado. Você fala com sócio e não com atendente de agência.",
};

export default function AboutFounders() {
  const variant = useBodyVariant();
  const COPY = variant === "general" ? COPY_GENERAL : COPY_ODONTO;
  return (
    <section
      className="relative py-14 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #0F1E33 100%)" }}
    >
      {/* Linha de topo com degradê */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />

      {variant === "general" ? (
        <>
          <TrendChart className="absolute right-[-1%] bottom-[3%] w-64 h-auto text-[#6A48F4] pointer-events-none" opacity={0.055} />
          <FunnelLines className="absolute left-[-1%] top-[5%] w-36 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.05} />
          <ROASArrow className="absolute left-[6%] top-[40%] w-24 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.07} />
        </>
      ) : (
        <>
          <CephalometricLines className="absolute right-[-1%] bottom-[3%] w-48 h-auto text-[#6A48F4] pointer-events-none" opacity={0.055} />
          <XRayFragment className="absolute left-[-1%] top-[5%] w-60 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.05} />
          <ProbeGrid className="absolute left-[6%] top-[40%] w-7 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.07} />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <FadeInSection className="mb-8 lg:mb-14">
          <p className="font-sub text-brand-primary text-base tracking-wide mb-4 inline-flex items-center gap-2">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            {COPY.eyebrow}
          </p>
          <h2 className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-[3.4rem] leading-tight mb-4">
            {COPY.headingMain}
            <br />
            <span className="gradient-text">{COPY.headingAccent}</span>
          </h2>
          <p className="font-body text-gray-400 text-base lg:text-lg max-w-2xl leading-relaxed">
            {COPY.subheading}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {COPY.founders.map((founder, i) => (
            <FadeInSection key={i} delay={i * 0.15}>
              <div
                className="flex flex-col items-center text-center rounded-2xl p-6 lg:p-8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(106,72,244,0.20)",
                }}
              >
                {/* Avatar com anel degradê */}
                <div
                  className="relative w-28 h-28 rounded-full mb-5 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
                    padding: "3px",
                  }}
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={founder.photo}
                      alt={`Foto de ${founder.name} — sócio(a) da Lema Digital`}
                      fill
                      className="object-cover object-top"
                      sizes="112px"
                    />
                  </div>
                </div>

                <h3 className="font-headline font-semibold text-white text-xl mb-1">
                  {founder.name}
                </h3>
                <p className="font-body font-semibold text-brand-primary text-sm mb-4">
                  {founder.role}
                </p>
                <p className="font-body text-gray-400 text-sm leading-relaxed">
                  {founder.bio}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Linha de fechamento */}
        <FadeInSection delay={0.3} className="mt-12">
          <div
            className="pl-6 py-1 max-w-2xl mx-auto text-center lg:text-left"
            style={{
              borderLeft: "4px solid",
              borderImage: "linear-gradient(180deg, #6A48F4, #143E66) 1",
            }}
          >
            <p className="font-headline font-semibold text-white text-base lg:text-lg">
              {COPY.closing}
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
