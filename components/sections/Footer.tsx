import Image from "next/image";
import FadeInSection from "@/components/ui/FadeInSection";

const COPY = {
  brand: "Lema Digital",
  tagline: "Assessoria de Marketing e Vendas para clínicas odontológicas premium.",
  razaoSocial: "LEMA ASSESSORIA DE MARKETING E VENDAS LTDA",
  cnpj: "CNPJ: 32.119.177/0001-06",
  columns: [
    {
      title: "Contato",
      links: [
        {
          label: "contato@lemaagdigital.com.br",
          href: "mailto:contato@lemaagdigital.com.br",
        },
        {
          label: "WhatsApp: (85) 2180-5862",
          href: "#",
        },
        {
          label: "Fortaleza, CE — atendimento 100% remoto",
          href: "#",
        },
      ],
    },
    {
      title: "Redes",
      links: [
        {
          label: "Instagram (@lemaagdigital)",
          href: "https://instagram.com/lemaagdigital",
        },
        {
          label: "LinkedIn",
          href: "#",
        },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Lema Digital`,
  legalLinks: [
    { label: "Política de Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
  ],
};

export default function Footer({ tagline }: { tagline?: string }) {
  const resolvedTagline = tagline ?? COPY.tagline;
  return (
    <footer style={{ background: "#060A14" }} className="text-white">
      {/* Linha de topo degradê */}
      <div
        style={{ background: "linear-gradient(90deg, #6A48F4, #4C2FC4, #143E66)" }}
        className="h-1"
        aria-hidden="true"
      />

      <FadeInSection>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {/* Identidade */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <Image
                  src="/logos/logo-lema.png"
                  alt="Lema Digital — Agência Digital"
                  width={160}
                  height={72}
                  className="object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>
              <p className="font-body text-gray-400 text-sm leading-relaxed mb-4">
                {resolvedTagline}
              </p>
              <p className="font-body text-gray-600 text-xs">
                {COPY.razaoSocial}
              </p>
              <p className="font-body text-gray-600 text-xs mt-1">
                {COPY.cnpj}
              </p>
            </div>

            {/* Colunas de links */}
            {COPY.columns.map((col, i) => (
              <div key={i}>
                <h4
                  className="font-body font-semibold text-xs mb-5 uppercase tracking-widest"
                  style={{
                    background: "linear-gradient(135deg, #6A48F4, #4C2FC4)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-body text-gray-500 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-gray-600 text-xs">
              {COPY.copyright}
            </p>
            <div className="flex items-center gap-4">
              {COPY.legalLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="font-body text-gray-600 text-xs hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </FadeInSection>
    </footer>
  );
}
