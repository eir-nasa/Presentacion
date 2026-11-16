# Patrones de motion · EIR Showcase

Léelo cuando vayas a implementar. Cada patrón indica **función**, **disparador**, **código base**, **fallback reduced motion / sin JS** y **errores comunes**. El código es una base: adapta nombres a la convención del repo y usa los tokens de `motion-principles.md` §3. Los nombres de variables de color son marcadores (`--eir-line-strong`, etc.); **sustitúyelos por los tokens reales de `eir-design`**. No escribas hex.

Stack asumido (detectar, no dar por hecho): React + Vite + TypeScript + Tailwind. Los patrones son CSS/TS planos y funcionan con v3 y v4.

---

## 0. Base común

### 0.1 Marca de movimiento en `<html>` (antes del primer paint)

Script inline mínimo en `index.html`, dentro de `<head>`. Decide si el estado "oculto" de los reveals puede existir.

```html
<script>
  (function () {
    var d = document.documentElement;
    var m = window.matchMedia('(prefers-reduced-motion: reduce)');
    function set() {
      d.dataset.motion = ('IntersectionObserver' in window && !m.matches) ? 'on' : 'off';
    }
    set();
    if (m.addEventListener) m.addEventListener('change', set);
  })();
</script>
```

- Sin JS: no hay `data-motion`, ningún selector `html[data-motion="on"]` aplica ⇒ **todo visible**.
- Con `reduce`: `data-motion="off"` ⇒ nada oculto ni desplazado.
- Si el usuario cambia la preferencia en vivo, pasa a `off` y todo se muestra.

### 0.2 Tokens y bloque reduced motion
Ver `motion-principles.md` §3. Deben cargarse antes que cualquier patrón.

### 0.3 Regla de composición
Los estilos de estado oculto siempre cuelgan de `html[data-motion="on"]`. Nunca `opacity: 0` global sobre `[data-reveal]`.

---

## 1. Reveal on scroll

**Función**: jerarquizar. **Disparador**: el elemento entra en el viewport. **Una sola vez.**

### CSS

```css
html[data-motion="on"] [data-reveal] {
  opacity: 0;
  transform: translate3d(0, var(--eir-shift), 0);
  transition:
    opacity var(--eir-dur-reveal) var(--eir-ease-out),
    transform var(--eir-dur-reveal) var(--eir-ease-out);
  transition-delay: calc(var(--reveal-i, 0) * var(--eir-stagger));
}

html[data-motion="on"] [data-reveal][data-revealed="true"] {
  opacity: 1;
  transform: none;
}
```

### Hook React

```ts
// src/motion/useReveal.ts
import { useEffect, type RefObject } from 'react';

export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const motionOn =
      document.documentElement.dataset.motion === 'on' && 'IntersectionObserver' in window;

    if (!motionOn) {
      targets.forEach((el) => (el.dataset.revealed = 'true'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = 'true';
          io.unobserve(entry.target); // una sola vez
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}
```

### Uso con stagger

```tsx
// Sección: un único hook, los ítems llevan el índice como variable CSS
const ref = useRef<HTMLElement>(null);
useReveal(ref);

<section ref={ref}>
  <header data-reveal>…</header>
  {items.map((item, i) => (
    <div
      key={item.id}
      data-reveal
      // valor dinámico por runtime: índice de stagger, tope 3 (máx. 4 ítems escalonados)
      style={{ '--reveal-i': Math.min(i, 3) } as React.CSSProperties}
    >
      …
    </div>
  ))}
</section>
```

### Reglas
- Revela **bloques**, no párrafos sueltos ni cada línea.
- No pongas `data-reveal` en lo que ya está visible al cargar (salvo el hero, que usa §2).
- No reveles imágenes de evidencia con desplazamiento; si se animan, solo fundido corto.
- Si un elemento con `data-reveal` también tiene `hover` con `transition`, el `transition-delay` del reveal se hereda: envuélvelo (el wrapper revela, el hijo interactúa).
- `threshold` 0.15 y `rootMargin` −10 % son punto de partida. En bloques más altos que el viewport, `threshold` alto nunca se cumple: bájalo o revela por hijos.

### Fallbacks
- `reduce` / sin IO / sin JS: visible, sin movimiento.
- StrictMode (doble efecto): el cleanup hace `disconnect`; correcto.

### Errores comunes
Ocultar con CSS sin `data-motion` · repetir el reveal al reentrar · stagger de 8+ ítems · `translateY` > 12 px · animar `margin-top` en vez de `transform`.

---

## 2. Entrada del hero (carga, no scroll)

**Función**: guiar atención. **Disparador**: carga. **Duración total ≤ 1200 ms.**

Orden: etiqueta mono (0) → título (1) → subtítulo (2) → foco/ilustración (3). El foco ámbar entra último.

```css
@keyframes eir-enter {
  from { opacity: 0; transform: translate3d(0, var(--eir-shift), 0); }
  to   { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: no-preference) {
  [data-hero-step] {
    animation: eir-enter var(--eir-dur-reveal) var(--eir-ease-out) both;
    animation-delay: calc(80ms + var(--step, 0) * 90ms);
  }
}
```

```tsx
<h1 data-hero-step style={{ '--step': 1 } as React.CSSProperties}>…</h1>
```

Total: 80 + 3×90 + 400 = 750 ms con 4 pasos. Presupuesto restante para el SVG focal.

### Reglas
- Sin JS funciona (CSS puro). Con `reduce`, no hay animación y todo se ve de inmediato.
- Animar **bloques/líneas**, no letras ni palabras.
- El título del hero es probablemente el candidato a LCP: **medir** el impacto del fundido (ver checklist). Si empeora LCP, reducir a solo `transform` o quitar el fundido del título.
- No encadenar más de 4 pasos. No usar `animation-iteration-count` > 1.

---

## 3. Línea de cabecera de sección

**Función**: jerarquizar / firma visual. Línea fina que se traza de izquierda a derecha.

```css
.eir-rule { transform-origin: left center; } /* línea de 1 px definida por el token de contorno */

html[data-motion="on"] .eir-rule {
  transform: scaleX(0);
  transition: transform var(--eir-dur-slow) var(--eir-ease-out);
}

html[data-motion="on"] [data-revealed="true"] .eir-rule,
html[data-motion="on"] .eir-rule[data-revealed="true"] {
  transform: scaleX(1);
}
```

- `scaleX` solo afecta el eje horizontal: el grosor de 1 px se conserva.
- La línea entra **después** de la etiqueta y el título (retardo = `var(--eir-stagger)` × 2).
- Un solo trazo por cabecera. No animar el contorno de los `Frame` completos.

---

## 4. Navegación

### 4.1 Enlace: subrayado en hover/foco

**Función**: responder.

```css
.eir-nav-link { position: relative; }

.eir-nav-link::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  bottom: -4px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--eir-dur-fast) var(--eir-ease-out);
}

.eir-nav-link[aria-current="location"]::after,
.eir-nav-link:focus-visible::after { transform: scaleX(1); }

@media (hover: hover) {
  .eir-nav-link:hover::after { transform: scaleX(1); }
}

/* El anillo de foco aparece sin transición ni retardo */
.eir-nav-link:focus-visible { transition: none; }
```

- `reduce`: el subrayado puede aparecer sin transición (`transition: none` en `@media (prefers-reduced-motion: reduce)`); sigue siendo un cambio de estado informativo.
- `@media (hover: hover)` evita hover "pegado" en táctil.
- El color del enlace puede transicionar (`color` 200 ms); no desplazar texto.

### 4.2 Sección activa (scrollspy)

**Función**: orientar. Un `IntersectionObserver` sobre las secciones; cambia `aria-current`.

```ts
// src/motion/useScrollSpy.ts
import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' }, // franja central del viewport
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
```

```tsx
<a className="eir-nav-link" href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
```

- No requiere listeners de scroll.
- Es **estado**, no animación: funciona igual con `reduce`.
- Si la nav es una columna vertical, un único indicador que se desliza (`translateY` medido) es válido (200–280 ms); en horizontal basta el subrayado por enlace.

### 4.3 Menú móvil

**Función**: responder. Apertura 200 ms, cierre 140 ms, desplazamiento 8 px.

```css
.eir-menu {
  opacity: 0;
  visibility: hidden; /* no enfocable cuando está cerrado */
  transform: translate3d(0, calc(var(--eir-shift) * -1), 0);
  transition:
    opacity 140ms var(--eir-ease-in),
    transform 140ms var(--eir-ease-in),
    visibility 0s linear 140ms;
}

.eir-menu[data-open="true"] {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition:
    opacity var(--eir-dur-fast) var(--eir-ease-out),
    transform var(--eir-dur-fast) var(--eir-ease-out),
    visibility 0s;
}
```

- Con `reduce`, `--eir-shift` = 0 ⇒ solo fundido. Opcional: `transition-duration: 0s`.
- Gestionar `aria-expanded`, cierre con `Esc` y foco; eso es accesibilidad, no motion, pero debe estar.

### 4.4 Anclas

```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

section[id] { scroll-margin-top: var(--eir-nav-h); } /* token real de altura de nav */
```

Sin librería de smooth-scroll. Nunca secuestrar la rueda del ratón.

### 4.5 Indicador de progreso de lectura (opcional)

**Función**: orientar. Línea de 1 px; solo como mejora progresiva.

```css
@keyframes eir-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .eir-progress {
      transform-origin: left center;
      animation: eir-progress linear both;
      animation-timeline: scroll(root block);
    }
  }
}
```

Soporte de `animation-timeline` desigual: verificar compatibilidad actual. Sin soporte, simplemente no aparece (la web no lo necesita). Con `reduce`, no se anima.

---

## 5. SVG

Aplica a las ilustraciones de `eir-svg-illustration` (componentes TSX inline). Esta sección solo **anima**; no cambia el dibujo.

### 5.1 Dibujo de trazos al entrar (draw-on)

**Función**: jerarquizar / guiar. **Una vez.** Máx. ~5 trazos, 600–800 ms, stagger de 80 ms.

El elemento lleva `pathLength="1"` y la clase `eir-draw`. El grupo SVG (o su contenedor) recibe `data-reveal`.

```css
html[data-motion="on"] .eir-draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset var(--eir-dur-draw) var(--eir-ease-in-out);
  transition-delay: calc(var(--draw-i, 0) * 80ms);
}

html[data-motion="on"] [data-revealed="true"] .eir-draw {
  stroke-dashoffset: 0;
}
```

- Sin JS / `reduce`: los selectores no aplican ⇒ trazo completo.
- **Riesgo conocido**: `eir-svg-illustration` usa `vector-effect="non-scaling-stroke"`. La combinación con `pathLength` y dashes puede variar entre navegadores. **Probar en Chromium, Firefox y WebKit.** Si falla en alguno, usar la alternativa 5.1-B.
- Solo los trazos que importan (estructura/foco). Los trazos de contexto aparecen con un fundido único del grupo.

**5.1-B · Alternativa sin dashes** (si 5.1 falla): fundido de opacidad del grupo (`--eir-dur-reveal`) y, para el trazo principal, un reveal con `clip-path: inset(0 100% 0 0)` → `inset(0)` solo en ese elemento. Medir; `clip-path` repinta.

### 5.2 Foco ámbar: aparece al final

```css
html[data-motion="on"] .eir-focal {
  opacity: 0;
  transform: scale(0.9);
  transform-box: fill-box;
  transform-origin: center;
  transition:
    opacity var(--eir-dur-base) var(--eir-ease-out),
    transform var(--eir-dur-base) var(--eir-ease-out);
  transition-delay: 480ms; /* tras los trazos */
}

html[data-motion="on"] [data-revealed="true"] .eir-focal {
  opacity: 1;
  transform: none;
}
```

- Una vez, sin pulso posterior. Sin brillo ni `filter`.
- `transform-box: fill-box` es necesario para que `transform-origin: center` actúe sobre el propio elemento SVG.

### 5.3 Resalte interactivo en diagramas (arquitectura)

**Función**: responder / orientar. Al pasar el cursor o enfocar un nodo, los no relacionados bajan de opacidad.

```css
.eir-diagram .eir-node,
.eir-diagram .eir-edge { transition: opacity var(--eir-dur-fast) var(--eir-ease-out); }

.eir-diagram[data-focus] .eir-node:not([data-on]),
.eir-diagram[data-focus] .eir-edge:not([data-on]) { opacity: 0.35; }
```

- Mismo comportamiento con `:focus-visible` (nodos con `tabindex="0"` o botones). Hover nunca es el único camino.
- Solo `opacity`. El significado no depende solo de la opacidad: las etiquetas se mantienen legibles (≥ AA en elementos informativos).
- Con `reduce`: se mantiene (cambio de estado sin movimiento); opcional `transition: none`.

### 5.4 Dirección del flujo (solo bajo demanda)

Un dash que recorre una arista, **finito** (1–2 ciclos) y disparado por clic o hover. Comunica dirección en el diagrama de arquitectura (p. ej. app → sincronización → backend). **Nunca** continuo ni insinuando tráfico real. Con `reduce`: sustituir por resalte estático de la arista. Misma advertencia de `pathLength`/`non-scaling-stroke` que en 5.1.

### 5.5 Qué no se hace con SVG
Órbitas o rotaciones infinitas · pulsos de brillo · `filter`/`blur`/glow · morphing · partículas · líneas "de telemetría" animadas que parezcan datos · animar el SVG completo con `transform` mientras se lee texto cercano.

Si el usuario pide expresamente una órbita lenta en el hero, se trata como **loop ambiental** (ver `motion-principles.md` §7): aprobación explícita, un elemento, `transform` solo, pausa fuera de viewport y con `document.hidden`, estático con `reduce`, mecanismo de pausa si dura > 5 s.

---

## 6. Interactivos y estados

### 6.1 Frame interactivo (hover/foco)

```css
.eir-frame--interactive {
  transition: border-color var(--eir-dur-fast) var(--eir-ease-out);
}

@media (hover: hover) {
  .eir-frame--interactive:hover { border-color: var(--eir-line-strong); /* token real */ }
}
.eir-frame--interactive:focus-visible { transition: none; }
```

Sin elevación, sin sombra, sin escala. Cambia el contorno, no el tamaño.

### 6.2 Cambio de contenido (tabs, acordeón sencillo)

Entrada con fundido corto; la salida es inmediata (no se animan salidas por defecto).

```css
@keyframes eir-fade { from { opacity: 0; } to { opacity: 1; } }

@media (prefers-reduced-motion: no-preference) {
  .eir-panel[data-state="active"] { animation: eir-fade var(--eir-dur-fast) var(--eir-ease-out) both; }
}
```

- No animar `height`. Si un acordeón debe abrirse con altura animada, evaluarlo aparte: la técnica `grid-template-rows: 0fr → 1fr` existe y tiene soporte amplio en navegadores recientes, pero **verificar compatibilidad antes de adoptarla** y justificar por qué un corte seco no basta.
- No usar `display: none` + animación para contenido que debe ser accesible.

### 6.3 Botones y acciones
Respuesta inmediata en color/borde (120–200 ms). Sin ripple, sin rebote, sin escala. Confirmaciones (p. ej. "copiado") = cambio de texto/estado, con `aria-live="polite"`; sin animación.

---

## 7. Lo que no tiene patrón (por decisión)

| Pedido típico | Respuesta de la skill |
|---|---|
| Parallax en el hero | No. Mueve el fondo respecto al texto y compite con el foco. |
| Contadores que suben (métricas) | No. Distrae y, sin datos verificados, puede insinuar resultados inventados. Mostrar el número estático. |
| Texto que se escribe / letra a letra | No. Rompe lectura y accesibilidad. |
| Estrellas / partículas de fondo | No. Antipatrón en `eir-design`. |
| Transiciones de página con efectos | No. Navegación por anclas sin transición. |
| Smooth-scroll con librería | No. Secuestra el scroll. |
| Cursor personalizado | No. |
| Revelar todo con fundido | No. Si todo se revela, no hay jerarquía. |
| Glow/pulso en el ámbar | No. El ámbar funciona por escasez y quietud. |

---

## 8. Cuándo subir de peldaño (referencia rápida)

| Necesidad | Peldaño |
|---|---|
| Reveal, hover, menú, líneas, crossfade, trazos | CSS (+ hook de IntersectionObserver) |
| Scrollspy, "una sola vez" | `IntersectionObserver` propio |
| Secuencia imperativa puntual (p. ej. tras una acción) | Web Animations API |
| Interrupción, secuencias dependientes, layout compartido, gestos | Librería ligera, **con delta de bundle medido** |
| Timeline complejo o scrub pesado | No previsto en EIR; pedir aprobación |
