"use client";

import { createContext, useContext } from "react";

// Ângulo de copy da página general. O LAYOUT é o mesmo (variant="general");
// muda só a comunicação:
//  - "assessoria"  → /assessoria-marketing-vendas (serviço/Método TRINO, CTA "Falar com um especialista")
//  - "diagnostico" → raiz "/" (backup para Meta Ads, gancho do diagnóstico gratuito)
//  - "trafego"     → /gestao-de-trafego-pago (Grupo 2 do Google Ads: confirma o termo
//                    buscado primeiro — gestão de tráfego — e eleva para tráfego que vira cliente)
export type CopyVariant = "assessoria" | "diagnostico" | "trafego";

export const CopyVariantContext = createContext<CopyVariant>("assessoria");

export function useCopyVariant(): CopyVariant {
  return useContext(CopyVariantContext);
}

// Label do CTA conforme o ângulo (usado em vários botões da página)
export function ctaLabelFor(copyVariant: CopyVariant): string {
  return copyVariant === "diagnostico" ? "Quero meu diagnóstico gratuito" : "Falar com um especialista";
}
