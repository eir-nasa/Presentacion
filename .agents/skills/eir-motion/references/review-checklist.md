# Checklist de revisión de motion · EIR Showcase

Léelo antes de revisar o cerrar cualquier animación. Informa **solo los ✘ y lo no verificado**. Cada punto lleva un estado:

- ✔ visto / medido
- ✘ falla (con evidencia y arreglo)
- ◌ **no verificado** (indica por qué: sin navegador, sin DevTools, pendiente de hito)

**Nunca marques ✔ algo que no viste o mediste.** Rendimiento y fluidez no se deducen leyendo código.

Los umbrales marcados como *(heurística)* son puntos de partida, no estándares.

---

## 0. Procedimiento de captura

Si hay navegador automatizable (Playwright o similar), úsalo. Si no, dilo y pide capturas/grabación al usuario.

### 0.1 Matriz mínima
| Variable | Valores |
|---|---|
| Preferencia de movimiento | `no-preference` y `reduce` |
| JavaScript | activado y desactivado |
| Viewport | 390, 768, 1440 px (1024 en hito completo) |
| Teclado | recorrido completo con `Tab` |

### 0.2 Playwright (base)

```ts
import { chromium } from 'playwright';

const browser = await chromium.launch();

for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion,
  });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173');
  // …capturas
  await ctx.close();
}

// Sin JS
const noJs = await browser.newContext({ javaScriptEnabled: false });
```

### 0.3 Fotogramas determinísticos
Los screenshots por tiempo real son imprecisos. Para ver una animación CSS/WAAPI en un instante concreto: pausar y posicionar.

```ts
await page.evaluate((t) => {
  document.getAnimations().forEach((a) => {
    a.pause();
    a.currentTime = t; // ms
  });
}, 200);
await page.screenshot({ path: 'frame-200.png' });
```

Capturar en t = 0, ~25 %, ~60 % y 100 % de la duración. Limitación: no cubre animaciones hechas con `requestAnimationFrame` manual.

Para el reveal por scroll: desplazar con `page.mouse.wheel` o `scrollIntoView`, esperar a que termine la transición y capturar.

---

## A. Propósito

- [ ] Cada animación tiene una función declarada: **orientar, guiar atención, responder o jerarquizar**.
- [ ] Prueba de eliminación: sin la animación se pierde algo concreto (orientación, feedback, jerarquía).
- [ ] No hay movimiento "porque sí" (decorativo).
- [ ] El brief de motion (Fase 1) existe y coincide con lo implementado.

## B. Valores y consistencia

- [ ] Duraciones, curvas y distancias salen de **tokens** (no hay `ms`, `px` o `cubic-bezier` sueltos en componentes).
- [ ] Reveal: 300–500 ms, desplazamiento ≤ 12 px, solo eje Y, ease-out.
- [ ] Hover/foco: 120–200 ms, sin desplazamiento ni escala del contenido.
- [ ] Salidas más cortas que entradas.
- [ ] Nada dura > 800 ms salvo la secuencia de hero (≤ 1200 ms).
- [ ] Sin bounce, elastic ni overshoot.
- [ ] Mismo comportamiento y mismos valores en todas las secciones (comparar capturas/grabaciones lado a lado).
- [ ] Dirección consistente: contenido sube; líneas se trazan de izquierda a derecha.
- [ ] Stagger ≤ 4 ítems y ≤ 240 ms de retardo total.

## C. Reveal on scroll

- [ ] Contenido **visible sin JS** (probado con JS desactivado).
- [ ] El estado oculto depende de `html[data-motion="on"]`.
- [ ] Se ejecuta **una vez**; no se repite al reentrar ni se revierte al subir.
- [ ] No hay parpadeo del contenido ya visible al cargar (primer viewport fuera del hero).
- [ ] Se revelan bloques, no párrafos o líneas sueltas.
- [ ] Bloques más altos que el viewport también se revelan (el `threshold` es alcanzable).
- [ ] Imágenes de evidencia sin desplazamiento (a lo sumo fundido corto).
- [ ] Observers con `unobserve` tras revelar y `disconnect` al desmontar.

## D. Hero

- [ ] Secuencia ≤ 1200 ms, ≤ 4 pasos, solo `opacity` + `transform`.
- [ ] El foco ámbar entra último.
- [ ] Animación por bloques/líneas, no por letras o palabras.
- [ ] No retrasa lectura ni interacción: el CTA/enlaces responden desde el primer frame.
- [ ] Impacto en LCP medido (ver §H).

## E. Navegación

- [ ] Subrayado/indicador: `scaleX` o `opacity`, 200–280 ms.
- [ ] `:focus-visible` aparece **inmediatamente** (sin transición ni retardo) y es visible.
- [ ] Todo estado de hover tiene su equivalente de foco de teclado.
- [ ] `@media (hover: hover)` protege los hovers.
- [ ] Sección activa con `aria-current="location"` (estado informativo, también con `reduce`).
- [ ] Menú móvil: 200 ms abrir / 140 ms cerrar; cerrado ⇒ `visibility: hidden` o `inert` (no enfocable).
- [ ] `scroll-behavior: smooth` solo bajo `no-preference`; `scroll-margin-top` compensa la nav.
- [ ] No hay smooth-scroll por librería ni secuestro de rueda.
- [ ] Barra de progreso (si existe): mejora progresiva con `@supports`, desactivada con `reduce`.

## F. SVG

- [ ] Draw-on: ≤ ~5 trazos, 600–800 ms, una vez; el resto del dibujo con fundido único.
- [ ] **Probado en Chromium, Firefox y WebKit** si se combina `pathLength` + `vector-effect: non-scaling-stroke` (o usada la alternativa 5.1-B).
- [ ] El foco ámbar aparece una vez, al final; **sin pulso, glow ni filtro**.
- [ ] Sin `filter`, `blur`, morphing, partículas ni loops.
- [ ] Resalte interactivo: solo `opacity`; mismo efecto con foco de teclado; etiquetas siguen legibles.
- [ ] La animación no insinúa datos, telemetría ni tráfico real.
- [ ] Decorativo sigue `aria-hidden="true"`; informativo conserva `role="img"` + `<title>`. La animación no cambia la semántica.
- [ ] Si hay órbita/loop ambiental (aprobado): un elemento, solo `transform`, pausado fuera de viewport y con `document.hidden`, estático con `reduce`, mecanismo de pausa si > 5 s.

## G. Reduced motion y sin JS

Probar con `reduce` activo en cada patrón y sección.

- [ ] Sin desplazamiento, sin escala, sin dibujo de trazos, sin scroll suave, sin loops.
- [ ] Permitidos: fundido ≤ 150 ms o instantáneo; cambios de color/borde/foco.
- [ ] Todo el contenido visible desde el primer frame (nada oculto esperando una animación).
- [ ] La preferencia **se aplica en vivo**: cambiarla con la página abierta muestra todo sin recargar.
- [ ] Sin JS: contenido completo, legible y navegable.
- [ ] Capturas con `reduce` y sin JS comparadas con el estado final del modo normal: el layout es idéntico.

## H. Rendimiento

Medir en el proyecto real (build de producción si es posible), no en el dev server.

**Qué se anima**
- [ ] Solo `opacity` y `transform` (revisar el CSS: sin `width/height/top/left/margin/box-shadow/filter/backdrop-filter`).
- [ ] `stroke-dashoffset` limitado a pocos trazos.
- [ ] Sin `will-change` permanente; si hay, justificado con medición.

**Medición**
- [ ] DevTools → Performance con **CPU 4× slowdown**: sin frames largos visibles durante reveal, hero y menú *(heurística: objetivo sostenido ~60 fps, sin tareas > 50 ms atribuibles al motion)*.
- [ ] DevTools → Rendering → *Paint flashing* y *Layout Shift Regions*: sin repintados de página completa ni desplazamientos de layout causados por la animación.
- [ ] **CLS < 0.1** (umbral "bueno" de Core Web Vitals) con motion activado.
- [ ] **LCP** medido con y sin animación del hero; si empeora, simplificar (solo `transform`, o sin fundido en el título).
- [ ] Sin trabajo continuo en reposo: el panel Performance queda plano cuando nadie interactúa.

**Código**
- [ ] Un observer por grupo o compartido; sin listeners de scroll no pasivos; sin `setInterval` para animar.
- [ ] Sin lecturas y escrituras de layout alternadas en el mismo frame.
- [ ] Dependencias de animación añadidas: **0** (o justificadas con delta de bundle **medido** y reportado).
- [ ] El JS propio de motion es pequeño *(heurística: decenas de líneas; si crece mucho, replantear)*.

## I. Accesibilidad

- [ ] Nada parpadea (WCAG 2.3.1).
- [ ] Ningún movimiento automático > 5 s sin mecanismo de pausa (WCAG 2.2.2).
- [ ] El texto no se mueve mientras se lee; no hay texto dividido en spans por letra o palabra.
- [ ] El DOM está en orden de lectura desde el inicio; no se inserta contenido solo con animación.
- [ ] Recorrido con `Tab` completo: foco visible, orden lógico, sin elementos ocultos enfocables.
- [ ] Contraste AA mantenido durante y después de las transiciones (no depende del estado intermedio).

## J. Coherencia con `eir-design`

- [ ] No aparece estética nueva: sin gradientes animados, glassmorphism, sombras, glow ni profundidad por hover.
- [ ] **Ámbar**: ningún movimiento crea un segundo foco; sigue habiendo un único elemento ámbar por pantalla.
- [ ] Lo experimental (IA on-device) no tiene más énfasis de movimiento que lo implementado/medido.
- [ ] El movimiento refuerza el eje izquierdo y la jerarquía; no los altera.
- [ ] No se introdujo ningún recurso (color, efecto, forma) fuera de tokens.
- [ ] Prueba de los 3 segundos: ¿el movimiento lleva el ojo al foco correcto? ¿Hay algo moviéndose que no debería llamar atención?

## K. Antipatrones (rechazo automático)

Parallax · scroll-jacking / smooth-scroll por librería · texto animado por letras o palabras · contadores animados · partículas/estrellas/gradientes animados · glow o pulso en el ámbar · bounce/elastic · reveal repetido al reentrar · loops decorativos · animación de propiedades de layout · reveal en todo · animación que bloquea lectura o interacción · contenido oculto sin JS.

---

## Formato de informe

```
Revisión de motion · [alcance: sección/patrón] · [fecha]

Verificado: [qué, cómo, en qué viewports / con qué emulación]
✘ [punto] — evidencia: [captura/medición] — arreglo: [acción]
◌ No verificado: [punto] — motivo: [p. ej. sin navegador automatizable]

Medidas (si las hay): LCP [x] con / [y] sin animación · CLS [z] · frames largos [n]
Dependencias añadidas: [ninguna | nombre, delta de bundle medido]
Iteración: [n/3]
```

Reglas del informe:
- Solo ✘ y ◌. No listar los ✔ uno a uno.
- Si algo no se pudo medir, se dice. No se rellena con "debería ir bien".
- Máximo **3 iteraciones** por animación; si persiste el fallo, se expone al usuario con la causa probable.
