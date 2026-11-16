# Estructura de la presentación

Propuesta para revisión, sin implementación. Se conservan las seis secciones: su secuencia responde a identidad → necesidad → propuesta → funcionamiento → evidencia → alcance. El cierre vive en la última sección; no se añade una sección de equipo o contacto sin contenido confirmado.

| Sección | Pregunta, propósito y mensaje de trabajo | Contenido y visual principal | Densidad |
|---|---|---|---|
| 01 · Introduction | ¿Qué es EIR? Presentar el proyecto de monitoreo de salud y bienestar para astronautas. | Nombre EIR, contexto NASA Space Apps Challenge 2026 y `[PENDIENTE: título y frase de presentación aprobados]`. Disco descentrado atravesado por `[PENDIENTE: asset real del proyecto]`. | Aireada |
| 02 · The Challenge | ¿Qué necesidad aborda? Situar el problema que el equipo pueda respaldar. | `[PENDIENTE: formulación del problema, contexto y fuentes]`. Texto editorial con una nota o figura contextual documentada. | Media |
| 03 · Our Solution | ¿Qué propone EIR? Presentar la app Android y sus capacidades confirmadas. | `[PENDIENTE: funcionalidades verificadas y alcance]`; captura real principal y, si procede, lista numerada breve. No atribuir capacidades aún no confirmadas. | Media |
| 04 · How EIR Works | ¿Qué piezas componen el sistema? Explicar lo confirmado y separar lo experimental. | Diagrama de app Android, backend FastAPI + SQLite, sincronización e IA on-device experimental. `[PENDIENTE: relaciones, dirección de flujos y estado de cada componente]`; no dibujar conexiones supuestas. | Densa |
| 05 · Development & Evidence | ¿Qué respalda lo presentado? Mostrar proceso y evidencia pertinente. | Una figura real principal y hasta tres secundarias por pantalla, con procedencia y estado; `[PENDIENTE: capturas, registros y evidencias de desarrollo]`. | Media |
| 06 · Results & Future | ¿Qué se ha observado y qué falta? Delimitar resultados, limitaciones y próximos pasos. | `[PENDIENTE: resultados verificables, método, limitaciones y pasos aprobados]`. Un resultado por bloque; si no hay resultados, mostrar el pendiente sin cifras. | Aireada |

## Sistema visual propuesto

Cabecera compartida de etiqueta mono, título display y línea base; eje izquierdo común, fondo casi negro, líneas finas y un solo foco ámbar por pantalla. El disco de contorno atravesado por un asset real aparece en Introduction y, opcionalmente, en Our Solution como recorte de la captura: dos usos con funciones distintas, sujeto a que exista el asset. Sin serif ni token `signal` en esta propuesta. Las composiciones varían: hero asimétrico, editorial, captura con lista, diagrama, figuras y cierre abierto. No usar tarjetas uniformes ni relleno decorativo para ocupar el vacío.

Tipografía candidata: **Michroma** para display, **Roboto** para cuerpo e **IBM Plex Mono** para etiquetas. No se encontraron estas fuentes en el repositorio ni en el sistema inspeccionado; por tanto, la cobertura de `á é í ó ú ñ ü ¿ ¡` y su renderizado **no están verificados**. Antes de fijarlas, obtener los archivos autorizados y comprobar sus glifos y una muestra real en español, incluidos los signos; sustituir cualquier candidata que falle. El idioma final de la presentación también queda pendiente. Cuerpo de al menos 16 px y jerarquía y contraste según los tokens de la skill.

Riesgos: repetir «título + tarjetas» se evita mediante los formatos distintos de la tabla; repetir el disco se limita a dos usos con propósito; una arquitectura visualmente convincente podría sugerir relaciones no confirmadas, por lo que se reservan sus conexiones; un resultado grande vacío no debe aparentar una medición. Los placeholders serán visibles como `[PENDIENTE: descripción]`, con proporción apropiada y sin datos simulados.
