"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Target, Settings2, TrendingUp } from "lucide-react";
import FadeInSection from "@/components/ui/FadeInSection";
import CTAButton from "@/components/ui/CTAButton";
import { PorcelainReflection, XRayFragment } from "@/components/ui/DentalAccents";

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

const COPY = {
  eyebrow: "Por que assessoria, não agência.",
  headingMain: "A maioria das agências entrega só o anúncio.",
  headingAccent: "A gente entrega o funil inteiro.",
  intro:
    "Rodar anúncio sem processo comercial estruturado é jogar dinheiro fora. O Método TRINO conecta os 3 pilares que precisam funcionar juntos para a agenda da sua clínica ser previsível.",
  anchorFinal: "Três pilares. Um sistema. Crescimento integrado.",
  ctaLabel: "Quero entender como isso se aplica à minha clínica",
};

// ─── SVG Diagram interativo ─────────────────────────────────────────────────

const NODE_R = 62;
const NODES = [
  { id: 0, cx: 150, cy: 110 },
  { id: 1, cx: 450, cy: 110 },
  { id: 2, cx: 300, cy: 340 },
];
const EDGES = [
  { from: 0, to: 1, len: 300 },
  { from: 1, to: 2, len: 283 },
  { from: 2, to: 0, len: 283 },
];

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
      viewBox="0 0 600 460"
      aria-label="Diagrama interativo do Método TRINO — clique em cada pilar para explorar"
      role="img"
      className="w-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="tm-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="tm-glow-strong" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="14" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {PILLARS.map((p) => (
          <radialGradient key={p.id} id={`tm-fill-${p.id}`} cx="40%" cy="35%" r="70%">
            <stop offset="0%" stopColor={p.color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={p.color} stopOpacity="0.08" />
          </radialGradient>
        ))}
        {PILLARS.map((p) => (
          <radialGradient key={p.id} id={`tm-halo-${p.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={p.color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={p.color} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* ── Arestas ── */}
      {EDGES.map((edge, i) => {
        const f = NODES[edge.from];
        const t = NODES[edge.to];
        const pf = PILLARS[edge.from];
        const pt = PILLARS[edge.to];
        const isActive = active === edge.from || active === edge.to;

        return (
          <g key={i}>
            {/* Linha base */}
            <motion.line
              x1={f.cx} y1={f.cy} x2={t.cx} y2={t.cy}
              stroke={isActive ? pf.color : "rgba(106,72,244,0.20)"}
              strokeWidth={isActive ? 2.5 : 1.2}
              strokeLinecap="round"
              strokeDasharray={edge.len}
              initial={{ strokeDashoffset: edge.len }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.2, ease: "easeOut" }}
            />

            {/* Partícula de fluxo */}
            <motion.circle
              r={isActive ? 4.5 : 2.5}
              fill={isActive ? pf.color : "#6A48F4"}
              fillOpacity={isActive ? 0.95 : 0.4}
              filter={isActive ? "url(#tm-glow-soft)" : undefined}
              animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: isActive ? 1.6 : 2.8,
                delay: 1.0 + i * 0.7,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                offsetPath: `path("M ${f.cx} ${f.cy} L ${t.cx} ${t.cy}")`,
              } as React.CSSProperties}
            />

            {/* Segunda partícula defasada nos ativos */}
            {isActive && (
              <motion.circle
                r={3}
                fill={pt.color}
                fillOpacity={0.7}
                filter="url(#tm-glow-soft)"
                animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 0.8, 0.8, 0] }}
                transition={{
                  duration: 1.6,
                  delay: 1.0 + i * 0.7 + 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  offsetPath: `path("M ${f.cx} ${f.cy} L ${t.cx} ${t.cy}")`,
                } as React.CSSProperties}
              />
            )}
          </g>
        );
      })}

      {/* ── Nós ── */}
      {NODES.map((n) => {
        const p = PILLARS[n.id];
        const isActive = active === n.id;
        const isHov = hovered === n.id;
        const highlighted = isActive || isHov;

        return (
          <g
            key={n.id}
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(n.id)}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            role="button"
            tabIndex={0}
            aria-label={`Selecionar pilar ${p.number}: ${p.name}`}
            aria-pressed={isActive}
            onKeyDown={(e) => e.key === "Enter" && onSelect(n.id)}
          >
            {/* Halo grande */}
            <motion.circle
              cx={n.cx} cy={n.cy}
              r={NODE_R + 32}
              fill={`url(#tm-halo-${n.id})`}
              animate={{ opacity: highlighted ? 1 : 0, r: highlighted ? NODE_R + 40 : NODE_R + 24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />

            {/* Anel pulsante — apenas no ativo */}
            {isActive && (
              <motion.circle
                cx={n.cx} cy={n.cy} r={NODE_R}
                fill="none"
                stroke={p.color}
                strokeWidth="1.5"
                animate={{ r: [NODE_R, NODE_R + 22], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* Corpo do nó */}
            <motion.circle
              cx={n.cx} cy={n.cy} r={NODE_R}
              fill={`url(#tm-fill-${n.id})`}
              stroke={p.color}
              strokeWidth={highlighted ? 2.2 : 1}
              strokeOpacity={highlighted ? 1 : 0.35}
              filter={isActive ? "url(#tm-glow-strong)" : undefined}
              animate={{
                scale: isActive ? 1.1 : isHov ? 1.05 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
            />

            {/* Número */}
            <text
              x={n.cx} y={n.cy - 22}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontWeight="700"
              fill={p.color}
              opacity={highlighted ? 1 : 0.6}
              fontFamily="var(--font-poppins), sans-serif"
            >
              {p.number}
            </text>

            {/* Ícone SVG inline */}
            {n.id === 0 && (
              <g transform={`translate(${n.cx - 11}, ${n.cy - 10})`} opacity={highlighted ? 1 : 0.65}>
                <circle cx="11" cy="11" r="9" stroke={p.color} strokeWidth={highlighted ? 2 : 1.4} fill="none" />
                <circle cx="11" cy="11" r="5" stroke={p.color} strokeWidth={highlighted ? 2 : 1.4} fill="none" />
                <circle cx="11" cy="11" r="1.8" fill={p.color} />
              </g>
            )}
            {n.id === 1 && (
              <g transform={`translate(${n.cx - 11}, ${n.cy - 10})`} opacity={highlighted ? 1 : 0.65}>
                <circle cx="11" cy="11" r="3" stroke={p.color} strokeWidth={highlighted ? 2 : 1.4} fill="none" />
                <path d="M12.2 3.5a1.4 1.4 0 0 0-2.4 0l-.4.8a6.5 6.5 0 0 0-1.5.62l-.8-.46a1.4 1.4 0 0 0-1.9 1.9l.46.8A6.5 6.5 0 0 0 5 8.76l-.8.4a1.4 1.4 0 0 0 0 2.4l.8.4c.12.55.32 1.08.62 1.55l-.46.8a1.4 1.4 0 0 0 1.9 1.9l.8-.46c.47.3 1 .5 1.55.62l.4.8a1.4 1.4 0 0 0 2.4 0l.4-.8c.55-.12 1.08-.32 1.55-.62l.8.46a1.4 1.4 0 0 0 1.9-1.9l-.46-.8c.3-.47.5-1 .62-1.55l.8-.4a1.4 1.4 0 0 0 0-2.4l-.8-.4a6.5 6.5 0 0 0-.62-1.55l.46-.8a1.4 1.4 0 0 0-1.9-1.9l-.8.46A6.5 6.5 0 0 0 12.6 4.3z"
                  stroke={p.color} strokeWidth={highlighted ? 1.2 : 0.9} fill="none" />
              </g>
            )}
            {n.id === 2 && (
              <g transform={`translate(${n.cx - 11}, ${n.cy - 10})`} opacity={highlighted ? 1 : 0.65}>
                <polyline points="21,5 12,13.5 7.5,9 1,16.5" stroke={p.color} strokeWidth={highlighted ? 2 : 1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="15,5 21,5 21,11" stroke={p.color} strokeWidth={highlighted ? 2 : 1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}

            {/* Label — duas linhas */}
            {p.name.split(" ").reduce<string[][]>((acc, word, wi) => {
              // quebra em duas linhas: "Demanda / Qualificada", "Estrutura / Comercial", "Expansão / Inteligente"
              if (wi === 1) acc.push([]);
              acc[acc.length - 1].push(word);
              return acc;
            }, [[]])
              .map((words, li) => (
                <text
                  key={li}
                  x={n.cx}
                  y={n.cy + 20 + li * 13}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={highlighted ? "10.5" : "9.5"}
                  fontWeight={highlighted ? "600" : "400"}
                  fill={highlighted ? "#FFFFFF" : "#C4B5FD"}
                  opacity={highlighted ? 1 : 0.7}
                  fontFamily="var(--font-poppins), sans-serif"
                >
                  {words.join(" ")}
                </text>
              ))}
          </g>
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

      <p
        className="font-headline text-sm italic leading-relaxed px-4 py-3 rounded-xl"
        style={{
          color: "#C4B5FD",
          background: `${pillar.color}12`,
          borderLeft: `3px solid ${pillar.color}80`,
        }}
      >
        &ldquo;{pillar.anchor}&rdquo;
      </p>

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

// ─── Painel com altura fixa — todos os pilares em absolute, container não muda ─

function PillarPanel({ active }: { active: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mede a altura de cada painel e usa a maior
  useEffect(() => {
    const heights = panelRefs.current.map((el) => el?.scrollHeight ?? 0);
    const max = Math.max(...heights);
    if (max > 0) setHeight(max);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={{ height: height || "auto" }}>
      {PILLARS.map((pillar, i) => (
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
}: {
  active: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(106,72,244,0.20)" }}>
      {PILLARS.map((p) => (
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
      className="relative py-14 lg:py-28 text-white overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #0F1E33 60%, #0C0F1A 100%)" }}
    >
      {/* Linha de topo degradê */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />

      {/* Reflexo de porcelana — faceta estética, canto superior esquerdo */}
      <PorcelainReflection
        className="absolute left-[-1%] top-[8%] w-32 h-auto text-[#6A48F4] pointer-events-none"
        opacity={0.055}
      />
      {/* Radiografia panorâmica — canto inferior direito */}
      <XRayFragment
        className="absolute right-[-1%] bottom-[5%] w-56 h-auto text-[#6A48F4] pointer-events-none hidden lg:block"
        opacity={0.05}
      />

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
                    <PillarPanel active={active} />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: tabs + painel abaixo do diagrama */}
            <div
              className="lg:hidden p-5 flex flex-col gap-5"
              style={{ borderTop: "1px solid rgba(106,72,244,0.15)" }}
            >
              <MobileTabs active={active} onSelect={handleSelect} />
              <PillarPanel active={active} />
            </div>
          </div>

          {/* Indicadores de pilar — bolinhas clicáveis */}
          <div className="flex items-center justify-center gap-3 mb-14">
            {PILLARS.map((p) => (
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
