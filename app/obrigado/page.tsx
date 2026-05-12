import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SmileDesignArc, OcclusalGrid } from "@/components/ui/DentalAccents";

export const metadata: Metadata = {
  title: "Obrigado! Diagnóstico Confirmado | Lema Digital",
  description: "Seu diagnóstico gratuito foi solicitado. Em breve nossa equipe entrará em contato.",
  robots: { index: false, follow: false },
};

export default function ObrigadoPage() {
  return (
    <main
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0C0F1A 0%, #0F1E33 60%, #0C0F1A 100%)" }}
    >
      {/* Linha de topo degradê — igual à LP */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
      />

      {/* Decorações de fundo */}
      <SmileDesignArc
        className="absolute left-[-2%] top-[8%] w-80 h-auto text-[#6A48F4] pointer-events-none"
        opacity={0.055}
      />
      <OcclusalGrid
        className="absolute right-[-1%] bottom-[6%] w-52 h-auto text-[#4C2FC4] pointer-events-none hidden lg:block"
        opacity={0.05}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(106,72,244,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Header mínimo com logo */}
      <header className="relative z-10 flex items-center justify-center pt-8 pb-4 px-4">
        <Image
          src="/logos/logo-lema.png"
          alt="Lema Digital"
          width={140}
          height={63}
          className="object-contain"
          style={{ mixBlendMode: "screen" }}
          priority
        />
      </header>

      {/* Conteúdo central */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">

        {/* Ícone de confirmação */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
          style={{
            background: "linear-gradient(135deg, rgba(106,72,244,0.25), rgba(20,62,102,0.25))",
            border: "1px solid rgba(106,72,244,0.35)",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 18L14.5 25.5L29 11"
              stroke="url(#check-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="check-gradient" x1="7" y1="18" x2="29" y2="18" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6A48F4" />
                <stop offset="1" stopColor="#4C2FC4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Eyebrow */}
        <p className="font-sub text-brand-primary text-sm tracking-wide mb-4 inline-flex items-center gap-2">
          <span
            className="inline-block w-5 h-px"
            style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
            aria-hidden="true"
          />
          Solicitação recebida
        </p>

        {/* Heading */}
        <h1 className="font-headline font-bold text-white text-3xl sm:text-4xl lg:text-5xl text-balance leading-tight mb-5 max-w-2xl">
          Perfeito.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            O seu diagnóstico está confirmado.
          </span>
        </h1>

        {/* Subheading */}
        <p className="font-body text-gray-400 text-base lg:text-lg leading-relaxed max-w-xl mb-10">
          Nossa equipe vai entrar em contato em até <strong className="text-white font-semibold">1 dia útil</strong> para confirmar data e horário da reunião com o sócio.
        </p>

        {/* O que esperar — 3 passos resumidos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full mb-12">
          {[
            { step: "01", text: "Aguarde nossa ligação de confirmação" },
            { step: "02", text: "Reunião de 30 min com o sócio no Google Meet" },
            { step: "03", text: "Você sai com clareza do seu funil" },
          ].map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center gap-2 rounded-2xl px-4 py-5 text-center"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(106,72,244,0.15)",
              }}
            >
              <span
                className="font-body font-bold text-xs tracking-widest"
                style={{
                  background: "linear-gradient(135deg, #6A48F4, #4C2FC4)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {item.step}
              </span>
              <p className="font-body text-gray-300 text-sm leading-snug">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Link de volta */}
        <Link
          href="/"
          className="font-body text-gray-500 text-sm hover:text-gray-300 transition-colors underline underline-offset-4"
        >
          Voltar para a página inicial
        </Link>
      </div>

      {/* Footer mínimo */}
      <footer
        className="relative z-10 text-center py-6 px-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="font-body text-gray-600 text-xs">
          © {new Date().getFullYear()} Lema Digital · CNPJ: 32.119.177/0001-06
        </p>
      </footer>
    </main>
  );
}
