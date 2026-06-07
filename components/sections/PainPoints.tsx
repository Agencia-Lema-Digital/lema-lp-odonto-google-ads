"use client";

import {
  MessageSquareX,
  CalendarX2,
  BadgeDollarSign,
  UsersRound,
  Clock,
  MousePointerClick,
} from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import { PorcelainReflection, OcclusalGrid, SmileDesignArc } from "@/components/ui/DentalAccents";
import { ClickCursor, FunnelLines, TrendChart } from "@/components/ui/GeneralistAccents";
import { useBodyVariant } from "@/lib/body-variant-context";

const COPY_ODONTO = {
  eyebrow: "Você reconhece pelo menos 3 dessas situações?",
  headingMain: "O problema não é o anúncio.",
  headingAccent: "É o funil inteiro.",
  transition:
    "Se 3 ou mais soam familiares, o problema não está no seu anúncio. Está no funil inteiro.",
  cards: [
    {
      icon: MessageSquareX,
      title: "Lead chega, pergunta o preço, some.",
      description:
        "A recepcionista respondeu o valor antes de apresentar o tratamento e o paciente desapareceu.",
    },
    {
      icon: CalendarX2,
      title: "Agenda que oscila.",
      description:
        "Uma semana cheia, a próxima quase vazia, sem nenhum padrão claro.",
    },
    {
      icon: BadgeDollarSign,
      title: "Já investiu em agência e ficou no prejuízo.",
      description:
        "Pagou, esperou, viu o dinheiro evaporar e nenhum paciente novo na cadeira.",
    },
    {
      icon: UsersRound,
      title: "Pacientes só chegam por indicação.",
      description:
        "Sem indicação, sem agenda. Sem previsibilidade nenhuma.",
    },
    {
      icon: Clock,
      title: "Equipe não responde lead com agilidade.",
      description:
        "Lead manda mensagem às 14h, recepção responde às 17h, paciente já foi pra outra clínica.",
    },
    {
      icon: MousePointerClick,
      title: "Tráfego pago que não converte em paciente.",
      description:
        "Os anúncios geram cliques, alguns leads chegam, mas ninguém senta na cadeira.",
    },
  ],
};

const COPY_GENERAL = {
  eyebrow: "Você reconhece pelo menos 3 dessas situações?",
  headingMain: "O problema não é o anúncio.",
  headingAccent: "É o funil inteiro.",
  transition:
    "Se 3 ou mais soam familiares, o problema não está no seu anúncio. Está no que acontece depois que o lead chega.",
  cards: [
    {
      icon: MessageSquareX,
      title: "Leads chegam, mas ninguém converte.",
      description:
        "O anúncio funciona, as mensagens chegam — mas no fim do mês o faturamento não mudou.",
    },
    {
      icon: BadgeDollarSign,
      title: "Alto investimento com baixo retorno.",
      description:
        "Você investe em anúncios, paga agência, e o custo por cliente fechado continua alto demais.",
    },
    {
      icon: CalendarX2,
      title: "Imprevisibilidade nas vendas mês a mês.",
      description:
        "Um mês bom, dois ruins. Sem padrão, sem previsibilidade, sem como planejar crescimento.",
    },
    {
      icon: UsersRound,
      title: "Agências anteriores que não entregaram.",
      description:
        "Vieram relatórios bonitos, mas o faturamento ficou no mesmo lugar de sempre.",
    },
    {
      icon: Clock,
      title: "Follow-up que não existe.",
      description:
        "Lead chega, equipe responde uma vez, some. Ninguém tem cadência para converter quem não fechou na hora.",
    },
    {
      icon: MousePointerClick,
      title: "Vendas dependendo de sorte ou indicação.",
      description:
        "Sem indicação, a receita cai. Sem processo, o time não sabe o que fazer diferente.",
    },
  ],
};

export default function PainPoints() {
  const variant = useBodyVariant();
  const COPY = variant === "general" ? COPY_GENERAL : COPY_ODONTO;
  return (
    <section className="relative py-14 lg:py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #F5F1EA 100%)" }}>
      {variant === "general" ? (
        <>
          <ClickCursor className="absolute right-[2%] top-[4%] w-28 h-auto text-[#6A48F4] pointer-events-none" opacity={0.09} />
          <FunnelLines className="absolute left-[-2%] bottom-[4%] w-36 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.055} />
          <TrendChart className="absolute right-[-1%] bottom-[10%] w-64 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.05} />
        </>
      ) : (
        <>
          <PorcelainReflection className="absolute right-[2%] top-[4%] w-28 h-auto text-[#6A48F4] pointer-events-none" opacity={0.09} />
          <OcclusalGrid className="absolute left-[-2%] bottom-[4%] w-48 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.055} />
          <SmileDesignArc className="absolute right-[-1%] bottom-[10%] w-64 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.05} />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho editorial */}
        <FadeInSection className="mb-10 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="font-sub text-brand-primary text-base tracking-wide mb-4 inline-flex items-center gap-2">
                <span
                  className="inline-block w-6 h-px"
                  style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
                  aria-hidden="true"
                />
                {COPY.eyebrow}
              </p>
              <h2 className="font-headline font-bold text-brand-text text-3xl sm:text-4xl lg:text-[3.4rem] leading-tight">
                {COPY.headingMain}
                <br />
                {/* Degradê apenas nas palavras-chave do heading */}
                <span className="gradient-text">{COPY.headingAccent}</span>
              </h2>
            </div>
            {/* Número decorativo com degradê — desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block font-headline text-[110px] leading-none select-none flex-shrink-0 gradient-text italic"
              style={{ fontWeight: 200 }}
            >
              6×
            </div>
          </div>
        </FadeInSection>

        {/* Grid de cards com separadores */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden mb-12"
          style={{ background: "rgba(106,72,244,0.12)" }}
        >
          {COPY.cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeInSection key={i}>
                <div className="group bg-white p-7 h-full flex flex-col gap-4 hover:bg-brand-soft transition-colors duration-200 relative">
                  {/* Ícone */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(106,72,244,0.12)" }}
                  >
                    <Icon className="w-6 h-6 text-brand-primary" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="font-headline font-bold text-brand-dark text-lg leading-snug mb-2">
                      {card.title}
                    </h3>
                    <p className="font-body text-gray-500 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>

        {/* Frase de transição — pull-quote com borda degradê */}
        <FadeInSection delay={0.2}>
          <div className="max-w-2xl">
            <div
              className="pl-6 py-1"
              style={{ borderLeft: "4px solid", borderImage: "linear-gradient(180deg, #6A48F4, #143E66) 1" }}
            >
              <p className="font-headline font-bold italic text-brand-dark text-lg lg:text-xl">
                {COPY.transition}
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
