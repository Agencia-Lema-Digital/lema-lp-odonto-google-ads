export interface PageHeroContent {
  kicker: string;
  h1: string;
  h1AccentWord?: string; // palavra dentro do h1 que recebe gradient
  h1AccentGradient?: string; // gradient do accent; omitir usa o padrão da marca (termina em azul-marinho)
  subheadline: string;
  firstH2: string;
  agitationBody: string;
  topBanner?: string; // texto da barra superior; omitir usa o padrão odonto
  heroImage?: string; // caminho em /public; omitir usa clinic-hero.webp
  isGeneral?: boolean; // variante generalista (assessoria) — muda layout/stat do Hero
  ctaLabel?: string; // label do botão principal da hero; omitir usa o padrão do CTAButton
  proofMiddle?: string; // trecho entre "+R$5 milhões" e "para empresas..." na prova social da hero
  heroProof?: { lead: string; rest: string }; // sobrescreve a copy do card de prova social (lead em branco + resto)
  hideHeroMicrocopy?: boolean; // oculta a microcopy "30 min com o sócio." abaixo do CTA
  hideNotifsMobile?: boolean; // esconde o carrossel de notificações do WhatsApp no mobile (mantém o painel CRM)
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
      // Headline pergunta-dor curta (tensão nos 1ºs segundos); accent na keyword "cliente"
      // com gradient claro (fim em roxo vivo) — evita o tom escuro no fim da palavra.
      h1: "Seu marketing traz cliente ou só curiosos?",
      h1AccentWord: "cliente",
      h1AccentGradient: "linear-gradient(135deg, #8B6EF8 0%, #6A48F4 45%, #4C2FC4 100%)",
      subheadline:
        "A Lema conecta anúncios, conteúdo e processo comercial pra cada real investido virar faturamento previsível. Sem depender de indicação ou sorte.",
      heroProof: { lead: "Mais de 10 anos", rest: "estruturando marketing e vendas" },
      hideHeroMicrocopy: true,
      hideNotifsMobile: true,
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

  // Intenção "Gestão de Tráfego Pago" (Grupo 2 do Google Ads) — mesma página/layout
  // da /assessoria, copy espelhando o termo buscado: confirma "tráfego pago" primeiro,
  // eleva para "tráfego que vira cliente" depois.
  "/gestao-de-trafego-pago": {
    hero: {
      topBanner: "Para empresas que faturam +R$35k/mês",
      heroImage: "/images/nova-hero.webp",
      isGeneral: true,
      ctaLabel: "Falar com um especialista",
      proofMiddle: "gerenciados em anúncios",
      kicker: "Para empresas que faturam +R$35k/mês",
      // NBSP ( ) prende "gera cliente" numa linha só: o gradiente quebrado
      // entre linhas caía na ponta escura (azul-marinho) e sumia no fundo
      h1: "Gestão de tráfego pago que gera cliente. Não só clique.",
      h1AccentWord: "gera cliente",
      // Fim em roxo vivo (não azul-marinho): "cliente" fica legível no fundo escuro
      h1AccentGradient: "linear-gradient(135deg, #8B6EF8 0%, #6A48F4 45%, #4C2FC4 100%)",
      subheadline:
        "No Google Ads e no Meta Ads, a Lema conecta seus anúncios ao processo comercial pra cada real investido virar venda previsível — sem depender de indicação ou sorte.",
      firstH2: "O que separa quem investe em anúncio de quem cresce de verdade",
      agitationBody:
        "A diferença não está em gastar mais com anúncio — está em ter um sistema. Tráfego que traz o cliente certo, um processo comercial que transforma conversa em venda, e dados que mostram exatamente onde crescer. É assim que o faturamento sobe com previsibilidade, mês após mês: sem depender de indicação, sem depender de sorte.",
    },
    meta: {
      title: "Gestão de Tráfego Pago | Google Ads e Meta Ads — Lema Digital",
      description:
        "Gestão de tráfego pago no Google Ads e Meta Ads para empresas que faturam +R$35k/mês. Anúncios conectados ao processo comercial pra gerar venda, não só clique.",
      canonical: `${BASE_URL}/gestao-de-trafego-pago`,
    },
  },
};
