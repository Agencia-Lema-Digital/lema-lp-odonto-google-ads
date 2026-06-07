// Elementos SVG decorativos para o universo de marketing, vendas e dados.
// Mesma linguagem visual dos DentalAccents: linha fina, abstrato, técnico, nunca cartoon.
// Referências: funil de vendas, gráficos de performance, cursor de clique, grade de dados.

/**
 * FunnelLines — funil de conversão estilizado.
 * Ícone universal do marketing digital: topo largo (awareness) afunilando
 * até a conversão. Inclui marcações de etapas e linha de taxa de conversão.
 */
export function FunnelLines({
  className = "",
  opacity = 0.07,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Topo do funil — awareness */}
      <line x1="10" y1="20" x2="190" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Linha esquerda */}
      <line x1="10" y1="20" x2="58" y2="220" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Linha direita */}
      <line x1="190" y1="20" x2="142" y2="220" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Base — conversão */}
      <line x1="58" y1="220" x2="142" y2="220" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Etapas — linhas horizontais internas */}
      <line x1="25" y1="80" x2="175" y2="80" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 5" />
      <line x1="38" y1="140" x2="162" y2="140" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 5" />
      <line x1="50" y1="185" x2="150" y2="185" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" />

      {/* Labels de etapa — tick marks laterais */}
      <line x1="10" y1="80" x2="22" y2="80" stroke="currentColor" strokeWidth="0.8" />
      <line x1="10" y1="140" x2="22" y2="140" stroke="currentColor" strokeWidth="0.8" />
      <line x1="10" y1="185" x2="22" y2="185" stroke="currentColor" strokeWidth="0.8" />

      {/* Ponto de conversão */}
      <circle cx="100" cy="220" r="3.5" fill="currentColor" />

      {/* Linha de taxa — curva descendente */}
      <path
        d="M30 50 C60 55 100 70 140 90 C160 100 175 115 178 140"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="3 5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

/**
 * TrendChart — gráfico de tendência com linha de performance.
 * Referência direta ao Google Ads / Analytics: curva ascendente com
 * grade de fundo, ponto de pico destacado e área sob a curva.
 */
export function TrendChart({
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
      {/* Grade de fundo */}
      {[40, 80, 120].map((y) => (
        <line key={y} x1="20" y1={y} x2="300" y2={y} stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 6" />
      ))}
      {[80, 140, 200, 260].map((x) => (
        <line key={x} x1={x} y1="20" x2={x} y2="140" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 6" />
      ))}

      {/* Eixos */}
      <line x1="20" y1="140" x2="300" y2="140" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="20" x2="20" y2="140" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

      {/* Área sob a curva */}
      <path
        d="M20 130 C60 125 100 115 140 95 C180 75 220 50 260 35 L260 140 L20 140 Z"
        fill="currentColor"
        fillOpacity="0.05"
      />

      {/* Linha de performance */}
      <path
        d="M20 130 C60 125 100 115 140 95 C180 75 220 50 260 35"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Pico destacado */}
      <circle cx="260" cy="35" r="3.5" fill="currentColor" />
      <line x1="260" y1="35" x2="260" y2="140" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" />

      {/* Ticks no eixo X */}
      {[80, 140, 200, 260].map((x) => (
        <line key={x} x1={x} y1="138" x2={x} y2="143" stroke="currentColor" strokeWidth="0.8" />
      ))}
    </svg>
  );
}

/**
 * ClickCursor — cursor de clique com ondas de impacto.
 * Referência ao tráfego pago: o clique no anúncio que inicia o funil.
 * Forma geométrica, abstrata, premium — evoca CPC sem ser literal.
 */
export function ClickCursor({
  className = "",
  opacity = 0.065,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Cursor — seta de ponteiro */}
      <path
        d="M20 10 L20 90 L40 70 L55 108 L65 104 L50 66 L75 66 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.07"
      />

      {/* Ondas de clique — arcos concêntricos */}
      <path d="M62 48 A18 18 0 0 1 62 84" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" strokeDasharray="3 4" />
      <path d="M72 38 A32 32 0 0 1 72 94" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" fill="none" strokeDasharray="3 5" />
      <path d="M82 28 A46 46 0 0 1 82 104" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" fill="none" strokeDasharray="3 6" opacity="0.6" />

      {/* Ponto de impacto */}
      <circle cx="42" cy="66" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * DataGrid — grade de dados com células e linha de destaque.
 * Referência a dashboards, planilhas e relatórios de campanha.
 * Evoca precisão analítica e controle de métricas.
 */
export function DataGrid({
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
      {/* Grade principal */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={20 + col * 48}
            y={20 + row * 32}
            width={44}
            height={28}
            rx={3}
            stroke="currentColor"
            strokeWidth="0.75"
            fill="currentColor"
            fillOpacity={row === 2 ? 0.06 : 0.02}
          />
        ))
      )}

      {/* Linha de destaque — row com melhor performance */}
      <rect x="18" y="84" width="184" height="32" rx="4" stroke="currentColor" strokeWidth="1.2" fill="none" />

      {/* Barras de valor nas células da linha destacada */}
      {[28, 36, 22, 40].map((w, i) => (
        <rect
          key={i}
          x={26 + i * 48}
          y={96}
          width={w}
          height={8}
          rx={2}
          fill="currentColor"
          fillOpacity="0.35"
        />
      ))}

      {/* Linha de simetria / separador de header */}
      <line x1="20" y1="52" x2="200" y2="52" stroke="currentColor" strokeWidth="1" />

      {/* Seta de ordenação */}
      <path d="M206 30 L212 38 L218 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/**
 * ROASArrow — seta ascendente com marcação de ROAS.
 * Referência direta ao retorno sobre investimento em anúncios:
 * linha diagonal ascendente com anotações métricas laterais.
 */
export function ROASArrow({
  className = "",
  opacity = 0.065,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Linha de tendência ascendente */}
      <line x1="20" y1="175" x2="140" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

      {/* Ponta da seta */}
      <path d="M130 20 L140 30 L148 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Pontos de dados */}
      {[[20, 175], [50, 148], [80, 110], [110, 72], [140, 30]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 4 : 2.5} fill="currentColor" />
      ))}

      {/* Linhas de referência horizontal */}
      <line x1="10" y1="175" x2="155" y2="175" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 5" />
      <line x1="10" y1="30"  x2="155" y2="30"  stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.5" />

      {/* Tick marks de eixo Y */}
      {[175, 140, 105, 70, 30].map((y) => (
        <line key={y} x1="10" y1={y} x2="17" y2={y} stroke="currentColor" strokeWidth="0.8" />
      ))}

      {/* Anotação de crescimento — colchete lateral */}
      <path d="M150 175 L158 175 L158 30 L150 30" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Ponto central do colchete */}
      <circle cx="158" cy="102" r="2" fill="currentColor" />
    </svg>
  );
}

/**
 * AdSignal — sinal de transmissão de anúncio.
 * Evoca broadcast digital, alcance de campanha e impressões:
 * ponto central com ondas concêntricas e linha de sinal.
 * Abstrato, técnico, sem referência literal a nenhuma plataforma.
 */
export function AdSignal({
  className = "",
  opacity = 0.065,
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
      {/* Ponto de emissão */}
      <circle cx="100" cy="100" r="5" fill="currentColor" />

      {/* Ondas concêntricas */}
      <circle cx="100" cy="100" r="22" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="42" stroke="currentColor" strokeWidth="0.9" strokeDasharray="5 6" />
      <circle cx="100" cy="100" r="64" stroke="currentColor" strokeWidth="0.7" strokeDasharray="4 7" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 8" opacity="0.6" />

      {/* Linha de sinal — horizontal */}
      <line x1="8" y1="100" x2="192" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.4" />

      {/* Eixo vertical */}
      <line x1="100" y1="8" x2="100" y2="192" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.4" />

      {/* Ponteiros de direção — 4 cantos */}
      {[[100, 8], [192, 100], [100, 192], [8, 100]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="currentColor" opacity="0.6" />
      ))}
    </svg>
  );
}
