# Principios de motion · EIR Showcase

Léelo cuando elijas un valor o justifiques una decisión. Todos los números son **valores por defecto propuestos** (heurísticas de diseño, no medidas del proyecto). Los tokens reales los define el repo; si chocan con esto, gana el repo.

## 1. Propósito

Cada animación pertenece a una de cuatro funciones: **orientar, guiar atención, responder, jerarquizar**. Se documenta en el brief. Sin función, no existe.

Test rápido de eliminación: quita la animación mentalmente.
- Si la interfaz sigue igual de clara → sobra.
- Si se pierde orientación, feedback o jerarquía → se queda.

Un movimiento es **decorativo** si su única justificación es estética. En EIR el movimiento decorativo está fuera, porque la identidad se apoya en quietud, vacío y precisión; añadirlo la diluye.

## 2. Carácter del movimiento EIR

- **Calmo**: entradas lentas respecto a una UI de producto, pero sin arrastrarse. Nada urgente.
- **Preciso**: movimientos cortos, lineales o con ease-out; sin rebote ni exceso.
- **Instrumental**: el movimiento recuerda a un instrumento que se enciende o una línea que se traza, no a una "animación".
- **Direccional y consistente**: todo entra de abajo hacia arriba (+Y → 0) y las líneas se trazan de izquierda a derecha (`origin: left`), alineado con el eje izquierdo único de `eir-design`.
- **Escaso**: la quietud es el estado normal.

## 3. Tokens de motion

Definir como variables CSS globales (o en el tema de Tailwind: `@theme` en v4, `theme.extend` en v3; detectar la versión). Nombres orientativos; adaptar a la convención del repo.

```css
:root {
  /* duraciones */
  --eir-dur-instant: 120ms; /* feedback mínimo */
  --eir-dur-fast:    200ms; /* hover, foco, menú, crossfade */
  --eir-dur-base:    320ms; /* cambios de estado medianos */
  --eir-dur-reveal:  400ms; /* reveal de contenido */
  --eir-dur-slow:    560ms; /* líneas de cabecera */
  --eir-dur-draw:    700ms; /* trazo SVG */

  /* easing */
  --eir-ease-out:    cubic-bezier(0.25, 1, 0.5, 1);   /* entradas (easeOutQuart) */
  --eir-ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* trazos, cambios de estado (easeInOutCubic) */
  --eir-ease-in:     cubic-bezier(0.5, 0, 0.75, 0);   /* salidas (easeInQuart) */

  /* distancias y ritmo */
  --eir-shift:     8px;   /* desplazamiento de reveal */
  --eir-shift-max: 12px;  /* tope absoluto (regla de eir-design) */
  --eir-stagger:   60ms;  /* retardo entre ítems hermanos */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --eir-shift: 0px;
    --eir-shift-max: 0px;
    --eir-dur-reveal: 120ms;
    --eir-dur-slow: 120ms;
    --eir-dur-draw: 0ms;
    --eir-stagger: 0ms;
  }
}
```

Regla: **prohibido escribir duraciones, curvas o distancias sueltas** en componentes. Todo sale de un token. Un valor nuevo se añade primero al archivo de tokens.

## 4. Tiempos

| Rol | Rango | Por qué |
|---|---|---|
| Feedback inmediato (color/borde en hover, foco) | 120–200 ms | Por debajo de ~100 ms no se percibe como transición; por encima de ~250 ms se siente lento para un feedback. |
| Indicadores de navegación | 200–280 ms | Seguimiento de una acción del usuario. |
| Menú móvil | 200 ms abrir, 140 ms cerrar | La salida es más corta que la entrada (~70 %): el usuario ya decidió. |
| Reveal de contenido | 300–500 ms (defecto 400) | Coincide con la regla de `eir-design`. |
| Línea de cabecera | 480–600 ms | Trazo largo, es el elemento "firma" de la sección. |
| Trazo SVG | 600–800 ms | Más corto se lee como parpadeo; más largo retiene atención. |
| Hero completo | ≤ 1200 ms | Una sola vez por carga; no debe retrasar lectura ni interacción. |

Reglas:
- **Salida < entrada.** Aproximadamente 60–70 % de la duración de entrada.
- **Nada interactivo espera a una animación.** Los controles responden desde el primer frame (la animación no bloquea clics ni foco).
- **Más distancia ⇒ más tiempo; más tamaño ⇒ más tiempo.** Mantener la relación, no fijar un único valor.
- Techo global: **800 ms** salvo la secuencia de hero.

## 5. Easing

| Uso | Curva | Notas |
|---|---|---|
| Entradas (reveal, hero, subrayados) | `--eir-ease-out` | Arranca rápido y se asienta: parece que "aterriza". |
| Trazos SVG, estados reversibles | `--eir-ease-in-out` | Simetría sin brusquedad. |
| Salidas (cerrar menú) | `--eir-ease-in` | Acelera al desaparecer. |
| Indicadores de progreso ligados al scroll | `linear` | Debe coincidir 1:1 con el scroll. |

Prohibido: `ease` por defecto del navegador sin decidirlo, bounce, elastic, overshoot (`cubic-bezier` con valores > 1 en y), spring con rebote visible.

## 6. Distancias y escala

- **Desplazamiento de reveal**: 8 px (defecto), 12 px (máximo absoluto). Solo eje Y, de abajo hacia arriba.
- **Hover**: sin desplazamiento. Cambios de color/borde/opacidad o `scaleX` de una línea. Un hover que "levanta" el elemento introduce sombra/profundidad, que la identidad excluye.
- **Escala**: no escalar contenido. Excepción: `scaleX` de líneas y un `scale(0.9→1)` en el punto focal SVG.
- **Menú móvil**: 8 px.
- **Nunca** mover texto > 12 px ni en más de un eje.

## 7. Orquestación y límites

### Orden y ritmo
- Orden de lectura = orden de aparición: etiqueta mono → título → línea → cuerpo → elemento visual → foco ámbar.
- **Stagger**: 60 ms entre hermanos, **máx. 4 ítems escalonados** (retardo total ≤ 240 ms). A partir del quinto, aparecen junto al cuarto.
- El **foco ámbar** entra **último** dentro de su grupo: es lo que debe quedarse en el ojo.
- Un grupo de reveal por viewport a la vez.

### Presupuesto de movimiento (heurísticas)
| Límite | Valor |
|---|---|
| Elementos animándose simultáneamente en un viewport | ≤ ~12 |
| Loops infinitos en la página | 0 por defecto (máx. 1 con aprobación) |
| Animaciones por elemento a la vez | 1 (sin encadenar transformaciones superpuestas) |
| Reveals por elemento | 1 (no se repite al reentrar) |
| Porcentaje de pantalla en movimiento en un instante | idealmente < 20 % |
| Elementos con animación de acento (ámbar) | 1 por pantalla |
| Dependencias de animación añadidas | 0 por defecto |

### Qué se anima y qué no
- **Sí**: cabeceras de sección (etiqueta, título, línea), bloques de contenido al entrar, trazos de SVG, estados de navegación, estados interactivos.
- **No**: párrafos largos individualmente (se revelan con su bloque), imágenes de evidencia (aparecer con fundido corto o sin animación; son datos), tablas/datos/métricas (nunca contadores), cualquier cosa ya visible al cargar fuera del hero (evitar parpadeo).
- **Lo experimental** (IA on-device) no se anima con más énfasis que lo implementado/medido.

### Loops ambientales (excepción controlada)
Un movimiento continuo (p. ej. órbita lenta en el hero) solo se acepta si el usuario lo pide **explícitamente** y cumple todo:
1. Un único elemento, amplitud y velocidad mínimas.
2. Solo `transform`. Pausado cuando sale del viewport (`IntersectionObserver`) y cuando `document.hidden`.
3. Con `prefers-reduced-motion: reduce`: **estático**.
4. Si dura más de 5 s y arranca solo, necesita mecanismo de pausa (WCAG 2.2.2, nivel A).
5. No cae sobre texto ni compite con el foco ámbar.
6. No insinúa un estado real (no "pulso de telemetría" si no hay telemetría).

## 8. Reduced motion

Política (usuario con `prefers-reduced-motion: reduce`):

| Tipo de movimiento | Con `reduce` |
|---|---|
| Desplazamiento (translate) | Eliminado (0 px) |
| Escala | Eliminada |
| Dibujo de trazos (stroke-dashoffset) | Eliminado; el trazo aparece completo |
| Parallax / scroll-linked decorativo | No existe |
| Loops | Estáticos |
| Scroll suave (`scroll-behavior`) | `auto` |
| Fundido de opacidad (reveal) | Permitido, ≤ 150 ms, o instantáneo |
| Cambio de color/borde/foco | Se mantiene (no es movimiento espacial) |
| Menú móvil | Aparece sin desplazamiento (fundido ≤ 150 ms o instantáneo) |
| Indicador de scroll (barra) | Desactivado |

Implementación:
1. **CSS**: tokens que se anulan bajo `@media (prefers-reduced-motion: reduce)` (§3) y/o bloques `@media (prefers-reduced-motion: no-preference)` para lo que solo debe existir con movimiento. Preferible: construir en positivo (`no-preference`) lo que añade movimiento.
2. **JS**: leer `matchMedia('(prefers-reduced-motion: reduce)')`, **escuchar `change`** y reaccionar en vivo. Si hay reduce, no instalar observers de movimiento (el contenido se muestra directamente).
3. **Sin JS**: el contenido se ve completo.
4. **Prueba**: emular `reduce` (DevTools → Rendering, o `reducedMotion: 'reduce'` en Playwright) y comprobar cada patrón. Ver checklist.

"Reducir" no es "quitar todo": los cambios de estado que informan (foco, hover de color, `aria-current`) se mantienen.

## 9. Ligereza y dependencias

Escalera (de menor a mayor coste): CSS → JS mínimo propio (`IntersectionObserver`) → Web Animations API → librería ligera → librería pesada.

Criterios para subir de peldaño:
- ¿CSS lo resuelve? Entonces CSS. Esto cubre reveals, hovers, menús, líneas, crossfades y la mayor parte de los SVG.
- ¿Necesita saber cuándo algo entra en pantalla? `IntersectionObserver`, no listeners de scroll.
- ¿Necesita interrupción, secuencias dependientes, animación de layout compartido o gestos? Entonces plantear una librería ligera **y medir el delta de bundle**.
- GSAP, Lottie, smooth-scroll y 3D: no sin aprobación explícita del usuario.

Si se añade una dependencia, el informe debe incluir: qué resuelve que 1–3 no resuelve, el delta de bundle **medido** (no estimado de memoria), y cómo se carga (idealmente diferida o solo donde se usa). No dar tamaños de librerías de memoria como hechos.

## 10. Rendimiento

- **Solo `opacity` y `transform`** (se pueden componer sin recalcular layout). El dibujo de trazo SVG (`stroke-dashoffset`) repinta: se acepta en pocos elementos (≤ ~5 trazos simultáneos).
- **No animar**: `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`, `box-shadow`, `filter`, `backdrop-filter`, `clip-path` salvo caso puntual y medido.
- **`will-change`**: no permanente. Solo mientras dure la animación, y solo si se ha medido mejora. Un `will-change` en muchos elementos consume memoria.
- **Sin layout thrashing**: no leer y escribir layout alternadamente dentro de un mismo frame.
- **Observers**: un `IntersectionObserver` por grupo o compartido; `unobserve` tras el reveal; `disconnect` al desmontar.
- **Listeners de scroll**: solo si no hay alternativa; `{ passive: true }`; sin trabajo pesado por evento. No `setInterval` para animar; usar CSS o `requestAnimationFrame` y solo mientras haga falta.
- **Sin animaciones continuas** que mantengan la CPU/GPU activas en reposo.
- **No degradar LCP/CLS**: ocultar con `opacity: 0` el elemento más grande de la carga puede retrasar el LCP (mi información sugiere que Chrome no lo cuenta hasta que es visible; **medir** en lugar de asumir). Las animaciones solo con `transform` no generan CLS.
- **Presupuesto de JS de motion**: objetivo, decenas de líneas y 0 KB de dependencias. Es una heurística, no una medida.

## 11. Accesibilidad (más allá de reduced motion)

- **WCAG 2.2.2 Pause, Stop, Hide (A)**: movimiento automático > 5 s en paralelo con otro contenido requiere mecanismo de pausa o no debe existir. Por eso cero loops por defecto.
- **WCAG 2.3.1 Three Flashes (A)**: nada parpadea. Sin estroboscopio.
- **WCAG 2.3.3 Animation from Interactions (AAA)**: el movimiento disparado por interacción se puede desactivar; `reduce` lo cubre.
- **Foco**: `:focus-visible` se muestra **inmediatamente**, sin transición ni retardo.
- **Orden del foco y lectores de pantalla**: el contenido existe en el DOM y en el orden de lectura desde el inicio; no se inserta ni se reordena con animación. No ocultar con `display: none` para animar.
- **Sin separar texto en spans por letra/palabra**: rompe lectura asistida y selección de texto.
- **`hover` no es el único camino**: todo estado que responde a hover responde también a foco de teclado.
- **Menús ocultos** no deben ser enfocables: usar `visibility: hidden` (con transición retardada) o `inert`, no solo `opacity: 0`.

## 12. Qué no se sabe (verificar, no asumir)

- **Tokens reales de `eir-design`**: nombres de variables, escala de espaciado y tokens de color no están fijados en esta skill. Se leen del repo.
- **Soporte de `animation-timeline: scroll()` / `view()`**: soporte desigual entre navegadores a fecha de mi conocimiento. Solo como mejora progresiva con `@supports`; verificar en una tabla de compatibilidad actual antes de depender de ello.
- **Interacción de `pathLength` + `vector-effect: non-scaling-stroke`** en dibujo de trazos: puede comportarse distinto entre navegadores (mi información sugiere que los dashes pueden evaluarse en unidades de pantalla). **Probar en Chromium, Firefox y WebKit** antes de adoptarlo. Alternativa en `motion-patterns.md`.
- **Efecto en LCP/CLS** de los reveals del hero: medir en el proyecto real.
- **Todos los números** de este documento (duraciones, distancias, límites) son punto de partida. Ajustar viéndolo en pantalla.
