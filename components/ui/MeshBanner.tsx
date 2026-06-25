"use client";

import { ReactNode } from "react";

// Faixa de largura total com fundo "mesh" animado — blobs de cor (roxo/azul/violeta)
// que flutuam lentamente em loop. CSS puro (transform/opacity), leve para o PageSpeed.
// Respeita prefers-reduced-motion via a regra global do globals.css.
// bgImage opcional: imagem de fundo sob os blobs (escurecida) para dar textura/atmosfera.
export default function MeshBanner({
  children,
  bgImage,
}: {
  children: ReactNode;
  bgImage?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #1A1140 55%, #0F1E33 100%)" }}
    >
      {/* Imagem de fundo (sob os blobs) — bem visível; overlay leve só o
          suficiente para manter o texto branco legível */}
      {bgImage && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {/* Base leve uniforme — assenta a imagem no tom escuro da marca */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(12,15,26,0.30) 0%, rgba(26,17,64,0.18) 55%, rgba(15,30,51,0.34) 100%)" }}
          />
          {/* Sombreado reforçado à esquerda — onde fica o texto, melhora o contraste */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(8,11,20,0.78) 0%, rgba(8,11,20,0.50) 35%, transparent 68%)" }}
          />
        </>
      )}

      {/* Blobs animados */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span
          className="mesh-blob"
          style={{
            top: "-30%",
            left: "-10%",
            width: "55%",
            paddingBottom: "55%",
            background: "radial-gradient(circle, rgba(106,72,244,0.6) 0%, transparent 65%)",
            animation: "mesh-float-a 12s ease-in-out infinite",
          }}
        />
        <span
          className="mesh-blob"
          style={{
            top: "10%",
            right: "-15%",
            width: "60%",
            paddingBottom: "60%",
            background: "radial-gradient(circle, rgba(20,62,102,0.65) 0%, transparent 65%)",
            animation: "mesh-float-b 14s ease-in-out infinite",
          }}
        />
        <span
          className="mesh-blob"
          style={{
            bottom: "-40%",
            left: "30%",
            width: "50%",
            paddingBottom: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 65%)",
            animation: "mesh-float-c 11s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
