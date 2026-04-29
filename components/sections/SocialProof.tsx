"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import FadeInSection from "@/components/ui/FadeInSection";
import { SmileDesignArc, XRayFragment, GoldenRatioSpiral } from "@/components/ui/DentalAccents";

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

const COPY = {
  eyebrow: "Métricas reais de clínicas reais",
  headingMain: "O que muda quando",
  headingAccent: "o funil inteiro funciona.",
  subheading: "Métricas reais de clínicas que aplicam o Método TRINO.",
  stats: [
    {
      prefix: "",
      value: 80,
      suffix: "%",
      label: "Show rate de pacientes que marcam avaliação e realmente comparecem.",
    },
    {
      prefix: "−",
      value: 81,
      suffix: "%",
      label: "Redução no custo por conversão quando anúncio e atendimento conversam.",
    },
    {
      prefix: "+",
      value: 30,
      suffix: "%",
      label: "Taxa de fechamento com processo comercial padronizado.",
    },
    {
      prefix: "",
      value: null,
      suffix: "",
      text: "CPL",
      label: "Saber exatamente quanto custa cada novo paciente e ajustar com clareza.",
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

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  return (
    <section className="relative py-14 lg:py-28 bg-white overflow-hidden">
      {/* Smile arc decorativo — odontologia estética */}
      {/* Curva DSD — análise de sorriso, canto superior direito */}
      <SmileDesignArc
        className="absolute right-[-2%] top-[6%] w-[420px] h-auto text-[#6A48F4] pointer-events-none"
        opacity={0.06}
      />
      {/* Radiografia panorâmica — canto inferior esquerdo */}
      <XRayFragment
        className="absolute left-[-1%] bottom-[6%] w-56 h-auto text-[#6A48F4] pointer-events-none hidden lg:block"
        opacity={0.055}
      />
      {/* Espiral áurea — centro superior, atrás do heading */}
      <GoldenRatioSpiral
        className="absolute left-[45%] top-[2%] w-28 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block"
        opacity={0.045}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho alinhado à esquerda — estilo editorial */}
        <FadeInSection className="mb-10 lg:mb-16">
          <p className="font-sub text-brand-primary text-base tracking-wide mb-4 inline-flex items-center gap-2">
            <span
              className="inline-block w-6 h-px"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            {COPY.eyebrow}
          </p>
          <h2 className="font-headline font-bold text-brand-text text-3xl sm:text-4xl lg:text-[3.4rem] leading-tight mb-4">
            {COPY.headingMain}
            <br />
            <span className="gradient-text">{COPY.headingAccent}</span>
          </h2>
          <p className="font-body text-gray-500 text-base lg:text-lg max-w-2xl leading-relaxed">
            {COPY.subheading}
          </p>
        </FadeInSection>

        {/* Stats — grid com separadores, números com degradê */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-14"
          style={{ background: "rgba(106,72,244,0.10)", border: "1px solid rgba(106,72,244,0.12)" }}
        >
          {COPY.stats.map((stat, i) => (
            <FadeInSection key={i} delay={i * 0.08}>
              <div className="bg-white p-4 lg:p-8 flex flex-col gap-2 lg:gap-3 h-full hover:bg-brand-soft transition-colors duration-200">
                {/* Número com degradê primário */}
                <p
                  className="font-headline font-bold text-3xl lg:text-5xl leading-none whitespace-pre-line"
                  style={{
                    background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {stat.value !== null ? (
                    <AnimatedCounter
                      prefix={stat.prefix}
                      value={stat.value}
                      suffix={stat.suffix}
                    />
                  ) : (
                    stat.text
                  )}
                </p>
                <p className="font-body text-gray-500 text-sm leading-snug">
                  {stat.label}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Título da seção de depoimentos */}
        <FadeInSection delay={0.15} className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-px flex-shrink-0"
              style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
              aria-hidden="true"
            />
            <p className="font-body text-gray-500 text-sm">
              O que clientes dizem sobre a Lema
            </p>
          </div>
        </FadeInSection>
      </div>

      {/* Carrossel de depoimentos — full width, fundo escuro */}
      <FadeInSection delay={0.2}>
        <div
          className="relative py-8 overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #0F1E33 100%)" }}
        >
          {/* Linha de topo */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #6A48F4, #4C2FC4, #143E66, transparent)" }}
            aria-hidden="true"
          />
          {/* Linha de fundo */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #143E66, #4C2FC4, #6A48F4, transparent)" }}
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
            <TestimonialTrack items={ROW_2} direction="right" duration={50} />
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
