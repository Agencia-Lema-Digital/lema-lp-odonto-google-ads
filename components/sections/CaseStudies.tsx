"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/ui/FadeInSection";
import CTAButton from "@/components/ui/CTAButton";

// ─── dados ───────────────────────────────────────────────────────────────────

const FEATURED = {
  segment: "Venda de Produto Premium",
  name: "Roboclean Brasil",
  location: "São Paulo/SP",
  tagline: "De R$416 a R$105k em 15 dias",
  stats: [
    { value: "252×", label: "retorno sobre anúncios" },
    { value: "R$416", label: "investidos em anúncios" },
    { value: "R$105k", label: "em vendas em 15 dias" },
  ],
};

const OTHERS = [
  {
    segment: "Marcenaria & Móveis Sob Medida",
    name: "LK Móveis Sob Medida",
    location: "Porto Alegre/RS",
    accentColor: "#7C3AED",
    stats: [
      { value: "20×", label: "ROAS — retorno sobre anúncios" },
      { value: "R$85k", label: "em vendas geradas" },
      { value: "R$4,2k", label: "investidos em anúncios" },
    ],
  },
  {
    segment: "Clínica Veterinária",
    name: "CENUV",
    location: "Vila Velha/ES",
    accentColor: "#0EA5E9",
    stats: [
      { value: "+R$6k", label: "faturados em 15 dias" },
      { value: "87%", label: "presença no topo do Google" },
      { value: "98%", label: "métricas em evolução" },
    ],
  },
  {
    segment: "Marca Pessoal",
    name: "Cleston Santino",
    location: "Orlando/FL",
    accentColor: "#F59E0B",
    stats: [
      { value: "+35k", label: "seguidores no Instagram" },
      { value: "+2Mi", label: "views no YouTube" },
      { value: "+30k", label: "inscritos no YouTube" },
    ],
  },
];

const TESTIMONIAL_VIDEOS = [
  {
    id: "Nb7Ofl1Pedo",
    name: "Luciano Bezerra",
    role: "Sócio-fundador",
    thumb: `https://i.ytimg.com/vi/Nb7Ofl1Pedo/hqdefault.jpg`,
  },
  {
    id: "G1ZcB1HeC80",
    name: "Liliane Bezerra",
    role: "Sócia-fundadora",
    thumb: `https://i.ytimg.com/vi/G1ZcB1HeC80/hqdefault.jpg`,
  },
];

// ─── componentes ─────────────────────────────────────────────────────────────

function VideoLightbox({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.92)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[360px]"
          style={{ aspectRatio: "9/16", maxHeight: "88vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Depoimento em vídeo"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full rounded-2xl"
            style={{ border: "none" }}
          />
          <button
            onClick={onClose}
            aria-label="Fechar vídeo"
            className="absolute -top-9 right-0 text-white/60 hover:text-white transition-colors text-xs font-body flex items-center gap-1.5"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Fechar
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* Chip de vídeo compacto — thumbnail 72px alta + info à direita */
function VideoChip({ v }: { v: typeof TESTIMONIAL_VIDEOS[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Assistir depoimento de ${v.name}`}
        className="group flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6A48F4] rounded-xl transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          padding: "8px",
        }}
      >
        {/* Thumbnail compacta */}
        <div
          className="relative flex-shrink-0 rounded-lg overflow-hidden"
          style={{ width: 56, height: 72 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={v.thumb}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay sutil */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.30)" }}
            aria-hidden="true"
          />
          {/* Ícone de play minúsculo */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ background: "rgba(106,72,244,0.90)", boxShadow: "0 0 0 3px rgba(106,72,244,0.25)" }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="white" aria-hidden="true">
                <path d="M2 1.2L7 4 2 6.8V1.2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="min-w-0">
          <p className="font-body font-semibold text-white text-xs leading-snug truncate">
            {v.name}
          </p>
          <p className="font-body text-gray-500 text-[10px] mt-0.5">{v.role}</p>
          <p
            className="font-body text-[10px] mt-1.5 inline-flex items-center gap-1 transition-colors duration-200 group-hover:text-[#A78BFA]"
            style={{ color: "#6A48F4" }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
              <path d="M2 1.2L7 4 2 6.8V1.2z" />
            </svg>
            Ver depoimento
          </p>
        </div>
      </button>

      {open && <VideoLightbox videoId={v.id} onClose={() => setOpen(false)} />}
    </>
  );
}

function BigNumber({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="font-headline font-bold italic leading-none select-none"
      style={{
        fontSize: "clamp(4.5rem, 12vw, 9rem)",
        background: "linear-gradient(135deg, #C4B5FD 0%, #6A48F4 50%, #143E66 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        letterSpacing: "-0.03em",
      }}
    >
      {value}
    </motion.div>
  );
}

function FeaturedCard() {
  return (
    <div
      className="relative rounded-3xl overflow-hidden flex flex-col justify-between min-h-[480px] lg:min-h-[560px] group"
      style={{
        background: "linear-gradient(145deg, #1A0F3A 0%, #0F1E33 50%, #0C0F1A 100%)",
        border: "1px solid rgba(106,72,244,0.35)",
      }}
    >
      {/* Glow de fundo ao hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(106,72,244,0.18) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Linha de topo degradê */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #6A48F4, #C4B5FD, #143E66)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-7 lg:p-9 flex flex-col h-full gap-6">
        {/* Header */}
        <div>
          <div className="mb-3">
            <span
              className="font-body font-semibold text-white text-[11px] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 tracking-wide"
              style={{ background: "linear-gradient(135deg, #6A48F4, #4C2FC4)" }}
            >
              <span aria-hidden="true">⚡</span> Case em destaque
            </span>
          </div>
          <p
            className="font-body font-semibold text-[11px] uppercase tracking-[0.2em] mb-2"
            style={{ color: "#A78BFA" }}
          >
            {FEATURED.segment}
          </p>
          <h3 className="font-headline font-bold text-white text-2xl lg:text-3xl leading-tight mb-1">
            {FEATURED.name}
          </h3>
          <p className="font-body text-gray-500 text-xs">{FEATURED.location}</p>
        </div>

        {/* Número gigante decorativo */}
        <div className="-mb-4">
          <BigNumber value="252×" />
          <p className="font-body text-gray-400 text-sm mt-1">retorno sobre anúncios</p>
        </div>

        {/* Divisor */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(90deg, rgba(106,72,244,0.4), transparent)" }}
          aria-hidden="true"
        />

        {/* Stats menores */}
        <div className="grid grid-cols-2 gap-3">
          {FEATURED.stats.slice(1).map((s, i) => (
            <div
              key={i}
              className="rounded-2xl px-4 py-3"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p
                className="font-headline font-bold text-xl leading-none mb-1"
                style={{
                  background: "linear-gradient(135deg, #C4B5FD, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {s.value}
              </p>
              <p className="font-body text-gray-500 text-[11px] leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Vídeos — chips compactos dos fundadores */}
        <div>
          <p className="font-body text-gray-600 text-[10px] uppercase tracking-[0.18em] mb-2.5">
            Ouça os fundadores
          </p>
          <div className="flex gap-2.5">
            {TESTIMONIAL_VIDEOS.map((v) => (
              <VideoChip key={v.id} v={v} />
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div
          className="rounded-2xl px-5 py-3 mt-auto"
          style={{
            background: "linear-gradient(135deg, rgba(106,72,244,0.20), rgba(20,62,102,0.20))",
            border: "1px solid rgba(106,72,244,0.25)",
          }}
        >
          <p className="font-headline font-bold italic text-white text-sm lg:text-base text-center">
            &ldquo;{FEATURED.tagline}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

function SideCard({ c, index }: { c: typeof OTHERS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden flex gap-4 items-stretch"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Barra lateral colorida */}
      <div
        className="w-1 flex-shrink-0 rounded-l-2xl transition-all duration-300 group-hover:w-1.5"
        style={{ background: c.accentColor }}
        aria-hidden="true"
      />

      <div className="flex-1 py-4 pr-4 flex flex-col gap-3">
        <div>
          <p
            className="font-body font-semibold text-[10px] uppercase tracking-[0.18em] mb-1"
            style={{ color: c.accentColor }}
          >
            {c.segment}
          </p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-headline font-bold text-white text-base leading-tight">
              {c.name}
            </h3>
            <span className="font-body text-gray-600 text-[11px]">{c.location}</span>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {c.stats.map((s, j) => (
            <div
              key={j}
              className="flex flex-col rounded-xl px-3 py-2 flex-1 min-w-[60px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span
                className="font-headline font-bold text-base leading-none mb-0.5"
                style={{ color: c.accentColor }}
              >
                {s.value}
              </span>
              <span className="font-body text-gray-500 text-[10px] leading-snug">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── seção principal ──────────────────────────────────────────────────────────

export default function CaseStudies() {
  return (
    <section
      className="relative py-14 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #080B14 0%, #0C0F1A 40%, #0F1E33 100%)" }}
    >
      {/* Linha de topo */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #6A48F4, #4C2FC4, #143E66, transparent)" }}
      />

      {/* Decoração: número gigante de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4%] top-[5%] font-headline font-bold italic select-none hidden lg:block"
        style={{
          fontSize: "clamp(10rem, 20vw, 22rem)",
          lineHeight: 1,
          background: "linear-gradient(135deg, rgba(106,72,244,0.06) 0%, rgba(20,62,102,0.04) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          letterSpacing: "-0.05em",
          userSelect: "none",
        }}
      >
        ROI
      </div>

      {/* Malha de pontos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(106,72,244,0.08) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Cabeçalho */}
        <FadeInSection className="mb-10 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="font-sub text-brand-primary text-base tracking-wide mb-3 inline-flex items-center gap-2">
                <span
                  className="inline-block w-6 h-px"
                  style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
                  aria-hidden="true"
                />
                Cases de Sucesso
              </p>
              <h2 className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-[3.2rem] leading-[1.05] tracking-tight">
                Resultados reais de{" "}
                <span className="gradient-text">clientes reais</span>
              </h2>
            </div>
            <p className="font-body text-gray-400 text-base leading-relaxed max-w-sm lg:text-right">
              Negócios de segmentos diferentes, com um ponto em comum:{" "}
              <span className="text-white font-semibold">previsibilidade nas vendas.</span>
            </p>
          </div>
        </FadeInSection>

        {/* Layout assimétrico: stack à esquerda, featured à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 lg:gap-6 mb-12">

          {/* Stack dos 3 cards menores — mobile primeiro, desktop à esquerda */}
          <FadeInSection className="flex flex-col gap-4 order-2 lg:order-1">
            {OTHERS.map((c, i) => (
              <SideCard key={i} c={c} index={i} />
            ))}
          </FadeInSection>

          {/* Card em destaque — desktop à direita */}
          <FadeInSection delay={0.1} className="order-1 lg:order-2">
            <FeaturedCard />
          </FadeInSection>
        </div>

        {/* CTA */}
        <FadeInSection delay={0.15}>
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="font-headline font-bold italic text-white text-xl lg:text-2xl text-center sm:text-left">
              O próximo case pode ser o seu.
            </p>
            <CTAButton size="lg" className="flex-shrink-0" />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
