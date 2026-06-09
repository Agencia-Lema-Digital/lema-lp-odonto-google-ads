"use client";

import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 800;

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [nearForm, setNearForm] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > SCROLL_THRESHOLD;
      setVisible(scrolled);

      const form = document.getElementById("lead-form");
      if (form) {
        const rect = form.getBoundingClientRect();
        setNearForm(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cta_click", cta_label: "sticky_mobile_cta" });
    const form = document.getElementById("lead-form");
    if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const show = visible && !nearForm;

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
