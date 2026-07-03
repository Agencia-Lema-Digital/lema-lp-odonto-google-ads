"use client";

import Image from "next/image";
import CTAButton from "@/components/ui/CTAButton";
import HeroBackground from "@/components/ui/HeroBackground";
import type { PageHeroContent } from "@/lib/pages-config";

// Stat do card lateral — usado apenas nas rotas odonto (a general não tem card)
const STAT_ODONTO = {
  number: "−81%",
  label: "no custo por conversão com o funil integrado",
};

const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `hero-fade-up 0.55s ease-out ${delay}s both`,
});

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

// Destaca um trecho do banner superior com o gradient da marca (ex.: "+R$35k/mês")
function BannerWithAccent({ text, accent }: { text: string; accent: string }) {
  if (!text.includes(accent)) return <>{text}</>;
  const [before, after] = text.split(accent);
  return (
    <>
      {before}
      <span
        className="font-semibold"
        style={{
          background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        {accent}
      </span>
      {after}
    </>
  );
}

// Prova social da hero (general): círculos sobrepostos (estilo referência) +
// copy curta. Como o público é B2B, cada círculo recebe a logo-símbolo do
// cliente quando os arquivos chegarem; por ora usa monograma (iniciais) em
// círculo com gradiente da marca. `ring` na cor do container separa os círculos.
// src = símbolo do cliente (PNG transparente); bg = cor do círculo por trás da
// logo (branco para símbolos escuros; cor da marca para símbolos claros).
// Sem src, cai no monograma com gradiente da marca.
const CLIENT_LOGOS: { name: string; monogram: string; gradient: string; src?: string; bg?: string }[] = [
  { name: "Roboclean Brasil", monogram: "RB", gradient: "linear-gradient(135deg, #A78BFA, #6A48F4)", src: "/images/logos/roboclean.webp", bg: "#fff" },
  { name: "LK Móveis", monogram: "LK", gradient: "linear-gradient(135deg, #7C5CFB, #4C2FC4)", src: "/images/logos/lk.webp", bg: "#000" },
  { name: "CENUV", monogram: "CV", gradient: "linear-gradient(135deg, #6A48F4, #143E66)", src: "/images/logos/cenuv.webp", bg: "#fff" },
  { name: "ES Engenharia", monogram: "ES", gradient: "linear-gradient(135deg, #8B6EF8, #4C2FC4)", src: "/images/logos/es.webp", bg: "#1E47B0" },
];

function HeroSocialProof() {
  return (
    <div
      className="inline-flex items-center gap-3 rounded-full py-1.5 pl-2 pr-4"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      {/* Círculos sobrepostos */}
      <div className="flex items-center">
        {CLIENT_LOGOS.map((l, i) => (
          <span
            key={l.name}
            title={l.name}
            className="relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden font-body font-semibold text-[10px] text-white select-none"
            style={{
              background: l.src ? l.bg || "#fff" : l.gradient,
              marginLeft: i === 0 ? 0 : "-0.5rem",
              boxShadow: "0 0 0 2px #12141d",
              zIndex: CLIENT_LOGOS.length - i,
            }}
          >
            {l.src ? (
              <Image
                src={l.src}
                alt={`Logo ${l.name}`}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              l.monogram
            )}
          </span>
        ))}
      </div>
      {/* Copy */}
      <p className="font-body text-gray-300 text-xs sm:text-sm leading-tight">
        <span className="text-white font-semibold">+R$5 milhões</span> gerenciados
        <br className="hidden sm:block" /> para empresas que crescem
      </p>
    </div>
  );
}

interface HeroProps {
  content: PageHeroContent;
}

export default function Hero({ content }: HeroProps) {
  const isGeneral = content.isGeneral === true;
  const STAT = STAT_ODONTO;
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

      {/* Barra superior — general: fundo branco com texto preto; odonto: degradê primário */}
      {isGeneral ? (
        <div
          className="relative z-10 text-black text-center py-2.5 px-4 text-xs font-body font-normal tracking-widest uppercase"
          style={{ background: "#e5e5e5" }}
        >
          <BannerWithAccent
            text={content.topBanner ?? "Exclusivo para clínicas odontológicas"}
            accent="+R$35k/mês"
          />
        </div>
      ) : (
        <div
          className="relative z-10 text-white text-center py-2.5 px-4 text-xs font-body font-medium tracking-widest uppercase"
          style={{ background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)" }}
        >
          {content.topBanner ?? "Exclusivo para clínicas odontológicas"}
        </div>
      )}

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

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-14 flex-1 flex flex-col justify-center">
        <div className={isGeneral ? "" : "grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center"}>
          {/* Coluna principal */}
          <div className={`flex flex-col max-w-2xl ${isGeneral ? "gap-6 sm:gap-5 lg:gap-5" : "gap-4 sm:gap-5 lg:gap-5"}`}>
            {isGeneral ? (
              <div style={fadeUp(0)}>
                <Image
                  src="/logos/logo-lema.png"
                  alt="Lema Agência Digital"
                  width={160}
                  height={72}
                  className="h-7 sm:h-9 w-auto object-contain"
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

            {/* h1 + sub + CTA — display:contents faz herdarem o gap da coluna,
                ficando logo + headline coesos e centralizados na hero */}
            <div className="contents">
              <h1
                style={fadeUp(0.1)}
                className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-[3.6rem] leading-[1.12] sm:leading-[1.1] lg:leading-[1.05] tracking-tight text-balance"
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
                  {isGeneral
                    ? "30 min com o sócio."
                    : "Poucas vagas por semana — 30 min com o sócio"}
                </p>
              </div>

              {/* Prova social — faixa de logos de clientes (general) */}
              {isGeneral && (
                <div style={fadeUp(0.42)}>
                  <HeroSocialProof />
                </div>
              )}
            </div>
          </div>

          {/* Card de stat — desktop (apenas rotas odonto; removido na general) */}
          {!isGeneral && (
            <div
              className="hidden lg:flex flex-col items-center justify-center rounded-3xl p-10 min-w-[220px] gap-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(106,72,244,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                ...fadeUp(0.35),
              } as React.CSSProperties}
            >
              <span
                className="font-headline leading-tight italic text-center"
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
              <p className="font-body text-sm text-center leading-snug text-gray-400 max-w-[160px]">
                {STAT.label}
              </p>
              <div
                className="w-12 h-px mt-1"
                style={{ background: "linear-gradient(90deg, #6A48F4, #143E66)" }}
                aria-hidden="true"
              />
              <p className="font-sub text-brand-primary text-sm tracking-wide text-center">
                resultado real
              </p>
            </div>
          )}

          {/* Foto do fundador removida por ora — será refinada depois.
              Mantém apenas o BG de ondas (HeroBackground). */}
        </div>
      </div>
    </header>

      {/* firstH2 — ponte SSR entre Hero e corpo. Na variante general foi removida
          (sem vídeo nem agitação); permanece nas rotas odonto com o H2 estático. */}
      {!isGeneral && (
        <section
          className="relative py-14 lg:py-20 overflow-hidden"
          style={{ background: "#0C0F1A" }}
          aria-label="Contexto da página"
        >
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          </div>
        </section>
      )}
    </>
  );
}
