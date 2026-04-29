"use client";

import { motion } from "framer-motion";

interface CTAButtonProps {
  label?: string;
  size?: "default" | "lg";
  className?: string;
}

export default function CTAButton({
  label = "Quero meu diagnóstico gratuito",
  size = "default",
  className = "",
}: CTAButtonProps) {
  const handleClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "cta_click", cta_label: label });
    const target = document.getElementById("lead-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // min-h-[44px] garante touch target mínimo (Apple HIG / Material)
  const sizeClasses =
    size === "lg"
      ? "min-h-[52px] px-10 py-4 text-base md:text-lg"
      : "min-h-[44px] px-8 py-3 text-sm md:text-base";

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 24px rgba(106, 72, 244, 0.35)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`
        inline-flex items-center justify-center
        rounded-[8px] bg-brand-primary text-white
        font-body font-semibold
        cursor-pointer
        touch-action-manipulation
        hover:bg-[#5538d4]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-brand-primary focus-visible:ring-offset-2
        ${sizeClasses} ${className}
      `}
      aria-label={label}
    >
      {label}
    </motion.button>
  );
}
