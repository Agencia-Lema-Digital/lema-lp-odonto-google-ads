/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF ~20-30% menor que WebP para as mesmas imagens
    formats: ["image/avif", "image/webp"],
    // Cache longo nas respostas do /_next/image (default era 60s → PageSpeed flaggava).
    // Ao SUBSTITUIR uma imagem, renomeie o arquivo (ex.: founder-2.webp).
    minimumCacheTTL: 31536000,
  },
  async headers() {
    // `source` usa path-to-regexp (não regex livre) — a regra antiga com
    // /(.*\.(?:js|css|...)) nunca casava e o catch-all max-age=0 vencia em tudo.
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/logos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
