# Checklist de revisión visual · EIR Showcase

Úsala en Fase 3 sobre screenshots reales:
- **3A · rápida (tras cada sección):** captura solo esa sección en 1440 px; revisa los bloques 1–4, la prueba de los 3 segundos y los antipatrones. Informa solo los ✘.
- **3B · completa (al cerrar cada hito y al final):** capturas en 390 / 768 / 1024 / 1440 px de las secciones del hito; checklist completa, prueba de consistencia global y antipatrones.

Si no pudiste capturar, dilo y no marques ítems como cumplidos. Lo que no revisaste en 3A (p. ej. responsive) se informa como "no verificado", no como ✔.

Formato del informe: lista cada ítem como ✔ / ✘ / n/a, y para cada ✘ indica qué ves y qué cambias.

## 1. Identidad
- [ ] El fondo es `void`; ninguna sección usa blanco, gris medio o gradiente de fondo.
- [ ] Solo existe un acento cálido (`ember`) y aparece en un foco principal por pantalla.
- [ ] La display solo se usa en títulos; el cuerpo no usa display.
- [ ] Hay como máximo 3 familias (display, cuerpo, mono); una cuarta solo si es la serif aprobada en Fase 1.
- [ ] Los bloques se definen por contorno de 1 px, sin sombra ni blur.
- [ ] Radios coherentes (4 u 8 px; círculo solo para el motivo).
- [ ] Ninguna decisión visual de esta sección contradice `design-tokens.md`.

## 2. Composición
- [ ] Hay un único punto de atención claro.
- [ ] Títulos, texto y bloques comparten el mismo eje izquierdo.
- [ ] El espacio vacío es deliberado; no hay decoración que lo rellene.
- [ ] La sección no repite la composición de la anterior ni de la siguiente.
- [ ] Hay jerarquía: se distinguen 3 niveles a golpe de vista (título / texto / etiqueta).
- [ ] Los bloques con contorno agrupan algo que lo justifica.

## 3. Tipografía y legibilidad
- [ ] Cuerpo ≥ 16 px en desktop y ≥ 14 px en móvil.
- [ ] Líneas de párrafo de 55–75 caracteres.
- [ ] Contraste AA en todo el texto (revisar `ink-muted` sobre cada fondo).
- [ ] Los títulos display no se rompen a mitad de palabra ni desbordan en 390 px.
- [ ] Acentos y `ñ ¿ ¡` se renderizan bien.

## 4. Contenido y honestidad
- [ ] No hay datos, métricas, citas ni nombres inventados.
- [ ] Todos los huecos están marcados con `PENDIENTE:`.
- [ ] Lo experimental (IA on-device) está marcado como tal y con menor peso que lo verificado.
- [ ] No hay afirmaciones clínicas o de validación médica no confirmadas.
- [ ] Las evidencias tienen pie con tipo y estado.

## 5. Implementación (se revisa leyendo el código)
- [ ] No hay hex ni px arbitrarios; `style={{}}` solo para valores dinámicos justificados (variables CSS calculadas en runtime), nunca para tokens.
- [ ] Se usan las primitivas (`Section`, `Frame`, `Label`, `Figure`, `Placeholder`) y no estilos repetidos.
- [ ] HTML semántico, un solo `h1`, encabezados en orden.
- [ ] Foco visible; navegación por teclado funcional en interacciones y diagrama.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Imágenes con `alt` útil, dimensiones declaradas y lazy loading fuera del hero.

## 6. Responsive (solo 3B)
- [ ] 390: sin scroll horizontal accidental, orden de lectura correcto, motivo sin tapar texto.
- [ ] 768: transición razonable, no una versión "estirada" de móvil.
- [ ] 1024 y 1440: el contenido no se pierde en el vacío; el eje izquierdo se mantiene.
- [ ] Tap targets ≥ 44 px.

## Antipatrones: rechazo automático

| Antipatrón | Cómo detectarlo |
|---|---|
| Estética SaaS genérica | Hero centrado con botón, badges, "features" en rejilla, CTA final tipo "Get started" |
| Tarjetas repetitivas sin intención | 3+ `Frame` idénticos en fila, con icono arriba y 2 líneas de texto |
| Gradientes decorativos | Cualquier `bg-gradient-*`, texto con degradado, halos de color detrás de elementos |
| Glassmorphism | `backdrop-blur`, fondos translúcidos tipo vidrio, bordes brillantes |
| Exceso de elementos visuales | Estrellas, partículas, órbitas animadas, iconos de librería como adorno, más de un motivo por pantalla |
| Acento diluido | Más de un elemento `ember` compitiendo en la misma pantalla |
| Contenido inventado | Cifras redondas no aportadas, testimonios, logos de terceros sin confirmar |
| Copia de la referencia | Nave, composición idéntica, textos "About / Goal / Process" |

## Prueba de los 3 segundos

Mira cada captura de la sección durante 3 segundos y responde:
1. ¿Qué es lo primero que miro? (debe ser el foco previsto)
2. ¿Qué dice la sección en una frase? (debe coincidir con el mensaje de la Fase 1)
3. ¿Podría esta captura pertenecer a cualquier otra web de tecnología? Si sí, la sección falla.

## Prueba de consistencia global (solo 3B)

Pon las capturas de todas las secciones lado a lado:
- ¿Se reconoce la misma identidad (color, tipografía, línea, vacío)?
- ¿Hay variedad de composición, sin sensación de plantilla repetida?
- ¿El motivo visual recurrente aparece con intención y en no más de 3 secciones?

## Informe final por sección

```
Sección: <nombre>
Capturas revisadas: <anchos>
Ítems ✘: <lista con corrección aplicada>
Pendientes de contenido: <lista PENDIENTE:>
Riesgo de genericidad restante: <bajo/medio/alto + motivo>
```
