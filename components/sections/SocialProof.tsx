"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Zap } from "lucide-react";
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion, AnimatePresence } from "framer-motion";
import FadeInSection from "@/components/ui/FadeInSection";
import CTAButton from "@/components/ui/CTAButton";
import { AdSignal, ROASArrow } from "@/components/ui/GeneralistAccents";
import { useCopyVariant, ctaLabelFor } from "@/lib/copy-variant-context";

// ─── Dados dos cases (mesclados do antigo CaseStudies) ──────────────────────────

const FEATURED = {
  segment: "Venda de Produto Premium",
  name: "Roboclean Brasil",
  location: "São Paulo/SP",
  tagline: "De R$416 a R$105k em 15 dias",
  stats: [
    { value: "252×", label: "retorno sobre anúncios" },
    { value: "R$416", label: "investidos em anúncios" },
    { value: "R$105k", label: "em vendas em 15 dias" },
  ],
};

// Variante "tráfego" (/gestao-de-trafego-pago) — mesmo case, ângulo de campanha
const FEATURED_TRAFEGO = {
  segment: "Venda de Produto Premium",
  name: "Roboclean Brasil",
  location: "São Paulo/SP",
  tagline: "+465% em leads e R$95,9 mil em vendas em 15 dias",
  stats: [
    { value: "+465%", label: "em leads na Black Friday" },
    { value: "R$95,9k", label: "em vendas em 15 dias" },
    { value: "R$416", label: "investidos em anúncios" },
  ],
};

// Variante "tráfego" do card CENUV — resultado pelo ângulo de busca/leads
const CENUV_TRAFEGO = {
  segment: "Clínica Veterinária",
  name: "CENUV",
  location: "Vila Velha/ES",
  accentColor: "#7C5CFB",
  stats: [
    { value: "1ª", label: "posição no Google em +80% das buscas" },
    { value: "100", label: "leads por mês em média" },
    { value: "+R$6k", label: "faturados em 15 dias" },
  ],
};

const OTHERS = [
  {
    segment: "Marcenaria & Móveis Sob Medida",
    name: "LK Móveis Sob Medida",
    location: "Porto Alegre/RS",
    accentColor: "#A78BFA",
    stats: [
      { value: "20×", label: "ROAS — retorno sobre anúncios" },
      { value: "R$85k", label: "em vendas geradas" },
      { value: "R$4,2k", label: "investidos em anúncios" },
    ],
  },
  {
    segment: "Clínica Veterinária",
    name: "CENUV",
    location: "Vila Velha/ES",
    accentColor: "#7C5CFB",
    stats: [
      { value: "+R$6k", label: "faturados em 15 dias" },
      { value: "87%", label: "presença no topo do Google" },
      { value: "98%", label: "métricas em evolução" },
    ],
  },
  {
    segment: "Marca Pessoal",
    name: "Cleston Santino",
    location: "Orlando/FL",
    accentColor: "#6A48F4",
    stats: [
      { value: "+100k", label: "inscritos no YouTube" },
      { value: "+2Mi", label: "views no YouTube" },
      { value: "+35k", label: "seguidores no Instagram" },
    ],
  },
];

const TESTIMONIAL_VIDEOS = [
  {
    id: "Nb7Ofl1Pedo",
    name: "Luciano Bezerra",
    role: "Sócio-fundador",
    thumb: `https://i.ytimg.com/vi/Nb7Ofl1Pedo/hqdefault.jpg`,
  },
  {
    id: "G1ZcB1HeC80",
    name: "Liliane Bezerra",
    role: "Sócia-fundadora",
    thumb: `https://i.ytimg.com/vi/G1ZcB1HeC80/hqdefault.jpg`,
  },
];

// ─── Componentes dos cases (mesclados do antigo CaseStudies) ────────────────────

function VideoLightbox({ videoId, onClose }: { videoId: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.92)" }}
        onClick={onClose}
      >
        {/* Botão fechar fixo no canto da viewport — sempre visível e clicável,
            independentemente do tamanho do vídeo */}
        <button
          onClick={onClose}
          aria-label="Fechar vídeo"
          className="fixed top-4 right-4 z-10 flex items-center gap-1.5 rounded-full px-4 py-2 text-white text-sm font-body font-medium transition-colors"
          style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
        >
          <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Fechar
        </button>

        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          style={{
            // Vídeo vertical (9/16): a altura limita o tamanho, deixando margem
            // no topo p/ o botão fechar; a largura acompanha a proporção.
            height: "min(78vh, 640px)",
            width: "min(calc(78vh * 9 / 16), 360px, calc(100vw - 2rem))",
            maxHeight: "78vh",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="Depoimento em vídeo"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full rounded-2xl"
            style={{ border: "none" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function VideoChip({ v }: { v: typeof TESTIMONIAL_VIDEOS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Assistir depoimento de ${v.name}`}
        className="group flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6A48F4] rounded-xl transition-all duration-200"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "8px" }}
      >
        <div className="relative flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 56, height: 72 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={v.thumb}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.30)" }} aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ background: "rgba(106,72,244,0.90)", boxShadow: "0 0 0 3px rgba(106,72,244,0.25)" }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="white" aria-hidden="true">
                <path d="M2 1.2L7 4 2 6.8V1.2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <p className="font-body font-semibold text-white text-xs leading-snug truncate">{v.name}</p>
          <p className="font-body text-gray-500 text-[10px] mt-0.5">{v.role}</p>
          <p
            className="font-body text-[10px] mt-1.5 inline-flex items-center gap-1 transition-colors duration-200 group-hover:text-[#A78BFA]"
            style={{ color: "#6A48F4" }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true">
              <path d="M2 1.2L7 4 2 6.8V1.2z" />
            </svg>
            Ver depoimento
          </p>
        </div>
      </button>
      {open && <VideoLightbox videoId={v.id} onClose={() => setOpen(false)} />}
    </>
  );
}

function BigNumber({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="font-headline italic leading-none select-none"
      style={{
        fontSize: "clamp(3rem, 7.5vw, 5.5rem)",
        fontWeight: 400,
        background: "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 55%, #A78BFA 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        letterSpacing: "-0.03em",
      }}
    >
      {value}
    </motion.div>
  );
}

function FeaturedCard() {
  // Copy do case por variante — layout idêntico, muda só o texto/números
  const FEATURED_COPY = useCopyVariant() === "trafego" ? FEATURED_TRAFEGO : FEATURED;
  const [heroStat, ...restStats] = FEATURED_COPY.stats;
  return (
    <div
      className="relative rounded-3xl overflow-hidden flex flex-col justify-between min-h-[420px] lg:min-h-[480px] group"
      style={{ background: "linear-gradient(145deg, #1A0F3A 0%, #0F1E33 50%, #0C0F1A 100%)", border: "1px solid rgba(106,72,244,0.35)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(106,72,244,0.18) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, #6A48F4, #C4B5FD, #143E66)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 p-6 lg:p-7 flex flex-col h-full gap-4 lg:gap-5">
        <div>
          <div className="mb-3">
            <span
              className="font-body font-semibold text-white text-[11px] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 tracking-wide"
              style={{ background: "linear-gradient(135deg, #6A48F4, #4C2FC4)" }}
            >
              <Zap className="w-3 h-3" fill="currentColor" aria-hidden="true" /> Case em destaque
            </span>
          </div>
          <p className="font-body font-semibold text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: "#A78BFA" }}>
            {FEATURED_COPY.segment}
          </p>
          <h3 className="font-headline font-bold text-white text-2xl lg:text-3xl leading-tight mb-1">{FEATURED_COPY.name}</h3>
          <p className="font-body text-gray-400 text-xs">{FEATURED_COPY.location}</p>
        </div>
        <div className="-mb-2">
          <BigNumber value={heroStat.value} />
          <p className="font-body text-gray-400 text-sm mt-1">{heroStat.label}</p>
        </div>
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, rgba(106,72,244,0.4), transparent)" }} aria-hidden="true" />
        <div className="grid grid-cols-2 gap-3">
          {restStats.map((s, i) => (
            <div key={i} className="rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p
                className="font-headline italic text-2xl leading-none mb-1"
                style={{
                  fontWeight: 400,
                  background: "linear-gradient(135deg, #EDE9FE, #C4B5FD)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {s.value}
              </p>
              <p className="font-body text-gray-400 text-[11px] leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="font-body text-gray-400 text-[10px] uppercase tracking-[0.18em] mb-2.5">Ouça os fundadores</p>
          <div className="flex gap-2.5">
            {TESTIMONIAL_VIDEOS.map((v) => (
              <VideoChip key={v.id} v={v} />
            ))}
          </div>
        </div>
        <div
          className="rounded-2xl px-5 py-3 mt-auto"
          style={{ background: "linear-gradient(135deg, rgba(106,72,244,0.20), rgba(20,62,102,0.20))", border: "1px solid rgba(106,72,244,0.25)" }}
        >
          <p className="font-headline font-normal italic text-gray-200 text-sm lg:text-base text-center">&ldquo;{FEATURED_COPY.tagline}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}

function SideCard({ c, index }: { c: typeof OTHERS[0]; index: number }) {
  const [hero, ...rest] = c.stats;
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative px-6 py-5 transition-colors duration-300"
      style={{ background: "rgba(255,255,255,0.04)", borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="font-body font-semibold text-[10px] uppercase tracking-[0.22em] mb-1" style={{ color: c.accentColor }}>
            {c.segment}
          </p>
          <h3 className="font-headline font-bold text-white text-lg leading-tight truncate">{c.name}</h3>
          <p className="font-body font-normal text-gray-400 text-xs mt-0.5">{c.location}</p>
        </div>
        <span
          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-125"
          style={{ background: c.accentColor }}
          aria-hidden="true"
        />
      </div>
      <div className="flex items-end gap-3 mb-3">
        <span
          className="font-headline italic leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(2.6rem, 7vw, 3.4rem)", fontWeight: 200, color: c.accentColor }}
        >
          {hero.value}
        </span>
        <span className="font-body text-gray-400 text-xs leading-snug pb-1.5 max-w-[150px]">{hero.label}</span>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {rest.map((s, j) => (
          <span key={j} className="font-body text-[13px] text-gray-400">
            <span className="font-headline font-bold text-white">{s.value}</span>{" "}
            <span className="text-gray-400">{s.label}</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const TESTIMONIALS = [
  {
    name: "Luciano Bezerra",
    location: "São Paulo/SP",
    time: "09:14",
    text: "Não posso deixar de PARABENIZAR a equipe inteira pelo belo trabalho que vem sendo realizado... Estou ENCANTADO com tudo que estou vendo, tanto de mídias digitais quanto de visibilidade. Fazendo um comparativo com nossos concorrentes, arrisco dizer que o nosso está em outro PATAMAR. Vocês são TOP! 🙌",
  },
  {
    name: "Patrícia Ramos",
    location: "Fortaleza/CE",
    time: "14:37",
    text: "Gostaria de deixar meu agradecimento a Letícia e ao Maurílio. Toda atenção e dedicação desde o início da nossa parceria! Tenho certeza que com esse apoio conseguiremos alcançar resultados ainda melhores, porque eles são profissionais fora da curva. Duas pessoas maravilhosas que indico de olhos fechados! 💜",
  },
  {
    name: "Renata Carvalho",
    location: "Lisboa/Portugal",
    time: "11:02",
    text: "Surreal, essa palavra define a Lema — uma agência organizada, inovadora, que oferece todo suporte aos seus clientes. Foi o melhor investimento que eu fiz, é e sempre vai ser parceira da minha empresa! ✨",
  },
  {
    name: "Raquel Viana",
    location: "São Paulo/SP",
    time: "16:20",
    text: "Maravilhosos. Competentes, atenciosos, dedicados, solícitos e muito mais. Eles nos ajudam a ter uma visão dos meios que podem alavancar o nosso negócio e nos guia, sempre com reuniões para mostrar o que podemos melhorar. 🚀",
  },
  {
    name: "Carolina Martinelli",
    location: "Vila Velha/ES",
    time: "10:48",
    text: "Empresa acolhedora, escutam nossas queixas de forma personalizada e tentam resolver cada problema. São transparentes no que fazem, o que dá muita tranquilidade. 👏",
  },
  {
    name: "Alfredo Cid",
    location: "Lisboa/Portugal",
    time: "08:55",
    text: "Fiquei muito satisfeito com a entrega do trabalho e com o comprometimento que tiveram comigo e minha empresa. Super recomendo o trabalho deles. 🌟",
  },
  {
    name: "Cleston Santino",
    location: "Orlando/FL",
    time: "19:03",
    text: "Sou muito grato à Lema pela forma surpreendente e profissional como cuidam de cada detalhe nos meus projetos. Me sinto um privilegiado por ter a oportunidade de trabalhar com uma equipe tão competente. Gratidão a todo carinho e dedicação! 🙏",
  },
  {
    name: "Bruna Couto",
    location: "Madrid/Espanha",
    time: "13:15",
    text: "Tive uma ótima experiência com a Lema, são profissionais muito atenciosos e detalhistas, buscando o melhor em tudo que fazem. Muito dedicados e acessíveis na comunicação. 💯",
  },
  {
    name: "Liliane Bezerra",
    location: "São Paulo/SP",
    time: "09:40",
    text: "Por aqui estamos bem! Correndo bastante. Até o momento tivemos 3 vendas para leads! Muito feliz com os resultados 🎉",
  },
  {
    name: "Raphael Sousa",
    location: "Fortaleza/CE",
    time: "15:58",
    text: "Excelentes em marketing digital, ótimos comunicadores, atenciosos e pontuais. Super recomendo para sua empresa! ⭐⭐⭐⭐⭐",
  },
  {
    name: "Gabriella Albuquerque",
    location: "Brasil",
    time: "12:30",
    text: "Equipe atenciosa, pontual e responsável! 🤩",
  },
  {
    name: "Luciano Bezerra",
    location: "São Paulo/SP",
    time: "18:22",
    text: "Saibam que estamos muito FELIZES em tê-los encontrado. Pelo pouco tempo de parceria já deu para sentir que cresceremos juntos. LEMA é de FATO uma empresa em plena expansão com excelentes profissionais! Lema foi uma das PARCERIAS de 2024 que levaremos por longos e bons anos! 🏆",
  },
];

const ROW_1 = TESTIMONIALS.slice(0, 6);
const ROW_2 = TESTIMONIALS.slice(6, 12);

function TestimonialBubble({ item }: { item: typeof TESTIMONIALS[0] }) {
  const initials = item.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 flex flex-col gap-2 mx-3"
      aria-label={`Depoimento de ${item.name}`}
    >
      {/* Cabeçalho */}
      <div className="flex items-center gap-2.5 px-1">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-body font-bold text-white"
          style={{ background: "linear-gradient(135deg, #6A48F4, #143E66)" }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="min-w-0">
          <p className="font-body font-semibold text-white text-xs truncate">{item.name}</p>
          <p className="font-body text-gray-500 text-[10px] truncate">{item.location}</p>
        </div>
      </div>
      {/* Bolha WhatsApp */}
      <div
        className="relative rounded-2xl rounded-tl-sm px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p className="font-body text-gray-300 text-sm leading-relaxed pr-10">
          {item.text}
        </p>
        {/* Timestamp */}
        <span
          className="absolute bottom-2.5 right-3 font-body text-gray-600 text-[10px]"
          aria-hidden="true"
        >
          {item.time} ✓✓
        </span>
        {/* Triângulo da bolha */}
        <div
          aria-hidden="true"
          className="absolute -top-[1px] -left-[6px] w-3 h-3 overflow-hidden"
          style={{ transform: "scaleX(-1)" }}
        >
          <div
            className="w-3 h-3 rotate-45 origin-bottom-right"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function TestimonialTrack({
  items,
  direction = "left",
  duration = 40,
}: {
  items: typeof TESTIMONIALS;
  direction?: "left" | "right";
  duration?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full" aria-hidden="true">
      <motion.div
        className="flex py-2"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <TestimonialBubble key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

const COPY_GENERAL = {
  eyebrow: "Por que escolher a Lema Digital?",
  headingMain: "Números que provam",
  headingAccent: "o que entregamos.",
  subheading: "Métricas reais de clientes que aplicam o Método TRINO.",
  stats: [
    {
      prefix: "",
      value: 4,
      suffix: "+ anos",
      label: "entregando resultados reais",
    },
    {
      prefix: "",
      value: +5,
      suffix: "milhões",
      label: "gerenciados em tráfego pago",
    },
    {
      prefix: "",
      value: 87,
      suffix: "%",
      label: "de presença no topo do Google",
    },
    {
      prefix: "",
      value: null,
      suffix: "",
      text: "+50",
      label: "funis de vendas estruturados",
    },
  ],
};

function AnimatedCounter({
  prefix,
  value,
  suffix,
}: {
  prefix: string;
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      motionValue.set(value);
      return;
    }
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [inView, motionValue, value, reduced]);

  // Suffix de uma só letra/símbolo (ex.: "%") fica junto, no tamanho do número.
  // Suffix com palavra (ex.: "milhões", "+ anos") vai menor, para não estourar a célula.
  const suffixIsWord = /[a-zA-ZÀ-ÿ]/.test(suffix);

  return (
    <span ref={ref} className="tabular-nums inline-flex items-baseline gap-1">
      <span>
        {prefix}
        <motion.span>{rounded}</motion.span>
        {!suffixIsWord && suffix}
      </span>
      {suffixIsWord && (
        <span className="text-[0.42em] font-semibold whitespace-nowrap self-baseline">
          {suffix.trim()}
        </span>
      )}
    </span>
  );
}

export default function SocialProof() {
  const copyVariant = useCopyVariant();
  const trafego = copyVariant === "trafego";
  const COPY = COPY_GENERAL;
  // Heading por variante: a página de tráfego confirma o termo buscado no título
  const headingMain = trafego ? "Tráfego que virou" : COPY.headingMain;
  const headingAccent = trafego ? "venda de verdade." : COPY.headingAccent;
  // CENUV ganha números pelo ângulo de busca/leads na variante tráfego
  const others = trafego ? OTHERS.map((c) => (c.name === "CENUV" ? CENUV_TRAFEGO : c)) : OTHERS;
  return (
    <section
      id="cases-de-sucesso"
      className="relative pt-14 lg:pt-28 pb-0 overflow-hidden scroll-mt-20"
      style={{ background: "linear-gradient(160deg, #080B14 0%, #0C0F1A 45%, #0F1E33 100%)" }}
    >
      {/* ROI gigante de fundo + sub posicionada sobre ele (mesclado do CaseStudies) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[2%] top-[3%] font-headline font-bold italic select-none hidden lg:block"
        style={{
          fontSize: "clamp(10rem, 20vw, 22rem)",
          lineHeight: 1,
          background: "linear-gradient(135deg, rgba(196,181,253,0.12) 0%, rgba(106,72,244,0.07) 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          letterSpacing: "-0.05em",
        }}
      >
        ROI
      </div>
      <ROASArrow className="absolute left-[-1%] bottom-[6%] w-32 h-auto text-[#6A48F4] pointer-events-none hidden lg:block" opacity={0.055} />
      <AdSignal className="absolute left-[45%] top-[2%] w-28 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block" opacity={0.04} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho — general: heading à esquerda + sub à direita (alinhada ao ROI) */}
        <FadeInSection className="mb-10 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8">
            <div>
              <p className="font-sub text-base tracking-wide mb-4 inline-flex items-center gap-2 text-[#C4B5FD]">
                <span
                  className="inline-block w-6 h-px"
                  style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
                  aria-hidden="true"
                />
                {COPY.eyebrow}
              </p>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl lg:text-[3.4rem] leading-tight text-white">
                {headingMain}
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #C4B5FD 0%, #A78BFA 45%, #6A48F4 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {headingAccent}
                </span>
              </h2>
            </div>
            <p className="relative z-10 font-body text-gray-300 text-base leading-relaxed max-w-sm lg:text-right lg:pb-2">
              Negócios de segmentos diferentes, com um ponto em comum:{" "}
              <span className="text-white font-semibold">previsibilidade nas vendas.</span>
            </p>
          </div>
        </FadeInSection>

        {/* Composição editorial: imagem de autoridade + números (fluida no desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 lg:gap-0 lg:items-center mb-14">
            {/* Imagem de autoridade — no desktop sobrepõe levemente a coluna de números */}
            <FadeInSection className="relative lg:z-10">
              <div
                className="relative aspect-[16/10] lg:aspect-[2/1] rounded-3xl overflow-hidden lg:mr-[-3rem]"
                style={{ boxShadow: "0 20px 60px rgba(12,15,26,0.25)" }}
              >
                <Image
                  src="/images/autoridade.webp"
                  alt="Equipe da Lema Digital em evento ao vivo"
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover object-center"
                  quality={80}
                />
                {/* Leve overlay roxo para integrar à paleta */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(106,72,244,0.12) 0%, transparent 55%, rgba(20,62,102,0.18) 100%)" }}
                />
              </div>
            </FadeInSection>

            {/* Números — grid 2×2; no desktop recebe a sobreposição da imagem (padding à esquerda) */}
            <FadeInSection delay={0.1}>
              <div
                className="grid grid-cols-2 gap-px rounded-3xl overflow-hidden lg:pl-12"
                style={{ background: "rgba(106,72,244,0.25)", border: "1px solid rgba(106,72,244,0.30)" }}
              >
                {COPY.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 lg:p-7 flex flex-col gap-2 transition-colors duration-200"
                    style={{ background: "#0F1424" }}
                  >
                    <p
                      className={`font-headline font-bold leading-none ${stat.value !== null ? "text-3xl lg:text-4xl" : "text-2xl lg:text-3xl"}`}
                      style={{
                        background: "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 55%, #E6DEFF 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        color: "transparent",
                      }}
                    >
                      {stat.value !== null ? (
                        <AnimatedCounter prefix={stat.prefix} value={stat.value} suffix={stat.suffix} />
                      ) : (
                        stat.text
                      )}
                    </p>
                    <p className="font-body text-gray-400 text-sm leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>

        {/* Cases (mesclados do antigo CaseStudies) — largura total, após os números */}
        {(
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 lg:gap-6 mb-14">
            <FadeInSection className="flex flex-col gap-4 order-2 lg:order-1">
              {others.map((c, i) => (
                <SideCard key={i} c={c} index={i} />
              ))}
            </FadeInSection>
            <FadeInSection delay={0.1} className="order-1 lg:order-2">
              <FeaturedCard />
            </FadeInSection>
          </div>
        )}

        {/* Título da seção de depoimentos */}
        <FadeInSection delay={0.15} className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-px flex-shrink-0"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            <p className="font-body text-gray-300 text-sm">
              O que clientes dizem sobre a Lema Digital
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* Carrossel de depoimentos — full width, fundo escuro */}
      <FadeInSection delay={0.2}>
        <div
          className="relative pt-8 pb-14 lg:pb-20 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #0F1E33 100%)" }}
        >
          {/* Linha de topo */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #6A48F4, #4C2FC4, #143E66, transparent)" }}
            aria-hidden="true"
          />

          {/* Fade nas bordas laterais */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #0C0F1A, transparent)" }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(270deg, #0C0F1A, transparent)" }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-5">
            <TestimonialTrack items={ROW_1} direction="left" duration={45} />
            {/* 2ª linha só no desktop — mobile mostra apenas uma linha */}
            <div className="hidden lg:block">
              <TestimonialTrack items={ROW_2} direction="right" duration={50} />
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Fecho: "O próximo case pode ser o seu" + CTA (mesclado do CaseStudies) — general */}
      {(
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <FadeInSection>
            <div
              className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
            >
              <p className="font-headline font-bold italic text-white text-xl lg:text-2xl text-center sm:text-left">
                O próximo case pode ser o seu.
              </p>
              <CTAButton size="lg" label={ctaLabelFor(copyVariant)} className="flex-shrink-0" />
            </div>
          </FadeInSection>
        </div>
      )}
    </section>
  );
}
