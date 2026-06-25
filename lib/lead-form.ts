// Helpers compartilhados de captura de lead (formato Respondi/Make).
// Usados tanto pelo NativeLeadForm (formulário da seção) quanto pelo
// WhatsAppWidget (botão flutuante). Centraliza países/máscara, UTMs e a
// montagem do payload para garantir a MESMA estrutura nos dois fluxos —
// a diferenciação entre origens é feita apenas pelo form_id/form_name.

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type Utms = Record<UtmKey, string>;

// ── Países (código + bandeira + máscara) ──────────────────────────────────────

export interface Country {
  code: string; // DDI sem "+"
  iso: string; // ISO 3166-1 alpha-2 (para a bandeira emoji)
  name: string;
  flag: string; // emoji
  mask: string; // "#" = dígito; usado para formatar o número local
  minDigits: number; // mínimo de dígitos do número local p/ validar
}

export const COUNTRIES: Country[] = [
  { code: "55", iso: "BR", name: "Brasil", flag: "🇧🇷", mask: "(##) #####-####", minDigits: 11 },
  { code: "1", iso: "US", name: "Estados Unidos", flag: "🇺🇸", mask: "(###) ###-####", minDigits: 10 },
  { code: "351", iso: "PT", name: "Portugal", flag: "🇵🇹", mask: "### ### ###", minDigits: 9 },
  { code: "44", iso: "GB", name: "Reino Unido", flag: "🇬🇧", mask: "##### ######", minDigits: 10 },
  { code: "34", iso: "ES", name: "Espanha", flag: "🇪🇸", mask: "### ## ## ##", minDigits: 9 },
  { code: "54", iso: "AR", name: "Argentina", flag: "🇦🇷", mask: "## ####-####", minDigits: 10 },
  { code: "52", iso: "MX", name: "México", flag: "🇲🇽", mask: "## #### ####", minDigits: 10 },
  { code: "351", iso: "AO", name: "Angola", flag: "🇦🇴", mask: "### ### ###", minDigits: 9 },
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // Brasil

// Aplica a máscara do país sobre os dígitos crus
export function applyPhoneMask(digits: string, mask: string): string {
  let out = "";
  let di = 0;
  for (const ch of mask) {
    if (di >= digits.length) break;
    if (ch === "#") {
      out += digits[di];
      di++;
    } else out += ch;
  }
  return out;
}

export function maxDigitsOf(mask: string): number {
  return (mask.match(/#/g) || []).length;
}

// ── UTMs ──────────────────────────────────────────────────────────────────────

export function collectUtms(): Utms {
  const out = Object.fromEntries(UTM_KEYS.map((k) => [k, ""])) as Utms;
  if (typeof window === "undefined") return out;
  const p = new URLSearchParams(window.location.search);
  for (const k of UTM_KEYS) out[k] = p.get(k) || "";
  return out;
}

// Monta a query string apenas com as UTMs presentes (para anexar a redirects)
export function utmQueryString(utms: Utms): string {
  const p = new URLSearchParams();
  for (const k of UTM_KEYS) if (utms[k]) p.set(k, utms[k]);
  const s = p.toString();
  return s ? `?${s}` : "";
}

// ── Identificadores e timestamp ────────────────────────────────────────────────

export function genId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function nowStamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
    d.getMinutes()
  )}:${pad(d.getSeconds())}`;
}

// ── Payload (formato Respondi) ─────────────────────────────────────────────────

export interface PayloadQuestion {
  id: string;
  title: string;
  type: "name" | "phone" | "text" | "textarea";
}

// Monta o payload no formato Respondi (array com form/respondent).
// `formName`/`formId` permitem distinguir a origem (formulário vs. WhatsApp).
export function buildLeadPayload(opts: {
  formName: string;
  formId: string;
  questions: PayloadQuestion[];
  answers: Record<string, string>;
  utms: Utms;
  respondentId: string;
  phoneCountryCode: string;
}) {
  const { formName, formId, questions, answers, utms, respondentId, phoneCountryCode } = opts;

  const answersMap: Record<string, string> = {};
  const rawAnswers: unknown[] = [];

  for (const q of questions) {
    const value = answers[q.id] || "";

    if (q.type === "phone") {
      const digits = value.replace(/\D/g, "");
      if (digits) answersMap[q.title] = `+${phoneCountryCode} ${digits}`;
      rawAnswers.push({
        question: { question_title: q.title, question_id: q.id, question_type: "phone" },
        answer: { country: phoneCountryCode, phone: digits },
      });
    } else {
      if (value) answersMap[q.title] = value;
      rawAnswers.push({
        question: { question_title: q.title, question_id: q.id, question_type: q.type },
        answer: value,
      });
    }
  }

  return [
    {
      form: { form_name: formName, form_id: formId },
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

// Envia ao proxy /api/lead (que reenvia ao Make). keepalive p/ sobreviver ao unload.
export async function sendLeadToWebhook(payload: unknown) {
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

// Empurra evento pro dataLayer (GA4/Meta via GTM)
export function dl(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
