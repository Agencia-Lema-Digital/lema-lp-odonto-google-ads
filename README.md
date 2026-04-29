# Lema Digital — Landing Page Google Ads

Landing page de alta conversão para captação de leads B2B (donos de clínica odontológica premium). Destino exclusivo da campanha Google Ads. URL canônica: `lemaagdigital.com.br/diagnostico`.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS com design system da Lema
- shadcn/ui (Accordion, Card, Button)
- Framer Motion (fade-in on scroll)
- Lucide React (ícones)
- Fontes: Fraunces, Hubballi, Poppins (via next/font)

## Instalação

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000/diagnostico`

## Variáveis de ambiente

Copie `.env.local` e preencha:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## Checklist antes do deploy

### 1. Google Tag Manager
- Substitua `GTM-XXXXXXX` pelo ID real no arquivo `.env.local`
- Verifique em Vercel: Settings > Environment Variables

### 2. Embed do Respondi.app
Abra `components/sections/LeadForm.tsx` e substitua o bloco PLACEHOLDER pelo iframe real:

```tsx
<iframe
  src="https://app.respondi.app/s/SEU_ID_AQUI"
  style={{ width: "100%", height: "600px", border: "none" }}
  title="Formulario de diagnostico gratuito - Lema Digital"
  loading="lazy"
/>
```

### 3. Imagens reais

| Arquivo | Onde usar |
|---|---|
| `/public/images/hero.jpg` | Hero - foto dos fundadores ou da clinica |
| `/public/images/maurilio.jpg` | Card do Maurilio em AboutFounders |
| `/public/images/leticia.jpg` | Card da Leticia em AboutFounders |
| `/public/og-image.png` | Open Graph (1200x630px) |
| `/public/logos/logo-lema-white.svg` | Footer (versao branca) |
| `/public/logos/logo-lema.svg` | Hero (versao colorida) |

Depois de adicionar as imagens, descomente as tags Image dentro de:
- `Hero.tsx` (comentario: "Quando a imagem real estiver disponivel")
- `AboutFounders.tsx` (bloco comentado com Image)

### 4. Copy completa
Todos os componentes em `components/sections/` tem constantes COPY no topo com placeholders `[ENTRE COLCHETES]`. Preencha com o conteudo do `landing-copy.md`.

### 5. LinkedIn dos fundadores
Em `AboutFounders.tsx`, atualize os campos `linkedin: "#"` com as URLs reais.

### 6. Dados legais do Footer
Em `Footer.tsx`, atualize `CNPJ [XX.XXX.XXX/XXXX-XX]` e `[Razao Social]`.

## Deploy na Vercel

```bash
npm i -g vercel
vercel --prod
```

Configure o dominio `lemaagdigital.com.br` nas configuracoes do projeto na Vercel e adicione o registro DNS conforme instruido.

## Estrutura de arquivos

```
app/
  layout.tsx              <- fontes, GTM, metadata SEO
  page.tsx                <- redireciona / -> /diagnostico
  diagnostico/
    page.tsx              <- LP completa (importa os 10 blocos)
  globals.css             <- variaveis de cor, reset
components/
  sections/
    Hero.tsx              <- Bloco 1
    AudienceFilter.tsx    <- Bloco 2
    PainPoints.tsx        <- Bloco 3
    TrinoMethod.tsx       <- Bloco 4
    SocialProof.tsx       <- Bloco 5
    HowItWorks.tsx        <- Bloco 6
    AboutFounders.tsx     <- Bloco 7
    FAQ.tsx               <- Bloco 8
    LeadForm.tsx          <- Bloco 9 (embed Respondi)
    FinalCTA.tsx          <- Bloco 10
    Footer.tsx            <- Rodape
  ui/
    CTAButton.tsx         <- Botao CTA reutilizavel (scroll + dataLayer)
    FadeInSection.tsx     <- Wrapper de animacao fade-in on scroll
    button.tsx            <- shadcn Button
    accordion.tsx         <- shadcn Accordion
    card.tsx              <- shadcn Card
types/
  global.d.ts             <- tipo window.dataLayer
tailwind.config.ts        <- design system Lema (cores brand.*, fontes)
.env.local                <- NEXT_PUBLIC_GTM_ID
```

## Eventos de tracking (GTM)

| Evento | Quando dispara |
|---|---|
| `page_view` | Automatico via GTM |
| `cta_click` | Clique em qualquer botao CTA (inclui cta_label) |
| `form_start` | Primeiro clique no iframe do Respondi (postMessage) |
| `form_submit` | Envio confirmado pelo Respondi (postMessage) |
| `scroll_75` | Usuario rolou 75% da pagina E ficou 30s+ |

Configure os triggers e tags correspondentes no GTM Web.
