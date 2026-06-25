"use client";

import FadeInSection from "@/components/ui/FadeInSection";

// Mini-seção de dor + virada (variante general) — momento curto de identificação
// logo após a hero. Reconhece o problema em 1 frase E imediatamente aponta para a
// solução, conectando à promessa da hero e preparando o método (TRINO) que vem
// a seguir. A queda emocional vira ponte, não um balde de água fria.
export default function PainStrip() {
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
              Se os leads chegam mas não viram clientes, o problema não é o anúncio.{" "}
              <span className="gradient-text" style={{ fontWeight: 600 }}>
                É o que acontece entre o clique e a venda.
              </span>
            </p>
            <p className="font-body font-light text-gray-500 text-base lg:text-lg leading-relaxed mt-4 sm:mt-5 max-w-2xl">
              No <strong className="font-semibold text-brand-text">diagnóstico gratuito</strong>, o
              sócio te mostra ao vivo <strong className="font-semibold text-brand-text">onde você
              perde venda</strong> e o que atacar primeiro.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
