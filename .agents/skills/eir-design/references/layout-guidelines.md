# Layout guidelines · EIR Showcase

Índice: [Principios](#principios) · [Estructura de página](#estructura-de-página) · [Motivo visual](#motivo-visual-recurrente) · [Hero](#hero) · [Contenido](#secciones-de-contenido-problema-y-solución) · [Arquitectura](#arquitectura) · [Evidencias](#evidencias) · [Resultados](#resultados) · [Ritmo](#ritmo-entre-secciones) · [Responsive](#responsive) · [Placeholders](#placeholders)

## Principios

1. **Un foco por sección.** Si hay dos cosas compitiendo, una sobra.
2. **Eje izquierdo único.** Títulos, texto y bloques arrancan en el mismo margen.
3. **El vacío trabaja.** No rellenar espacio negro con decoración.
4. **Contorno = agrupación.** Un `Frame` solo existe si agrupa o jerarquiza contenido.
5. **La imagen no lleva marco rectangular.** Se integra con el fondo mediante silueta, recorte o línea.
6. **Variar el layout entre secciones.** Dos secciones seguidas no pueden compartir la misma composición.

## Estructura de página

Orden propuesto, derivado de lo que el usuario dijo que la web debe explicar. Confirmar en Fase 1; no añadir secciones con contenido inventado.

1. Hero
2. Problema
3. Solución
4. Arquitectura
5. Evidencias
6. Resultados
7. Cierre (equipo/contacto/créditos solo si el usuario aporta el contenido)

Cada sección lleva cabecera estándar: etiqueta mono con número y nombre (`01 · PROBLEMA`) + título display + (opcional) línea de contexto en `ink-muted`.

## Motivo visual recurrente

Inspirado en el mecanismo de la referencia (objeto que rompe el borde de un disco), no en su ilustración.

- **Forma:** un disco circular (contorno de 1 px o superficie `dust` tenue con luz lateral). Representa un cuerpo celeste/órbita.
- **Elemento que lo rompe:** un asset real del proyecto (captura de la app, dispositivo, un gráfico) que sobresale del borde. **Pendiente de que el usuario aporte el asset.** Mientras tanto, usar `Placeholder`.
- **Uso:** hero (protagonista), y como máximo dos secciones más con un papel distinto (p. ej. fondo parcial recortado, o marcador de escala en la arquitectura).
- **No hacer:** repetirlo en todas las secciones, animarlo en bucle, añadir estrellas/partículas alrededor, o usar clip-art de cohetes y astronautas.

## Hero

- Fondo `void`, sin gradiente.
- Título `display-hero` en mayúsculas alineado a la izquierda, una sola frase corta. El texto real lo aporta el usuario; si no existe, `[PENDIENTE: título]`.
- Una línea de apoyo en `body-lg` + `ink-muted`, máx. 2 líneas.
- Motivo visual ocupando 40–60 % del ancho en desktop, desplazado, no centrado en el eje del título; puede quedar parcialmente recortado por el borde inferior o derecho.
- Metadatos opcionales en `label` mono, discretos (p. ej. nombre del evento y año), solo con datos confirmados: NASA Space Apps Challenge 2026.
- Una única acción primaria si hace falta (p. ej. "ver arquitectura"), como enlace con contorno, sin relleno ámbar masivo, sin botones duplicados.
- Altura: 90–100 vh en desktop; en móvil el contenido no debe quedar oculto tras el motivo.
- Prohibido: carrusel, vídeo de fondo autoplay, texto sobre imagen sin contraste, contador animado de métricas inventadas.

## Secciones de contenido (Problema y Solución)

- Composición **editorial**: columna de texto de 55–75 caracteres + columna lateral estrecha con notas, etiquetas o una figura. No tarjetas.
- Un titular grande con una frase afirmativa (puede usar la serif opcional) y debajo el desarrollo.
- Si hay 2–4 puntos paralelos, preferir lista numerada con líneas separadoras horizontales (`border-line`) antes que tarjetas.
- `Frame` con contorno solo para: una cita, una definición, un dato clave. Nunca una fila de 3 `Frame` idénticos con icono.
- Cada sección de contenido responde una pregunta (¿cuál es el problema? ¿qué hace EIR?). Si no puedes escribir esa pregunta, la sección no está definida.

## Arquitectura

Componentes declarados por el equipo: app Android, backend FastAPI + SQLite, sincronización, IA on-device (experimental). **Los flujos exactos entre ellos no se conocen**: pregúntalos antes de dibujar flechas.

- Diagrama en SVG o HTML+CSS, trazo de 1 px (`line-strong`), nodos con contorno y etiqueta `mono` en mayúsculas.
- Máximo un nodo o conexión resaltado en `ember` (el flujo principal explicado en ese momento).
- Distinguir visualmente lo **experimental** (p. ej. contorno discontinuo + etiqueta `EXPERIMENTAL`) de lo implementado.
- Leyenda mínima y explícita. Sin iconos de tecnologías decorativos, sin logos que no se tenga permiso de usar.
- Cada nodo puede expandirse (hover/foco/clic) para mostrar 1–2 líneas de detalle. Debe ser accesible por teclado y funcionar también en móvil (tap).
- Alternativa textual: lista accesible equivalente al diagrama para lectores de pantalla.
- Diagrama ancho: scroll horizontal controlado en móvil o versión vertical simplificada; nunca texto ilegible por reducción.

## Evidencias

Aquí se muestra lo que respalda las afirmaciones: capturas de la app, gráficos, tablas, registros. **Ninguna evidencia se inventa.**

- Cada evidencia es una `Figure`: imagen o gráfico + pie (`figure-caption`) con qué es, de dónde viene y estado (real / experimental / simulado).
- Etiquetar en mono el tipo: `CAPTURA`, `GRÁFICO`, `TABLA`, `LOG`.
- Capturas de móvil: mostradas con su proporción real, sin marco de dispositivo decorativo salvo que el motivo visual lo justifique.
- Layout variable: una evidencia principal grande + hasta 3 secundarias pequeñas por pantalla, no una rejilla uniforme de miniaturas.
- Datos numéricos en mono, tamaño grande para el dato protagonista, unidad y contexto en `ink-muted`.
- Gráficos: fondo transparente, ejes en `line`, una sola serie destacada en `ember`, resto en `ink-muted`. Sin sombras, sin degradados bajo la curva, sin 3D.
- Si no hay evidencia aún: `Placeholder` con el tipo de evidencia esperado y quién debe aportarla.

## Resultados

- Un resultado por bloque: dato protagonista + qué mide + cómo se midió + limitaciones.
- Lo experimental se presenta como tal (p. ej. "preliminar") y con menor peso visual que lo verificado.
- Sin cifras de relleno. Sin comparativas con otros productos si el usuario no las aporta.
- Cierre con "siguientes pasos" solo si el equipo los define.

## Ritmo entre secciones

| Sección | Densidad | Composición sugerida |
|---|---|---|
| Hero | Aireada | Título + motivo, asimétrico |
| Problema | Media | Editorial, columna + nota lateral |
| Solución | Media | Titular grande + 2–3 puntos en lista numerada |
| Arquitectura | Densa | Diagrama ancho, protagonista |
| Evidencias | Media | Figura principal + hasta 3 secundarias |
| Resultados | Aireada | Un dato grande por bloque |

Arquitectura es la única sección densa del recorrido; Evidencias se mantiene en densidad media para no encadenar dos densas. Nunca dos secciones seguidas con la misma composición. Si el resultado final se parece a una pila de bloques "título + 3 tarjetas", rehacer.

## Responsive

- Breakpoints a revisar: 390, 768, 1024, 1440 px.
- Asimetría de desktop → una columna en móvil, conservando el orden de lectura: cabecera → texto → figura.
- El motivo circular en móvil reduce su tamaño y puede recortarse por el borde, sin tapar texto.
- Tap targets ≥ 44 px. Sin hover como única vía de acceso a información.
- Fuente display: reducir tracking en móvil para evitar desbordes.

## Placeholders

Un `Placeholder` debe:
- Verse intencionado: contorno discontinuo `line`, etiqueta mono `[PENDIENTE]` y descripción de lo que falta.
- Reservar la proporción final del contenido (para no romper el layout al sustituirlo).
- Ser fácil de buscar en el código: texto `PENDIENTE:` en un solo componente.
- No simular datos (nada de números o gráficos de ejemplo parecidos a reales).
