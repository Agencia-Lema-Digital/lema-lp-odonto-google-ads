"use client";

// Faixa de palavras-chave deslizante (marquee) — resumo escaneável do que a Lema
// entrega, alinhado ao Método TRINO (demanda/comercial/expansão) e ao MCI.
// Animação CSS pura em loop; respeita prefers-reduced-motion (para de mover).

const KEYWORDS = [
  "Tráfego pago",
  "Google Ads",
  "Meta Ads",
  "Gestão de conteúdo",
  "Criativos em vídeo",
  "CRM de vendas",
  "Processo comercial",
  "Follow-up estruturado",
  "Funil integrado",
  "Esteira de serviços",
  "Programa de indicação",
  "Avaliações online",
  "Vendas previsíveis",
  "Marketing e vendas",
];

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      className="flex items-center gap-8 px-4 shrink-0"
      aria-hidden={ariaHidden || undefined}
    >
      {KEYWORDS.map((kw, i) => (
        <li key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span className="font-body text-sm text-gray-400">{kw}</span>
          <span aria-hidden="true" className="text-brand-primary/50 text-xs">
            ●
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function KeywordMarquee() {
  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{
        background: "#0C0F1A",
        borderColor: "rgba(106,72,244,0.15)",
      }}
      aria-label="O que a Lema entrega"
    >
      {/* Esmaecimento nas bordas para o loop parecer infinito */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
        style={{ background: "linear-gradient(to right, #0C0F1A, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
        style={{ background: "linear-gradient(to left, #0C0F1A, transparent)" }}
      />

      {/* Duas trilhas idênticas em sequência criam o loop contínuo */}
      <div className="flex w-max animate-keyword-marquee">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}
