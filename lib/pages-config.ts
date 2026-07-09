export interface PageHeroContent {
  kicker: string;
  h1: string;
  h1AccentWord?: string; // palavra dentro do h1 que recebe gradient
  subheadline: string;
  firstH2: string;
  agitationBody: string;
  topBanner?: string; // texto da barra superior; omitir usa o padrão odonto
  heroImage?: string; // caminho em /public; omitir usa clinic-hero.webp
  isGeneral?: boolean; // variante generalista (assessoria) — muda layout/stat do Hero
  ctaLabel?: string; // label do botão principal da hero; omitir usa o padrão do CTAButton
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

export interface PageConfig {
  hero: PageHeroContent;
  meta: PageMeta;
}

const BASE_URL = "https://diagnostico.lemaagdigital.com.br";

export const PAGES_CONFIG: Record<string, PageConfig> = {
  // Raiz "/" — cópia da general em modo "diagnóstico" (backup para Meta Ads).
  // Mesmo layout/hero da /assessoria; muda o ângulo de copy (via copyVariant) e o CTA.
  "/": {
    hero: {
      topBanner: "Para empresas que faturam +R$35k/mês",
      heroImage: "/images/nova-hero.webp",
      isGeneral: true,
      ctaLabel: "Quero meu diagnóstico gratuito",
      kicker: "Para empresas que faturam +R$35k/mês",
      h1: "O marketing que atrai clientes e gera vendas previsíveis pro seu negócio.",
      h1AccentWord: "vendas previsíveis",
      subheadline:
        "Conectamos anúncios, conteúdo e vendas num sistema só. Sem depender de indicação ou sorte.",
      firstH2: "O que separa quem investe em anúncio de quem cresce de verdade",
      agitationBody:
        "A diferença não está em gastar mais com anúncio — está em ter um sistema. Tráfego que traz o cliente certo, um processo comercial que transforma conversa em venda, e dados que mostram exatamente onde crescer. É assim que o faturamento sobe com previsibilidade, mês após mês: sem depender de indicação, sem depender de sorte.",
    },
    meta: {
      title: "Assessoria de Marketing e Vendas | Lema Digital",
      description:
        "Assessoria de Marketing & Vendas para empresas que faturam +R$35k/mês. Conectamos suas campanhas ao processo comercial para gerar vendas reais e previsíveis.",
      canonical: `${BASE_URL}/`,
    },
  },

  // Intenção "Geral" — empresas +R$35k/mês (página principal, ângulo assessoria/TRINO)
  "/assessoria-marketing-vendas": {
    hero: {
      topBanner: "Para empresas que faturam +R$35k/mês",
      heroImage: "/images/nova-hero.webp",
      isGeneral: true,
      ctaLabel: "Falar com um especialista",
      kicker: "Para empresas que faturam +R$35k/mês",
      h1: "O marketing que atrai clientes e gera vendas previsíveis pro seu negócio.",
      h1AccentWord: "vendas previsíveis",
      subheadline:
        "Conectamos anúncios, conteúdo e vendas num sistema só. Sem depender de indicação ou sorte.",
      firstH2: "O que separa quem investe em anúncio de quem cresce de verdade",
      agitationBody:
        "A diferença não está em gastar mais com anúncio — está em ter um sistema. Tráfego que traz o cliente certo, um processo comercial que transforma conversa em venda, e dados que mostram exatamente onde crescer. É assim que o faturamento sobe com previsibilidade, mês após mês: sem depender de indicação, sem depender de sorte.",
    },
    meta: {
      title: "Assessoria de Marketing e Vendas | Lema Digital",
      description:
        "Assessoria de Marketing & Vendas para empresas que faturam +R$35k/mês. Conectamos suas campanhas ao processo comercial para gerar vendas reais e previsíveis.",
      canonical: `${BASE_URL}/assessoria-marketing-vendas`,
    },
  },
};
