"use client";

import Image from "next/image";
import { CheckCheck, MessageCircle, Phone, Clock, Users, Bookmark, Settings } from "lucide-react";

// Cena da hero (variante general):
//  - Painel CRM de conversas recriado em CSS (glass) — ATRÁS da foto, mais baixo
//  - Foto do sócio — À FRENTE, colada na base
//  - Notificações do WhatsApp — carrossel vertical em loop (~3 visíveis), à frente
// Camadas: painel z-10 < foto z-20 < notificações z-30. Container-query (cqw)
// escala os textos do painel junto com a cena. Respeita prefers-reduced-motion.

const NOTIFS = [1, 2, 3, 4];

const CONTACTS = [
  { av: "/images/hero/crm-av-1.webp", phone: "+55 83 …", msg: "Fechado", read: true },
  { av: "/images/hero/crm-av-2.webp", phone: "+55 31 …", msg: "Já assinei o contrato.", read: true },
  { av: "/images/hero/crm-av-3.webp", phone: "+55 61 …", msg: "Vamos fechar então!", read: false },
  { av: "/images/hero/crm-av-4.webp", phone: "+55 79 …", msg: "Manda o seu pix", read: false },
];

const SIDEBAR_ICONS = [MessageCircle, Phone, Clock, Users, Bookmark, Settings];

function CrmPanel() {
  return (
    <div
      className="flex overflow-hidden"
      style={{
        borderRadius: "1.6cqw",
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
      }}
    >
      {/* Sidebar de ícones */}
      <div
        className="flex flex-col items-center"
        style={{ gap: "2.6cqw", padding: "2.4cqw 1.6cqw", borderRight: "1px solid rgba(255,255,255,0.12)" }}
      >
        {SIDEBAR_ICONS.map((Icon, i) => (
          <Icon
            key={i}
            style={{ width: "2cqw", height: "2cqw", color: i === 0 ? "#fff" : "rgba(255,255,255,0.5)" }}
            strokeWidth={2}
          />
        ))}
      </div>

      {/* Lista de conversas */}
      <div className="flex-1 flex flex-col" style={{ padding: "2.2cqw 2.2cqw", gap: "2cqw" }}>
        {CONTACTS.map((c, i) => (
          <div key={i} className="flex items-center" style={{ gap: "1.6cqw" }}>
            <span
              className="relative flex-shrink-0 rounded-full overflow-hidden"
              style={{ width: "4.6cqw", height: "4.6cqw" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.av} alt="" aria-hidden="true" className="w-full h-full object-cover" />
            </span>
            <span className="min-w-0 flex flex-col" style={{ gap: "0.4cqw" }}>
              <span className="font-body font-semibold text-white truncate" style={{ fontSize: "1.9cqw" }}>
                {c.phone}
              </span>
              <span className="flex items-center text-white/70" style={{ gap: "0.7cqw" }}>
                <CheckCheck
                  style={{ width: "1.7cqw", height: "1.7cqw", color: c.read ? "#34B7F1" : "rgba(255,255,255,0.55)" }}
                  strokeWidth={2.5}
                />
                <span className="font-body truncate" style={{ fontSize: "1.5cqw" }}>
                  {c.msg}
                </span>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroFounderScene() {
  return (
    <div className="relative w-full h-full" style={{ containerType: "inline-size" }}>
      <style>{`
        @keyframes hfs-rise   { from { opacity: 0; transform: translateY(34px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes hfs-slideL { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes hfs-fade   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hfs-floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        /* Carrossel em PASSOS: cada notificação sobe e PAUSA (~3s) antes da próxima.
           4 passos de −12.5% (uma notificação) até −50% (uma cópia) → loop sem salto.
           Os pares de keyframes com mesmo valor criam o "hold" (pausa). */
        @keyframes hfs-step {
          0%,  20%  { transform: translateY(0); }
          25%, 45%  { transform: translateY(-12.5%); }
          50%, 70%  { transform: translateY(-25%); }
          75%, 95%  { transform: translateY(-37.5%); }
          100%      { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hfs-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
          .hfs-track { animation: none !important; }
        }
      `}</style>

      {/* Painel CRM (CSS) — ATRÁS da foto, à esquerda, mais baixo */}
      <div
        className="hfs-anim absolute left-0 bottom-[3%] w-[52%] z-10"
        style={{ animation: "hfs-slideL 0.8s ease-out 0.35s both" }}
      >
        <div style={{ animation: "hfs-floatA 7s ease-in-out infinite 1s" }}>
          <CrmPanel />
        </div>
      </div>

      {/* Foto do sócio — À FRENTE, colada na base. Mobile: centrada, por largura
          (cabe no aspect fixo da cena). Desktop: à direita.
          Wrapper externo = posição/centralização; interno = animação (separados
          para o transform da animação não sobrescrever o -translate-x-1/2). */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] z-20 lg:left-auto lg:translate-x-0 lg:right-[8%] lg:w-[68%]">
        <div className="hfs-anim" style={{ animation: "hfs-rise 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
          <Image
            src="/images/hero/founder.webp"
            alt="Maurílio — sócio da Lema Digital"
            width={830}
            height={973}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Notificações — carrossel vertical em loop, à frente, mais baixo e curto */}
      <div
        className="hfs-anim absolute right-0 bottom-[7%] w-[60%] z-30 lg:right-[-2%] lg:bottom-[16%] lg:w-[50%]"
        style={{ animation: "hfs-fade 0.6s ease-out 0.7s both" }}
      >
        <div
          className="overflow-hidden"
          style={{
            aspectRatio: "745 / 430",
            maskImage: "linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 16%, #000 84%, transparent 100%)",
          }}
        >
          <div className="hfs-track" style={{ animation: "hfs-step 15s ease-in-out infinite" }}>
            {[...NOTIFS, ...NOTIFS].map((n, i) => (
              <div key={i} className="mb-[7%]">
                <Image
                  src={`/images/hero/notif-${n}.webp`}
                  alt=""
                  aria-hidden="true"
                  width={745}
                  height={153}
                  className="w-full h-auto drop-shadow-[0_10px_28px_rgba(0,0,0,0.4)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
