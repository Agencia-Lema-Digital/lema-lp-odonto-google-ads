"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 800;

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [nearForm, setNearForm] = useState(false);
  // Algum botão CTA "real" da página está visível no viewport?
  const [ctaInView, setCtaInView] = useState(false);

  // Scroll: controla aparição após o threshold e proximidade do formulário
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);

      const form = document.getElementById("lead-form");
      if (form) {
        const rect = form.getBoundingClientRect();
        setNearForm(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observa todos os CTAButton ([data-cta]) — enquanto algum estiver visível
  // no viewport, o sticky se esconde (evita CTA duplicado). Como as seções
  // carregam via dynamic(ssr:false), um MutationObserver re-observa os CTAs
  // que montam depois.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const visibleCtas = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleCtas.add(entry.target);
          else visibleCtas.delete(entry.target);
        }
        setCtaInView(visibleCtas.size > 0);
      },
      // Margem negativa: só conta como "visível" quando entra de fato na tela,
      // não nas bordas extremas — evita flicker do sticky.
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    const observed = new WeakSet<Element>();
    const observeAll = () => {
      document.querySelectorAll("[data-cta]").forEach((el) => {
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

  const handleClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cta_click", cta_label: "sticky_mobile_cta" });
    const form = document.getElementById("lead-form");
    if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const show = visible && !nearForm && !ctaInView;

  return (
    <div
      aria-hidden={!show}
      className={`
        fixed bottom-0 left-0 right-0 z-50
        lg:hidden
        transition-transform duration-300 ease-in-out
        ${show ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="bg-[#0C0F1A]/95 backdrop-blur-sm border-t border-white/10 px-4 py-3">
        <button
          onClick={handleClick}
          tabIndex={show ? 0 : -1}
          className="
            w-full min-h-[48px] px-6 py-3
            rounded-[8px] bg-brand-primary text-white
            font-body font-semibold text-sm
            active:scale-[0.98]
            transition-all duration-150 ease-out
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-brand-primary focus-visible:ring-offset-2
          "
        >
          Quero meu diagnóstico gratuito
        </button>
      </div>
    </div>
  );
}
