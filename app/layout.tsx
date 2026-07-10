import type { Metadata } from "next";
import { Fraunces, Caveat, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["200", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600"],
  display: "optional",
  preload: false,
  adjustFontFallback: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "optional",
  preload: false,
  adjustFontFallback: true,
});

const GTM_ID = "GTM-56DF7VH";

// Metadados base — cada page.tsx define os seus próprios (title, description, canonical, og, twitter)
export const metadata: Metadata = {
  metadataBase: new URL("https://diagnostico.lemaagdigital.com.br"),
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
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
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

        {/* GTM loader — afterInteractive, carregamento imediato: página de campanha,
            o tracking não pode ser adiado (decisão de negócio). */}
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
          `}
        </Script>
      </body>
    </html>
  );
}
