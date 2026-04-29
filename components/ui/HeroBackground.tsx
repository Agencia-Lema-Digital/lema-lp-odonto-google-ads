"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const BOKEH = [
  { x: "72%", y: "18%", size: 180, delay: 0,    dur: 7,   opacity: 0.13 },
  { x: "85%", y: "35%", size: 130, delay: 1.2,  dur: 9,   opacity: 0.10 },
  { x: "78%", y: "55%", size: 100, delay: 0.5,  dur: 8,   opacity: 0.11 },
  { x: "90%", y: "70%", size: 150, delay: 2.0,  dur: 10,  opacity: 0.09 },
  { x: "68%", y: "75%", size: 80,  delay: 1.8,  dur: 7.5, opacity: 0.10 },
  { x: "93%", y: "25%", size: 110, delay: 0.8,  dur: 11,  opacity: 0.08 },
  { x: "62%", y: "42%", size: 70,  delay: 3.0,  dur: 8,   opacity: 0.09 },
  // Partículas extras — lado direito, onde a foto aparece mais
  { x: "96%", y: "50%", size: 90,  delay: 1.5,  dur: 9.5, opacity: 0.08 },
  { x: "75%", y: "88%", size: 120, delay: 2.5,  dur: 8,   opacity: 0.09 },
  { x: "88%", y: "82%", size: 60,  delay: 0.3,  dur: 7,   opacity: 0.08 },
];

const LAMP_GLOW = { x: "54%", y: "8%" };

export default function HeroBackground() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
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
      {/* ── Foto da clínica ── */}
      <Image
        src="/images/clinic-hero.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
        quality={75}
      />

      {/* Camada base escura */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8, 11, 22, 0.80)" }}
      />

      {/* Gradiente direcional: muito opaco na esquerda (texto), abre na direita */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(8,11,22,0.88) 0%, rgba(8,11,22,0.72) 40%, rgba(8,11,22,0.35) 70%, rgba(8,11,22,0.10) 100%)",
        }}
      />

      {/* Gradiente na base — dissolve a foto no fundo da seção */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background: "linear-gradient(to top, #0C0F1A 0%, transparent 100%)",
        }}
      />

      {/* Tint violeta */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 20% 50%, rgba(106,72,244,0.18) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 75% 40%, rgba(20,62,102,0.20) 0%, transparent 70%)",
        }}
      />

      {/* ── Animações (só se não preferir motion reduzido) ── */}
      {!reduced && (
        <>
          {/* Bokeh + lamp glow: apenas desktop (lg+) */}
          {!isMobile && (
            <>
              {BOKEH.map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: b.x,
                    top:  b.y,
                    width:  b.size,
                    height: b.size,
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(circle, rgba(180,160,255,${b.opacity * 2}) 0%, rgba(106,72,244,${b.opacity}) 40%, transparent 70%)`,
                    filter: "blur(18px)",
                  }}
                  animate={{
                    scale:   [1, 1.15, 0.92, 1.08, 1],
                    opacity: [b.opacity * 8, b.opacity * 12, b.opacity * 6, b.opacity * 10, b.opacity * 8],
                  }}
                  transition={{
                    duration:    b.dur,
                    delay:       b.delay,
                    repeat:      Infinity,
                    ease:        "easeInOut",
                    repeatType:  "mirror",
                  }}
                />
              ))}

              <motion.div
                className="absolute rounded-full"
                style={{
                  left:      LAMP_GLOW.x,
                  top:       LAMP_GLOW.y,
                  width:     220,
                  height:    220,
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(255,245,200,0.28) 0%, rgba(255,220,100,0.10) 50%, transparent 70%)",
                  filter: "blur(28px)",
                }}
                animate={{
                  scale:   [1, 1.12, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration:   4,
                  repeat:     Infinity,
                  ease:       "easeInOut",
                  repeatType: "mirror",
                }}
              />
            </>
          )}

          {/* Shimmer diagonal — presente em todos os tamanhos */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.025) 50%, transparent 70%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
            transition={{
              duration:    12,
              repeat:      Infinity,
              ease:        "linear",
              repeatDelay: 4,
            }}
          />

          {/* ── SVG: curva de sorriso + partículas (desktop) / apenas arco (mobile) ── */}
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
                <feGaussianBlur stdDeviation="3.5" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <mask id="hbg-svg-mask">
                <rect x="0" y="0" width="1040" height="600" fill="white" />
                <radialGradient id="hbg-svg-grad" cx="22%" cy="50%" r="40%">
                  <stop offset="0%"   stopColor="black" stopOpacity="1" />
                  <stop offset="60%"  stopColor="black" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="black" stopOpacity="0" />
                </radialGradient>
                <rect x="0" y="0" width="1040" height="600" fill="url(#hbg-svg-grad)" />
              </mask>
            </defs>

            <g mask="url(#hbg-svg-mask)">
              {/* Arco labial superior — presente em todos os tamanhos */}
              <motion.path
                d="M200 370 C340 220 520 170 660 190 C800 210 900 300 960 390"
                stroke="rgba(106,72,244,0.28)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="980"
                initial={{ strokeDashoffset: 980, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ duration: 3.5, delay: 0.4, ease: "easeOut" }}
              />
              {/* Linha gengival paralela */}
              <motion.path
                d="M260 345 C380 225 520 192 655 205 C790 218 880 290 940 360"
                stroke="rgba(76,47,196,0.18)"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="880"
                initial={{ strokeDashoffset: 880, opacity: 0 }}
                animate={{ strokeDashoffset: 0, opacity: 1 }}
                transition={{ duration: 3.0, delay: 0.8, ease: "easeOut" }}
              />
              {/* Plano oclusal pontilhado */}
              <motion.path
                d="M280 310 L920 295"
                stroke="rgba(106,72,244,0.14)"
                strokeWidth="0.6"
                strokeDasharray="5 10"
                strokeLinecap="round"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1.5, delay: 2.0, ease: "easeOut" }}
                style={{ transformOrigin: "600px 302px" }}
              />

              {/* Partículas + pontos DSD: apenas desktop */}
              {!isMobile && (
                <>
                  {[
                    { delay: 3.0, dur: 7.0, r: 3,   color: "#6A48F4" },
                    { delay: 5.5, dur: 7.0, r: 2,   color: "#8B6EF8" },
                    { delay: 4.2, dur: 8.5, r: 2.5, color: "#4C2FC4" },
                  ].map((p, i) => (
                    <motion.circle
                      key={i}
                      r={p.r}
                      fill={p.color}
                      filter="url(#hbg-glow)"
                      animate={{
                        offsetDistance: ["0%", "100%"],
                        opacity: [0, 0.7, 0.7, 0],
                      }}
                      transition={{
                        duration:   p.dur,
                        delay:      p.delay,
                        repeat:     Infinity,
                        ease:       "linear",
                      }}
                      style={{
                        offsetPath: `path("M200 370 C340 220 520 170 660 190 C800 210 900 300 960 390")`,
                      } as React.CSSProperties}
                    />
                  ))}

                  {[
                    { cx: 420, cy: 200, delay: 3.2 },
                    { cx: 660, cy: 188, delay: 3.5 },
                    { cx: 840, cy: 255, delay: 3.8 },
                  ].map((pt, i) => (
                    <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: pt.delay }}>
                      <circle cx={pt.cx} cy={pt.cy} r={3} fill="rgba(106,72,244,0.55)" filter="url(#hbg-glow)" />
                      <line x1={pt.cx - 9} y1={pt.cy} x2={pt.cx + 9} y2={pt.cy} stroke="rgba(106,72,244,0.28)" strokeWidth="0.7" />
                      <line x1={pt.cx} y1={pt.cy - 9} x2={pt.cx} y2={pt.cy + 9} stroke="rgba(106,72,244,0.28)" strokeWidth="0.7" />
                    </motion.g>
                  ))}
                </>
              )}
            </g>
          </svg>
        </>
      )}
    </div>
  );
}
