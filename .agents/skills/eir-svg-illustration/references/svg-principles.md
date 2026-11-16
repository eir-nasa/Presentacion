# Principios SVG de EIR

Los números de este documento marcados como *(heurística)* son puntos de partida razonables, no valores verificados contra el diseño existente. Si el repo contradice una cifra, gana el repo.

## 1. Principio rector

Una ilustración EIR es una **carta técnica**, no un dibujo: pocas líneas finas, una estructura legible y un único punto cálido que dice "mira aquí". Si se puede confundir con una ilustración de banco de imágenes, está mal.

## 2. Cómo pensar el asset

- Parte del concepto (señal, ritmo, órbita, distancia, sincronización), no de un objeto (cohete, astronauta).
- Dibuja **relaciones** (anillos, ejes, intervalos, trayectorias), no **cosas**.
- Cada elemento responde a "¿qué hace aquí?". Si la respuesta es "adornar", se elimina.
- Prueba de eliminación: quita ~20 % de los elementos. Si mejora o no pasa nada, no debían estar.

## 3. Roles de color

El SVG nunca nombra colores: nombra **roles**. `ink.ts` mapea cada rol a la clase o variable real del proyecto (Fase 0).

| Rol | Uso | Regla |
|---|---|---|
| `structure` | Ejes, marcos, marcas, conexiones | Trazo 1. Es la línea "normal" |
| `context` | Anillos, rejillas, elementos de fondo | Trazo 1, más tenue que `structure` |
| `focus` | Foco cuando no hay acento | Trazo 2, el más claro de la composición |
| `accentStroke` / `accentFill` | Foco con acento ámbar | Solo si `accent={true}`. Un elemento o grupo pequeño |
| `surface` | Oclusión (ocultar líneas tras un disco) | Igual al fondo de la sección |
| `label` | Texto mono pequeño en mayúsculas | Solo en informativos |

Reglas:
- **Ámbar: una vez por ilustración y una cosa por pantalla.** Si la sección ya tiene un elemento ámbar (título, botón, dato), la ilustración va con `accent={false}`.
- La jerarquía se construye con **grosor, rol y vacío**, no con opacidad ni con más colores.
- Opacidad: solo en el degradado interno de luz (§10). No uses `opacity` para "suavizar" líneas; usa `context`.
- Si un rol no tiene token en el proyecto, se pregunta. No se inventa un hex.
- Contraste (WCAG 2.1, 1.4.11, contraste de elementos no textuales): en **informativos**, los trazos que transmiten información deben tener ≥ 3:1 contra el fondo. Los trazos `context` puramente ambientales no lo necesitan. En decorativos no aplica.

## 4. Trazo

Con `vectorEffect="non-scaling-stroke"` los valores son **píxeles de pantalla**, no unidades de viewBox. Así el trazo coincide con los contornos de 1 px de la UI a cualquier tamaño.

| Nivel | Grosor | Uso | Presupuesto |
|---|---|---|---|
| Hairline | 1 | Estructura y contexto | ≥ 70 % de los trazos *(heurística)* |
| Medio | 1,5 | Conexiones importantes en diagramas | Opcional; solo informativos |
| Fuerte | 2 | Foco | ≤ 1 elemento o grupo |

- Máximo **2 grosores distintos** por asset.
- `strokeLinecap="butt"` y `strokeLinejoin="miter"` por defecto. `round` solo en trazo punteado.
- Nunca grosor 3 o más. Nunca trazos de grosor variable.

## 5. Estilos de línea (semántica)

Convención **propuesta**; confírmala con el usuario o con `eir-design` antes de generalizarla.

| Estilo | `strokeDasharray` | Significa |
|---|---|---|
| Continua | (ninguno) | Implementado / medido |
| Discontinua | `4 4` | Experimental |
| Punteada | `1 4` + `round` | Pendiente / no confirmado |

El significado nunca va solo en el estilo: acompáñalo de una etiqueta (`EXPERIMENTAL`, `[PENDIENTE]`) en el SVG o en el HTML cercano. Lo experimental no usa acento ámbar si hay un resultado verificado en la misma vista.

## 6. Geometría y rejilla

- **Unidad base: 8** en unidades de viewBox. Posiciones y tamaños en múltiplos de 8; detalle fino en múltiplos de 4.
- **Escala de radios**: 8, 16, 24, 32, 48, 64, 96, 128, 192, 288, 384… (no inventes radios fuera de la escala sin motivo).
- **Ángulos**: múltiplos de 15° (0, 15, 30, 45, 60, 90…).
- **Primitivas permitidas**: `line`, `polyline`, `circle`, `ellipse`, `rect` (radio ≤ 4), arcos (`A`) y `path` con segmentos rectos. Curvas Bézier solo para trayectorias orbitales y siempre derivadas de elipses/arcos.
- **Prohibido**: formas orgánicas a mano alzada, siluetas reconocibles (personas, naves, planetas con rasgos), curvas "dibujadas".
- Series repetidas (marcas de regla, ticks): **un solo `<path>` con subtrazos** (`M x y V y2 M …`), generado con código si hace falta. Cuenta como 1 elemento.
- Coordenadas con máximo 1 decimal. Redondea.

## 7. Composición

- **Un foco.** Todo lo demás lo apoya o lo enmarca.
- **Asimetría con intención**: el foco va descentrado; el vacío de un lado equilibra el peso del otro. Centrar todo es un antipatrón.
- **Vacío activo** *(heurística)*: hero ≥ 60 % vacío; sección ≥ 40 %; soporte de diagrama, el que pida el contenido pero nunca denso en todo el lienzo.
- **Eje izquierdo único**: el bloque de la ilustración se alinea con el eje de la sección. Dentro del viewBox deja un margen ≥ 1 unidad de rejilla (8) salvo que el elemento sangre a propósito.
- **Sangrado**: si una forma sale del lienzo, que lo haga de forma clara (cortada por el borde del viewBox) y no a 2-3 unidades del borde.
- **Relación con el texto vecino**: la ilustración no compite con el título. Si el título ocupa el lado izquierdo, el peso visual de la ilustración va a la derecha, y al revés.
- **Recorte responsive**: decide `preserveAspectRatio`. Decorativo a sangre: `xMidYMid slice` (el borde puede recortarse, asegúrate de que el foco queda en la zona segura). Informativo: `xMidYMid meet` (nunca recortar).

## 8. Jerarquía visual

Tres niveles y nada más:

1. **Foco**: 1 elemento o grupo. Trazo 2 y/o acento.
2. **Estructura**: lo que organiza el foco. Trazo 1, `structure`.
3. **Contexto**: lo que lo sitúa. Trazo 1, `context`.

Prueba de monocromo: renderiza con un solo color. Si el foco deja de leerse como foco, la jerarquía depende del color y está mal construida (debe sostenerla el grosor y el vacío).

## 9. Niveles de detalle *(presupuestos heurísticos)*

Cuenta **nodos renderizados** (un `<path>` con muchos subtrazos cuenta 1). KB = tamaño aproximado del marcado SVG.

| Nivel | Para | Elementos | Tamaño | Foco | Gradiente | Texto |
|---|---|---|---|---|---|---|
| **D1 Mínimo** | Separadores, placeholders | ≤ 12 | ≤ 2 KB | 0-1 | No | Solo placeholder |
| **D2 Medio** | Ilustraciones de sección, soporte de diagrama | ≤ 40 | ≤ 6 KB | 1 | ≤ 1 | Solo informativos, mínimo |
| **D3 Rico** | Hero | ≤ 80 | ≤ 12 KB | 1 | ≤ 1 | No |

Si te pasas del presupuesto, **simplifica** antes de justificar. Un hero de 200 elementos no es más rico, es más ruidoso. El detalle fino (ticks, anotaciones) aporta textura técnica pero nunca debe ser visible como protagonista a 390 px.

Prueba de reducción: a la mitad del tamaño, el foco y la estructura siguen leyéndose; los detalles pueden desaparecer sin que se rompa la composición.

## 10. Relleno, degradado y efectos

- **Sin relleno** por defecto (`fill="none"`).
- Rellenos permitidos: (a) punto o disco focal, (b) oclusión con `surface`, (c) un degradado radial interno de luz sobre un único cuerpo.
- **Degradado**: radial, máximo 1 por asset, con stops tomados de roles (`stop-color` por clase o variable, no hex) y `stop-opacity` para fundir con el fondo. ID con `useId`. Nunca como fondo de la ilustración.
- **Prohibido**: `filter`, `feGaussianBlur`, `feDropShadow`, glow, sombras, `mix-blend-mode`, patrones de ruido, `<image>` embebida, `foreignObject`.

## 11. Texto dentro del SVG

- Preferible: **etiquetas en HTML** (accesibles, escalan con la tipografía del sitio) y SVG solo para la línea.
- Si es imprescindible: `<text>` real (nunca texto convertido a trazos), clase `label` (mono, mayúsculas, tracking), caracteres españoles correctos.
- Si a 390 px el texto se renderiza por debajo de ~11-12 px efectivos *(heurística)*, muévelo a HTML.
- Decorativos: sin texto, y sin números que parezcan datos.

## 12. Movimiento

Estático por defecto. Si el usuario lo pide: solo entrada (opacidad + desplazamiento ≤ 12 px, 300-500 ms), una vez, y desactivado con `prefers-reduced-motion`. Sin bucles, sin parallax, sin partículas.

## 13. SVG limpio y editable

- Estructura: `<svg>` → `<title>/<desc>` (informativo) → `<g>` por nivel jerárquico (contexto, estructura, foco) → elementos.
- Los grupos se nombran por rol con comentarios JSX breves (`{/* Contexto: anillos */}`), no con IDs.
- Atributos repetidos (`fill="none"`, `strokeWidth`, `vectorEffect`) en el `<g>` padre, no en cada hijo.
- Sin transformaciones anidadas ni `matrix()`. Preferir coordenadas explícitas.
- Sin metadatos de editor (Inkscape, Illustrator, Figma), sin `<defs>` vacíos, sin IDs huérfanos.
- Sin `<style>` dentro del SVG; los estilos van por clases del tema.
- Si el repo ya usa svgo, respeta su configuración. Si no, optimiza a mano: sin dependencias nuevas.

## 14. Originalidad

1. Define el concepto en una frase antes de dibujar.
2. Traduce el concepto a relaciones geométricas (p. ej. "sincronización" → dos trayectorias que convergen en un punto).
3. Dibuja con primitivas sobre la rejilla.
4. Revisa: ¿se parece a algo conocido? Si hay un parecido claro con una ilustración, logo o emblema existente, cámbialo.

No se traza, no se reproduce y no se recompone ningún diseño externo, ni siquiera "inspirado". Las referencias aportadas se usan para extraer **principios**, no formas.
