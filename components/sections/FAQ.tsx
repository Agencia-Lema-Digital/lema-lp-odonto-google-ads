"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeInSection from "@/components/ui/FadeInSection";
import CTAButton from "@/components/ui/CTAButton";
import { XRayFragment, ProbeGrid } from "@/components/ui/DentalAccents";
import { DataGrid, ClickCursor } from "@/components/ui/GeneralistAccents";
import { useBodyVariant } from "@/lib/body-variant-context";

const COPY_ODONTO = {
  eyebrow: "Dúvidas frequentes",
  headingMain: "As perguntas que todo dono",
  headingAccent: "de clínica faz antes de fechar.",
  faqs: [
    {
      question: "Como vocês garantem que os leads vão ser qualificados?",
      answer:
        "Trabalhamos com formulários de qualificação na entrada e treinamento da sua equipe para descartar leads curiosos rapidamente. Mas seja honesto com a expectativa: não existe lead 100% qualificado em volume. Existe processo que filtra rápido e equipe que sabe converter o lead bom.",
    },
    {
      question: "Já tive experiência ruim com agência. Por que vocês são diferentes?",
      answer:
        "Provavelmente sua agência anterior só rodava anúncio. A gente atua nos 3 pilares: anúncio, atendimento e processo comercial. O gap entre o lead chegar e o paciente sentar na cadeira é onde a maioria das agências falha — e é exatamente onde o Método TRINO atua.",
    },
    {
      question: "Tem garantia de fechamentos?",
      answer:
        "Não. Garantimos método, processo, métricas e acompanhamento próximo — não garantimos fechamentos, porque parte deles depende da sua estrutura, da sua equipe e do seu posicionamento. Agência que garante fechamento ou está mentindo, ou está cobrando alto demais para cobrir o risco.",
    },
  ],
  ctaLabel: "Quero meu diagnóstico gratuito",
};

const COPY_GENERAL = {
  eyebrow: "Dúvidas frequentes",
  headingMain: "As perguntas que todo empresário",
  headingAccent: "faz antes de fechar.",
  faqs: [
    {
      question: "Já tive experiência ruim com agência. Por que vocês são diferentes?",
      answer:
        "Provavelmente sua agência anterior só rodava anúncio e entregava relatório. A Lema atua nos 3 pilares: anúncio, atendimento e processo comercial. O gap entre o lead chegar e a venda acontecer é onde a maioria das agências falha — e é exatamente onde o Método TRINO atua.",
    },
    {
      question: "O que está incluído na assessoria? É só tráfego?",
      answer:
        "Não é só tráfego. O Método TRINO conecta três frentes num sistema só: (1) Demanda Qualificada — tráfego pago (Google e Meta) somado à atração orgânica e conteúdo, para atrair o cliente certo; (2) Estrutura Comercial — CRM, scripts, follow-up e treinamento para converter o lead em cliente sem perder ninguém pelo caminho; e (3) Expansão Inteligente — leitura de dados do funil para reduzir custo de aquisição, aumentar o ticket e crescer com previsibilidade. O escopo de cada pilar varia conforme o plano, e a gente define isso junto no diagnóstico.",
    },
    {
      question: "Tem garantia de resultado?",
      answer:
        "Garantimos método, processo, métricas e acompanhamento próximo — não garantimos vendas, porque parte delas depende da sua estrutura, da sua equipe e do seu posicionamento de mercado. Qualquer empresa que garanta vendas ou está mentindo, ou está embutindo esse risco no preço.",
    },
  ],
  ctaLabel: "Quero meu diagnóstico gratuito",
};

export default function FAQ() {
  const variant = useBodyVariant();
  const COPY = variant === "general" ? COPY_GENERAL : COPY_ODONTO;
  return (
    <section
      className="relative py-14 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #F5F1EA 100%)" }}
    >
      {/* Linha de topo degradê */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />
      {variant === "general" ? (
        <>
          <DataGrid className="absolute right-[-1%] top-[4%] w-56 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.065} />
          <ClickCursor className="absolute left-[4%] bottom-[5%] w-20 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.08} />
        </>
      ) : (
        <>
          <XRayFragment className="absolute right-[-1%] top-[4%] w-64 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.065} />
          <ProbeGrid className="absolute left-[4%] bottom-[5%] w-8 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.08} />
        </>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <FadeInSection className="mb-12">
          <p className="font-sub text-brand-primary text-base tracking-wide mb-4 inline-flex items-center gap-2">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            {COPY.eyebrow}
          </p>
          <h2 className="font-headline font-bold text-brand-text text-3xl sm:text-4xl lg:text-5xl leading-tight">
            {COPY.headingMain}
            <br />
            <span className="gradient-text">{COPY.headingAccent}</span>
          </h2>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <Accordion className="space-y-3">
            {COPY.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white rounded-xl px-6 overflow-hidden"
                style={{ border: "1px solid rgba(106,72,244,0.15)" }}
              >
                <AccordionTrigger className="font-headline font-bold text-brand-dark text-left text-base py-5 hover:no-underline hover:text-brand-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-gray-600 text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInSection>

        <FadeInSection delay={0.2} className="text-center mt-12">
          <p className="font-body text-gray-500 text-sm mb-5">
            Ainda tem dúvidas? Tire todas em 30 minutos com a gente.
          </p>
          <CTAButton label={COPY.ctaLabel} size="lg" />
        </FadeInSection>
      </div>
    </section>
  );
}
