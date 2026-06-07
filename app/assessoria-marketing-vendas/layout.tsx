export default function AssessoriaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <head>
        {/* Preload da imagem LCP desta rota — sobrescreve o preload do layout raiz */}
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Fhero-general.webp&w=1080&q=75"
          fetchPriority="high"
        />
      </head>
      {children}
    </>
  );
}
