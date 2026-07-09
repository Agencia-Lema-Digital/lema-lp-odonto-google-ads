"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import CTAButton from "@/components/ui/CTAButton";
import { TrendChart, FunnelLines, ROASArrow } from "@/components/ui/GeneralistAccents";
import { useCopyVariant, ctaLabelFor } from "@/lib/copy-variant-context";

const COPY_GENERAL = {
  eyebrow: "A assessoria por trás dos resultados",
  headingMain: "Você fala com sócio.",
  headingAccent: "Não com atendente de agência.",
  // Destaque editorial: foco no sócio que conduz a estratégia.
  // Texto enxuto + credenciais como âncoras visuais — autoridade rápida, não leitura longa.
  highlight: {
    name: "Maurílio Moreira",
    nameAccent: "quem conduz a sua estratégia",
    role: "Sócio — Estratégia, Marketing & Vendas",
    photo: "/images/maurilio.jpg",
    lead: "Estrategista de marketing, vendas e tráfego. É ele quem entra com você na reunião e conduz a estratégia do seu negócio na prática.",
    credentials: [
      { main: "+R$5 mi gerenciados em tráfego" },
      { main: "+50 funis de vendas estruturados" },
      { main: "Mais de 10 anos de experiência", sub: "entregando resultado para empresas como a sua" },
    ],
  },
};

export default function AboutFounders() {
  const copyVariant = useCopyVariant();
  const COPY = COPY_GENERAL;
  // Ângulo "diagnóstico" (raiz backup): volta ao foco no sócio / diagnóstico
  const diag = copyVariant === "diagnostico";
  const eyebrow = diag ? "Você vai conversar com quem entende de marketing e vendas." : COPY.eyebrow;
  const highlightNameAccent = diag ? "quem conduz seu diagnóstico" : COPY_GENERAL.highlight.nameAccent;
  const highlightLead = diag
    ? "Estrategista de marketing, vendas e tráfego. É ele quem entra com você na reunião e analisa seu funil na prática."
    : COPY_GENERAL.highlight.lead;
  return (
    <section
      className="relative overflow-hidden py-12 lg:py-16"
      style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #0F1E33 100%)" }}
    >
      {/* Linha de topo com degradê */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />

      <TrendChart className="absolute right-[-1%] bottom-[3%] w-64 h-auto text-[#6A48F4] pointer-events-none" opacity={0.055} />
      <FunnelLines className="absolute left-[-1%] top-[5%] w-36 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.05} />
      <ROASArrow className="absolute left-[6%] top-[40%] w-24 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.07} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho compacto (sem subheading, que repete o H2) */}
        <FadeInSection className="mb-6 lg:mb-8">
          <p className="font-sub text-base tracking-wide mb-3 inline-flex items-center gap-2 text-white">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            {eyebrow}
          </p>
          <h2 className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-[3rem] leading-tight">
            {COPY.headingMain}
            <br />
            <span className="gradient-text">{COPY.headingAccent}</span>
          </h2>
        </FadeInSection>

        {/* Destaque editorial — foto grande do sócio + bio (estilo retrato) */}
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
                  {highlightNameAccent}
                </p>
                <p className="font-body font-semibold text-[#A78BFA] text-sm mb-5">
                  {COPY_GENERAL.highlight.role}
                </p>

                {/* Lead enxuto — uma frase */}
                <p className="font-body text-gray-300 text-base leading-relaxed mb-6 max-w-xl">
                  {highlightLead}
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
                <CTAButton size="lg" label={ctaLabelFor(copyVariant)} />
              </div>
            </div>
          </FadeInSection>
      </div>
    </section>
  );
}
