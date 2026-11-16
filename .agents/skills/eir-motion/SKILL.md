---
name: eir-motion
description: Motion design para EIR Showcase (web espacial editorial, fondo oscuro, línea fina, acento ámbar). Úsala siempre que se añada, modifique o revise una animación, transición, reveal on scroll, microinteracción de navegación, animación de SVG o soporte de prefers-reduced-motion en EIR Showcase, aunque no se diga "motion". Prioriza CSS y soluciones ligeras. No define colores ni layout (eso es eir-design).
---

# EIR Motion

Reglas para que el movimiento en **EIR Showcase** sea silencioso, preciso y funcional. El movimiento es un instrumento de lectura (orientar, guiar, responder, jerarquizar), no un adorno. Si la web se ve igual de bien y se entiende igual sin la animación, la animación sobra.

Carácter: calmo, de inercia baja, sin rebote, sin sorpresa. Como un panel de instrumentos que se enciende, no como un anuncio.

## Fuentes de verdad (en este orden)

1. **Tokens y reglas del repo / skill `eir-design`**: color, tipografía, espaciado, contornos, acento. Esta skill **no define hex, fuentes ni valores de paleta**. Si falta un token para un rol, se pregunta; no se inventa.
2. **Esta skill** y sus `references/`.
3. **El brief del usuario.**

Si 1 y 2 chocan, gana 1 y se avisa. Esta skill **extiende** la regla de animación de `eir-design` (entrada suave, ≤ 12 px, 300–500 ms) con navegación, SVG y reduced motion; no la contradice. Para ilustraciones SVG nuevas, la construcción del dibujo sigue en `eir-svg-illustration`; aquí solo se anima.

## Prueba de propósito (obligatoria por cada animación)

Toda animación declara **una** de estas funciones. Sin función, no se implementa.

| Función | Pregunta que responde | Ejemplo válido |
|---|---|---|
| **Orientar** | ¿Dónde estoy / qué cambió? | Indicador de sección activa en la navegación |
| **Guiar atención** | ¿Qué miro primero? | El foco ámbar aparece el último en el hero |
| **Responder** | ¿Mi acción fue recibida? | Subrayado en hover/foco, apertura de menú |
| **Jerarquizar** | ¿Qué orden de lectura hay? | Cabecera → contenido con retardo corto |

"Queda más dinámico", "da vida" o "es moderno" **no son funciones**.

## Reglas núcleo

1. **Solo `opacity` y `transform`** en la web de contenido. Nada de animar `width`, `height`, `top`, `left`, `margin`, `filter`, `backdrop-filter`.
2. **Entrada, no salida.** Los reveals se ejecutan una vez y no se revierten al hacer scroll hacia arriba.
3. **Contenido visible sin JS.** El estado oculto de un reveal solo existe si JS lo activó. Nunca ocultar contenido solo con CSS.
4. **Un foco de movimiento por pantalla.** Si dos cosas se animan a la vez, una es secundaria y más corta.
5. **El ámbar no se anima para llamar la atención**: aparece una vez, en el foco. Sin pulsos, sin brillos, sin loops.
6. **Cero loops infinitos por defecto.** Excepción solo con aprobación explícita (ver límites).
7. **Texto estable mientras se lee.** Nada de texto que se mueva, cambie o se escriba letra a letra.
8. **`prefers-reduced-motion` es parte de la implementación, no un extra.** Se escribe junto con la animación, no después.
9. **Sin dependencias por defecto.** Se sube de peldaño solo con justificación (ver escalera).
10. **Honestidad visual.** Una animación no puede insinuar un dato, telemetría o estado real que no existe. Lo experimental no recibe más movimiento que lo verificado.

## Valores de referencia (resumen)

Detalle y justificación en `references/motion-principles.md`. Son **valores por defecto propuestos**; los tokens reales viven en el repo.

| Rol | Duración | Easing | Distancia |
|---|---|---|---|
| Feedback hover/foco (color, borde) | 120–200 ms | ease-out | 0 |
| Subrayado / indicador de nav | 200–280 ms | ease-out | `scaleX` 0→1 |
| Menú móvil: abrir / cerrar | 200 / 140 ms | ease-out / ease-in | 8 px |
| Reveal de contenido | 400 ms (300–500) | ease-out | 8 px (máx. 12) |
| Línea de cabecera | 560 ms | ease-out | `scaleX` 0→1 |
| Dibujo de trazo SVG | 600–800 ms | ease-in-out | — |
| Hero (secuencia completa) | ≤ 1200 ms | ease-out | 8 px |
| Stagger | 60 ms entre ítems, máx. 4 ítems | — | — |

Prohibido: bounce, elastic, overshoot, spring con rebote visible.

## Flujo obligatorio

### Fase 0 · Contexto
1. Lee `references/motion-principles.md`. Lee `references/motion-patterns.md` cuando vayas a implementar. Lee `references/review-checklist.md` antes de revisar.
2. Inspecciona el repo: `package.json` (React, Vite, Tailwind v3 o v4, librerías de animación ya presentes), `src/`, CSS global, tokens de `eir-design`. No asumas versión de Tailwind: detecta y usa la sintaxis correspondiente.
3. Busca movimiento ya existente (`transition`, `@keyframes`, `animate`, librerías). Lo existente se audita antes de añadir nada.

### Fase 1 · Brief de motion (breve, antes de escribir código)
Por cada animación o grupo, 4–6 líneas:
- **Función** (orientar / guiar / responder / jerarquizar) y a qué pregunta responde.
- **Disparador** (carga, entrada al viewport, hover/foco, clic) y **elemento**.
- **Propiedades**, duración, easing, distancia (con token).
- **Fallback reduced motion** y **fallback sin JS**.
- **Coste**: nº de elementos simultáneos, dependencia nueva (sí/no).

No esperes aprobación salvo que el brief revele una decisión que cambia el resultado (p. ej. un loop ambiental, una dependencia nueva). En ese caso, pregunta una sola cosa.

### Fase 2 · Implementación
Orden: tokens de motion → base de reduced motion → primitivas (`useReveal`, clases de nav) → patrones por sección. Prioriza CSS puro; JS solo para lo que CSS no puede (observar el viewport, scrollspy). Una sección a la vez.

### Fase 3 · Revisión (obligatoria)
1. Aplica `references/review-checklist.md`. Informa solo los ✘ y lo **no verificado**.
2. Si hay navegador automatizable (Playwright o similar): captura con `reducedMotion: 'no-preference'` y `'reduce'`, y con JS desactivado. Si no puedes, dilo y entrega solo comprobaciones estáticas.
3. Máximo 3 iteraciones por animación. Si persiste el fallo, exponlo.
4. **Nunca afirmes que verificaste algo que no viste.** Rendimiento y fluidez no se infieren leyendo código: se miden o se informan como "no verificado".

## Escalera de ligereza

Usa el peldaño más bajo que resuelva el caso.

1. **CSS**: `transition`, `@keyframes`, variables CSS, `:focus-visible`, `scroll-behavior`.
2. **JS mínimo propio**: `IntersectionObserver` (reveal, scrollspy), listeners pasivos. Objetivo: un hook de decenas de líneas, sin dependencias.
3. **Web Animations API** para secuencias imperativas puntuales.
4. **Librería ligera** (p. ej. `motion` en modo tree-shakeable) solo si hay interrupciones, orquestación compleja, animación de layout o gestos que 1–3 no cubren. Mide el delta de bundle antes de aceptar y repórtalo.
5. **GSAP, Lottie, smooth-scroll (Lenis y similares), Three.js**: no se usan sin aprobación explícita. Smooth-scroll secuestrado: prohibido.

## Límites (resumen)

- Máx. ~12 elementos animándose a la vez en un viewport.
- Nada dura más de 800 ms salvo la secuencia del hero (≤ 1200 ms).
- Reveal: una vez por elemento; stagger máx. 4 ítems.
- Sin parallax, sin scroll-jacking, sin cursor personalizado, sin carruseles automáticos, sin partículas/estrellas, sin degradados animados, sin blur, sin contadores que "suben".
- Sin `will-change` permanente.
- El 80 % o más de la web debe estar quieta en cualquier instante.

## Reduced motion (resumen)

Con `prefers-reduced-motion: reduce`: **sin desplazamiento, sin escala, sin dibujo de trazos, sin scroll suave, sin loops.** Se permiten fundidos de opacidad ≤ 150 ms y cambios de estado inmediatos (color, borde, foco). El contenido nunca depende de una animación para ser visible. Debe reaccionar en vivo si el usuario cambia la preferencia. Política completa en `motion-principles.md` §8.

## Cuándo leer cada referencia

| Archivo | Léelo cuando |
|---|---|
| `references/motion-principles.md` | Eliges un valor, justificas una decisión o dudas si algo cabe en los límites |
| `references/motion-patterns.md` | Vas a implementar reveal, hero, navegación, SVG o estados de interfaz |
| `references/review-checklist.md` | Vas a revisar, capturar o cerrar una animación |

## Antipatrones (rechazo automático)

Parallax · scroll-jacking o smooth-scroll por librería · texto animado letra a letra o palabra a palabra · contadores numéricos animados · fondos de partículas/estrellas/gradientes animados · glow o pulso en el ámbar · rebote/elástico · animaciones que se repiten cada vez que el elemento reentra en pantalla · loops decorativos · animación de propiedades de layout · reveal en todo (si todo se revela, nada se jerarquiza) · animación que bloquea lectura o interacción · contenido oculto sin JS.
