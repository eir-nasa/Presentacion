---
name: eir-design
description: Sistema de diseño y flujo de trabajo para EIR Showcase, la web interactiva del proyecto EIR (monitoreo de salud y bienestar para astronautas, NASA Space Apps Challenge 2026). Úsala siempre que se diseñe, implemente, modifique o revise cualquier sección, componente, estilo, layout o screenshot de la web de EIR Showcase, aunque el usuario no mencione "diseño". Impone una identidad oscura, futurista y editorial, y evita la estética SaaS genérica.
---

# EIR Design

Skill para mantener una identidad visual única y consistente en **EIR Showcase**: la web que reemplaza la presentación del proyecto EIR en el NASA Space Apps Challenge 2026.

## Contexto del proyecto (único contenido que se da por cierto)

EIR es un proyecto de monitoreo de salud y bienestar para astronautas. Componentes declarados por el equipo: app Android, backend FastAPI + SQLite, sincronización, y componentes experimentales de IA on-device. La web debe explicar: problema, solución, arquitectura, evidencias y resultados.

**Todo lo demás (métricas, resultados, nombres, capturas, textos de problema) es desconocido hasta que el usuario lo aporte.** Ver "Regla de contenido".

## Dirección visual en una frase

Un cuaderno de misión a oscuras: fondo casi negro, tipografía display ancha y técnica, bloques definidos solo por una línea fina, mucho vacío, y un único elemento cálido (ámbar) que concentra la atención. Silencioso, cinematográfico, preciso. No decorado.

## Flujo obligatorio

### Fase 0 · Contexto
1. Lee `references/design-tokens.md` y `references/layout-guidelines.md`. Lee `references/design-analysis.md` solo si necesitas el porqué de una decisión o si dudas entre dos opciones.
2. Inspecciona el repo antes de escribir nada: `package.json` (versión de React y de Tailwind, framework/bundler), estructura de `src/`, fuentes y assets existentes. No asumas Tailwind v3 ni v4: detecta y usa la sintaxis que corresponda.
3. Identifica qué contenido real existe (textos, capturas, métricas, logos). Lo que falte se marca con placeholder, no se inventa.

### Fase 1 · Propuesta de estructura (obligatoria, sin código de UI)
Entrega y **detente a esperar aprobación**:
1. **Mapa de secciones**: para cada una, objetivo, mensaje en una frase, elemento visual principal y densidad (aireada / media / densa).
2. **Motivo visual recurrente** y en qué secciones reaparece (ver layout-guidelines).
3. **Tipografía propuesta**, con verificación de cobertura de `á é í ó ú ñ ü ¿ ¡` si el contenido va en español.
4. **Contenido pendiente**: lista de lo que falta y qué placeholder se usará.
5. **Riesgos de genericidad** que ves en esta estructura y cómo los evitas.

Solo omite la espera de aprobación si el usuario escribe explícitamente que no quiere revisarla. En ese caso presenta la propuesta resumida y avisa de que continúas sin aprobación.

### Fase 2 · Implementación
Orden: tokens → primitivas de layout (`Section`, `Frame`, `Label`…) → hero → resto de secciones, una a una. Después de cada sección, haz la revisión rápida (3A) antes de seguir.

### Fase 3 · Revisión con screenshots (obligatoria)
Dos niveles, para equilibrar rigor y coste:

**3A · Revisión rápida (tras cada sección)**
1. Captura solo la sección modificada en **1440 px**, sin página completa.
2. Revísala contra los bloques 1–4 de `references/design-checklist.md`, la prueba de los 3 segundos y la lista de antipatrones. Informa solo los ✘.
3. Corrige y recaptura únicamente lo modificado. Máximo 3 iteraciones por sección; si persiste, expón el problema al usuario.

**3B · Validación completa (al cerrar cada hito y siempre al final)**
1. Hito = bloque significativo terminado: base + hero, secciones de contenido, arquitectura/evidencias/resultados.
2. Captura las secciones del hito en **390, 768, 1024 y 1440 px**.
3. Aplica la checklist completa, incluido responsive y la prueba de consistencia global (capturas lado a lado).
4. Si dos secciones consecutivas se ven como la misma plantilla repetida, es un fallo aunque cada una cumpla las reglas por separado.
5. Corrige y recaptura solo lo que falló.

**Reglas de ambos niveles (no negociables)**
- Si hay navegador automatizable (Playwright, Puppeteer o similar), úsalo. Si no puedes capturar, dilo explícitamente y pide screenshots al usuario.
- **Nunca afirmes que verificaste algo que no viste.** Lo no revisado en 3A (p. ej. responsive) se informa como "no verificado hasta 3B", no como ✔.

## Reglas núcleo

### Color
- Fondo base casi negro; nunca blanco ni gris medio como fondo de sección.
- **Un solo acento cálido (ámbar)**. Se usa en una cosa por pantalla: el foco de atención. Si todo es ámbar, nada lo es.
- Texto principal claro, texto secundario gris claro con contraste AA mínimo. Valores exactos en `design-tokens.md`.
- Sin gradientes decorativos. Los únicos degradados admitidos son los internos de una imagen o ilustración (p. ej. la luz sobre un disco), nunca como fondo de sección, botón o texto.

### Tipografía
- **Display**: ancha, geométrica, mayúsculas, tracking amplio. Solo para títulos de sección y hero. Nunca para párrafos.
- **Cuerpo**: grotesca neutra, ≥ 16 px en pantalla. No copiar el tamaño diminuto de la referencia.
- **Mono**: etiquetas técnicas, datos, ejes de gráficos. Pequeña y en mayúsculas.
- Máximo tres familias (display, cuerpo, mono). La serif opcional, solo si se aprueba en Fase 1, es una cuarta familia excepcional: tope absoluto de cuatro, y limitada a frases destacadas (≤ 1 por sección). Escala y tamaños en `design-tokens.md`.

### Composición
- Eje izquierdo único: títulos, bloques y texto comparten el mismo margen izquierdo.
- El vacío es un recurso activo: cada sección tiene un solo punto de atención y espacio generoso a su alrededor.
- Un bloque contiene algo que justifica el bloque. Si el contorno no agrupa ni jerarquiza, quita el contorno.
- Los contornos son líneas de 1 px, sin relleno, sin sombra, radio pequeño.

## Reglas de implementación React + Tailwind

- Todos los valores visuales viven en el tema (tokens). **Prohibido hex, px sueltos y colores, espaciados o tipografías fijos en `style={{}}`.** Excepción: `style` solo para valores dinámicos calculados en runtime que Tailwind no puede expresar de forma estática (p. ej. posición/tamaño de nodos de un diagrama, porcentaje de una barra de datos, dimensiones medidas). Pásalos como variable CSS (`style={{ '--x': valor }}`) consumida por una clase del tema siempre que sea posible, con un comentario de una línea que justifique el caso.
- Evita valores arbitrarios (`w-[437px]`). Si lo necesitas dos veces, es un token o una primitiva.
- Primitivas mínimas, reutilizadas en todas las secciones: `Section`, `SectionHeader`, `Frame` (bloque con contorno), `Label` (etiqueta mono), `Figure` (imagen/diagrama con pie), `Placeholder`.
- Una sección = un componente con su propio archivo; el contenido (textos, datos) en un módulo aparte para poder sustituir placeholders sin tocar JSX.
- HTML semántico (`section`, `h1–h3` en orden, `figure/figcaption`, `nav`). Un solo `h1`.
- Mobile-first. Cualquier layout asimétrico debe colapsar a una columna legible sin perder jerarquía.
- Accesibilidad: foco visible, `alt` real en imágenes informativas, `prefers-reduced-motion` respetado, contraste AA.
- Rendimiento: imágenes en WebP/AVIF con `width/height`, `loading="lazy"` fuera del hero, fuentes con `font-display: swap` y precarga de la display.
- Animación: solo entrada suave (opacidad + desplazamiento ≤ 12 px, 300–500 ms). Sin parallax pesado, sin loops decorativos.

## Consistencia entre secciones

- Misma estructura de cabecera en todas (etiqueta mono + título display + línea base).
- Mismo ritmo vertical (tokens de espaciado), mismo eje izquierdo, mismo radio, mismo grosor de línea.
- El motivo visual recurrente aparece como máximo en 3 secciones y siempre con un propósito distinto.
- Alterna densidad: nunca dos secciones densas seguidas ni dos aireadas seguidas.
- No introduzcas un recurso nuevo (color, efecto, forma) en una sección sin añadirlo antes a los tokens.

## Regla de contenido

- No inventes métricas, resultados, nombres de usuarios, citas, capturas ni afirmaciones clínicas.
- Placeholders visibles y marcados: `[PENDIENTE: descripción de lo que falta]`, con un `Placeholder` que se vea intencionado pero inequívocamente provisional.
- Marca visualmente la diferencia entre lo **implementado/medido** y lo **experimental** (la IA on-device está declarada como experimental). Nunca presentes lo experimental con el mismo peso visual que un resultado verificado.
- El proyecto toca salud: evita lenguaje que sugiera diagnóstico o uso clínico validado salvo que el usuario lo confirme.

## Cuándo leer cada referencia

| Archivo | Léelo cuando |
|---|---|
| `references/design-tokens.md` | Vas a escribir estilos, configurar Tailwind o elegir un valor |
| `references/layout-guidelines.md` | Vas a proponer o construir cualquier sección |
| `references/design-checklist.md` | Vas a revisar screenshots o cerrar una sección |
| `references/design-analysis.md` | Necesitas el razonamiento detrás de la dirección visual |

## Antipatrones (rechazo automático)

Hero con gradiente morado/azul y botón centrado · rejilla de tres tarjetas iguales con icono encima · glassmorphism (blur + fondo translúcido) · sombras suaves en todo · iconos de librería como decoración · badges "New" · testimonios inventados · fondos con partículas o estrellas animadas por defecto · centrar todo.
