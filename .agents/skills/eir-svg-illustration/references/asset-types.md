# Tipos de asset

Cada tipo fija: clase (decorativo/informativo), nivel de detalle, viewBox, composición, uso del acento y accesibilidad. Los números son *heurísticas* (ver `svg-principles.md`). Antes de dibujar, completa el brief de la Fase 1 con estos datos.

## Resumen

| Tipo | Clase | Detalle | viewBox sugerido | Acento | `preserveAspectRatio` |
|---|---|---|---|---|---|
| Hero | Decorativo | D3 | 1600×900 (16:9) | Sí, si es el único ámbar de la pantalla | `xMidYMid slice` |
| Ilustración de sección | Decorativo (informativo si explica una relación) | D2 | 1200×800 (3:2), 800×800 o 1200×600 | Opcional | `xMidYMid meet` |
| SVG de apoyo a diagrama | Informativo | D2 | Ancho 1200; alto según contenido | Solo para marcar un elemento | `xMidYMid meet` |
| Placeholder de evidencia | Informativo | D1 | Proporción del medio real esperado | No | `xMidYMid meet` |
| Separador técnico | Decorativo | D1 | 1200×24 (ancho completo) | No | `none` (solo líneas) |

---

## 1. Hero

**Propósito**: fijar el tono de la web en los primeros segundos. No explica nada.

- **Composición**: un foco descentrado, grandes zonas vacías, estructura de anillos/ejes/trayectorias derivada del **motivo visual aprobado en `eir-design`**. Si no hay motivo aprobado, propón uno en el brief y espera confirmación.
- **Detalle (D3)**: ≤ 80 elementos. Ticks y anotaciones finas agrupados en pocos `<path>`.
- **Acento**: el foco puede ser ámbar si el título del hero no lo es. Si el título o el botón ya usan ámbar, `accent={false}`.
- **Recorte**: con `slice`, el foco debe quedar dentro de la zona central segura (≈ 60 % centrales del viewBox) para que no se corte en móvil.
- **A11y**: `decorative`. Sin texto.
- **Errores comunes**: composición simétrica y centrada, demasiadas capas, estrellas dispersas, degradado de fondo, anillos con grosores distintos sin jerarquía.

## 2. Ilustración de sección

**Propósito**: dar a una sección un elemento visual propio que refuerce su mensaje.

- **Composición**: ocupa una columna; el vacío es parte de la composición. Una sola idea geométrica.
- **Detalle (D2)**: ≤ 40 elementos.
- **Motivo recurrente**: puede reaparecer, pero (por `eir-design`) como máximo en 3 secciones y con un propósito distinto cada vez. No repitas la misma ilustración con otro color.
- **Alterna densidad** con la sección anterior y la siguiente. Dos ilustraciones densas seguidas es un fallo.
- **A11y**: decorativa por defecto. Si el SVG explica una relación que el texto no cubre, es informativa: `title` + `desc`.
- **Errores comunes**: repetir la plantilla del hero a otra escala, centrar, usar acento en todas las secciones.

## 3. SVG de apoyo a diagrama

**Propósito**: aportar la capa gráfica (conexiones, marcos, ejes, rejillas) de un diagrama cuyo texto y contenido viven en HTML/React.

- **Reparto de capas**: texto, nombres y estados en HTML; líneas y marcos en SVG. Los elementos interactivos son HTML (`button`, enlaces), no formas SVG.
- **Contenido**: solo componentes declarados del proyecto (app Android, backend FastAPI + SQLite, sincronización, IA on-device experimental). **No inventes** nodos, servicios, flechas ni etapas. Si falta información, deja el hueco con estilo punteado y `[PENDIENTE: …]`.
- **Estilos de línea**: continua = implementado, discontinua = experimental, punteada = pendiente (`svg-principles.md` §5), siempre con etiqueta.
- **Trazos**: 1 y 1,5. Los esenciales ≥ 3:1 de contraste.
- **Posiciones dinámicas**: si dependen de medidas en runtime, se pasan como variables CSS (`style={{ "--x": valor }}`) con un comentario de una línea, según `eir-design`.
- **A11y**: informativo. `title` corto + `desc` con la estructura (qué se conecta con qué). Si el diagrama ya tiene una lista o tabla equivalente en HTML, el SVG puede ir `decorative` y la información queda en el HTML. Decide y explícalo en el brief.
- **Errores comunes**: meter texto largo dentro del SVG, flechas sin dirección clara, mezclar estados sin leyenda.

## 4. Placeholder de evidencia

**Propósito**: reservar el hueco de una captura, gráfica o foto que aún no existe, sin simular que existe.

- **Debe verse intencionado pero inequívocamente provisional**: marco punteado (= pendiente), marcas de esquina y la etiqueta `[PENDIENTE: …]`.
- **Proporción**: la del medio real esperado, para que el layout no salte al sustituirlo. Si no se conoce, pregúntalo. (Una captura de móvil Android es alta y estrecha; una de escritorio es apaisada.)
- **Prohibido**: dibujar una interfaz falsa, barras o curvas que parezcan datos, números de ejemplo, un "mockup" de la app.
- **Acento**: no. Un placeholder no puede ser el foco de la pantalla.
- **A11y**: informativo: `title` = "Evidencia pendiente: …". Al sustituirlo por la imagen real, el `alt` pasa a describir la imagen.
- **Errores comunes**: que parezca una captura real, que parezca un error de carga, que use el acento.

## 5. Separador técnico decorativo

**Propósito**: marcar un cambio de ritmo entre secciones con una línea que se siente instrumental.

- **Composición**: línea base de ancho completo con marcas de regla y, como máximo, una marca singular (más larga o con el acento solo si la sección no tiene otro ámbar; por defecto, sin acento).
- **Detalle (D1)**: ≤ 12 elementos; las marcas, en un solo `<path>`.
- **Solo líneas**: permite `preserveAspectRatio="none"` gracias a `vectorEffect="non-scaling-stroke"`. Sin círculos (se deformarían).
- **Sin texto ni números** que parezcan datos o coordenadas reales.
- **A11y**: `decorative` y, si el contenedor es un `div`, `aria-hidden` ya viene del SVG. Si hay un `<hr>` semántico aparte, no lo dupliques.
- **Errores comunes**: separador en cada sección (pierde su función), grosor mayor que el resto de líneas, marcas con ritmo irregular sin intención.

---

## Esqueleto TSX (verificado con `tsc --strict`, TypeScript 5, `@types/react` 18)

Se verificó que compila y que el tipo rechaza un informativo sin `title` y un decorativo con `title`. **No** se renderizó en navegador. Los valores de `ink.ts` son marcadores: se rellenan en la Fase 0 con los tokens reales.

Estructura sugerida (adáptala a la del repo):

```
src/components/illustrations/
  ink.ts
  IllustrationFrame.tsx
  hero/…
  sections/…
  diagrams/…
  evidence/…
  dividers/…
```

### `ink.ts`

```ts
/**
 * Mapa único rol → clase del proyecto. Se crea en la Fase 0 con los tokens REALES.
 * Ningún SVG escribe hex ni clases de color fuera de este archivo.
 * Los valores de abajo son marcadores: sustitúyelos antes de usar.
 */
export const ink = {
  /** Líneas de estructura (trazo 1). Ej.: "stroke-<token-linea-fuerte>" */
  structure: "REPLACE_stroke_structure",
  /** Líneas de contexto, más tenues (trazo 1) */
  context: "REPLACE_stroke_context",
  /** Elemento foco cuando NO hay acento (trazo 2) */
  focus: "REPLACE_stroke_focus",
  /** Acento ámbar, trazo. Solo si accent={true} */
  accentStroke: "REPLACE_stroke_accent",
  /** Acento ámbar, relleno. Solo si accent={true} */
  accentFill: "REPLACE_fill_accent",
  /** Relleno de oclusión: igual al fondo de la sección */
  surface: "REPLACE_fill_surface",
  /** Texto mono pequeño en mayúsculas (etiquetas dentro del SVG) */
  label: "REPLACE_fill_label font-mono uppercase tracking-widest",
} as const;
```

### `IllustrationFrame.tsx`

```tsx
import { useId, type ReactNode } from "react";

type Decorative = { decorative: true; title?: never; desc?: never };
type Informative = { decorative?: false; title: string; desc?: string };

export type IllustrationProps = {
  className?: string;
  /** true = el ámbar aparece en el foco de la ilustración. Por defecto false. */
  accent?: boolean;
} & (Decorative | Informative);

type FrameProps = IllustrationProps & {
  viewBox: string;
  preserveAspectRatio?: string;
  children: ReactNode;
};

export function IllustrationFrame({
  viewBox,
  preserveAspectRatio = "xMidYMid meet",
  className,
  decorative,
  title,
  desc,
  children,
}: FrameProps) {
  const uid = useId();
  const titleId = `${uid}-t`;
  const descId = `${uid}-d`;

  if (decorative) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        preserveAspectRatio={preserveAspectRatio}
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      role="img"
      aria-labelledby={desc ? `${titleId} ${descId}` : titleId}
    >
      <title id={titleId}>{title}</title>
      {desc ? <desc id={descId}>{desc}</desc> : null}
      {children}
    </svg>
  );
}
```

### Ejemplo D2 · `SectionOrbit.tsx` (ilustración de sección, decorativa)

```tsx
import { IllustrationFrame, type IllustrationProps } from "./IllustrationFrame";
import { ink } from "./ink";

/** Ejemplo N2 · ilustración de sección · decorativa · viewBox 1200×800, rejilla de 8. */
export function SectionOrbit(props: IllustrationProps) {
  const accent = props.accent ?? false;
  const focusStroke = accent ? ink.accentStroke : ink.focus;
  const hair = { fill: "none", strokeWidth: 1, vectorEffect: "non-scaling-stroke" } as const;

  return (
    <IllustrationFrame viewBox="0 0 1200 800" {...props}>
      {/* Contexto: anillos concéntricos, radios de la escala 96/192/288 */}
      <g className={ink.context} {...hair}>
        <circle cx={720} cy={400} r={96} />
        <circle cx={720} cy={400} r={192} />
        <circle cx={720} cy={400} r={288} />
      </g>
      {/* Estructura: ejes y marcas */}
      <g className={ink.structure} {...hair}>
        <line x1={96} y1={400} x2={1104} y2={400} />
        <line x1={720} y1={72} x2={720} y2={728} />
      </g>
      {/* Foco: un único elemento, único uso de trazo 2 / acento */}
      <circle className={focusStroke} cx={816} cy={400} r={8} fill="none" strokeWidth={2} vectorEffect="non-scaling-stroke" />
    </IllustrationFrame>
  );
}
```

### Ejemplo D1 · `EvidencePlaceholder.tsx` (informativo)

```tsx
import { IllustrationFrame } from "./IllustrationFrame";
import { ink } from "./ink";

type Props = {
  /** Texto de lo que falta. Se renderiza como "[PENDIENTE: …]". */
  pending: string;
  /** Proporción del medio real esperado, en unidades de viewBox. */
  width?: number;
  height?: number;
  className?: string;
};

/** Ejemplo N1 · placeholder de evidencia · informativo (comunica que falta contenido). */
export function EvidencePlaceholder({ pending, width = 1280, height = 800, className }: Props) {
  const m = 16; // margen de las marcas de esquina
  const t = 48; // largo de marca
  return (
    <IllustrationFrame
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      title={`Evidencia pendiente: ${pending}`}
    >
      {/* Trazo punteado = pendiente / no confirmado */}
      <rect
        className={ink.context}
        x={m} y={m} width={width - 2 * m} height={height - 2 * m}
        fill="none" strokeWidth={1} strokeDasharray="1 4" strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <g className={ink.structure} fill="none" strokeWidth={1} vectorEffect="non-scaling-stroke">
        <path d={`M${m} ${m + t}V${m}H${m + t}`} />
        <path d={`M${width - m - t} ${m}H${width - m}V${m + t}`} />
        <path d={`M${m} ${height - m - t}V${height - m}H${m + t}`} />
        <path d={`M${width - m - t} ${height - m}H${width - m}V${height - m - t}`} />
      </g>
      <text className={ink.label} x={width / 2} y={height / 2} textAnchor="middle" fontSize={14}>
        {`[PENDIENTE: ${pending}]`}
      </text>
    </IllustrationFrame>
  );
}
```

### Uso

```tsx
// Decorativa, sin acento (la sección ya tiene un ámbar en el título)
<SectionOrbit decorative className="w-full max-w-3xl" />

// Decorativa con acento (único ámbar de la pantalla)
<SectionOrbit decorative accent className="w-full max-w-3xl" />

// Informativa: title obligatorio, desc opcional
<SectionOrbit title="Órbita de referencia" desc="Tres anillos concéntricos con un punto focal." />

// Placeholder de evidencia
<EvidencePlaceholder pending="captura de la pantalla de sincronización" className="w-full" />
```

### Notas del esqueleto

- `SectionOrbit` pasa `{...props}` al `IllustrationFrame` en lugar de desestructurar con `...rest`: desestructurar con `rest` rompe la unión discriminada y el compilador deja de aceptar el tipo.
- `accent` llega al `IllustrationFrame` pero este no lo usa; es inocuo.
- `fontSize={14}` en el `<text>` del placeholder está en unidades de viewBox. A anchos pequeños el texto se reduce; si baja de ~11-12 px efectivos, muévelo a HTML.
- Los dos ejemplos usan `ink` para el color y no contienen hex.
