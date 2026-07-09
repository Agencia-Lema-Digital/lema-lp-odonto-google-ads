"use client";

import { ClipboardList, Phone, Video, CheckCircle2, Magnet, Handshake, TrendingUp } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import { AdSignal, ClickCursor, DataGrid } from "@/components/ui/GeneralistAccents";
import { useCopyVariant } from "@/lib/copy-variant-context";

const COPY_GENERAL = {
  eyebrow: "O Método TRINO",
  headingMain: "Três pilares.",
  headingAccent: "Um crescimento integrado.",
  subheading:
    "O TRINO conecta o funil inteiro do seu negócio — do primeiro clique ao cliente que volta e indica.",
  steps: [
    {
      icon: Magnet,
      number: "01",
      title: "Demanda Qualificada",
      description: "Tráfego pago e conteúdo pra atrair o cliente certo. Não qualquer lead.",
    },
    {
      icon: Handshake,
      number: "02",
      title: "Estrutura Comercial",
      description: "CRM, follow-up e processo pra transformar conversa em venda.",
    },
    {
      icon: TrendingUp,
      number: "03",
      title: "Expansão Inteligente",
      description: "Dados pra reduzir custo, aumentar o ticket e crescer com previsibilidade.",
    },
  ],
  outputTitle: "Por que vira um ciclo",
  outputs: [
    "Cliente satisfeito indica — e traz novos clientes com baixo custo",
    "Avaliações e depoimentos viram prova social nos próximos anúncios",
    "Quanto mais o ciclo roda, menor o custo de aquisição e maior o faturamento",
  ],
};

// Versão "diagnóstico" (raiz backup / Meta Ads) — passo a passo do diagnóstico gratuito
const COPY_GENERAL_DIAG = {
  eyebrow: "30 minutos · gratuito · sem compromisso",
  headingMain: "Pare de adivinhar.",
  headingAccent: "Veja o que trava seu crescimento.",
  subheading:
    "Chega de investir e torcer pra dar certo. O Maurílio olha seu negócio ao vivo e te mostra, com dados, o que está perdendo venda — e o que atacar primeiro.",
  steps: [
    {
      icon: ClipboardList,
      number: "01",
      title: "Você preenche o formulário",
      description: "Conta o cenário atual do seu negócio em 2 minutos. Sem pegadinha.",
    },
    {
      icon: Phone,
      number: "02",
      title: "Conversa rápida de qualificação",
      description:
        "Vamos te ligar para alinhar expectativa e confirmar se faz sentido seguir.",
    },
    {
      icon: Video,
      number: "03",
      title: "Reunião estratégica com o sócio",
      time: "30 min",
      description:
        "O Maurílio entra com você no Google Meet e mostra, na prática, onde está o gargalo do seu funil de vendas.",
    },
  ],
  outputTitle: "O que sai do diagnóstico",
  outputs: [
    "Análise honesta do funil atual: anúncio, atendimento e processo comercial",
    "Identificação dos gargalos específicos do seu negócio",
    "Plano de ação prioritário (você sai com clareza sobre o próximo passo)",
  ],
};

export default function HowItWorks() {
  const copyVariant = useCopyVariant();
  const COPY = copyVariant === "diagnostico" ? COPY_GENERAL_DIAG : COPY_GENERAL;
  return (
    <section
      id="como-trabalhamos"
      className="relative py-14 lg:py-28 overflow-hidden scroll-mt-20"
      style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #F5F1EA 100%)" }}
    >
      <AdSignal className="absolute left-[2%] bottom-[6%] w-40 h-auto text-[#6A48F4] pointer-events-none" opacity={0.065} />
      <ClickCursor className="absolute right-[5%] top-[20%] w-20 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.08} />
      <DataGrid className="absolute right-[-1%] top-[5%] w-44 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.05} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <FadeInSection className="mb-10 lg:mb-16">
          <p className="font-sub text-brand-primary text-base tracking-wide mb-4 inline-flex items-center gap-2">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            {COPY.eyebrow}
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-headline font-bold text-brand-text text-3xl sm:text-4xl lg:text-[3.4rem] leading-tight">
              {COPY.headingMain}
              <br />
              <span className="gradient-text">{COPY.headingAccent}</span>
            </h2>
            <p className="font-body text-gray-600 text-base leading-relaxed max-w-sm lg:text-right">
              {COPY.subheading}
            </p>
          </div>
        </FadeInSection>

        {/* Steps — cards horizontais empilhados */}
        <div className="relative mb-16">
          {/* Linha conectora vertical ligando o centro dos ícones (passo 1 → 2 → 3).
              Centro do ícone = padding do card (1.75rem) + metade do ícone (1.75rem) = 3.5rem. */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-[3.5rem] -translate-x-1/2 top-16 bottom-16 w-[2px] rounded-full"
            style={{ background: "linear-gradient(180deg, #6A48F4 0%, #4C2FC4 50%, #143E66 100%)", opacity: 0.35 }}
          />

          <div className="flex flex-col gap-4">
            {COPY.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeInSection key={i} delay={i * 0.12}>
                  <div
                    className="group relative flex gap-4 lg:gap-8 items-start p-5 lg:p-7 bg-white rounded-2xl border border-[rgba(106,72,244,0.12)] transition-all duration-200 hover:border-[rgba(106,72,244,0.35)] hover:shadow-[0_4px_20px_rgba(106,72,244,0.10)]"
                  >
                    {/* Ícone com fundo degradê + número do passo (badge) */}
                    <div className="flex-shrink-0 relative z-10">
                      <div
                        className="w-[3.5rem] h-[3.5rem] rounded-2xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
                          boxShadow: "0 4px 14px rgba(106,72,244,0.30)",
                        }}
                      >
                        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <span
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-[10px] font-body font-bold flex items-center justify-center"
                        style={{ background: "#143E66" }}
                      >
                        {i + 1}
                      </span>
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-headline font-bold text-brand-dark text-lg lg:text-xl">
                          {step.title}
                        </h3>
                        {(step as { time?: string }).time && (
                          <span
                            className="text-brand-primary text-xs font-body font-semibold px-2.5 py-1 rounded-full"
                            style={{ background: "rgba(106,72,244,0.10)" }}
                          >
                            {(step as { time?: string }).time}
                          </span>
                        )}
                      </div>
                      <p className="font-body text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>

        {/* O que sai do diagnóstico */}
        <FadeInSection delay={0.2}>
          <div
            className="rounded-2xl p-8 lg:p-10 max-w-2xl mx-auto relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #0F1E33 100%)" }}
          >
            {/* Linha topo degradê */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
              aria-hidden="true"
            />
            <h3 className="font-headline font-bold text-white text-xl lg:text-2xl mb-7 flex items-center gap-3">
              <span
                className="w-1 h-6 rounded-full inline-block flex-shrink-0"
                style={{ background: "linear-gradient(180deg, #6A48F4, #143E66)" }}
                aria-hidden="true"
              />
              {COPY.outputTitle}
            </h3>
            <ul className="space-y-4">
              {COPY.outputs.map((output, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: "#6A48F4" }}
                    aria-hidden="true"
                  />
                  <span className="font-body text-gray-300 text-sm leading-relaxed">
                    {output}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
