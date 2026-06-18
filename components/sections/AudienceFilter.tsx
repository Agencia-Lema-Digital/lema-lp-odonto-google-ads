"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import { OcclusalGrid, DentalMirror } from "@/components/ui/DentalAccents";
import { FunnelLines, DataGrid } from "@/components/ui/GeneralistAccents";
import { useBodyVariant } from "@/lib/body-variant-context";

const COPY_ODONTO = {
  eyebrow: "Essa assessoria foi construída para um perfil específico",
  headingMain: "Antes de conversar,",
  headingAccent: "veja se esse é o seu perfil.",
  subheading:
    "A Lema Digital não atende qualquer clínica. Trabalhamos com perfis específicos onde o método se aplica de verdade.",
  forWho: {
    title: "Para quem é",
    items: [
      "Clínicas odontológicas particulares com 2 ou mais cadeiras",
      "Foco em odontologia estética, implantodontia ou reabilitação",
      "Faturamento mensal entre R$30 mil e R$150 mil",
      "Pelo menos uma pessoa dedicada ao atendimento comercial",
      "WhatsApp Business ativo",
      "Disposição para padronizar processos e medir resultados",
    ],
  },
  notForWho: {
    title: "Para quem não é",
    items: [
      "Dentistas autônomos sem estrutura comercial",
      "Clínicas 100% dependentes de convênio",
      "Quem espera resultado em 30 dias ou \"fórmula mágica\"",
      "Quem não quer mexer em processos internos",
      "Clínicas que só querem \"rodar anúncio\" e ponto",
    ],
  },
  closing:
    "Se você está na Coluna A, esse diagnóstico vai mostrar exatamente onde está travado o seu crescimento.",
};

const COPY_GENERAL = {
  eyebrow: "Essa assessoria foi construída para um perfil específico",
  headingMain: "Antes de conversar,",
  headingAccent: "veja se esse é o seu perfil.",
  subheading:
    "A Lema Digital não atende qualquer empresa. Trabalhamos com negócios prontos para estruturar o processo comercial e crescer com previsibilidade.",
  forWho: {
    title: "Para quem é",
    items: [
      "Empresas com faturamento mensal acima de R$35 mil",
      "Negócios que já investem em tráfego pago (Google ou Meta Ads)",
      "Pelo menos uma pessoa dedicada ao atendimento de leads",
      "WhatsApp Business ativo e CRM ou planilha de acompanhamento",
      "Disposição para padronizar processos comerciais e medir resultados",
      "Decisor com poder de aprovar mudanças internas no time comercial",
    ],
  },
  notForWho: {
    title: "Para quem não é",
    items: [
      "Empresas sem faturamento recorrente ou em fase pré-receita",
      "Negócios que dependem 100% de indicação e não querem mudar",
      "Quem espera resultado em 30 dias ou \"fórmula mágica\"",
      "Quem não quer mexer em processos internos de vendas",
      "Quem quer só \"rodar anúncio\" sem estrutura comercial",
    ],
  },
  closing:
    "Se você está na Coluna A, esse diagnóstico vai mostrar exatamente onde está travado o seu crescimento.",
};

export default function AudienceFilter() {
  const variant = useBodyVariant();
  const COPY = variant === "general" ? COPY_GENERAL : COPY_ODONTO;
  return (
    <section id="para-quem-e" className="relative py-14 lg:py-28 bg-white overflow-hidden scroll-mt-20">
      {/* Linha de acento diagonal no topo — degradê primário */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />
      {variant === "general" ? (
        <>
          <FunnelLines className="absolute left-[-2%] top-[5%] w-44 h-auto text-[#6A48F4] pointer-events-none" opacity={0.055} />
          <DataGrid className="absolute right-[3%] bottom-[5%] w-40 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.065} />
        </>
      ) : (
        <>
          <OcclusalGrid className="absolute left-[-2%] top-[5%] w-52 h-auto text-[#6A48F4] pointer-events-none" opacity={0.055} />
          <DentalMirror className="absolute right-[3%] bottom-[5%] w-14 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.065} />
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
          <h2 className="font-headline font-bold text-brand-text text-3xl sm:text-4xl lg:text-[3.4rem] leading-tight mb-4">
            {COPY.headingMain}
            <br />
            <span className="gradient-text">{COPY.headingAccent}</span>
          </h2>
          <p className="font-body text-gray-500 text-base lg:text-lg max-w-2xl leading-relaxed">
            {COPY.subheading}
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Para quem é — card verde-positivo */}
          <FadeInSection delay={0.1}>
            <div
              className="rounded-2xl p-8 h-full"
              style={{
                background: "linear-gradient(135deg, #EDE9FE 0%, #F5F1EA 100%)",
                border: "1px solid rgba(106,72,244,0.15)",
              }}
            >
              {/* Header do card com badge degradê */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #6A48F4, #4C2FC4)" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <h3
                  className="font-headline font-bold text-xl"
                  style={{
                    background: "linear-gradient(135deg, #6A48F4 0%, #143E66 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {COPY.forWho.title}
                </h3>
              </div>
              <ul className="space-y-3.5">
                {COPY.forWho.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#6A48F4" }}
                      aria-hidden="true"
                    />
                    <span className="font-body text-brand-dark text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          {/* Para quem não é — card neutro */}
          <FadeInSection delay={0.2}>
            <div
              className="rounded-2xl p-8 h-full bg-white"
              style={{ border: "1px solid #E5E5E5" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 text-gray-400" aria-hidden="true" />
                </div>
                <h3 className="font-headline font-bold text-gray-400 text-xl">
                  {COPY.notForWho.title}
                </h3>
              </div>
              <ul className="space-y-3.5">
                {COPY.notForWho.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle
                      className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="font-body text-gray-400 text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>

        {/* Linha de fechamento — destaque com borda degradê */}
        <FadeInSection delay={0.3} className="mt-10">
          <div
            className="pl-6 py-1 max-w-2xl"
            style={{
              borderLeft: "4px solid",
              borderImage: "linear-gradient(180deg, #6A48F4, #143E66) 1",
            }}
          >
            <p className="font-headline font-bold italic text-brand-dark text-base lg:text-lg">
              {COPY.closing}
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
