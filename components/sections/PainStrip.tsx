"use client";

import FadeInSection from "@/components/ui/FadeInSection";
import { useCopyVariant } from "@/lib/copy-variant-context";

// Mini-seção de dor + virada (variante general) — momento curto de identificação
// logo após a hero. Duas versões de copy: "assessoria" (serviço) e "diagnostico"
// (raiz backup, gancho do diagnóstico).
export default function PainStrip() {
  const copyVariant = useCopyVariant();
  const diag = copyVariant === "diagnostico";
  const trafego = copyVariant === "trafego";
  return (
    <section
      className="relative py-10 lg:py-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #F5F1EA 100%)" }}
      aria-label="O problema e a virada"
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div
            className="pl-4 sm:pl-5 lg:pl-7 py-1"
            style={{ borderLeft: "4px solid", borderImage: "linear-gradient(180deg, #6A48F4, #143E66) 1" }}
          >
            <p
              className="font-headline text-brand-text text-xl sm:text-3xl lg:text-[2.4rem] leading-snug"
              style={{ fontWeight: 500 }}
            >
              {trafego ? (
                <>
                  Tráfego pago sozinho não resolve.{" "}
                  <span className="gradient-text" style={{ fontWeight: 600 }}>
                    Tráfego pago sem processo é o que faz você perder dinheiro.
                  </span>
                </>
              ) : diag ? (
                <>
                  Se os leads chegam mas não viram clientes, o problema não é o anúncio.{" "}
                  <span className="gradient-text" style={{ fontWeight: 600 }}>
                    É o que acontece entre o clique e a venda.
                  </span>
                </>
              ) : (
                <>
                  O lead chega, pergunta o preço e some? Nem sempre o problema é o anúncio:{" "}
                  <span className="gradient-text" style={{ fontWeight: 600 }}>
                    é a falta de um método que transforma conversa em vendas.
                  </span>
                </>
              )}
            </p>
            <p className="font-body font-light text-gray-500 text-base lg:text-lg leading-relaxed mt-4 sm:mt-5 max-w-2xl">
              {trafego ? (
                <>
                  Você provavelmente já investiu em anúncios — talvez com uma agência, talvez por conta
                  própria. E talvez tenha visto o de sempre: cliques, alcance, &ldquo;leads&rdquo; que não respondem,
                  relatório cheio de número e o faturamento no mesmo lugar.
                  <br />
                  <br />
                  O problema quase nunca é o tráfego em si.{" "}
                  <strong className="font-semibold text-brand-text">É o que acontece depois do clique.</strong>{" "}
                  Sem qualificação, sem atendimento rápido, sem follow-up, o lead esfria no WhatsApp e a
                  verba do anúncio evapora. Você não precisa de mais clique.{" "}
                  <strong className="font-semibold text-brand-text">Precisa que o clique vire cliente.</strong>
                </>
              ) : diag ? (
                <>
                  No <strong className="font-semibold text-brand-text">diagnóstico gratuito</strong>, o
                  sócio te mostra ao vivo <strong className="font-semibold text-brand-text">onde você
                  perde venda</strong> e o que atacar primeiro.
                </>
              ) : (
                <>
                  É exatamente aí que a <strong className="font-semibold text-brand-text">assessoria da
                  Lema Digital</strong> entra: conecta <strong className="font-semibold text-brand-text">anúncio,
                  conteúdo e processo comercial</strong>. Pra você parar de perder venda entre o clique e o fechamento.
                </>
              )}
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
