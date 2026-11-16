# Checklist de revisión

Úsala al cerrar cada asset. **Informa solo los ✘ y lo no verificado.** Cada ítem se marca como: ✔ visto/comprobado, ✘ falla, ◌ no verificado (y por qué). No marques ✔ algo que no has comprobado.

## A · Clasificación y accesibilidad

- [ ] Está declarado como decorativo o informativo y la clase es correcta (regla: si quitas el SVG y se pierde información, es informativo).
- [ ] Decorativo: `aria-hidden="true"`, `focusable="false"`, sin `<title>`, sin texto ni números que parezcan datos.
- [ ] Informativo: `role="img"`, `<title>` con ID único (`useId`), `<desc>` si es complejo, `aria-labelledby` correcto.
- [ ] El significado no depende solo del color (estilo de línea + etiqueta).
- [ ] Informativo: los trazos esenciales tienen ≥ 3:1 de contraste contra el fondo real *(medir, no estimar)*.
- [ ] El tipo TS rechaza `title` en decorativos y lo exige en informativos.
- [ ] Hay movimiento: respeta `prefers-reduced-motion`. No hay bucles.

## B · Identidad EIR

- [ ] Fondo y trazos usan roles de `ink`; el SVG se ve como parte del mismo sistema que las secciones vecinas.
- [ ] **Un solo foco.** Lo identifico en 3 segundos.
- [ ] El ámbar aparece como máximo una vez en el asset **y** no hay otro ámbar competidor en la pantalla (`accent` correcto).
- [ ] Hay vacío activo: el asset respira (hero ≥ 60 %, sección ≥ 40 % de vacío, *heurística*).
- [ ] No está centrado y simétrico por defecto sin una razón.
- [ ] Coherente con ilustraciones existentes en grosor, densidad y ritmo.
- [ ] Si usa el motivo recurrente, está dentro de las 3 apariciones máximas y con propósito distinto.

## C · Geometría y trazo

- [ ] Posiciones y tamaños en múltiplos de 8 (detalle en 4); radios de la escala; ángulos múltiplos de 15°.
- [ ] Solo primitivas permitidas; sin formas a mano alzada ni siluetas reconocibles.
- [ ] Máximo 2 grosores. Hairline (1) en ≥ 70 % de los trazos. Grosor 2 solo en el foco.
- [ ] `vectorEffect="non-scaling-stroke"` en todos los trazos.
- [ ] `strokeLinecap`/`strokeLinejoin` por defecto; `round` solo en punteado.
- [ ] Series repetidas agrupadas en un solo `<path>`.
- [ ] Presupuesto de detalle respetado (D1 ≤ 12, D2 ≤ 40, D3 ≤ 80 nodos; *heurística*).
- [ ] Ningún elemento queda pegado al borde del viewBox por accidente.

## D · Color y efectos

- [ ] Cero colores literales (hex, `rgb()`, `hsl()`) en el SVG y en el componente.
- [ ] `fill="none"` por defecto; rellenos solo: punto focal, oclusión con `surface`, un degradado radial de luz.
- [ ] Máximo 1 degradado; radial; ID con `useId`; no es fondo.
- [ ] Sin `filter`, blur, glow, sombras, `mix-blend-mode`, `<image>` ni `foreignObject`.
- [ ] La jerarquía sobrevive en monocromo (foco aún se lee).

## E · SVG limpio

- [ ] `viewBox` presente; sin `width`/`height` fijos en el `<svg>`.
- [ ] `preserveAspectRatio` decidido (`slice` solo en decorativo a sangre; el foco cae en la zona segura).
- [ ] Sin `<style>`, sin metadatos de editor, sin `<defs>` vacíos, sin IDs huérfanos o fijos.
- [ ] Sin transformaciones anidadas ni `matrix()`.
- [ ] Atributos comunes en el `<g>` padre.
- [ ] Texto, si lo hay, es `<text>` real con la clase `label`; no baja de ~11-12 px efectivos a 390 px (si baja, está en HTML).

## F · React + Vite + TypeScript

- [ ] Componente TSX inline (no `<img src>` con colores fijos, salvo petición expresa y avisada).
- [ ] No se añadió ninguna dependencia sin pedirlo.
- [ ] Exportación nombrada, props tipadas con `IllustrationProps`, `className` pasado al `<svg>`.
- [ ] Sin `style={{}}` con valores visuales (excepción dinámica comentada).
- [ ] Atributos en camelCase; sin warnings de React en consola.
- [ ] `tsc --noEmit` pasa *(ejecutar y pegar el resultado; no suponer)*.
- [ ] Si el repo usa ESLint/Prettier, el archivo pasa.

## G · Contenido y honestidad

- [ ] Nada parece un dato, una telemetría o una captura real si no lo es.
- [ ] Los diagramas muestran solo componentes declarados; lo desconocido está como `[PENDIENTE: …]`.
- [ ] Implementado / experimental / pendiente se distinguen (continua / discontinua / punteada) y llevan etiqueta.
- [ ] Lo experimental no pesa visualmente como un resultado verificado.
- [ ] No imita un trazado clínico real ni sugiere diagnóstico o validación clínica.
- [ ] Placeholder de evidencia: marcado, proporción del medio real, sin interfaz ni gráfica simulada.

## H · Originalidad

- [ ] Derivado de un concepto de EIR, no de una imagen de referencia.
- [ ] No traza, reproduce ni recompone un diseño externo.
- [ ] No contiene logos, insignias ni emblemas de NASA u otras agencias o empresas (salvo archivos oficiales aportados por el usuario, sin alterar).
- [ ] No cae en ningún antipatrón de `SKILL.md` (astronauta/cohete, nebulosa, partículas, neón, 3D, corazón + ECG…).

## I · Render *(solo si hay navegador automatizable)*

- [ ] Renderizado sobre el **fondo real** de la sección en 390, 768, 1024 y 1440 px.
- [ ] No hay recortes indeseados, texto ilegible ni líneas que desaparecen o se espesan.
- [ ] En 390 px el foco sigue siendo claro (prueba de reducción).
- [ ] Dos instancias en la misma página no colisionan (IDs).
- Si no se pudo renderizar: **◌ no verificado: render.** Entrega solo A–H y dilo.

## Pruebas rápidas

1. **3 segundos**: ¿qué mira primero el ojo? Debe ser el foco.
2. **Eliminación**: quita ~20 % de elementos. ¿Mejora o no cambia? Quítalos.
3. **Monocromo**: un solo color. ¿Se mantiene la jerarquía?
4. **Reducción**: 50 % del tamaño. ¿Se mantiene la lectura del foco y la estructura?
5. **Vecindad**: capturas lado a lado con la sección anterior y la siguiente. ¿Parece la misma plantilla repetida? Si sí, es un fallo.
6. **Stock**: ¿podría estar en un banco de imágenes? Si sí, rehacer.

## Comprobaciones estáticas (copiar y ejecutar sobre el archivo)

```bash
F=src/components/illustrations/<archivo>.tsx

# Colores literales (debe devolver 0 líneas)
grep -nE '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(' "$F"

# Efectos y elementos prohibidos (debe devolver 0 líneas)
grep -nE '<image|foreignObject|<filter|feGaussianBlur|feDropShadow|<style|mix-blend' "$F"

# Estilos inline (revisar cada resultado: solo valores dinámicos justificados)
grep -n 'style={{' "$F"

# IDs fijos (debe devolver 0; usar useId)
grep -nE 'id="|url\(#[A-Za-z]' "$F"

# vectorEffect presente en los trazos
grep -c 'non-scaling-stroke' "$F"

# Tipos
npx tsc --noEmit
```

## Formato del informe

```
Asset: <ruta> · Tipo: <tipo> · Clase: <decorativo|informativo> · Detalle: <D1|D2|D3>

✘ <ítem que falla> → <corrección aplicada o pendiente>
◌ <ítem no verificado> → <por qué>
[PENDIENTE] <contenido que falta>
```

Si no hay ✘ ni ◌, di "sin hallazgos" y para. No añadas elogios ni resumen.
