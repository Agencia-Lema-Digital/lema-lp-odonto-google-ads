"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import CTAButton from "@/components/ui/CTAButton";
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
      bio: "Estrategista de marketing, vendas e tráfego. Conduz a estratégia comercial das clínicas atendidas pela Lema Digital. É quem vai conversar com você no diagnóstico.",
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
  eyebrow: "Você vai conversar com quem entende de marketing e vendas.",
  headingMain: "Você fala com sócio.",
  headingAccent: "Não com atendente de agência.",
  subheading:
    "A Lema Digital é uma assessoria de marketing e vendas para empresas que querem crescer com previsibilidade. Não atendemos qualquer negócio — só quem está pronto para estruturar o funil e medir resultado de verdade.",
  founders: [
    {
      name: "Maurílio Moreira",
      role: "Sócio — Estratégia, Marketing & Vendas",
      bio: "Estrategista de marketing, vendas e tráfego. Conduz a estratégia comercial dos clientes da Lema Digital. É quem vai conversar com você no diagnóstico.",
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
  // Destaque editorial (variante general): foco no sócio que conduz o diagnóstico.
  // Texto enxuto + credenciais como âncoras visuais — autoridade rápida, não leitura longa.
  highlight: {
    name: "Maurílio Moreira",
    nameAccent: "quem conduz seu diagnóstico",
    role: "Sócio — Estratégia, Marketing & Vendas",
    photo: "/images/maurilio.jpg",
    lead: "Estrategista de marketing, vendas e tráfego. É ele quem entra com você na reunião e analisa seu funil na prática.",
    credentials: [
      { main: "+R$5 mi gerenciados em tráfego" },
      { main: "+50 funis de vendas estruturados" },
      { main: "Mais de 10 anos de experiência", sub: "entregando resultado para empresas como a sua" },
    ],
  },
  closing:
    "Time especializado. Você fala com sócio e não com atendente de agência.",
};

export default function AboutFounders() {
  const variant = useBodyVariant();
  const COPY = variant === "general" ? COPY_GENERAL : COPY_ODONTO;
  return (
    <section
      className={`relative overflow-hidden ${variant === "general" ? "py-12 lg:py-16" : "py-14 lg:py-28"}`}
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
        {/* Cabeçalho — na general é compacto (sem subheading, que repete o H2) */}
        <FadeInSection className={variant === "general" ? "mb-6 lg:mb-8" : "mb-8 lg:mb-14"}>
          <p className={`font-sub text-base tracking-wide mb-3 inline-flex items-center gap-2 ${variant === "general" ? "text-white" : "text-brand-primary"}`}>
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            {COPY.eyebrow}
          </p>
          <h2 className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-[3rem] leading-tight">
            {COPY.headingMain}
            {variant === "general" ? <br /> : " "}
            <span className="gradient-text">{COPY.headingAccent}</span>
          </h2>
          {variant !== "general" && (
            <p className="font-body text-gray-400 text-base lg:text-lg max-w-2xl leading-relaxed mt-4">
              {COPY.subheading}
            </p>
          )}
        </FadeInSection>

        {variant === "general" ? (
          /* Destaque editorial — foto grande do sócio + bio (estilo retrato) */
          <FadeInSection>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,440px)_1fr] gap-8 lg:gap-12 items-center">
              {/* Foto retangular com cantos arredondados */}
              <div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden mx-auto w-full max-w-[380px] lg:max-w-none"
                style={{ border: "1px solid rgba(106,72,244,0.25)", boxShadow: "0 24px 70px rgba(0,0,0,0.45)" }}
              >
                <Image
                  src={COPY_GENERAL.highlight.photo}
                  alt={`Foto de ${COPY_GENERAL.highlight.name} — sócio da Lema Digital`}
                  fill
                  sizes="(min-width: 1024px) 440px, 380px"
                  className="object-cover object-top"
                  quality={85}
                />
                {/* Gradiente inferior para assentar a imagem no fundo escuro */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{ background: "linear-gradient(to top, rgba(12,15,26,0.55), transparent)" }}
                />
              </div>

              {/* Texto */}
              <div>
                <h3 className="font-headline font-bold text-white text-3xl lg:text-[2.6rem] leading-[1.05] mb-1">
                  {COPY_GENERAL.highlight.name}
                </h3>
                <p
                  className="font-headline font-bold text-lg lg:text-xl mb-1"
                  style={{
                    background: "linear-gradient(135deg, #C4B5FD 0%, #A78BFA 50%, #8B6EF8 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {COPY_GENERAL.highlight.nameAccent}
                </p>
                <p className="font-body font-semibold text-[#A78BFA] text-sm mb-5">
                  {COPY_GENERAL.highlight.role}
                </p>

                {/* Lead enxuto — uma frase */}
                <p className="font-body text-gray-300 text-base leading-relaxed mb-6 max-w-xl">
                  {COPY_GENERAL.highlight.lead}
                </p>

                {/* Credenciais como âncoras visuais escaneáveis */}
                <ul className="flex flex-col gap-2.5 mb-7">
                  {COPY_GENERAL.highlight.credentials.map((c, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(106,72,244,0.18)" }}
                      >
                        <Check className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                      </span>
                      <span className="font-body text-white text-sm font-medium leading-snug">
                        {c.main}
                        {c.sub && (
                          <span className="block font-normal text-gray-400 text-xs mt-0.5">{c.sub}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA — leva ao formulário */}
                <CTAButton size="lg" label="Quero meu diagnóstico gratuito" />
              </div>
            </div>
          </FadeInSection>
        ) : (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}
