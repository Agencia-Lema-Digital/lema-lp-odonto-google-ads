import type { Metadata } from "next";
import { Fraunces, Caveat, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["200", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const GTM_ID = "GTM-KKZC4XQ6";

export const metadata: Metadata = {
  title: "Marketing e Vendas para Clínicas Odontológicas | Método TRINO — Lema Digital",
  description:
    "Assessoria especializada em clínicas odontológicas premium. Anúncio, atendimento e processo comercial num funil só. Diagnóstico gratuito de 30 minutos.",
  metadataBase: new URL("https://diagnostico.lemaagdigital.com.br"),
  alternates: {
    canonical: "https://diagnostico.lemaagdigital.com.br",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Marketing e Vendas para Clínicas Odontológicas | Método TRINO — Lema Digital",
    description:
      "Assessoria especializada em clínicas odontológicas premium. Anúncio, atendimento e processo comercial num funil só. Diagnóstico gratuito de 30 minutos.",
    url: "https://diagnostico.lemaagdigital.com.br",
    siteName: "Lema Digital",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lema Digital — Marketing para Clínicas Odontológicas",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${caveat.variable} ${poppins.variable}`}
    >
      <head />
      <body className="font-body antialiased bg-white text-brand-text">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {children}

        {/* GTM loader — afterInteractive para não bloquear o parser */}
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />

        {/* Listeners de eventos para o GTM */}
        <Script id="tracking-events" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            (function() {
              var fired = false;
              var startTime = Date.now();
              window.addEventListener('scroll', function() {
                if (fired) return;
                var scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
                var elapsed = (Date.now() - startTime) / 1000;
                if (scrolled >= 0.75 && elapsed >= 30) {
                  window.dataLayer.push({ event: 'scroll_75' });
                  fired = true;
                }
              });
            })();

            window.addEventListener('message', function(e) {
              if (!e.data || typeof e.data !== 'object') return;
              if (e.data.type === 'respondi:start') {
                window.dataLayer.push({ event: 'form_start' });
              }
              if (e.data.type === 'respondi:submit' || e.data.type === 'respondi:complete') {
                window.dataLayer.push({ event: 'form_submit' });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
