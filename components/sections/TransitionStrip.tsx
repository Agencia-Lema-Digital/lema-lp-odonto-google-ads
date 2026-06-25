"use client";

import FadeInSection from "@/components/ui/FadeInSection";

// Faixa de transição (variante general) entre a prova (cases) e o método (TRINO).
// Pega os resultados recém-vistos e os converte em curiosidade pelo sistema:
// "não vêm de sorte, vêm de método". Fundo claro (contrasta com o TRINO escuro
// a seguir) + blobs animados densos e suaves. Círculo com seta reforça o fluxo
// para baixo. Ponte enxuta, sem virar seção cheia.
export default function TransitionStrip() {
  return (
    <section
      className="relative py-12 lg:py-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #F3F0FF 0%, #FFFFFF 50%, #EDE9FE 100%)" }}
      aria-label="Da prova ao método"
    >
      {/* Linha de acento no topo */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #6A48F4, #4C2FC4, #143E66, transparent)" }}
      />

      {/* Blobs animados — em tons claros, mais presentes mas sem ofuscar o texto */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span
          className="mesh-blob"
          style={{
            top: "-40%", left: "0%", width: "50%", paddingBottom: "50%",
            background: "radial-gradient(circle, rgba(106,72,244,0.32) 0%, transparent 62%)",
            animation: "mesh-float-a 7s ease-in-out infinite",
          }}
        />
        <span
          className="mesh-blob"
          style={{
            top: "-10%", right: "-5%", width: "55%", paddingBottom: "55%",
            background: "radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 62%)",
            animation: "mesh-float-b 8.5s ease-in-out infinite",
          }}
        />
        <span
          className="mesh-blob"
          style={{
            bottom: "-50%", left: "30%", width: "48%", paddingBottom: "48%",
            background: "radial-gradient(circle, rgba(76,47,196,0.28) 0%, transparent 62%)",
            animation: "mesh-float-c 6.5s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          <h2 className="px-2">
            {/* Antecedente discreto — prepara o ponto */}
            <span
              className="block font-headline text-gray-500 text-sm sm:text-lg lg:text-xl mb-1.5"
              style={{ fontWeight: 400 }}
            >
              Esses resultados não vêm de sorte.
            </span>
            {/* Clímax — destaque protagonista */}
            <span
              className="block font-headline text-[2rem] sm:text-3xl lg:text-[2.8rem] leading-tight sm:whitespace-nowrap"
              style={{
                fontWeight: 600,
                background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 50%, #143E66 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Vêm de um método.
            </span>
          </h2>

          {/* Círculo com seta para baixo — reforça o fluxo para o método */}
          <div className="mt-6 flex justify-center">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-full animate-bounce-soft"
              style={{
                background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 100%)",
                boxShadow: "0 8px 24px rgba(106,72,244,0.35)",
              }}
              aria-hidden="true"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
