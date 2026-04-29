// Elementos SVG decorativos para odontologia estética.
// Referências visuais reais do universo clínico: análise de sorriso,
// proporção áurea, reflexo de porcelana, traçados cefalométricos.
// Linha fina, abstrato, nunca cartoon.

/**
 * SmileDesignArc — curva de análise de sorriso.
 * Inspirado no protocolo DSD (Digital Smile Design): a linha guia
 * horizontal que o dentista traça sobre o sorriso do paciente para
 * projetar o resultado estético. Inclui marcações técnicas sutis.
 */
export function SmileDesignArc({
  className = "",
  opacity = 0.07,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Linha guia horizontal — referência de sorriso DSD */}
      <line x1="20" y1="80" x2="300" y2="80" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" />

      {/* Curva do arco labial — linha do lábio superior */}
      <path
        d="M30 80 C80 42 140 28 160 28 C180 28 240 42 290 80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Curva gengival — linha de margem */}
      <path
        d="M55 78 C80 60 120 50 160 50 C200 50 240 60 265 78"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="2 4"
      />

      {/* Marcadores de proporção — pontos técnicos */}
      {[55, 88, 118, 160, 202, 232, 265].map((x, i) => (
        <circle key={i} cx={x} cy={i === 3 ? 50 : i === 0 || i === 6 ? 78 : i === 1 || i === 5 ? 66 : 58} r="2" fill="currentColor" />
      ))}

      {/* Linha central — eixo de simetria */}
      <line x1="160" y1="20" x2="160" y2="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.6" />

      {/* Tick marks — referências métricas */}
      <line x1="55" y1="74" x2="55" y2="86" stroke="currentColor" strokeWidth="0.75" />
      <line x1="265" y1="74" x2="265" y2="86" stroke="currentColor" strokeWidth="0.75" />
      <line x1="160" y1="76" x2="160" y2="84" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

/**
 * GoldenRatioSpiral — espiral da proporção áurea (φ = 1.618).
 * Dentistas de estética usam o compasso de proporção áurea para
 * calcular largura/altura ideais dos dentes. Elemento sofisticado
 * que comunica precisão científica ao profissional.
 */
export function GoldenRatioSpiral({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Retângulos áureos aninhados */}
      <rect x="10" y="10" width="180" height="111" stroke="currentColor" strokeWidth="0.75" />
      <rect x="10" y="10" width="111" height="111" stroke="currentColor" strokeWidth="0.75" />
      <rect x="79" y="10" width="69" height="42.6" stroke="currentColor" strokeWidth="0.75" />
      <rect x="79" y="52.6" width="42.6" height="68.4" stroke="currentColor" strokeWidth="0.5" />
      <rect x="121.6" y="52.6" width="26.4" height="42.6" stroke="currentColor" strokeWidth="0.5" />

      {/* Espiral de Fibonacci — arcos encadeados */}
      <path
        d="M121 121 Q10 121 10 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M121 52.6 Q121 121 79 121"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M148 52.6 Q121 52.6 121 79"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M148 95.2 Q148 52.6 121.6 52.6"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
      />

      {/* Ponto áureo central */}
      <circle cx="121" cy="79" r="2.5" fill="currentColor" />

      {/* Label φ estilizado */}
      <text
        x="168"
        y="155"
        fontFamily="serif"
        fontSize="22"
        fill="currentColor"
        opacity="0.5"
        fontStyle="italic"
      >
        φ
      </text>
    </svg>
  );
}

/**
 * PorcelainReflection — reflexo especular de faceta de porcelana.
 * Simula o brilho vítreo característico das facetas laminadas —
 * o produto final mais desejado na odontologia estética.
 * Forma: incisivo central com highlight de reflexo e translucidez.
 */
export function PorcelainReflection({
  className = "",
  opacity = 0.07,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="enamel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Silhueta do incisivo central — anatomia real */}
      <path
        d="M18 6 C18 6 28 3 50 3 C72 3 82 6 82 6 L84 75 C84 108 70 135 50 135 C30 135 16 108 16 75 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="url(#enamel-grad)"
        fillOpacity="0.08"
      />

      {/* Borda incisal — linha de desgaste natural */}
      <path
        d="M24 8 C30 5 42 3.5 50 3.5 C58 3.5 70 5 76 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Reflexo especular principal — highlight de porcelana */}
      <path
        d="M26 18 C28 12 36 8 44 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Reflexo secundário — profundidade vítreo */}
      <path
        d="M30 32 C31 27 36 24 42 25"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Ponto de luz — especular central */}
      <ellipse cx="35" cy="15" rx="3" ry="1.5" fill="currentColor" opacity="0.7" transform="rotate(-30 35 15)" />

      {/* Linhas de estratificação — camadas de cerâmica */}
      <line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 6" opacity="0.4" />
      <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 6" opacity="0.3" />
    </svg>
  );
}

/**
 * CephalometricLines — traçado cefalométrico estilizado.
 * Referência ao planejamento de tratamento ortodôntico/cirúrgico:
 * as linhas e ângulos que dentistas traçam sobre radiografias e fotos
 * para análise facial. Elemento premium que só um profissional reconhece.
 */
export function CephalometricLines({
  className = "",
  opacity = 0.055,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Perfil facial simplificado — linha de contorno */}
      <path
        d="M140 20 C160 20 185 35 190 65 C195 90 188 110 180 125 C172 140 168 150 170 165 C172 178 165 195 150 205 C138 212 128 215 120 215 C108 215 95 210 88 200"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Linha de Frankfurt — horizontal de referência craniofacial */}
      <line x1="20" y1="90" x2="220" y2="90" stroke="currentColor" strokeWidth="0.75" strokeDasharray="8 4" />

      {/* Plano oclusal */}
      <line x1="40" y1="155" x2="195" y2="148" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 5" />

      {/* Linha SN — base craniana anterior */}
      <line x1="50" y1="50" x2="195" y2="65" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" />

      {/* Plano mandibular */}
      <line x1="30" y1="220" x2="180" y2="195" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 5" />

      {/* Pontos cefalométricos — landmarks */}
      {[
        [140, 20],   // N - Násio
        [188, 65],   // S - Sela
        [180, 125],  // A
        [170, 165],  // B
        [150, 205],  // Pog
        [100, 90],   // Or - Orbital
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" />
      ))}

      {/* Ângulo ANB — arco de medição */}
      <path
        d="M180 125 A25 25 0 0 1 170 165"
        stroke="currentColor"
        strokeWidth="0.75"
        fill="none"
        strokeDasharray="2 3"
      />

      {/* Linha E de Ricketts — perfil labial */}
      <line x1="150" y1="205" x2="175" y2="125" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.7" />
    </svg>
  );
}

/**
 * OcclusalGrid — vista oclusal de arcada dentária superior.
 * Perspectiva de cima para baixo — como dentistas enxergam ao sentar
 * o paciente na cadeira. Dois arcos concêntricos com dentes esquemáticos.
 * Elemento de reconhecimento imediato para o profissional.
 */
export function OcclusalGrid({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Arco externo — contorno da arcada */}
      <path
        d="M20 160 C20 80 50 20 110 16 C170 20 200 80 200 160"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arco interno — linha gengival */}
      <path
        d="M44 155 C44 95 65 48 110 44 C155 48 176 95 176 155"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeDasharray="3 4"
        fill="none"
      />
      {/* Dentes esquemáticos — vista oclusal */}
      {[
        { x: 72, y: 22, w: 16, h: 22, r: 5 },   // incisivo central E
        { x: 112, y: 20, w: 16, h: 22, r: 5 },  // incisivo central D
        { x: 51, y: 32, w: 14, h: 20, r: 4 },   // incisivo lateral E
        { x: 155, y: 32, w: 14, h: 20, r: 4 },  // incisivo lateral D
        { x: 33, y: 52, w: 13, h: 22, r: 4 },   // canino E
        { x: 174, y: 52, w: 13, h: 22, r: 4 },  // canino D
        { x: 22, y: 82, w: 18, h: 24, r: 5 },   // pré-molar E
        { x: 180, y: 82, w: 18, h: 24, r: 5 },  // pré-molar D
        { x: 20, y: 116, w: 22, h: 28, r: 5 },  // molar E
        { x: 178, y: 116, w: 22, h: 28, r: 5 }, // molar D
      ].map((d, i) => (
        <rect
          key={i}
          x={d.x - d.w / 2}
          y={d.y}
          width={d.w}
          height={d.h}
          rx={d.r}
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.06"
        />
      ))}
      {/* Linha de simetria */}
      <line x1="110" y1="14" x2="110" y2="165" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 5" opacity="0.5" />
    </svg>
  );
}

/**
 * XRayFragment — fragmento de radiografia panorâmica estilizado.
 * Dentistas vivem olhando panorâmicas. Silhueta abstrata de mandíbula
 * e maxilar com raízes dentárias — linha fina, técnico, premium.
 */
export function XRayFragment({
  className = "",
  opacity = 0.055,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Contorno da mandíbula */}
      <path
        d="M10 60 C10 30 30 15 60 12 L240 12 C270 15 290 30 290 60 L290 90 C290 115 270 128 240 128 C220 128 200 122 180 118 C160 114 140 114 120 118 C100 122 80 128 60 128 C30 128 10 115 10 90 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Raízes dos dentes — superiores */}
      {[50, 78, 102, 126, 150, 174, 198, 222, 248].map((x, i) => (
        <g key={i}>
          <line
            x1={x}
            y1={12}
            x2={x - (i < 4 ? 3 : i > 5 ? 3 : 0)}
            y2={i < 2 || i > 6 ? 38 : 44}
            stroke="currentColor"
            strokeWidth={i === 4 ? 1.8 : 1.2}
            strokeLinecap="round"
          />
          {/* Raiz dupla em molares */}
          {(i === 0 || i === 8) && (
            <line x1={x + 6} y1={12} x2={x + 8} y2={34} stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          )}
        </g>
      ))}
      {/* Canal radicular — linha interna */}
      {[102, 126, 150, 174, 198].map((x, i) => (
        <line key={i} x1={x} y1={16} x2={x} y2={i === 2 ? 36 : 32} stroke="currentColor" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.6" />
      ))}
      {/* Seio maxilar — oval translúcido */}
      <ellipse cx="80" cy="55" rx="28" ry="18" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 4" />
      <ellipse cx="220" cy="55" rx="28" ry="18" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 4" />
    </svg>
  );
}

/**
 * ProbeGrid — sonda periodontal com marcações métricas.
 * Instrumento de medição clínica — 6 marcas em mm que toda
 * equipe odontológica conhece. Abstrato, técnico, elegante.
 */
export function ProbeGrid({
  className = "",
  opacity = 0.065,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Cabo — parte superior */}
      <rect x="14" y="4" width="12" height="60" rx="6" stroke="currentColor" strokeWidth="1.5" />
      {/* Estriamento do cabo */}
      {[14, 20, 26, 32, 38, 44, 50].map((y) => (
        <line key={y} x1="14" y1={y} x2="26" y2={y} stroke="currentColor" strokeWidth="0.6" />
      ))}
      {/* Junção cabo/haste */}
      <rect x="16" y="62" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1" />
      {/* Haste delgada */}
      <line x1="20" y1="70" x2="20" y2="195" stroke="currentColor" strokeWidth="1.5" />
      {/* Marcações métricas — padrão clínico 3-6-8-11mm */}
      {[85, 100, 115, 130, 145, 160].map((y, i) => (
        <g key={y}>
          <line x1={i % 2 === 0 ? 14 : 16} y1={y} x2={i % 2 === 0 ? 26 : 24} y2={y} stroke="currentColor" strokeWidth={i % 2 === 0 ? 1.2 : 0.75} />
        </g>
      ))}
      {/* Ponta ativa arredondada */}
      <circle cx="20" cy="198" r="3" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/**
 * DentalMirror — espelho clínico odontológico visto de perfil.
 * Objeto icônico do consultório — abstrato, geométrico, minimalista.
 * Evoca o ambiente clínico sem ser literal ou cartoon.
 */
export function DentalMirror({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Cabo — cilindro estilizado */}
      <rect x="34" y="80" width="12" height="115" rx="6" stroke="currentColor" strokeWidth="1.5" />

      {/* Anel de junção cabo/cabeça */}
      <rect x="30" y="72" width="20" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" />

      {/* Cabeça circular — espelho */}
      <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" />

      {/* Reflexo especular no espelho */}
      <path
        d="M24 28 C28 22 36 18 44 20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Segundo reflexo */}
      <path
        d="M26 38 C29 34 35 32 40 33"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Estrias do cabo — textura anti-deslizante */}
      {[100, 112, 124, 136, 148].map((y, i) => (
        <line key={i} x1="34" y1={y} x2="46" y2={y} stroke="currentColor" strokeWidth="0.75" />
      ))}
    </svg>
  );
}
