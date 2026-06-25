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

  // Intenção "Agência" (GA1)
  "/agencia-marketing-odontologico": {
    hero: {
      kicker: "Assessoria de marketing e vendas para clínicas odontológicas",
      h1: "A agência de marketing odontológico que entrega paciente na cadeira — não relatório bonito.",
      h1AccentWord: "paciente na cadeira",
      subheadline:
        "Você já contratou agência antes e não viu resultado. A Lema Digital trabalha como assessoria: o Método TRINO conecta anúncio, atendimento e processo comercial — e a gente responde pelo paciente que senta na cadeira, não só por quem mandou mensagem.",
      firstH2: "Por que a maioria das agências de marketing odontológico não gera paciente",
      agitationBody:
        "Você já contratou agência antes. Veio relatório, veio alcance, veio post no feed — e a cadeira continuou com o mesmo movimento de sempre. Não porque o anúncio era ruim, mas porque ninguém cuidou do que acontece depois que o paciente manda mensagem. Relatório bonito não enche agenda.",
    },
    meta: {
      title: "Agência de Marketing Odontológico | Método TRINO — Lema Digital",
      description:
        "Cansou de agência que só entrega relatório? A Lema Digital é assessoria de marketing e vendas para clínicas odontológicas. Diagnóstico gratuito de 30 min.",
      canonical: `${BASE_URL}/agencia-marketing-odontologico`,
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

  // Intenção "Estética" (GA3)
  "/marketing-estetica-dental": {
    hero: {
      kicker: "Marketing para clínicas de estética dental — lentes, facetas e clareamento",
      h1: "Marketing para estética dental que lota a agenda de lentes, facetas e clareamento.",
      h1AccentWord: "lota a agenda",
      subheadline:
        "O Método TRINO da Lema Digital conecta anúncio, atendimento e processo comercial — para clínicas de estética dental que querem encher a agenda de tratamentos de alto valor sem depender de indicação.",
      firstH2: "Por que clínica de estética dental atrai curioso e não paciente de alto valor",
      agitationBody:
        "Chega muita gente perguntando o preço da faceta — e poucos fecham. A maioria some depois do orçamento, e quem fica tenta baixar o valor, até você dar desconto com medo de perder o paciente. O problema não é o tanto de gente que chega. É que ninguém separa quem está só pesquisando preço de quem está pronto pra tratar.",
    },
    meta: {
      title: "Marketing para Estética Dental | Lentes, Facetas, Clareamento — Lema Digital",
      description:
        "Marketing e vendas para clínicas de estética dental. Mais pacientes de lentes, facetas e clareamento, com agenda previsível. Diagnóstico gratuito de 30 min.",
      canonical: `${BASE_URL}/marketing-estetica-dental`,
    },
  },
};
