"use client";

import { createContext, useContext } from "react";

export type BodyVariant = "odonto" | "general";

export const BodyVariantContext = createContext<BodyVariant>("odonto");

export function useBodyVariant(): BodyVariant {
  return useContext(BodyVariantContext);
}
