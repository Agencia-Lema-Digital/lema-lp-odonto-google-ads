"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Settings2, TrendingUp } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import CTAButton from "@/components/ui/CTAButton";
import { PorcelainReflection, XRayFragment } from "@/components/ui/DentalAccents";
import { ROASArrow, TrendChart } from "@/components/ui/GeneralistAccents";
import { useBodyVariant } from "@/lib/body-variant-context";

// ─── Dados dos pilares ──────────────────────────────────────────────────────

const PILLARS = [
  {
    id: 0,
    number: "01",
    Icon: Target,
    name: "Demanda Qualificada",
    anchor: "O paciente certo, não qualquer paciente.",
    description:
      "Tráfego pago, criativos, copy e segmentação para trazer o paciente certo — não qualquer pessoa que clicou num anúncio.",
    includes: ["Meta Ads", "Google Ads", "Criativos em vídeo", "Copy", "Segmentação por perfil"],
    metrics: ["CPL", "CTR", "Taxa de clique"],
    color: "#6A48F4",
    colorLight: "rgba(106,72,244,0.12)",
    colorMid: "rgba(106,72,244,0.30)",
  },
  {
    id: 1,
    number: "02",
    Icon: Settings2,
    name: "Estrutura Comercial",
    anchor: "De nada adianta lead chegando se a clínica não sabe converter.",
    description:
      "CRM implementado, scripts testados, cadência de follow-up de 5 dias e treinamento da sua equipe para transformar lead em paciente na cadeira.",
    includes: ["Implementação de CRM", "Scripts de atendimento", "Follow-up estruturado", "Treinamento da equipe", "Playbook de vendas"],
    metrics: ["Taxa de resposta", "Agendamento", "Show rate"],
    color: "#A78BFA",
    colorLight: "rgba(167,139,250,0.10)",
    colorMid: "rgba(167,139,250,0.22)",
  },
  {
    id: 2,
    number: "03",
    Icon: TrendingUp,
    name: "Expansão Inteligente",
    anchor: "Cada paciente que fecha pode trazer mais 3.",
    description:
      "Conteúdo orgânico, esteira de serviços, programa de indicação estruturado e gestão de avaliações online que retroalimentam todo o funil.",
    includes: ["Estratégias de conteúdo orgânico", "Indicação estruturada", "Esteira de serviços", "Avaliações Google"],
    metrics: ["LTV", "Taxa de recompra", "Indicações"],
    color: "#143E66",
    colorLight: "rgba(20,62,102,0.15)",
    colorMid: "rgba(20,62,102,0.35)",
  },
];

const COPY_ODONTO = {
  eyebrow: "Por que assessoria, não agência.",
  headingMain: "A maioria das agências entrega só o anúncio.",
  headingAccent: "A gente entrega o funil inteiro.",
  intro:
    "Rodar anúncio sem processo comercial estruturado é jogar dinheiro fora. O Método TRINO conecta os 3 pilares que precisam funcionar juntos para a agenda da sua clínica ser previsível.",
  anchorFinal: "Três pilares. Um sistema. Crescimento integrado.",
  ctaLabel: "Quero meu diagnóstico gratuito",
};

const PILLARS_GENERAL = [
  {
    ...PILLARS[0],
    anchor: "Atrair o cliente certo, não qualquer lead.",
    description:
      "Tráfego pago no Google e Meta somado a conteúdo orgânico que atrai o cliente certo e constrói autoridade ao longo do tempo. Demanda com qualidade, não volume vazio.",
    includes: ["Google Ads", "Meta Ads", "Gestão de conteúdo e redes", "Criativos em vídeo", "Segmentação por perfil"],
  },
  {
    ...PILLARS[1],
    anchor: "Onde leads viram clientes.",
    description:
      "CRM implementado, scripts de abordagem, follow-up estruturado e cadência comercial. Resolvemos a fricção entre o lead chegar e o fechamento acontecer.",
    includes: ["CRM implementado e treinado", "Scripts de abordagem e fechamento", "Cadência comercial estruturada"],
  },
  {
    ...PILLARS[2],
    anchor: "Crescer com dados e com a base que você já tem.",
    description:
      "Otimização do funil com dados para reduzir custo e aumentar conversão, somada à expansão pela base: esteira de serviços, indicações e reputação online que retroalimentam todo o sistema.",
    includes: ["Análise de gargalos e CAC", "Esteira de serviços (upsell)", "Programa de indicação", "Gestão de avaliações online"],
  },
];

const COPY_GENERAL = {
  eyebrow: "Não rodamos só anúncio. Montamos o sistema inteiro.",
  headingMain: "Três pilares interdependentes",
  headingAccent: "do clique ao cliente fechado.",
  intro:
    "O Método TRINO conecta demanda, conversão e expansão num sistema cíclico: atrai o cliente certo com anúncios e conteúdo, estrutura o comercial para converter, e cresce com dados e relacionamento. Cada pilar alimenta o próximo.",
  anchorFinal: "Três pilares. Um sistema. Crescimento integrado.",
  ctaLabel: "Quero meu diagnóstico gratuito",
};

// ─── SVG Diagram interativo ─────────────────────────────────────────────────

// Geometria de cada camada do funil 3D isométrico (empilhadas, afunilando)
const EY = 26; // raio vertical da elipse (perspectiva)
const FUNNEL_LAYERS = [
  { id: 0, cy: 96,  topR: 168, botR: 134, h: 64 },
  { id: 1, cy: 226, topR: 126, botR: 96,  h: 58 },
  { id: 2, cy: 344, topR: 88,  botR: 62,  h: 52 },
];
const CX = 232; // centro horizontal do funil

// Caminho da face frontal (corpo) de um cilindro isométrico que afunila
function layerBodyPath(cy: number, topR: number, botR: number, h: number) {
  const topY = cy;
  const botY = cy + h;
  return [
    `M ${CX - topR} ${topY}`,
    `A ${topR} ${EY} 0 0 0 ${CX + topR} ${topY}`,        // borda inferior da elipse de topo (frente)
    `L ${CX + botR} ${botY}`,                              // lado direito descendo
    `A ${botR} ${EY} 0 0 1 ${CX - botR} ${botY}`,         // elipse de base (frente)
    `Z`,
  ].join(" ");
}

function TrinoSVG({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (id: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <svg
      viewBox="32 60 400 360"
      aria-label="Funil do Método TRINO — clique em cada camada para explorar o pilar"
      role="img"
      className="w-full mx-auto max-w-[300px] lg:max-w-[360px]"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="tm-glow-strong" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {PILLARS.map((p) => (
          // gradiente vertical do corpo: claro em cima, escuro embaixo (volume 3D)
          <linearGradient key={p.id} id={`tm-body-${p.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={p.color} stopOpacity="0.62" />
          </linearGradient>
        ))}
      </defs>

      {FUNNEL_LAYERS.map((layer, idx) => {
        const p = PILLARS[layer.id];
        const isActive = active === layer.id;
        const isHov = hovered === layer.id;
        const highlighted = isActive || isHov;
        const topY = layer.cy;
        const botY = layer.cy + layer.h;

        return (
          <motion.g
            key={layer.id}
            style={{ cursor: "pointer", transformOrigin: `${CX}px ${(topY + botY) / 2}px` }}
            onClick={() => onSelect(layer.id)}
            onMouseEnter={() => setHovered(layer.id)}
            onMouseLeave={() => setHovered(null)}
            role="button"
            tabIndex={0}
            aria-label={`Selecionar pilar ${p.number}: ${p.name}`}
            aria-pressed={isActive}
            onKeyDown={(e) => e.key === "Enter" && onSelect(layer.id)}
            initial={{ opacity: 0, y: -16 }}
            animate={{
              opacity: highlighted ? 1 : 0.82,
              y: 0,
              scale: isActive ? 1.04 : isHov ? 1.02 : 1,
            }}
            transition={{ opacity: { duration: 0.5, delay: 0.15 + idx * 0.15 }, y: { duration: 0.5, delay: 0.15 + idx * 0.15 }, scale: { duration: 0.3 } }}
            filter={isActive ? "url(#tm-glow-strong)" : undefined}
          >
            {/* Sombra projetada da elipse de base */}
            <ellipse
              cx={CX} cy={botY + 6} rx={layer.botR * 0.9} ry={EY * 0.5}
              fill="#000" opacity={0.18}
            />
            {/* Corpo (face frontal) */}
            <path
              d={layerBodyPath(topY, layer.topR, layer.botR, layer.h)}
              fill={`url(#tm-body-${layer.id})`}
              stroke={p.color}
              strokeOpacity={highlighted ? 0.9 : 0.35}
              strokeWidth={highlighted ? 1.5 : 1}
            />
            {/* Elipse de topo (tampa) — mais clara, dá o volume 3D */}
            <ellipse
              cx={CX} cy={topY} rx={layer.topR} ry={EY}
              fill={p.color}
              fillOpacity={highlighted ? 1 : 0.92}
            />
            {/* Brilho interno da tampa (cavidade) */}
            <ellipse
              cx={CX} cy={topY} rx={layer.topR * 0.74} ry={EY * 0.72}
              fill="#0C0F1A" fillOpacity={0.55}
            />
            <ellipse
              cx={CX - layer.topR * 0.18} cy={topY - EY * 0.18} rx={layer.topR * 0.5} ry={EY * 0.42}
              fill="#FFFFFF" fillOpacity={highlighted ? 0.14 : 0.08}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

// ─── Conteúdo de um pilar ───────────────────────────────────────────────────

function PillarContent({ pillar }: { pillar: typeof PILLARS[0] }) {
  const Icon = pillar.Icon;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{
            background: `linear-gradient(135deg, ${pillar.color}40, ${pillar.color}15)`,
            border: `1px solid ${pillar.color}50`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: pillar.color }} aria-hidden="true" />
        </div>
        <div>
          <p className="font-body font-semibold text-xs uppercase tracking-widest mb-1" style={{ color: pillar.color }}>
            Pilar {pillar.number}
          </p>
          <h3 className="font-headline font-semibold text-white text-xl leading-tight">
            {pillar.name}
          </h3>
        </div>
      </div>

      <p className="font-body text-gray-300 text-sm leading-relaxed">
        {pillar.description}
      </p>

      <div>
        <p className="font-body font-semibold text-xs uppercase tracking-widest text-gray-500 mb-3">
          O que inclui
        </p>
        <div className="flex flex-wrap gap-2">
          {pillar.includes.map((tag) => (
            <span
              key={tag}
              className="font-body text-xs px-2.5 py-1 rounded-full"
              style={{
                background: `${pillar.color}18`,
                color: "#C4B5FD",
                border: `1px solid ${pillar.color}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Painel com altura fixa — todos os pilares em absolute, container travado ──

function PillarPanel({ active, pillars }: { active: number; pillars: typeof PILLARS }) {
  const [height, setHeight] = useState<number | "auto">("auto");
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const measure = () => {
      const heights = panelRefs.current.map((el) => el?.scrollHeight ?? 0);
      const max = Math.max(...heights);
      if (max > 0) setHeight(max);
    };

    measure();

    const observer = new ResizeObserver(measure);
    panelRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative" style={{ height }}>
      {pillars.map((pillar, i) => (
        <motion.div
          key={pillar.id}
          animate={{ opacity: active === pillar.id ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          ref={(el) => { panelRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            pointerEvents: active === pillar.id ? "auto" : "none",
          }}
          aria-hidden={active !== pillar.id}
        >
          <PillarContent pillar={pillar} />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Tabs de seleção mobile ──────────────────────────────────────────────────

function MobileTabs({
  active,
  onSelect,
  pillars,
}: {
  active: number;
  onSelect: (id: number) => void;
  pillars: typeof PILLARS;
}) {
  return (
    <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(106,72,244,0.20)" }}>
      {pillars.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p.id)}
          className="flex-1 py-2.5 min-h-[44px] text-xs font-body font-semibold transition-all duration-200 focus-visible:outline-none"
          style={{
            background: active === p.id
              ? `linear-gradient(135deg, ${p.color}40, ${p.color}20)`
              : "transparent",
            color: active === p.id ? "#FFFFFF" : "#6B7280",
            borderRight: p.id < 2 ? "1px solid rgba(106,72,244,0.15)" : "none",
          }}
          aria-pressed={active === p.id}
        >
          {p.number}
        </button>
      ))}
    </div>
  );
}

// ─── Seção principal ─────────────────────────────────────────────────────────

export default function TrinoMethod() {
  const variant = useBodyVariant();
  const COPY = variant === "general" ? COPY_GENERAL : COPY_ODONTO;
  const activePillars = variant === "general" ? PILLARS_GENERAL : PILLARS;
  const [active, setActive] = useState(0);
  const [autoRunning, setAutoRunning] = useState(true);

  // Auto-avanço a cada 3.5s enquanto o usuário não interagir
  useEffect(() => {
    if (!autoRunning) return;
    const t = setTimeout(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearTimeout(t);
  }, [active, autoRunning]);

  const handleSelect = (id: number) => {
    setActive(id);
    setAutoRunning(false);
  };

  return (
    <section
      id="nosso-metodo"
      className="relative py-14 lg:py-28 text-white overflow-hidden scroll-mt-20"
      style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #0F1E33 60%, #0C0F1A 100%)" }}
    >
      {/* Linha de topo degradê */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />

      {variant === "general" ? (
        <>
          <ROASArrow className="absolute left-[-1%] top-[8%] w-28 h-auto text-[#6A48F4] pointer-events-none" opacity={0.055} />
          <TrendChart className="absolute right-[-1%] bottom-[5%] w-56 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.05} />
        </>
      ) : (
        <>
          <PorcelainReflection className="absolute left-[-1%] top-[8%] w-32 h-auto text-[#6A48F4] pointer-events-none" opacity={0.055} />
          <XRayFragment className="absolute right-[-1%] bottom-[5%] w-56 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.05} />
        </>
      )}

      {/* Mesh radial */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(106,72,244,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <FadeInSection className="mb-10 lg:mb-14 max-w-3xl">
          <p className="font-sub text-brand-primary text-base tracking-wide mb-4 inline-flex items-center gap-2">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            {COPY.eyebrow}
          </p>
          <h2 className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-[3.4rem] leading-[1.05] tracking-tight mb-5">
            {COPY.headingMain}
            <br />
            <span className="gradient-text">{COPY.headingAccent}</span>
          </h2>
          <p className="font-body text-gray-400 text-base lg:text-lg leading-relaxed max-w-2xl">
            {COPY.intro}
          </p>
        </FadeInSection>

        {/* ── Layout principal: diagrama grande + painel lateral ── */}
        <FadeInSection delay={0.1}>
          <div
            className="rounded-3xl overflow-hidden mb-6"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(106,72,244,0.18)",
            }}
          >
            {/* Desktop: diagrama à esquerda, painel à direita */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">
              {/* Diagrama */}
              <div className="p-6 lg:p-10 flex flex-col">
                <TrinoSVG active={active} onSelect={handleSelect} />
              </div>

              {/* Divisor vertical — apenas desktop */}
              <div className="hidden lg:flex flex-col">
                <div
                  className="flex-1"
                  style={{ borderLeft: "1px solid rgba(106,72,244,0.15)" }}
                >
                  <div className="p-8 lg:p-10 h-full flex flex-col justify-center">
                    <PillarPanel active={active} pillars={activePillars} />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: tabs + painel abaixo do diagrama */}
            <div
              className="lg:hidden p-5 flex flex-col gap-5"
              style={{ borderTop: "1px solid rgba(106,72,244,0.15)" }}
            >
              <MobileTabs active={active} onSelect={handleSelect} pillars={activePillars} />
              <PillarPanel active={active} pillars={activePillars} />
            </div>
          </div>

          {/* Indicadores de pilar — bolinhas clicáveis */}
          <div className="flex items-center justify-center gap-3 mb-14">
            {activePillars.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                aria-label={`Ver pilar ${p.number}: ${p.name}`}
                aria-current={active === p.id}
                className="relative p-3 -m-3 flex items-center justify-center transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: active === p.id ? "2rem" : "0.5rem",
                    height: "0.5rem",
                    background: active === p.id
                      ? `linear-gradient(90deg, ${p.color}, ${p.color}80)`
                      : "rgba(255,255,255,0.15)",
                  }}
                />
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Frase-âncora + CTA */}
        <FadeInSection delay={0.2}>
          <div
            className="pt-8 lg:pt-12 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="font-headline font-bold text-white text-2xl lg:text-3xl text-center lg:text-left">
              {COPY.anchorFinal}
            </p>
            <CTAButton label={COPY.ctaLabel} size="lg" className="flex-shrink-0" />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
