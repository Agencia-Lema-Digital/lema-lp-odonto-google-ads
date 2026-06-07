"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import CTAButton from "@/components/ui/CTAButton";
import HeroBackground from "@/components/ui/HeroBackground";
import type { PageHeroContent } from "@/lib/pages-config";

const STAT_ODONTO = {
  number: "−81%",
  label: "no custo por conversão com o funil integrado",
};

const STAT_GENERAL = {
  number: "20x",
  label: "de retorno em vendas sobre o que foi investido em anúncios",
};

const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `hero-fade-up 0.55s ease-out ${delay}s both`,
});

// Vídeo lazy-loaded com thumbnail, botão play central e badge — variante general
function AgitationWithVideo({ firstH2, agitationBody }: { firstH2: string; agitationBody: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">

      {/* Vídeo — coluna esquerda, overflow visible para badge transbordar */}
      <div
        ref={wrapRef}
        className="relative flex-shrink-0 w-full lg:w-[160px] xl:w-[180px]"
        style={{ aspectRatio: "9/16", maxHeight: "calc(100dvh - 120px)" }}
      >
        {/* Wrapper com overflow hidden só para o conteúdo do iframe/thumb */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {!inView ? (
            /* Skeleton antes de entrar na viewport */
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(106,72,244,0.15)" }}
            >
              <div className="w-6 h-6 rounded-full border-2 border-[#6A48F4] border-t-transparent animate-spin" />
            </div>
          ) : playing ? (
            /* Iframe com autoplay após clique no play */
            <iframe
              src="https://www.youtube.com/embed/yCIKlFCP5p0?autoplay=1&rel=0&modestbranding=1"
              title={firstH2}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full"
              style={{ border: "none", display: "block" }}
            />
          ) : (
            /* Thumbnail estática */
            <>
              <Image
                src="/images/thumb-lead-cliente.png"
                alt="Thumbnail do vídeo"
                fill
                sizes="(min-width: 1280px) 180px, (min-width: 1024px) 160px, 100vw"
                className="object-cover"
                quality={80}
              />
              {/* Overlay para escurecer levemente sem cobrir rostos */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0.30) 100%)" }}
                aria-hidden="true"
              />
              {/* Botão de play central */}
              <button
                onClick={() => setPlaying(true)}
                aria-label="Reproduzir vídeo"
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div
                  className="relative flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(106,72,244,0.55)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                    boxShadow: "0 0 0 8px rgba(106,72,244,0.18), 0 4px 24px rgba(106,72,244,0.40)",
                  }}
                >
                  <svg width="22" height="24" viewBox="0 0 22 24" fill="white" aria-hidden="true">
                    <path d="M2 2L20 12 2 22V2z" />
                  </svg>
                </div>
              </button>
            </>
          )}
        </div>

        {/* Badge "Dê o play" — fora do overflow hidden, transborda à direita */}
        {inView && !playing && (
          <div
            className="absolute select-none"
            style={{ bottom: "14px", right: "-12px", zIndex: 10 }}
            aria-hidden="true"
          >
            <div
              className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 100%)",
                boxShadow: "0 4px 20px rgba(106,72,244,0.65), inset 0 1px 0 rgba(255,255,255,0.18)",
              }}
            >
              {/* Ícone play */}
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.20)" }}
              >
                <svg width="8" height="9" viewBox="0 0 8 9" fill="white" aria-hidden="true">
                  <path d="M1.5 1L7 4.5 1.5 8V1z" />
                </svg>
              </div>
              <span
                className="font-body font-semibold text-white leading-none"
                style={{ fontSize: "11px", letterSpacing: "0.05em" }}
              >
                Dê o play
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Textos — coluna direita */}
      <div className="flex-1 min-w-0">
        <div
          className="pl-6 py-1"
          style={{ borderLeft: "4px solid", borderImage: "linear-gradient(180deg, #6A48F4, #143E66) 1" }}
        >
          <h2 className="font-headline font-bold text-white text-2xl sm:text-3xl lg:text-[2.2rem] leading-tight tracking-tight">
            {firstH2}
          </h2>
        </div>
        <p className="font-body text-gray-400 text-base lg:text-lg leading-relaxed mt-6">
          {agitationBody}
        </p>
      </div>
    </div>
  );
}

// Destaca a palavra-chave dentro do h1 com gradient — busca a substring exata
function H1WithAccent({ text, accentWord }: { text: string; accentWord?: string }) {
  if (!accentWord || !text.includes(accentWord)) {
    return <>{text}</>;
  }
  const [before, after] = text.split(accentWord);
  return (
    <>
      {before}
      <span
        style={{
          background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        {accentWord}
      </span>
      {after}
    </>
  );
}

interface HeroProps {
  content: PageHeroContent;
}

export default function Hero({ content }: HeroProps) {
  const isGeneral = content.heroImage === "/images/hero-general.webp";
  const STAT = isGeneral ? STAT_GENERAL : STAT_ODONTO;
  return (
    <>
    <header className="relative overflow-hidden min-h-[100dvh] flex flex-col" style={{ background: "#0C0F1A" }}>
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-delay: 0ms !important; }
        }
      `}</style>

      {/* Barra superior — degradê primário */}
      <div
        className="relative z-10 text-white text-center py-2.5 px-4 text-xs font-body font-medium tracking-widest uppercase"
        style={{ background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)" }}
      >
        {content.topBanner ?? "Exclusivo para clínicas odontológicas"}
      </div>

      {/* Foto da clínica + overlays + animações bokeh */}
      <HeroBackground imageSrc={content.heroImage} />

      {/* Linha diagonal decorativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 2 }}
      >
        <div
          className="absolute top-0 right-[38%] w-px h-full opacity-[0.06]"
          style={{ background: "linear-gradient(180deg, transparent 0%, #6A48F4 40%, transparent 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-14 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          {/* Coluna principal */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-5 max-w-2xl">
            {isGeneral ? (
              <div style={fadeUp(0)}>
                <Image
                  src="/logos/logo-lema.png"
                  alt="Lema Agência Digital"
                  width={160}
                  height={72}
                  className="h-10 sm:h-12 w-auto object-contain"
                  style={{ mixBlendMode: "screen" }}
                  priority
                />
              </div>
            ) : (
              <p
                style={fadeUp(0)}
                className="font-sub text-brand-primary text-sm sm:text-base tracking-wide inline-flex items-center gap-2 leading-snug"
              >
                <span
                  className="inline-block w-6 h-px flex-shrink-0"
                  style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
                  aria-hidden="true"
                />
                {content.kicker}
              </p>
            )}

            <h1
              style={fadeUp(0.1)}
              className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-[3.6rem] leading-[1.12] sm:leading-[1.1] lg:leading-[1.05] tracking-tight"
            >
              <H1WithAccent text={content.h1} accentWord={content.h1AccentWord} />
            </h1>

            <p
              style={fadeUp(0.2)}
              className="font-body text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed"
            >
              {content.subheadline}
            </p>

            <div style={fadeUp(0.3)}>
              <CTAButton size="lg" />
              <p className="mt-3 text-gray-400 text-xs font-body">
                Poucas vagas por semana — 30 min com o sócio
              </p>
            </div>
          </div>

          {/* Card de stat — desktop */}
          <div
            className="hidden lg:flex flex-col items-center justify-center rounded-3xl p-10 min-w-[220px] gap-4"
            style={{
              background: isGeneral
                ? "rgba(6,5,14,0.72)"
                : "rgba(255,255,255,0.04)",
              border: isGeneral
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(106,72,244,0.2)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: isGeneral
                ? "0 8px 40px rgba(0,0,0,0.45)"
                : "none",
              ...fadeUp(0.35),
            } as React.CSSProperties}
          >
            <span
              className="font-headline leading-none italic"
              style={{
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                fontWeight: 200,
                background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {STAT.number}
            </span>
            <p className={`font-body text-sm text-center leading-snug max-w-[160px] ${isGeneral ? "text-gray-300" : "text-gray-400"}`}>
              {STAT.label}
            </p>
            <div
              className="w-12 h-px mt-1"
              style={{ background: isGeneral ? "linear-gradient(90deg, #C4B5FD, #6A48F4)" : "linear-gradient(90deg, #6A48F4, #143E66)" }}
              aria-hidden="true"
            />
            <p className="font-sub text-brand-primary text-sm tracking-wide text-center">
              {isGeneral ? "cliente real" : "resultado real"}
            </p>
          </div>
        </div>
      </div>
    </header>

      {/* firstH2 — ponte SSR entre Hero e corpo; renderizado no servidor nas três rotas */}
      <section
        className="relative py-14 lg:py-20 overflow-hidden"
        style={{ background: "#0C0F1A" }}
        aria-label="Contexto da página"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isGeneral ? (
            <AgitationWithVideo firstH2={content.firstH2} agitationBody={content.agitationBody} />
          ) : (
            <>
              <div
                className="pl-6 py-1"
                style={{ borderLeft: "4px solid", borderImage: "linear-gradient(180deg, #6A48F4, #143E66) 1" }}
              >
                <h2 className="font-headline font-bold text-white text-2xl sm:text-3xl lg:text-[2.2rem] leading-tight tracking-tight max-w-3xl">
                  {content.firstH2}
                </h2>
              </div>
              <p className="font-body text-gray-400 text-base lg:text-lg leading-relaxed mt-6 max-w-2xl">
                {content.agitationBody}
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
