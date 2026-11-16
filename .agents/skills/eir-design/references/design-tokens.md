# Design tokens · EIR Showcase

Los valores de color son **aproximaciones a partir de una imagen**, no muestras. Ajústalos con una paleta definitiva si el equipo tiene colores de marca de EIR (en ese caso, la marca manda sobre este archivo).

Marcas: **[Observado]** estimado de la referencia · **[Propuesta]** decisión de diseño para EIR.

## Color

| Token | Valor | Uso | Origen |
|---|---|---|---|
| `void` | `#0A0A0C` | Fondo base de página y secciones | Observado |
| `void-raised` | `#101013` | Superficie ligeramente elevada (uso raro: zonas de código/datos) | Propuesta |
| `line` | `#3A3A40` | Contorno 1 px normal, separadores | Observado (aprox.) |
| `line-strong` | `#6A6A72` | Contorno de énfasis, ejes de diagramas | Observado (aprox.) |
| `ink` | `#F5F3EF` | Texto principal, títulos | Observado (blanco, ligeramente cálido) |
| `ink-muted` | `#A8A8AE` | Texto secundario, pies de figura | Propuesta (≥ 7:1 sobre `void`) |
| `ember` | `#E8832A` | **Único acento**: foco de atención, dato clave | Observado |
| `ember-soft` | `#F0B27A` | Variante clara del acento, hover | Observado (aprox.) |
| `dust` | `#C8A484` | Luz tenue en imágenes/superficies cálidas | Observado |
| `signal` | `#7FB7C4` | Opcional: distinguir "sistema/dato" de "humano" en diagramas | **Propuesta, a aprobar** |

Reglas:
- `ember` máximo en un elemento principal por pantalla (+ detalles menores del mismo elemento).
- `signal` solo en diagramas/datos y solo si se aprueba en Fase 1. Si no se aprueba, usar `ink` y `line-strong`.
- Sin colores semánticos rojo/verde/amarillo por defecto. Si un dato requiere estado (p. ej. éxito/fallo), pide autorización y define el token antes de usarlo.
- Contraste mínimo AA (4.5:1 texto normal, 3:1 texto grande y contornos informativos).
- **Prohibido** como fondo o texto: gradientes lineales/radiales decorativos.

## Tipografía

| Rol | Característica | Candidatas (OFL, Google Fonts) |
|---|---|---|
| `display` | Ancha, geométrica, mayúsculas, glifos cuadrados | Michroma, Orbitron, Oxanium, Chakra Petch |
| `body` | Grotesca neutra, muy legible | Roboto, IBM Plex Sans, Source Sans 3 |
| `mono` | Etiquetas y datos | IBM Plex Mono, JetBrains Mono, Space Mono |
| `serif` (opcional) | Citas o frases destacadas, aporta tono editorial | Newsreader, Instrument Serif |

- La referencia parece usar una display cuadrada y una grotesca tipo Roboto **[Observado, sin identificación segura]**.
- **Antes de fijar la display**, comprobar que renderiza bien `á é í ó ú ñ ü ¿ ¡` y signos del idioma final. Si no, cambiar de candidata.
- Se evita Inter y la pila de sistema como voz principal: son la señal más común de web genérica.
- La serif es **[Propuesta]** y se aprueba en Fase 1. Si se aprueba, solo en frases destacadas (≤ 1 por sección). Cuenta como cuarta familia: el límite es 3 sin serif y 4 con ella.

### Escala (mobile → desktop, con `clamp`)

| Token | Tamaño | Peso | Tracking | Interlineado | Notas |
|---|---|---|---|---|---|
| `display-hero` | `clamp(2.5rem, 7vw, 6rem)` | 700 | 0.08–0.15em | 1.05 | Mayúsculas. Solo hero |
| `display-section` | `clamp(1.75rem, 4vw, 3.25rem)` | 700 | 0.08–0.12em | 1.1 | Mayúsculas. Títulos de sección |
| `heading` | `1.25rem–1.5rem` | 500 | 0 | 1.3 | Body font |
| `body-lg` | `1.125rem` | 400 | 0 | 1.6 | Texto de lectura principal |
| `body` | `1rem` | 400 | 0 | 1.6 | Mínimo para párrafos |
| `label` | `0.75rem` | 500 | 0.12em | 1.4 | Mono, mayúsculas |
| `figure-caption` | `0.875rem` | 400 | 0 | 1.5 | `ink-muted` |

- Longitud de línea de párrafos: 55–75 caracteres (`max-w-prose` o equivalente).
- Ningún texto de lectura por debajo de 14 px en móvil, ni por debajo de 16 px en desktop.
- Títulos display: evitar romper una palabra; en móvil bajar tracking.

## Espaciado y layout

- Base 4 px. Escala preferida: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- Padding vertical de sección: `clamp(6rem, 12vw, 10rem)`.
- Contenedor máximo: 1200 px (contenido) / 1440 px (hero y diagramas anchos).
- Margen lateral: `clamp(1.25rem, 6vw, 5rem)`.
- Padding interior de `Frame`: 24–32 px.
- Separación título → contenido: 48–64 px.

## Forma y bordes

| Token | Valor |
|---|---|
| `radius-sm` | 4 px |
| `radius-md` | 8 px (bloques con contorno) |
| `radius-full` | 9999 px (solo motivo circular, píldoras de etiqueta) |
| `border-width` | 1 px (único grosor) |
| Sombras | Ninguna. Sin `box-shadow` en UI |
| Blur / `backdrop-filter` | Ninguno |

## Movimiento

- Entrada: opacidad 0→1 y `translateY` 8–12 px→0, 300–500 ms, `ease-out`.
- Hover: cambio de `line` → `line-strong` o `ink-muted` → `ink`, 150 ms.
- Respetar `prefers-reduced-motion: reduce` (sin desplazamiento, solo fundido o nada).
- Sin loops, partículas, parallax ni scroll-jacking salvo que el usuario lo pida.

## Mapeo a Tailwind

Detecta la versión en `package.json`.

### Tailwind v4 (CSS-first)

```css
@import "tailwindcss";

@theme {
  --color-void: #0A0A0C;
  --color-void-raised: #101013;
  --color-line: #3A3A40;
  --color-line-strong: #6A6A72;
  --color-ink: #F5F3EF;
  --color-ink-muted: #A8A8AE;
  --color-ember: #E8832A;
  --color-ember-soft: #F0B27A;
  --color-dust: #C8A484;
  --color-signal: #7FB7C4; /* solo si se aprueba */

  --font-display: "Michroma", "Orbitron", system-ui, sans-serif; /* ajustar tras verificar acentos */
  --font-body: "Roboto", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;

  --radius-sm: 4px;
  --radius-md: 8px;
}
```

### Tailwind v3 (`tailwind.config`)

```js
theme: {
  extend: {
    colors: {
      void: { DEFAULT: "#0A0A0C", raised: "#101013" },
      line: { DEFAULT: "#3A3A40", strong: "#6A6A72" },
      ink: { DEFAULT: "#F5F3EF", muted: "#A8A8AE" },
      ember: { DEFAULT: "#E8832A", soft: "#F0B27A" },
      dust: "#C8A484",
      signal: "#7FB7C4", // solo si se aprueba
    },
    fontFamily: {
      display: ["Michroma", "Orbitron", "system-ui", "sans-serif"],
      body: ["Roboto", "system-ui", "sans-serif"],
      mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
    },
    borderRadius: { sm: "4px", md: "8px" },
  },
}
```

Clases base sugeridas: `bg-void text-ink font-body antialiased`.
