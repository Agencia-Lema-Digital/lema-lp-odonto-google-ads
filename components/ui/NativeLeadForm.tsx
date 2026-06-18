"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ChevronDown, Check } from "lucide-react";

// ── Configuração ──────────────────────────────────────────────────────────────

const FORM_NAME = "Captura de leads - LP Generalista";
const FORM_ID = "native-generalista";
const THANK_YOU_BASE = "https://diagnostico.lemaagdigital.com.br/obrigado/";

type QuestionType = "name" | "phone" | "text" | "textarea";

interface Question {
  id: string;        // id interno e chave de dados
  title: string;     // texto exibido e usado como chave no payload (igual ao Respondi)
  type: QuestionType;
  required: boolean;
  placeholder?: string;
}

const QUESTIONS: Question[] = [
  { id: "nome",    title: "Qual seu nome?",    type: "name",     required: true,  placeholder: "Seu nome" },
  { id: "telefone", title: "WhatsApp/Telefone", type: "phone",    required: true,  placeholder: "(85) 99999-9999" },
  { id: "empresa", title: "Nome da empresa",   type: "text",     required: true,  placeholder: "Nome da sua empresa" },
  { id: "sobre",   title: "Opcional: Se quiser, nos conte mais sobre seu negócio!", type: "textarea", required: false, placeholder: "Conte um pouco sobre seu negócio…" },
];

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
type Utms = Record<UtmKey, string>;

// ── Países (código + bandeira + máscara) ──────────────────────────────────────

interface Country {
  code: string;      // DDI sem "+"
  iso: string;       // ISO 3166-1 alpha-2 (para a bandeira emoji)
  name: string;
  flag: string;      // emoji
  mask: string;      // "#" = dígito; usado para formatar o número local
  minDigits: number; // mínimo de dígitos do número local p/ validar
}

const COUNTRIES: Country[] = [
  { code: "55", iso: "BR", name: "Brasil",          flag: "🇧🇷", mask: "(##) #####-####", minDigits: 11 },
  { code: "1",  iso: "US", name: "Estados Unidos",  flag: "🇺🇸", mask: "(###) ###-####",  minDigits: 10 },
  { code: "351", iso: "PT", name: "Portugal",       flag: "🇵🇹", mask: "### ### ###",     minDigits: 9 },
  { code: "44", iso: "GB", name: "Reino Unido",     flag: "🇬🇧", mask: "##### ######",    minDigits: 10 },
  { code: "34", iso: "ES", name: "Espanha",         flag: "🇪🇸", mask: "### ## ## ##",    minDigits: 9 },
  { code: "54", iso: "AR", name: "Argentina",       flag: "🇦🇷", mask: "## ####-####",    minDigits: 10 },
  { code: "52", iso: "MX", name: "México",          flag: "🇲🇽", mask: "## #### ####",    minDigits: 10 },
  { code: "351", iso: "AO", name: "Angola",         flag: "🇦🇴", mask: "### ### ###",     minDigits: 9 },
];

const DEFAULT_COUNTRY = COUNTRIES[0]; // Brasil

// Aplica a máscara do país sobre os dígitos crus
function applyPhoneMask(digits: string, mask: string): string {
  let out = "";
  let di = 0;
  for (const ch of mask) {
    if (di >= digits.length) break;
    if (ch === "#") { out += digits[di]; di++; }
    else out += ch;
  }
  return out;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function collectUtms(): Utms {
  const out = Object.fromEntries(UTM_KEYS.map((k) => [k, ""])) as Utms;
  if (typeof window === "undefined") return out;
  const p = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) out[k] = p.get(k) || "";
  return out;
}

// Monta a query string apenas com as UTMs presentes, para anexar ao /obrigado
function utmQueryString(utms: Utms): string {
  const p = new URLSearchParams();
  for (const k of UTM_KEYS) if (utms[k]) p.set(k, utms[k]);
  const s = p.toString();
  return s ? `?${s}` : "";
}

// Telefone: monta o objeto país/número no formato do exemplo Respondi
function splitPhone(rawDigits: string, countryCode: string): { country: string; phone: string } {
  return { country: countryCode, phone: rawDigits.replace(/\D/g, "") };
}

function genId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function nowStamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

interface Answers {
  nome: string;
  telefone: string;
  empresa: string;
  sobre: string;
}

const QUESTION_TYPE_OUT: Record<string, string> = {
  nome: "name",
  telefone: "phone",
  empresa: "text",
  sobre: "textarea",
};

// Monta o payload no formato Respondi (array com form/respondent).
// Enviado apenas na conclusão do formulário (status sempre "completed").
function buildPayload(opts: {
  answers: Answers;
  utms: Utms;
  respondentId: string;
  phoneCountryCode: string;
}) {
  const { answers, utms, respondentId, phoneCountryCode } = opts;

  const answersMap: Record<string, string> = {};
  const rawAnswers: unknown[] = [];

  for (const q of QUESTIONS) {
    const value = answers[q.id as keyof Answers] || "";

    if (q.type === "phone") {
      const digits = value.replace(/\D/g, "");
      // answers (mapa legível): "+55 85996308442"
      if (digits) answersMap[q.title] = `+${phoneCountryCode} ${digits}`;
      rawAnswers.push({
        question: { question_title: q.title, question_id: q.id, question_type: "phone" },
        answer: splitPhone(digits, phoneCountryCode),
      });
    } else {
      if (value) answersMap[q.title] = value;
      rawAnswers.push({
        question: { question_title: q.title, question_id: q.id, question_type: QUESTION_TYPE_OUT[q.id] },
        answer: value,
      });
    }
  }

  return [
    {
      form: { form_name: FORM_NAME, form_id: FORM_ID },
      respondent: {
        status: "completed",
        date: nowStamp(),
        respondent_id: respondentId,
        answers: answersMap,
        raw_answers: rawAnswers,
        respondent_utms: utms,
      },
    },
  ];
}

// Empurra evento pro dataLayer. As tags GA4 e Meta Pixel são acionadas no GTM
// por triggers "Evento personalizado" com estes nomes. Mantém tudo centralizado
// no GTM e visível nos Hits do Tag Assistant.
function dl(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// Evento de etapa com NOME por campo (form_step_nome, form_step_telefone, ...).
// O nome próprio permite que ferramentas que leem apenas a contagem por eventName
// (ex.: a Data API do GA4 usada por agentes de IA) montem o funil sem depender
// de dimensão personalizada. step_field/step_index seguem como parâmetros.
function emitStep(q: Question) {
  dl(`form_step_${q.id}`, {
    form_id: FORM_ID,
    step_index: QUESTIONS.indexOf(q) + 1,
    step_field: q.id,
    step_title: q.title,
  });
}

// Envia ao nosso proxy /api/lead (que reenvia ao Make). keepalive p/ sobreviver ao unload.
async function sendToWebhook(payload: unknown) {
  try {
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // silencioso: não bloquear a UX por falha de rede
  }
}

// ── Componente ────────────────────────────────────────────────────────────────

const EMPTY: Answers = { nome: "", telefone: "", empresa: "", sobre: "" };

// Guards de módulo: garantem disparo único por carregamento de página, mesmo com
// a dupla montagem do React Strict Mode (dev).
let formViewFired = false;
let formStartFired = false;

export default function NativeLeadForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [error, setError] = useState("");
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [phoneCountry, setPhoneCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [countryOpen, setCountryOpen] = useState(false);
  const phoneCountryRef = useRef<Country>(DEFAULT_COUNTRY);

  const utmsRef = useRef<Utms>(collectUtms());
  const respondentIdRef = useRef<string>(genId());
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  // Marca de campos já reportados ao GA4 (evita duplicar ao voltar/avançar)
  const answeredRef = useRef<Set<string>>(new Set());
  // Espelho de answers para uso dentro de callbacks sem stale closure
  const answersRef = useRef<Answers>(EMPTY);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const progress = (step / QUESTIONS.length) * 100;
  const currentValue = answers[current.id as keyof Answers];

  // Captura UTMs e marca VISUALIZAÇÃO do formulário (não é início de preenchimento).
  // O guard (variável de módulo) sobrevive à remontagem do Strict Mode em dev,
  // evitando o form_view duplicado.
  useEffect(() => {
    utmsRef.current = collectUtms();
    if (formViewFired) return;
    formViewFired = true;
    // form_view = chegou ao formulário (não é início de preenchimento).
    // No GTM, acione aqui o Meta ViewContent, se desejado.
    dl("form_view", { form_id: FORM_ID, form_name: FORM_NAME });
  }, []);

  // Foco automático ao trocar de passo (apenas inputs de texto)
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 280);
    return () => clearTimeout(t);
  }, [step]);

  function validate(): boolean {
    if (!current.required) return true;
    if (!currentValue || currentValue.trim() === "") {
      setError("Este campo é obrigatório.");
      return false;
    }
    if (current.type === "name") {
      const parts = currentValue.trim().split(/\s+/).filter((w) => w.length >= 2);
      if (parts.length < 2) {
        setError("Digite seu nome e sobrenome.");
        return false;
      }
    }
    if (current.type === "phone") {
      // valida pela quantidade de dígitos do número (sem o código do país)
      const digits = currentValue.replace(/\D/g, "");
      if (digits.length < phoneCountry.minDigits) {
        setError("Digite um telefone válido com DDD.");
        return false;
      }
    }
    return true;
  }

  function handleChange(val: string) {
    setError("");
    // Para telefone, guarda só os dígitos (até o máximo da máscara do país)
    if (current.type === "phone") {
      const maxDigits = (phoneCountry.mask.match(/#/g) || []).length;
      const digits = val.replace(/\D/g, "").slice(0, maxDigits);
      setAnswers((prev) => ({ ...prev, telefone: digits }));
      return;
    }
    setAnswers((prev) => ({ ...prev, [current.id]: val }));
  }

  // Reporta a resposta de um campo e salva parcial no servidor
  const reportAnswered = useCallback((q: Question) => {
    if (answeredRef.current.has(q.id)) return;
    answeredRef.current.add(q.id);
    // form_start no primeiro campo realmente respondido (início de preenchimento)
    if (!formStartFired) {
      formStartFired = true;
      dl("form_start", { form_id: FORM_ID, form_name: FORM_NAME });
    }
    // Evento por pergunta (nome próprio por etapa) — funil da jornada do lead
    emitStep(q);
  }, []);

  useEffect(() => { answersRef.current = answers; }, [answers]);
  useEffect(() => {
    phoneCountryRef.current = phoneCountry;
    // Ao trocar de país, trunca o número ao máximo da nova máscara
    const maxDigits = (phoneCountry.mask.match(/#/g) || []).length;
    setAnswers((prev) => {
      const digits = prev.telefone.replace(/\D/g, "").slice(0, maxDigits);
      return digits === prev.telefone ? prev : { ...prev, telefone: digits };
    });
  }, [phoneCountry]);

  // Fecha o dropdown de país ao clicar fora
  useEffect(() => {
    if (!countryOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-country-selector]")) setCountryOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [countryOpen]);

  function handleNext() {
    if (!validate()) return;
    if (isLast) {
      // Evento de funil do último campo, mas sem partial — o submit completo cobre tudo
      if (!answeredRef.current.has(current.id)) {
        answeredRef.current.add(current.id);
        if (!formStartFired) {
          formStartFired = true;
          dl("form_start", { form_id: FORM_ID, form_name: FORM_NAME });
        }
        emitStep(current);
      }
      handleSubmit();
      return;
    }
    reportAnswered(current);
    setDirection(1);
    setStep((s) => s + 1);
  }

  function handleBack() {
    if (step === 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
    setError("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && current.type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
  }

  async function handleSubmit() {
    setStatus("submitting");

    const payload = buildPayload({
      answers: answersRef.current,
      utms: utmsRef.current,
      respondentId: respondentIdRef.current,
      phoneCountryCode: phoneCountryRef.current.code,
    });

    await sendToWebhook(payload);

    // Conversão: dispara só na conclusão (GA4 + Meta acionados via GTM)
    dl("form_submit", { form_id: FORM_ID, form_name: FORM_NAME });
    dl("generate_lead", { form_id: FORM_ID });

    setStatus("done");

    // Redireciona ao /obrigado preservando as UTMs de origem.
    // Pequena folga para o GTM processar as tags de conversão antes da navegação.
    const dest = THANK_YOU_BASE + utmQueryString(utmsRef.current);
    setTimeout(() => { window.location.href = dest; }, 600);
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center text-center gap-5 py-14 px-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6A48F4, #143E66)" }}
        >
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-headline font-bold text-brand-text text-2xl">
          Recebemos suas respostas!
        </h3>
        <p className="font-body text-gray-500 text-sm">Redirecionando…</p>
      </div>
    );
  }

  return (
    <div className="bg-white px-6 py-8 sm:px-10 sm:py-10">
      {/* Barra de progresso */}
      <div className="w-full h-1.5 rounded-full overflow-hidden mb-2" style={{ background: "rgba(106,72,244,0.12)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      <p className="font-body text-gray-400 text-xs text-right mb-6">
        {step + 1} de {QUESTIONS.length}
      </p>

      <div className="min-h-[200px] flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <label
              htmlFor={current.id}
              className="font-headline font-bold text-brand-text text-xl lg:text-2xl leading-snug"
            >
              {current.title}
              {current.required && <span className="text-brand-primary ml-1" aria-hidden="true">*</span>}
            </label>

            {current.type === "textarea" ? (
              <textarea
                id={current.id}
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={current.placeholder}
                rows={4}
                className="w-full px-4 py-3 rounded-xl font-body text-base text-brand-text resize-none focus:outline-none transition-all duration-150"
                style={{
                  border: error ? "1.5px solid #EF4444" : "1.5px solid rgba(106,72,244,0.25)",
                  background: "#FBFAFF",
                }}
              />
            ) : current.type === "phone" ? (
              <div className="flex flex-col gap-2">
                <div
                  className="flex items-stretch rounded-xl overflow-visible"
                  style={{
                    border: error ? "1.5px solid #EF4444" : "1.5px solid rgba(106,72,244,0.25)",
                    background: "#FBFAFF",
                  }}
                >
                  {/* Seletor de país */}
                  <div className="relative" data-country-selector>
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
                        className="absolute left-0 top-full mt-1 z-20 w-56 max-h-60 overflow-auto rounded-xl bg-white py-1"
                        style={{ border: "1px solid rgba(106,72,244,0.20)", boxShadow: "0 8px 28px rgba(0,0,0,0.12)" }}
                        role="listbox"
                      >
                        {COUNTRIES.map((c) => (
                          <li key={`${c.iso}-${c.code}`}>
                            <button
                              type="button"
                              onClick={() => { setPhoneCountry(c); setCountryOpen(false); inputRef.current?.focus(); }}
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
                    id={current.id}
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type="tel"
                    inputMode="tel"
                    value={applyPhoneMask(currentValue, phoneCountry.mask)}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={phoneCountry.mask.replace(/#/g, "0")}
                    autoComplete="tel"
                    className="flex-1 min-w-0 px-3 py-3 bg-transparent font-body text-base text-brand-text focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <input
                id={current.id}
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={current.placeholder}
                autoComplete={current.id === "nome" ? "name" : "off"}
                className="w-full px-4 py-3 rounded-xl font-body text-base text-brand-text focus:outline-none transition-all duration-150"
                style={{
                  border: error ? "1.5px solid #EF4444" : "1.5px solid rgba(106,72,244,0.25)",
                  background: "#FBFAFF",
                }}
              />
            )}

            {error && <p className="font-body text-red-500 text-xs -mt-2">{error}</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-4 pt-6">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-1 font-body text-sm text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-0 disabled:pointer-events-none focus-visible:outline-none"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={status === "submitting"}
          className="flex items-center gap-2 px-7 py-3 rounded-xl font-body font-semibold text-sm text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:opacity-70"
          style={{
            background: "#6A48F4",
            boxShadow: "0 4px 14px rgba(106,72,244,0.35)",
          }}
        >
          {status === "submitting" ? "Enviando…" : isLast ? "Enviar" : (
            <>
              Continuar
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {current.type !== "textarea" && (
        <p className="font-body text-gray-400 text-xs text-center mt-4">
          Pressione <kbd className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(0,0,0,0.06)" }}>Enter</kbd> para continuar
        </p>
      )}
    </div>
  );
}
