"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";

// ── Tipos ────────────────────────────────────────────────────────────────────

type FieldType = "text" | "tel" | "email" | "select" | "textarea";

interface Field {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface FormData {
  nome: string;
  whatsapp: string;
  email: string;
  cidade_estado: string;
  site_instagram: string;
  faturamento: string;
  foco_clinica: string;
  equipe_atendimento: string;
  trafego_pago: string;
  maior_gargalo: string;
  // UTMs ocultos
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
}

// ── Perguntas ─────────────────────────────────────────────────────────────────

const FIELDS: Field[] = [
  {
    id: "nome",
    label: "Qual é o seu nome completo?",
    type: "text",
    required: true,
    placeholder: "Ex: Dra. Ana Paula Souza",
  },
  {
    id: "whatsapp",
    label: "Qual é o seu WhatsApp (com DDD)?",
    type: "tel",
    required: true,
    placeholder: "Ex: (85) 99999-9999",
  },
  {
    id: "email",
    label: "Qual é o seu e-mail?",
    type: "email",
    required: true,
    placeholder: "Ex: ana@clinicasouza.com.br",
  },
  {
    id: "cidade_estado",
    label: "Qual cidade e estado você atua?",
    type: "text",
    required: true,
    placeholder: "Ex: Fortaleza, CE",
  },
  {
    id: "site_instagram",
    label: "Site ou Instagram da clínica",
    type: "text",
    required: false,
    placeholder: "Ex: @clinicasouza ou www.clinicasouza.com.br",
  },
  {
    id: "faturamento",
    label: "Qual o faturamento médio mensal da clínica?",
    type: "select",
    required: true,
    options: [
      "Até R$30 mil",
      "R$30 mil a R$50 mil",
      "R$50 mil a R$100 mil",
      "Acima de R$100 mil",
    ],
  },
  {
    id: "foco_clinica",
    label: "Qual o foco principal da clínica?",
    type: "select",
    required: true,
    options: [
      "Odontologia estética",
      "Implantodontia",
      "Reabilitação",
      "Clínico geral",
      "Outro",
    ],
  },
  {
    id: "equipe_atendimento",
    label: "Quantas pessoas no atendimento comercial / WhatsApp?",
    type: "select",
    required: true,
    options: ["0", "1", "2 a 3", "4 ou mais"],
  },
  {
    id: "trafego_pago",
    label: "Já investiu em tráfego pago antes?",
    type: "select",
    required: true,
    options: [
      "Sim, com bom resultado",
      "Sim, sem retorno",
      "Não, nunca",
      "Estou começando agora",
    ],
  },
  {
    id: "maior_gargalo",
    label: "Qual o maior gargalo da sua clínica hoje?",
    type: "textarea",
    required: false,
    placeholder: "Conte brevemente o principal desafio que você enfrenta...",
  },
];

const WEBHOOK_URL =
  "https://hook.us1.make.com/6ryi9x0r8gboof6j7y1ovfxfwi8p9tlt";

// ── Helpers ───────────────────────────────────────────────────────────────────

function getUTMParams(): Partial<FormData> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get("utm_source")   || "",
    utm_medium:   p.get("utm_medium")   || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_term:     p.get("utm_term")     || "",
    utm_content:  p.get("utm_content")  || "",
    gclid:        p.get("gclid")        || "",
    fbclid:       p.get("fbclid")       || "",
  };
}

function isLowPriorityProfile(data: FormData): boolean {
  return (
    data.faturamento === "Até R$30 mil" &&
    data.equipe_atendimento === "0"
  );
}

function buildPayload(data: FormData) {
  const labels: Record<string, string> = {
    nome:               "Nome completo",
    whatsapp:           "WhatsApp",
    email:              "E-mail",
    cidade_estado:      "Cidade / Estado",
    site_instagram:     "Site ou Instagram",
    faturamento:        "Faturamento médio mensal",
    foco_clinica:       "Foco principal da clínica",
    equipe_atendimento: "Equipe de atendimento",
    trafego_pago:       "Tráfego pago",
    maior_gargalo:      "Maior gargalo",
    utm_source:         "UTM Source",
    utm_medium:         "UTM Medium",
    utm_campaign:       "UTM Campaign",
    utm_term:           "UTM Term",
    utm_content:        "UTM Content",
    gclid:              "GCLID",
    fbclid:             "FBCLID",
  };

  // String completa formatada
  const resumo = Object.entries(labels)
    .map(([key, label]) => `${label}: ${(data as Record<string, string>)[key] || "—"}`)
    .join("\n");

  return {
    // Campos individuais
    nome:               data.nome,
    whatsapp:           data.whatsapp,
    email:              data.email,
    cidade_estado:      data.cidade_estado,
    site_instagram:     data.site_instagram || "—",
    faturamento:        data.faturamento,
    foco_clinica:       data.foco_clinica,
    equipe_atendimento: data.equipe_atendimento,
    trafego_pago:       data.trafego_pago,
    maior_gargalo:      data.maior_gargalo || "—",
    utm_source:         data.utm_source,
    utm_medium:         data.utm_medium,
    utm_campaign:       data.utm_campaign,
    utm_term:           data.utm_term,
    utm_content:        data.utm_content,
    gclid:              data.gclid,
    fbclid:             data.fbclid,
    perfil_prioritario: isLowPriorityProfile(data) ? "Não" : "Sim",
    // String completa
    resumo_completo:    resumo,
  };
}

// ── Componente principal ──────────────────────────────────────────────────────

const EMPTY: FormData = {
  nome: "", whatsapp: "", email: "", cidade_estado: "",
  site_instagram: "", faturamento: "", foco_clinica: "",
  equipe_atendimento: "", trafego_pago: "", maior_gargalo: "",
  utm_source: "", utm_medium: "", utm_campaign: "",
  utm_term: "", utm_content: "", gclid: "", fbclid: "",
};

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [error, setError] = useState("");
  const [direction, setDirection] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success_priority" | "success_low">("idle");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null);

  const currentField = FIELDS[step];
  const isLast = step === FIELDS.length - 1;
  const progress = ((step) / FIELDS.length) * 100;

  // Capturar UTMs na montagem
  useEffect(() => {
    setData((prev) => ({ ...prev, ...getUTMParams() }));
  }, []);

  // Focar input ao mudar de step
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300);
  }, [step]);

  const currentValue = data[currentField.id as keyof FormData];

  function validate(): boolean {
    if (!currentField.required) return true;
    if (!currentValue || currentValue.trim() === "") {
      setError("Este campo é obrigatório.");
      return false;
    }
    if (currentField.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValue)) {
      setError("Digite um e-mail válido.");
      return false;
    }
    if (currentField.type === "tel" && currentValue.replace(/\D/g, "").length < 10) {
      setError("Digite um WhatsApp válido com DDD.");
      return false;
    }
    return true;
  }

  function handleChange(val: string) {
    setError("");
    setData((prev) => ({ ...prev, [currentField.id]: val }));
  }

  function handleNext() {
    if (!validate()) return;
    if (isLast) {
      handleSubmit();
      return;
    }
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
    if (e.key === "Enter" && currentField.type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
  }

  async function handleSubmit() {
    setStatus("submitting");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(data)),
        mode: "no-cors",
      });
    } catch {
      // no-cors: fetch resolve mesmo sem resposta legível
    }
    setStatus(isLowPriorityProfile(data) ? "success_low" : "success_priority");
  }

  // ── Tela de sucesso ──────────────────────────────────────────────────────────

  if (status === "success_priority") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center gap-6 py-12 px-6"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6A48F4, #143E66)" }}
        >
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-headline font-bold text-brand-dark text-2xl lg:text-3xl">
          Recebemos suas respostas!
        </h3>
        <p className="font-body text-gray-600 text-base max-w-sm leading-relaxed">
          Nossa equipe vai entrar em contato pelo WhatsApp em até <strong>1 dia útil</strong> para confirmar a sua reunião de diagnóstico.
        </p>
        <p className="font-body text-gray-400 text-sm">
          Fique de olho no WhatsApp <strong>{data.whatsapp}</strong>
        </p>
      </motion.div>
    );
  }

  if (status === "success_low") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center gap-6 py-12 px-6"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6A48F4, #143E66)" }}
        >
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-headline font-bold text-brand-dark text-2xl lg:text-3xl">
          Obrigado pelo interesse!
        </h3>
        <p className="font-body text-gray-600 text-base max-w-sm leading-relaxed">
          Pelo perfil atual, recomendamos primeiro estruturar o atendimento antes de escalar com tráfego. Vamos te enviar por e-mail um material gratuito sobre isso.
        </p>
        <p className="font-body text-gray-400 text-sm">
          Enviamos para <strong>{data.email}</strong>
        </p>
      </motion.div>
    );
  }

  // ── Formulário ───────────────────────────────────────────────────────────────

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Barra de progresso */}
      <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(106,72,244,0.12)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Contador */}
      <p className="font-body text-gray-400 text-xs text-right">
        {step + 1} de {FIELDS.length}
      </p>

      {/* Pergunta animada */}
      <div className="min-h-[220px] flex flex-col justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <label
              htmlFor={currentField.id}
              className="font-headline font-bold text-brand-dark text-xl lg:text-2xl leading-snug"
            >
              {currentField.label}
              {currentField.required && (
                <span className="text-brand-primary ml-1" aria-hidden="true">*</span>
              )}
            </label>

            {/* Input por tipo */}
            {currentField.type === "select" ? (
              <div className="flex flex-col gap-2">
                {currentField.options!.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { handleChange(opt); setError(""); }}
                    className="text-left px-4 py-3 rounded-xl font-body text-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    style={{
                      border: currentValue === opt
                        ? "2px solid #6A48F4"
                        : "1.5px solid rgba(106,72,244,0.20)",
                      background: currentValue === opt
                        ? "rgba(106,72,244,0.08)"
                        : "white",
                      color: currentValue === opt ? "#6A48F4" : "#374151",
                      fontWeight: currentValue === opt ? 600 : 400,
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : currentField.type === "textarea" ? (
              <textarea
                id={currentField.id}
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={currentField.placeholder}
                rows={4}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-brand-dark resize-none focus:outline-none transition-all duration-150"
                style={{
                  border: error ? "1.5px solid #EF4444" : "1.5px solid rgba(106,72,244,0.25)",
                  background: "white",
                }}
              />
            ) : (
              <input
                id={currentField.id}
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={currentField.type}
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentField.placeholder}
                className="w-full px-4 py-3 rounded-xl font-body text-sm text-brand-dark focus:outline-none transition-all duration-150"
                style={{
                  border: error ? "1.5px solid #EF4444" : "1.5px solid rgba(106,72,244,0.25)",
                  background: "white",
                }}
              />
            )}

            {/* Erro */}
            {error && (
              <p className="font-body text-red-500 text-xs -mt-2">{error}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegação */}
      <div className="flex items-center justify-between gap-4 pt-2">
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
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold text-sm text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:opacity-70"
          style={{
            background: "linear-gradient(135deg, #6A48F4 0%, #4C2FC4 45%, #143E66 100%)",
            boxShadow: "0 4px 14px rgba(106,72,244,0.35)",
          }}
        >
          {status === "submitting" ? (
            "Enviando..."
          ) : isLast ? (
            "Agendar diagnóstico"
          ) : (
            <>
              Continuar
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Enter hint — apenas para campos de texto */}
      {currentField.type !== "select" && currentField.type !== "textarea" && (
        <p className="font-body text-gray-400 text-xs text-center">
          Pressione <kbd className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(0,0,0,0.06)" }}>Enter</kbd> para continuar
        </p>
      )}
    </div>
  );
}
