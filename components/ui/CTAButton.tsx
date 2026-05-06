"use client";

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

  const sizeClasses =
    size === "lg"
      ? "min-h-[52px] px-10 py-4 text-base md:text-lg"
      : "min-h-[44px] px-8 py-3 text-sm md:text-base";

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center
        rounded-[8px] bg-brand-primary text-white
        font-body font-semibold
        cursor-pointer
        touch-action-manipulation
        hover:bg-[#5538d4]
        active:scale-[0.98]
        transition-all duration-150 ease-out
        hover:shadow-[0_8px_24px_rgba(106,72,244,0.35)]
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-brand-primary focus-visible:ring-offset-2
        ${sizeClasses} ${className}
      `}
      aria-label={label}
    >
      {label}
    </button>
  );
}
