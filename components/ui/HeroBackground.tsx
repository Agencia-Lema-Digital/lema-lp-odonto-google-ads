"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Núcleo de luz da imagem antiga (clinic/hero-general): ~67% x, 33% y (viewBox 1040×600)
const CORE = { cx: 697, cy: 198 };

// Raios que partem do núcleo seguindo as diagonais da imagem (imagem antiga)
const RAYS = [
  { x1: CORE.cx, y1: CORE.cy, x2: 120,  y2: 20,  dur: 2.2, delay: 0.3 },
  { x1: CORE.cx, y1: CORE.cy, x2: 60,   y2: 580, dur: 2.8, delay: 0.6 },
  { x1: CORE.cx, y1: CORE.cy, x2: 1020, y2: 560, dur: 2.5, delay: 0.9 },
  { x1: CORE.cx, y1: CORE.cy, x2: 1020, y2: 80,  dur: 2.0, delay: 0.2 },
];

// Partículas viajando pelos raios (do núcleo para fora) — imagem antiga
const PARTICLES = [
  { ray: 0, dur: 5.0, delay: 1.2, r: 2.5, color: "#C4B5FD" },
  { ray: 1, dur: 6.5, delay: 2.4, r: 2,   color: "#A78BFA" },
  { ray: 2, dur: 5.8, delay: 3.1, r: 3,   color: "#8B6EF8" },
  { ray: 1, dur: 7.0, delay: 0.8, r: 1.5, color: "#C4B5FD" },
  { ray: 3, dur: 5.5, delay: 1.9, r: 2,   color: "#6A48F4" },
  { ray: 0, dur: 6.0, delay: 4.0, r: 1.5, color: "#A78BFA" },
];

interface HeroBackgroundProps {
  imageSrc?: string;
}

export default function HeroBackground({ imageSrc = "/images/clinic-hero.webp" }: HeroBackgroundProps) {
  const [isMobile, setIsMobile] = useState(true);
  const [reduced, setReduced] = useState(false);

  // A nova hero é uma textura abstrata de ondas (sem ponto de luz pontual),
  // então usa uma animação sutil (shimmer + glow no fluxo) em vez de raios.
  const isNovaHero = imageSrc.includes("nova-hero");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsMobile(mq.matches);
    setReduced(rmq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {!reduced && (
        // dangerouslySetInnerHTML evita mismatch de hydration em <style> (ver Hero)
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes core-pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.55; }
            50%       { transform: translate(-50%, -50%) scale(1.22); opacity: 0.85; }
          }
          @keyframes core-pulse-outer {
            0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.25; }
            50%       { transform: translate(-50%, -50%) scale(1.35); opacity: 0.45; }
          }
          @keyframes ray-appear {
            from { stroke-dashoffset: var(--ray-len); opacity: 0; }
            to   { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes particle-travel {
            0%        { offset-distance: 0%;   opacity: 0; }
            8%, 80%   { opacity: 0.9; }
            100%      { offset-distance: 100%; opacity: 0; }
          }
          @keyframes shimmer-slide {
            0%   { background-position: 200% 0%; }
            100% { background-position: -200% 0%; }
          }
          @keyframes ring-expand {
            0%   { transform: translate(-50%, -50%) scale(0.6); opacity: 0.5; }
            100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
          }
          /* Glow suave pulsante para a nova hero (região de luz no canto sup-esquerdo) */
          @keyframes soft-glow {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            50%       { opacity: 0.6;  transform: scale(1.08); }
          }
        `,
          }}
        />
      )}

      {/* ── Foto (fallback/poster; fica sob o vídeo) ── */}
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
        quality={75}
        decoding="async"
      />

      {/* Vídeo de fundo (Vimeo) removido — desempenho. Fundo volta ao gradiente
          estático (imagem acima); a cena do sócio anima por cima na hero. */}

      {/* Mobile: cobertura vertical sólida sobre toda a tela */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background: "rgba(8,11,22,0.78)",
        }}
      />
      {/* Desktop: degradê horizontal — escurece esquerda (copy), libera direita (imagem) */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background: "linear-gradient(90deg, rgba(8,11,22,0.96) 0%, rgba(8,11,22,0.90) 28%, rgba(8,11,22,0.60) 48%, rgba(8,11,22,0.15) 66%, rgba(8,11,22,0.0) 80%)",
        }}
      />
      {/* Camada vertical — suaviza topo e base (ambos os breakpoints) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(8,11,22,0.40) 0%, transparent 25%, transparent 70%, rgba(8,11,22,0.80) 100%)",
        }}
      />

      {/* Fade para a seção seguinte */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: "linear-gradient(to top, #0C0F1A 0%, transparent 100%)" }}
      />

      {/* ── Animação: nova hero (textura) → sutil; imagem antiga → raios/partículas ── */}
      {!reduced && isNovaHero && !isMobile && (
        <>
          {/* Glow suave pulsante na região de luz roxa (canto superior-esquerdo) */}
          <div
            className="absolute rounded-full"
            style={{
              left: "22%",
              top: "26%",
              width: 420,
              height: 420,
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(190,140,255,0.22) 0%, rgba(140,90,240,0.10) 45%, transparent 70%)",
              filter: "blur(40px)",
              animation: "soft-glow 7s ease-in-out infinite",
            }}
          />
          {/* Shimmer diagonal acompanhando o fluxo roxo→azul da textura */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(115deg, transparent 30%, rgba(200,170,255,0.05) 50%, transparent 70%)",
              backgroundSize: "220% 100%",
              animation: "shimmer-slide 12s linear infinite",
            }}
          />
        </>
      )}

      {!reduced && !isNovaHero && (
        <>
          {/* Pulso no núcleo de luz — apenas desktop */}
          {!isMobile && (
          <div
            className="absolute rounded-full"
            style={{
              left: "67%",
              top: "33%",
              width: 120,
              height: 120,
              background: "radial-gradient(circle, rgba(220,180,255,0.55) 0%, rgba(160,100,255,0.30) 45%, transparent 70%)",
              filter: "blur(14px)",
              animation: "core-pulse 3.8s ease-in-out infinite",
            }}
          />
          )}

          {/* Pulso no núcleo — anel externo mais suave — apenas desktop */}
          {!isMobile && (
          <div
            className="absolute rounded-full"
            style={{
              left: "67%",
              top: "33%",
              width: 280,
              height: 280,
              background: "radial-gradient(circle, rgba(160,100,255,0.18) 0%, rgba(106,72,244,0.08) 50%, transparent 70%)",
              filter: "blur(24px)",
              animation: "core-pulse-outer 3.8s 0.4s ease-in-out infinite",
            }}
          />
          )}

          {/* Anel de expansão 1 — pulso lento */}
          {!isMobile && (
            <div
              className="absolute rounded-full"
              style={{
                left: "67%",
                top: "33%",
                width: 180,
                height: 180,
                border: "1px solid rgba(180,130,255,0.35)",
                filter: "blur(1px)",
                animation: "ring-expand 4s 0.5s ease-out infinite",
              }}
            />
          )}

          {/* Anel de expansão 2 — defasado */}
          {!isMobile && (
            <div
              className="absolute rounded-full"
              style={{
                left: "67%",
                top: "33%",
                width: 180,
                height: 180,
                border: "1px solid rgba(106,72,244,0.25)",
                filter: "blur(1px)",
                animation: "ring-expand 4s 2.5s ease-out infinite",
              }}
            />
          )}

          {/* Shimmer diagonal — apenas desktop */}
          {!isMobile && (
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, transparent 25%, rgba(200,160,255,0.04) 50%, transparent 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer-slide 10s 1s linear infinite",
            }}
          />
          )}

          {/* SVG: raios + partículas — apenas desktop */}
          {!isMobile && (
            <svg
              viewBox="0 0 1040 600"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ zIndex: 3 }}
            >
              <defs>
                <filter id="hbg-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="hbg-glow-soft" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Raios emanando do núcleo — draw-on ao carregar */}
              {RAYS.map((ray, i) => {
                const len = Math.hypot(ray.x2 - ray.x1, ray.y2 - ray.y1);
                return (
                  <line
                    key={i}
                    x1={ray.x1} y1={ray.y1}
                    x2={ray.x2} y2={ray.y2}
                    stroke={`rgba(180,130,255,${i < 2 ? 0.22 : 0.14})`}
                    strokeWidth={i < 2 ? 1.2 : 0.7}
                    strokeLinecap="round"
                    strokeDasharray={len}
                    style={{
                      ["--ray-len" as string]: len,
                      animation: `ray-appear ${ray.dur}s ${ray.delay}s ease-out forwards`,
                      opacity: 0,
                    } as React.CSSProperties}
                  />
                );
              })}

              {/* Partículas viajando do núcleo para fora pelos raios */}
              {PARTICLES.map((p, i) => {
                const ray = RAYS[p.ray];
                return (
                  <circle
                    key={i}
                    r={p.r}
                    fill={p.color}
                    filter="url(#hbg-glow)"
                    style={{
                      offsetPath: `path("M${ray.x1} ${ray.y1} L${ray.x2} ${ray.y2}")`,
                      animation: `particle-travel ${p.dur}s ${p.delay}s linear infinite`,
                    } as React.CSSProperties}
                  />
                );
              })}

              {/* Ponto de luz no núcleo */}
              <circle
                cx={CORE.cx} cy={CORE.cy} r={5}
                fill="rgba(240,210,255,0.9)"
                filter="url(#hbg-glow-soft)"
              />
            </svg>
          )}
        </>
      )}
    </div>
  );
}
