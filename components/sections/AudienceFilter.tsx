"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import CTAButton from "@/components/ui/CTAButton";
import MeshBanner from "@/components/ui/MeshBanner";
import { OcclusalGrid, DentalMirror } from "@/components/ui/DentalAccents";
import { useBodyVariant } from "@/lib/body-variant-context";

const COPY_ODONTO = {
  eyebrow: "Essa assessoria foi construída para um perfil específico",
  headingMain: "Antes de conversar,",
  headingAccent: "veja se esse é o seu perfil.",
  subheading:
    "Trabalhamos com perfis específicos onde o método se aplica de verdade.",
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
  eyebrow: "Talvez você se reconheça aqui",
  headingMain: "Esse diagnóstico",
  headingAccent: "é pra você se…",
  forWho: {
    title: "",
    items: [
      "Seus leads chegam, mas somem na hora de fechar, e você não sabe dizer por quê",
      "Seu faturamento oscila mês a mês e você quer previsibilidade",
      "Já investe em anúncio (Google ou Meta), mas o retorno não é proporcional",
      "Cansou de depender de indicação e quer um fluxo constante de clientes",
      "Tem quem atenda os leads, mas falta processo pra converter",
      "Seu marketing roda separado do comercial, e um não conversa com o outro",
    ],
  },
  notForWho: {
    title: "Provavelmente não é o seu momento se",
    items: [
      "Você ainda não fatura R$35 mil/mês de forma recorrente",
      "Não quer mexer em processo nenhum, só \"rodar anúncio\"",
      "Espera resultado em 30 dias ou \"fórmula mágica\"",
      "Depende 100% de indicação e está confortável assim",
      "Não tem ninguém pra atender quem chega",
    ],
  },
  closing:
    "Se você se reconheceu em alguma dessas situações, o diagnóstico vai te mostrar exatamente onde está travado o seu crescimento.",
};

export default function AudienceFilter() {
  const variant = useBodyVariant();
  const COPY = variant === "general" ? COPY_GENERAL : COPY_ODONTO;
  return (
    <section
      id="para-quem-e"
      className={`relative overflow-hidden scroll-mt-20 ${variant === "general" ? "py-12 lg:py-16" : "py-14 lg:py-28"}`}
      style={{ background: variant === "general" ? "#FBFAF8" : "#FFFFFF" }}
    >
      {/* Linha de acento diagonal no topo — degradê primário */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />
      {variant === "general" ? null : (
        <>
          <OcclusalGrid className="absolute left-[-2%] top-[5%] w-52 h-auto text-[#6A48F4] pointer-events-none" opacity={0.055} />
          <DentalMirror className="absolute right-[3%] bottom-[5%] w-14 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.065} />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {variant === "general" ? (
          /* Cabeçalho dentro de faixa com mesh animado (eyebrow + heading) */
          <FadeInSection className="mb-8 lg:mb-12">
            <MeshBanner bgImage="/images/diagnostico-bg-audience.webp">
              <div className="px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-14">
                <p className="font-sub text-white/75 text-sm sm:text-base tracking-wide mb-3 sm:mb-4 inline-flex items-center gap-2">
                  <span className="inline-block w-6 h-px bg-white/40" aria-hidden="true" />
                  {COPY.eyebrow}
                </p>
                <h2 className="font-headline font-bold text-white text-[1.75rem] sm:text-4xl lg:text-[3.4rem] leading-tight">
                  {COPY.headingMain}
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #C4B5FD 0%, #A78BFA 50%, #8B6EF8 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    {COPY.headingAccent}
                  </span>
                </h2>
              </div>
            </MeshBanner>
          </FadeInSection>
        ) : (
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
            {(COPY as { subheading?: string }).subheading && (
              <p className="font-body text-gray-500 text-base lg:text-lg max-w-2xl leading-relaxed">
                {(COPY as { subheading?: string }).subheading}
              </p>
            )}
          </FadeInSection>
        )}

        {variant === "general" ? (
          <>
            {/* Coluna A protagonista — afirmações numeradas em 2 colunas (compacto) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-0 md:gap-y-1 mb-6">
              {COPY.forWho.items.map((item, i) => (
                <FadeInSection key={i} delay={0.06 * i}>
                  <div
                    className="group flex items-center gap-4 lg:gap-5 py-2.5 sm:py-3.5 px-3 -mx-3 rounded-xl border-b cursor-default transition-all duration-300 hover:bg-[rgba(106,72,244,0.04)] hover:translate-x-1"
                    style={{ borderColor: "rgba(17,17,26,0.08)" }}
                  >
                    {/* Número em Fraunces — âncora visual. Tom já presente no mobile
                        (sem hover); no desktop o hover intensifica. */}
                    <span
                      className="font-headline italic leading-none flex-shrink-0 transition-all duration-300 text-[rgba(106,72,244,0.55)] lg:text-[rgba(106,72,244,0.35)] group-hover:text-brand-primary group-hover:scale-110"
                      style={{
                        fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                        fontWeight: 200,
                        minWidth: "1.4ch",
                        transformOrigin: "left center",
                      }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <p className="font-body text-brand-text text-[0.8125rem] sm:text-base lg:text-lg leading-snug font-normal">
                      {item}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>

            {/* Coluna B subordinada — disclaimer discreto, cinza neutro.
                Ocultado por ora (reavaliar reativação). */}
            {false && (
              <FadeInSection delay={0.2}>
                <div
                  className="rounded-2xl p-6 lg:p-7"
                  style={{ background: "rgba(17,17,26,0.03)", border: "1px solid rgba(17,17,26,0.07)" }}
                >
                  <p className="font-body font-semibold text-gray-500 text-sm mb-4">
                    {COPY.notForWho.title}
                  </p>
                  <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {COPY.notForWho.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-500">
                        <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" aria-hidden="true" />
                        <span className="font-body text-sm leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            )}
          </>
        ) : (
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

            {/* Para quem não é — card neutro com sinal de exclusão (X vermelho) */}
            <FadeInSection delay={0.2}>
              <div
                className="rounded-2xl p-8 h-full bg-white"
                style={{ border: "1px solid rgba(220,38,38,0.18)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(220,38,38,0.10)" }}
                  >
                    <XCircle className="w-4 h-4" style={{ color: "#DC2626" }} aria-hidden="true" />
                  </div>
                  <h3 className="font-headline font-bold text-xl" style={{ color: "#DC2626" }}>
                    {COPY.notForWho.title}
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {COPY.notForWho.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: "#EF4444" }}
                        aria-hidden="true"
                      />
                      <span className="font-body text-gray-600 text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          </div>
        )}

        {/* Linha de fechamento — destaque com borda degradê + CTA (general) */}
        <FadeInSection delay={0.3} className="mt-6 lg:mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div
              className="pl-6 py-1 max-w-2xl"
              style={{
                borderLeft: "4px solid",
                borderImage: "linear-gradient(180deg, #6A48F4, #143E66) 1",
              }}
            >
              <p className="font-body font-medium text-brand-text text-[0.9375rem] sm:text-lg lg:text-xl leading-relaxed text-pretty">
                {/* NBSP entre as 2 últimas palavras evita palavra órfã no mobile */}
                {COPY.closing.replace(/ ([^ ]+)$/, " $1")}
              </p>
            </div>
            {variant === "general" && <CTAButton size="lg" className="flex-shrink-0" />}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
