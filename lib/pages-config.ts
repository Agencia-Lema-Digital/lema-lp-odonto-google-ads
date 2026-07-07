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
  // Raiz — intenção "Tráfego Pago" (GA2)
  "/": {
    hero: {
      kicker: "Gestão de tráfego pago para dentistas — com processo comercial incluso",
      h1: "Tráfego pago para dentistas que lota sua agenda de pacientes — não anúncio que só gasta.",
      h1AccentWord: "lota sua agenda",
      subheadline:
        "Não somos só mais um gestor de tráfego para dentistas. O Método TRINO da Lema Digital conecta anúncio, atendimento e processo comercial num funil só — porque tráfego pago sozinho enche o WhatsApp, mas não enche a cadeira.",
      firstH2: "Por que tráfego pago para dentistas quase nunca vira paciente",
      agitationBody:
        "O anúncio funciona: a pessoa manda mensagem perguntando o preço. A recepção responde o valor, a pessoa some, e no fim do mês a conta do anúncio veio — mas a agenda continua com horário vazio. O dinheiro não evaporou no anúncio. Evaporou entre a mensagem e a cadeira.",
    },
    meta: {
      title: "Tráfego Pago para Dentistas | Método TRINO — Lema Digital",
      description:
        "Gestão de tráfego pago para dentistas conectada ao processo comercial. Anúncio, atendimento e fechamento num funil só. Diagnóstico gratuito de 30 min.",
      canonical: `${BASE_URL}/`,
    },
  },

  // Intenção "Geral" — empresas +R$35k/mês
  "/assessoria-marketing-vendas": {
    hero: {
      topBanner: "Para empresas que faturam +R$35k/mês",
      heroImage: "/images/nova-hero.webp",
      isGeneral: true,
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
