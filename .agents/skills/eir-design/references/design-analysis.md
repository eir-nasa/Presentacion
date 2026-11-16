# Análisis de la referencia visual

Fuente: un único fotograma (slide/sección "Project Description" de un concepto web para un planetario). Este documento separa **Observado** (visible en la imagen) de **Inferido** (deducción mía, no verificable con un solo fotograma) y de **Adaptación** (decisión para EIR).

## Limitaciones del análisis

- Es una sola pantalla estática, en formato horizontal. No hay estados (hover, foco), ni versión móvil, ni modo claro, ni movimiento.
- Los colores son estimaciones visuales, no valores muestreados. Deben contrastarse con una captura real si se quiere precisión.
- No identifico con certeza la fuente del título. Se propone una familia equivalente en `design-tokens.md`.
- La ilustración de la nave parece una imagen generada o compuesta, pero no puedo confirmar su origen ni su licencia. **No se reutiliza ni se imita literalmente.** EIR debe usar assets propios.
- La referencia no es editorial en sentido estricto (no hay serif, ni columnas de texto, ni pies de figura). Lo editorial en EIR se añade por decisión de diseño; ver punto 1.

## 1. Estilo visual general
**Observado:** minimalismo oscuro con estética sci-fi. Una sola imagen protagonista, un título display, tres bloques de texto con contorno.
**Inferido:** pretende transmitir "espacio" por atmósfera (oscuridad + objeto iluminado) y no por iconografía espacial (estrellas, cohetes de clip-art).
**Adaptación:** conservar el minimalismo oscuro y la contención. Para lo "editorial" se añade jerarquía tipográfica de revista (etiquetas pequeñas, titulares grandes, pies de figura, numeración de secciones) y, opcionalmente, una serif en frases destacadas.

## 2. Paleta aproximada
**Observado (estimado):**
- Fondo: negro casi puro, ~`#0A0A0C`.
- Texto del título y encabezados: blanco.
- Texto de cuerpo: gris muy claro.
- Contornos: gris medio, ~`#5A5A60`, 1 px.
- Imagen: ámbar/naranja saturado (~`#E8832A`) en la nave, melocotón/crema (~`#C8A484`) en el disco, sombra azul-verdosa muy oscura en el borde superior del disco.
**Adaptación:** neutros fríos casi negros + un acento ámbar + un crema tenue para superficies de luz. Sin segundo acento saturado.

## 3. Tipografía
**Observado:** título en mayúsculas, bold, muy ancho, con tracking y espacio entre palabras muy amplios, glifos cuadrados con cortes angulares (display tecno). Encabezados de tarjeta y cuerpo en grotesca neutra (parece Roboto o similar), con cuerpo muy pequeño respecto al lienzo.
**Inferido:** el contraste entre display agresiva y cuerpo neutro es lo que da el carácter.
**Adaptación:** mantener el contraste de dos voces. **Corregir** el tamaño de cuerpo: en la referencia es demasiado pequeño para leer en una presentación o móvil.

## 4. Composición y estructura
**Observado:** título arriba a la izquierda; fila de tres bloques alineados al mismo margen izquierdo que el título; debajo, la imagen centrada y desplazada hacia abajo, ocupando la mitad inferior. Composición vertical en tres franjas: título / texto / imagen.
**Adaptación:** eje izquierdo común y franjas claras, pero variando la relación texto-imagen entre secciones para no repetir plantilla.

## 5. Espacio en blanco (negro)
**Observado:** amplio vacío a la derecha del título y a ambos lados de la imagen. Los márgenes laterales son ~8 % del ancho.
**Inferido:** el vacío da pausa y enfoca la mirada en la imagen.
**Adaptación:** el vacío es parte de la composición: padding vertical grande por sección y un solo foco.

## 6. Jerarquía visual
**Observado:** (1) imagen por color y tamaño, (2) título por tamaño y peso, (3) encabezados de tarjeta, (4) cuerpo. El único color cálido está en la imagen, así que el ojo va allí.
**Adaptación:** el ámbar reservado al foco de cada sección reproduce este mecanismo.

## 7. Forma y estilo de bloques
**Observado:** tres rectángulos del mismo tamaño, radio pequeño (~8 px), sin relleno visible, sin sombra, con padding interior holgado y texto alineado a la izquierda.
**Punto débil (crítica):** tres bloques idénticos en fila es exactamente el patrón repetitivo que EIR quiere evitar. En la referencia funciona porque es una sola vez y el contenido es breve.
**Adaptación:** usar bloques con contorno **solo cuando agrupan algo**. Variar tamaño, posición y número; preferir listas con líneas separadoras, tablas o columnas editoriales cuando el contenido lo permita.

## 8. Bordes, contornos y superficies
**Observado:** línea de 1 px gris, superficie igual al fondo, ninguna elevación.
**Adaptación:** el contorno sustituye a la sombra. Se define un solo grosor y dos intensidades (normal y de énfasis).

## 9. Relación texto / elemento visual principal
**Observado:** texto y imagen están separados en franjas; no se superponen. La imagen no tiene marco: su silueta circular y la nave recortada definen su propio borde.
**Adaptación:** imagen sin marco rectangular, integrada con el negro del fondo. Texto cerca pero sin superponerse a la zona de interés visual.

## 10. Tono estético y emocional
**Observado/inferido:** silencioso, cinematográfico, contemplativo, con aspiración tecnológica; frío y oscuro, con un punto cálido.
**Adaptación:** serio y preciso, apropiado para un proyecto de salud en un contexto aeroespacial; evitar tono lúdico o gamer.

## 11. Qué evita que parezca genérico
**Observado:**
- La nave **rompe el borde del disco** (la proa sale del círculo): crea profundidad y tensión con una sola maniobra.
- Silueta circular de la imagen frente a una retícula rectangular de texto.
- Contraste fuerte: negro total frente a un único foco cálido.
- Título display ancho frente a cuerpo neutro.
- Contornos finos sin relleno en lugar de tarjetas con sombra.
- Paleta reducidísima.
**Lo que sí es genérico en la referencia:** la fila de tres tarjetas iguales y la estructura "About / Goal / Process".

## 12. Adaptación a EIR Showcase (propuesta)
- **Motivo recurrente:** un disco (circular, tipo planeta/órbita) con un elemento real del proyecto que sobresale de su borde, p. ej. una captura de la app o un dispositivo. Sustituye a la nave. El elemento debe ser un asset propio de EIR (pendiente de que el usuario lo aporte).
- **Hero:** título display + una frase de propuesta + el motivo. Sin botones decorativos.
- **Contenido:** problema/solución en composición editorial (columna ancha de texto + notas laterales), no en tarjetas.
- **Arquitectura:** diagrama de línea fina con etiquetas mono; los componentes experimentales se distinguen visualmente.
- **Evidencias y resultados:** figuras con pie, datos en mono, un número protagonista por bloque. Solo datos reales, con placeholders mientras no existan.
- **Qué NO copiar:** la nave, la composición exacta, las tres tarjetas iguales, el tamaño de cuerpo, el texto.
