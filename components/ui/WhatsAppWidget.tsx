"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  type Country,
  type Utms,
  applyPhoneMask,
  maxDigitsOf,
  collectUtms,
  genId,
  buildLeadPayload,
  sendLeadToWebhook,
  dl,
  type PayloadQuestion,
} from "@/lib/lead-form";

// ── Configuração ──────────────────────────────────────────────────────────────

// form_id/form_name específicos: permitem diferenciar no Make quem veio do
// botão de WhatsApp de quem preencheu o formulário da seção.
const FORM_NAME = "Captura WhatsApp - LP Generalista";
const FORM_ID = "whatsapp-widget";
const WHATSAPP_URL = "https://api.whatsapp.com/message/4WSHGVVDJZSPB1";

// Perguntas equivalentes às do formulário nativo (mesmos ids/títulos)
const QUESTIONS: PayloadQuestion[] = [
  { id: "nome", title: "Qual seu nome?", type: "name" },
  { id: "telefone", title: "WhatsApp/Telefone", type: "phone" },
];

// Ícone do WhatsApp (glifo oficial, sem depender de pacote externo)
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.04 4C9.94 4 5 8.94 5 15.04c0 2.12.6 4.1 1.64 5.8L5 28l7.36-1.6a11 11 0 0 0 3.68.64h.01c6.1 0 11.04-4.94 11.04-11.04C27.09 8.94 22.14 4 16.04 4Zm6.46 15.6c-.27.76-1.6 1.47-2.2 1.52-.56.05-1.27.07-2.05-.13-.47-.12-1.08-.36-1.86-.7-3.27-1.41-5.4-4.7-5.57-4.92-.16-.22-1.33-1.77-1.33-3.38 0-1.6.84-2.4 1.14-2.72.3-.33.66-.41.88-.41.22 0 .44 0 .63.01.2.01.47-.08.74.56.27.66.93 2.26 1.01 2.42.08.16.13.36.03.58-.1.22-.16.36-.3.55-.16.18-.33.41-.47.55-.16.16-.32.34-.14.66.18.33.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.5 1.54.32.16.5.13.69-.08.2-.22.8-.93 1.01-1.25.2-.33.41-.27.69-.16.27.11 1.74.82 2.04.97.3.16.5.22.57.34.07.13.07.74-.2 1.5Z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState(""); // só dígitos
  const [error, setError] = useState<{ nome?: string; telefone?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [countryOpen, setCountryOpen] = useState(false);

  // Visibilidade do FAB: só aparece depois de rolar e quando nenhum botão CTA
  // está no viewport (mesma lógica do StickyMobileCTA) — o WhatsApp é secundário
  // e não deve competir com a hero nem com os CTAs primários.
  const [scrolledPast, setScrolledPast] = useState(false);
  const [ctaInView, setCtaInView] = useState(false);

  const utmsRef = useRef<Utms>(collectUtms());
  const respondentIdRef = useRef<string>(genId());
  const nomeRef = useRef<HTMLInputElement | null>(null);

  // Atualiza UTMs ao montar (caso a URL tenha mudado após hidratação)
  useEffect(() => {
    utmsRef.current = collectUtms();
  }, []);

  // Scroll: libera o FAB após passar o threshold
  useEffect(() => {
    const SCROLL_THRESHOLD = 800;
    const onScroll = () => setScrolledPast(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observa os botões CTA ([data-cta]) e a seção do formulário (#lead-form):
  // enquanto qualquer um estiver visível, o FAB some — sobre o formulário ele
  // desviaria a conversão principal. MutationObserver re-observa elementos de
  // seções carregadas dinamicamente.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setCtaInView(visible.size > 0);
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    const observed = new WeakSet<Element>();
    const observeAll = () => {
      document.querySelectorAll("[data-cta], #lead-form").forEach((el) => {
        if (!observed.has(el)) {
          observed.add(el);
          io.observe(el);
        }
      });
    };
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  // FAB visível: passou do threshold E nenhum CTA no viewport
  const fabVisible = scrolledPast && !ctaInView;

  // Foco no primeiro campo ao abrir; trava o scroll do body enquanto aberto
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => nomeRef.current?.focus({ preventScroll: true }), 120);
    return () => clearTimeout(t);
  }, [open]);

  // Fecha o dropdown de país ao clicar fora
  useEffect(() => {
    if (!countryOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-wa-country]")) setCountryOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [countryOpen]);

  // Ao trocar de país, trunca o número ao máximo da nova máscara
  useEffect(() => {
    const max = maxDigitsOf(phoneCountry.mask);
    setTelefone((prev) => prev.slice(0, max));
  }, [phoneCountry]);

  function handlePhoneChange(val: string) {
    setError((e) => ({ ...e, telefone: undefined }));
    const max = maxDigitsOf(phoneCountry.mask);
    setTelefone(val.replace(/\D/g, "").slice(0, max));
  }

  function validate(): boolean {
    const next: { nome?: string; telefone?: string } = {};
    const nameParts = nome.trim().split(/\s+/).filter((w) => w.length >= 2);
    if (nameParts.length < 2) next.nome = "Digite seu nome e sobrenome.";
    if (telefone.replace(/\D/g, "").length < phoneCountry.minDigits)
      next.telefone = "Digite um telefone válido com DDD.";
    setError(next);
    return Object.keys(next).length === 0;
  }

  function openWidget() {
    setOpen(true);
    dl("whatsapp_widget_open", { form_id: FORM_ID });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");

    const payload = buildLeadPayload({
      formName: FORM_NAME,
      formId: FORM_ID,
      questions: QUESTIONS,
      answers: { nome: nome.trim(), telefone },
      utms: utmsRef.current,
      respondentId: respondentIdRef.current,
      phoneCountryCode: phoneCountry.code,
    });

    // Dispara o webhook (mesma estrutura do form; form_id diferencia a origem)
    await sendLeadToWebhook(payload);

    // Eventos de conversão (GA4 + Meta via GTM), marcados como origem WhatsApp
    dl("whatsapp_lead", { form_id: FORM_ID, form_name: FORM_NAME });
    dl("generate_lead", { form_id: FORM_ID });

    setStatus("done");

    // Só então redireciona ao WhatsApp. Pequena folga p/ o GTM processar as tags.
    setTimeout(() => {
      window.location.href = WHATSAPP_URL;
    }, 500);
  }

  return (
    <>
      {/* Botão flutuante (FAB) — canto inferior direito.
          No mobile fica acima da área do sticky CTA (bottom maior).
          Só aparece após rolar e quando nenhum CTA está visível. */}
      <AnimatePresence>
        {!open && fabVisible && (
          <motion.button
            type="button"
            onClick={openWidget}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            aria-label="Falar no WhatsApp"
            className="fixed right-4 bottom-[88px] lg:bottom-6 z-40 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg active:scale-95 transition-transform"
            style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.45)" }}
          >
            <WhatsAppIcon className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Card com mini-formulário */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-4 left-4 sm:left-auto bottom-[88px] lg:bottom-6 z-50 w-auto sm:w-[360px] max-w-[400px] rounded-2xl overflow-hidden bg-white"
            style={{ boxShadow: "0 18px 50px rgba(0,0,0,0.30)" }}
            role="dialog"
            aria-label="Iniciar conversa no WhatsApp"
          >
            {/* Cabeçalho verde */}
            <div className="flex items-center gap-3 px-5 py-4" style={{ background: "#075E54" }}>
              <span className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-headline font-bold text-white text-base leading-tight">Lema Digital</p>
                <p className="font-body text-white/80 text-xs leading-tight">Responde em minutos</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {status === "done" ? (
              <div className="px-5 py-8 text-center">
                <p className="font-headline font-bold text-brand-text text-lg mb-1">Tudo certo!</p>
                <p className="font-body text-gray-500 text-sm">Abrindo o WhatsApp…</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-5 py-5">
                <p className="font-body text-gray-500 text-sm mb-4">
                  Preencha seus dados para iniciar uma conversa no WhatsApp:
                </p>

                {/* Nome */}
                <label htmlFor="wa-nome" className="block font-body font-semibold text-brand-text text-sm mb-1.5">
                  Nome
                </label>
                <input
                  id="wa-nome"
                  ref={nomeRef}
                  type="text"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    setError((er) => ({ ...er, nome: undefined }));
                  }}
                  placeholder="Seu nome"
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl font-body text-base text-brand-text focus:outline-none transition-all duration-150"
                  style={{
                    border: error.nome ? "1.5px solid #EF4444" : "1.5px solid rgba(106,72,244,0.25)",
                    background: "#FBFAFF",
                  }}
                />
                {error.nome && <p className="font-body text-red-500 text-xs mt-1">{error.nome}</p>}

                {/* Telefone */}
                <label htmlFor="wa-telefone" className="block font-body font-semibold text-brand-text text-sm mb-1.5 mt-4">
                  Telefone
                </label>
                <div
                  className="flex items-stretch rounded-xl overflow-visible"
                  style={{
                    border: error.telefone ? "1.5px solid #EF4444" : "1.5px solid rgba(106,72,244,0.25)",
                    background: "#FBFAFF",
                  }}
                >
                  {/* Seletor de país */}
                  <div className="relative" data-wa-country>
                    <button
                      type="button"
                      onClick={() => setCountryOpen((o) => !o)}
                      className="flex items-center gap-1.5 h-full pl-3 pr-2 font-body text-sm text-brand-text border-r focus-visible:outline-none"
                      style={{ borderColor: "rgba(106,72,244,0.18)" }}
                      aria-label="Selecionar país"
                      aria-expanded={countryOpen}
                    >
                      <span className="text-lg leading-none">{phoneCountry.flag}</span>
                      <span className="text-gray-500">+{phoneCountry.code}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    {countryOpen && (
                      <ul
                        className="absolute left-0 bottom-full mb-1 z-20 w-56 max-h-52 overflow-auto rounded-xl bg-white py-1"
                        style={{ border: "1px solid rgba(106,72,244,0.20)", boxShadow: "0 8px 28px rgba(0,0,0,0.12)" }}
                        role="listbox"
                      >
                        {COUNTRIES.map((c) => (
                          <li key={`${c.iso}-${c.code}`}>
                            <button
                              type="button"
                              onClick={() => {
                                setPhoneCountry(c);
                                setCountryOpen(false);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-left font-body text-sm text-brand-text hover:bg-[rgba(106,72,244,0.08)] transition-colors"
                              role="option"
                              aria-selected={c.code === phoneCountry.code && c.iso === phoneCountry.iso}
                            >
                              <span className="text-lg leading-none">{c.flag}</span>
                              <span className="flex-1">{c.name}</span>
                              <span className="text-gray-400">+{c.code}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {/* Número mascarado */}
                  <input
                    id="wa-telefone"
                    type="tel"
                    inputMode="tel"
                    value={applyPhoneMask(telefone, phoneCountry.mask)}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder={phoneCountry.mask.replace(/#/g, "0")}
                    autoComplete="tel"
                    className="flex-1 min-w-0 px-3 py-3 bg-transparent font-body text-base text-brand-text focus:outline-none"
                  />
                </div>
                {error.telefone && <p className="font-body text-red-500 text-xs mt-1">{error.telefone}</p>}

                {/* CTA */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full mt-5 min-h-[48px] px-6 py-3 rounded-xl font-body font-semibold text-white transition-all duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-70"
                  style={{ background: "#25D366", boxShadow: "0 6px 18px rgba(37,211,102,0.40)" }}
                >
                  {status === "submitting" ? "Enviando…" : "Iniciar Conversa"}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
