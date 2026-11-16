---
name: eir-svg-illustration
description: Crea y revisa ilustraciones SVG originales para EIR Showcase (NASA Space Apps Challenge 2026) - hero, ilustraciones de sección, SVG de apoyo a diagramas, placeholders de evidencia y separadores técnicos decorativos. Úsala siempre que haya que crear, modificar o revisar un SVG, ilustración, divisor o placeholder gráfico de EIR Showcase, aunque el usuario no diga "ilustración". Entrega componentes TSX inline para React + Vite + TypeScript con la identidad oscura, editorial y técnica de EIR. No la uses para iconos de UI, logos, capturas reales ni para el layout de secciones (eso es eir-design).
---

# EIR SVG Illustration

Genera SVGs originales, simples y editables que se sienten parte del mismo cuaderno de misión que el resto de EIR Showcase: fondo oscuro, línea fina, mucho vacío, un único foco cálido (ámbar). Instrumento técnico, no ilustración decorativa.

## Fuentes de verdad (en este orden)

1. **Tokens y reglas del proyecto**: skill `eir-design` y sus `references/` (`design-tokens.md`, `layout-guidelines.md`), o en su defecto el tema Tailwind / variables CSS del repo.
2. **Esta skill.**
3. **El brief del usuario.**

Esta skill **no define hex, fuentes ni valores de paleta**. Los toma del proyecto. Si 1 y 2 chocan, gana 1 y se avisa al usuario. Si no existe un token para un rol (p. ej. el acento), **no se inventa un hex: se pregunta**.

## Lo que NO se sabe (no inventar)

- Valores exactos de la paleta y tipografías: salen de los tokens del repo.
- El motivo visual recurrente: es el aprobado en la Fase 1 de `eir-design`. Si no hay uno aprobado, propón uno en el brief y espera confirmación antes de usarlo en un hero.
- Contenido del proyecto: solo es cierto lo declarado (app Android, backend FastAPI + SQLite, sincronización, IA on-device **experimental**). Métricas, resultados, capturas y nombres son desconocidos hasta que el usuario los aporte.

## Flujo obligatorio

### Fase 0 · Contexto
1. Inspecciona `package.json` (React, Vite, TypeScript, Tailwind v3 o v4, y si ya hay SVGR o svgo) y `src/`. No añadas dependencias sin pedirlo.
2. Lee los tokens reales. Si no existe `src/components/illustrations/ink.ts`, créalo: mapea los **roles de color** (ver `svg-principles.md` §3) a las clases o variables reales del proyecto. Muestra el mapeo al usuario si algún rol es dudoso.
3. Si ya hay ilustraciones EIR en el repo, léelas. La consistencia con ellas pesa más que las plantillas de esta skill.
4. Lee las referencias según la tabla de abajo.

### Fase 1 · Brief (breve, antes de dibujar)
Por cada asset, 6-8 líneas:
- **Tipo** (hero / sección / soporte de diagrama / placeholder de evidencia / separador) y **clase** (decorativo / informativo).
- **Dónde vive** y qué mensaje refuerza, en una frase.
- **Foco único**: qué es y dónde cae.
- **Acento**: sí/no. Si la pantalla ya tiene un elemento ámbar, **no**.
- **Nivel de detalle** (D1/D2/D3), **viewBox** y proporción.
- **Contenido pendiente**, si lo hay.

No esperes aprobación salvo que el brief revele una ambigüedad que cambia el resultado (motivo no definido, contenido de un diagrama que no está declarado, medio real de una evidencia desconocido). En ese caso, pregunta una sola cosa.

### Fase 2 · Construcción
Orden: viewBox y rejilla → contexto y estructura → foco → detalle mínimo → accesibilidad → componente TSX. Usa `IllustrationFrame` y `ink` (ver `asset-types.md`). Cada elemento debe justificar su existencia; si al quitarlo no se pierde nada, quítalo.

### Fase 3 · Revisión
1. Aplica `references/review-checklist.md`. Informa solo los ✘ y lo no verificado.
2. Si hay navegador automatizable (Playwright, Puppeteer o similar), renderiza el componente sobre el fondo real de su sección en **390, 768, 1024 y 1440 px**. Si no puedes renderizar, dilo y entrega solo las comprobaciones estáticas.
3. Máximo 3 iteraciones por asset. Si persiste un fallo, exponlo.
4. **Nunca afirmes que verificaste algo que no viste.** Lo no comprobado se informa como "no verificado".

## Reglas núcleo (detalle en `svg-principles.md`)

- **Color por roles, nunca por hex.** Todo pasa por `ink`. Cero colores literales en el SVG.
- **Ámbar una sola vez por ilustración**, en el foco, y solo si la pantalla no tiene ya otro ámbar. Prop `accent` (por defecto `false`).
- **Trazo fino y constante**: 1 px en ≥ 70 % de los trazos; 2 px solo para el foco. `vectorEffect="non-scaling-stroke"`.
- **Sin relleno** por defecto. Rellenos permitidos: punto/disco focal, oclusión con el color de superficie y un único degradado radial interno de "luz".
- **Geometría primitiva sobre rejilla de 8**: líneas, círculos, arcos, elipses, rectángulos de radio pequeño. Nada dibujado a mano alzada.
- **Un foco, vacío activo.** Hero ≥ 60 % de espacio vacío; sección ≥ 40 % (heurísticas).
- **Sin efectos**: ni `filter`, ni blur, ni glow, ni sombras, ni `<image>` embebida.
- **Decorativo ≠ informativo**: se declaran, se construyen y se anuncian distinto (tabla abajo).
- **Honestidad visual**: nada que parezca un dato, una telemetría o una captura real si no lo es.

## Decorativo vs informativo

| | Decorativo | Informativo |
|---|---|---|
| Función | Atmósfera, ritmo, separación | Comunica algo que el texto no dice o que falta |
| Ejemplos | Hero, separadores, la mayoría de ilustraciones de sección | Soporte de diagrama, placeholder de evidencia, ilustración que explica una relación |
| Accesibilidad | `aria-hidden="true"`, sin `<title>` | `role="img"` + `<title>` (+ `<desc>` si es compleja) |
| Texto/números | Ninguno que parezca dato | Real, en HTML preferentemente |
| Contraste | Libre (no es contenido) | Trazos esenciales ≥ 3:1 contra el fondo |
| Significado | Nunca portado solo por el SVG | No depende solo del color (usa estilo de línea + etiqueta) |

Regla de decisión: **si quitas el SVG y el usuario pierde información, es informativo.** Si dudas, trátalo como informativo.

## Reglas React + Vite + TypeScript

- **Por defecto: componente TSX inline.** Un SVG cargado como `<img src>` o fondo CSS no hereda variables CSS ni `currentColor` de la página, así que no puede usar los tokens. Solo se usa `.svg` estático si el usuario lo pide y se acepta que los colores serán fijos (y entonces se avisa).
- Usa SVGR solo si el repo ya lo tiene. No lo añadas por cuenta propia.
- Un componente por archivo, exportación nombrada, props tipadas. La unión discriminada de `IllustrationProps` obliga a `title` en informativos y lo prohíbe en decorativos.
- `viewBox` siempre; sin `width`/`height` fijos en el `<svg>`. El tamaño lo decide el contenedor con clases.
- IDs únicos con `useId` (degradados, máscaras, `aria-labelledby`). Nunca IDs fijos: dos instancias colisionan.
- Atributos en camelCase de JSX (`strokeWidth`, `strokeDasharray`, `vectorEffect`).
- Sin `style={{}}` con valores visuales. Excepción justificada con comentario de una línea (valor dinámico en runtime), igual que en `eir-design`.
- Movimiento: estático por defecto. Si se anima, solo entrada (opacidad + desplazamiento ≤ 12 px, 300-500 ms) y respetando `prefers-reduced-motion`. Sin bucles.

## Regla de contenido

- Placeholders visibles y marcados: `[PENDIENTE: descripción]`. Un placeholder de evidencia **no simula** una captura, una gráfica ni una interfaz.
- Los diagramas solo muestran componentes declarados. No añadas servicios, flechas ni etapas que el usuario no haya confirmado.
- Diferencia visualmente lo **implementado** de lo **experimental** y de lo **pendiente** (convención en `svg-principles.md` §5). Lo experimental nunca pesa visualmente como un resultado verificado.
- Proyecto de salud: evita formas que imiten un trazado clínico real (ECG con valores, signos vitales) o sugieran diagnóstico validado.

## Originalidad

- Construye desde el **concepto** de EIR (monitoreo, señal, ritmo, sincronización, órbita, distancia) y desde primitivas geométricas, no desde una imagen de referencia.
- Si el usuario aporta una referencia, extrae el principio (proporción, densidad, ritmo), no las formas. No trazar, no recomponer, no "limpiar" un diseño ajeno.
- No dibujes logos, insignias o emblemas de NASA ni de otras agencias o empresas. Si el proyecto los necesita, se usan los archivos oficiales que aporte el usuario, tal cual. Las condiciones de uso de esas marcas son restrictivas: no asumas permiso.

## Antipatrones (rechazo automático)

Astronauta, cohete o planeta con anillo como clipart · nebulosas con degradado morado/azul · campos de estrellas o partículas · neón, glow o sombras · 3D, isométrico o estilo "ilustración de startup" · figuras humanas cartoon · iconografía de librería usada como ilustración · corazón + línea de ECG genérica · decorar con números que parecen telemetría · simetría centrada por defecto · varios focos compitiendo.

## Entrega

Por cada asset: ruta del archivo, uso en JSX (3-5 líneas), tipo y clase, qué se verificó y cómo, qué queda **no verificado**, y contenido `[PENDIENTE]`. Sin elogios ni resumen de lo hecho: solo lo que el usuario necesita para revisar.

## Cuándo leer cada referencia

| Archivo | Léelo cuando |
|---|---|
| `references/svg-principles.md` | Vas a dibujar o decidir cualquier valor (trazo, color, rejilla, detalle) |
| `references/asset-types.md` | Vas a crear un asset de un tipo concreto o necesitas el esqueleto TSX |
| `references/review-checklist.md` | Vas a revisar o cerrar un asset |
