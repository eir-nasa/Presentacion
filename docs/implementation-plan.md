# Plan de implementación

Propuesta sujeta a aprobación; esta fase no crea UI, instala paquetes ni fija un framework o versión. En el repositorio inspeccionado no hay `package.json`, `src/`, fuentes ni assets de presentación. Antes de comenzar, acordar el entorno real y verificar sus versiones; no asumir Tailwind v3 o v4.

## Separación de responsabilidades propuesta

- `src/content/`: contenido estructurado por sección, identificadores y orden estables, textos aprobados, estados y referencias a evidencias. Mantener el guion del expositor separado de lo visible cuando corresponda; no codificar afirmaciones en JSX.
- `src/assets/` o ubicación pública acordada: derivados autorizados de imágenes y medios; originales y permisos conservados por el equipo. Metadatos de procedencia, alt, dimensiones y estado vinculados desde contenido, no inferidos del nombre de archivo.
- `src/components/`: primitivas `Section`, `SectionHeader`, `Frame`, `Label`, `Figure` y `Placeholder`; semántica y presentación sin datos concretos del proyecto.
- `src/sections/`: un componente por sección, con composición propia y contenido recibido del módulo correspondiente.
- Navegación y Presentation Mode: estado y controles separados del contenido; anclas compartidas con scroll normal. Una sola fuente de verdad para orden e identificadores. Rutas exactas orientativas, adaptables al entorno aprobado.

Usar un `h1`, encabezados ordenados, `nav`, `section`, `figure` y `figcaption`; foco visible, contraste AA y alternativas de teclado y texto. No depender solo de color para el estado experimental. Imágenes con dimensiones y carga diferida fuera del hero; video con controles, subtítulos y alternativa textual. Respetar movimiento reducido.

## Fases posteriores a la aprobación

1. **Base y contenido:** confirmar stack y fuentes, comprobar cobertura de glifos, acordar idioma y recopilar contenido; definir tokens de la skill y modelo de contenido con pendientes explícitos.
2. **Primitivas y hero:** implementar las primitivas mínimas y la primera sección. Revisión rápida de la sección a 1440 px según checklist de la skill; corregir antes de continuar.
3. **Secciones restantes:** construir una por una en orden narrativo; revisar cada una a 1440 px, distinguiendo experimental y verificado. Sustituir placeholders solo con evidencia aprobada.
4. **Navegación y modo presentación:** implementar y probar el contrato de `narrative.md`, incluyendo scroll, teclado, foco, anclas, controles móviles y contenido más alto que la ventana.
5. **Validación por hitos:** revisar base + hero, secciones de contenido y arquitectura/evidencias/resultados a 390, 768, 1024 y 1440 px, con checklist completa y comparación entre secciones; pruebas de teclado, lector de pantalla, contraste y movimiento reducido. Si no hay navegador automatizable, informar la limitación y solicitar capturas, sin afirmar verificaciones no realizadas.

La revisión rápida admite hasta tres iteraciones por sección; si persiste un fallo, exponerlo. Los valores visuales irán en tokens del tema, sin estilos arbitrarios salvo los valores dinámicos justificados por la skill. Evitar dependencias innecesarias y no introducir datos de ejemplo con apariencia real.

## Pendientes para desbloquear implementación

Aprobación de estructura y dirección; idioma final y fuentes tras verificar glifos; textos y evidencias de `evidence-plan.md`; relaciones y estados técnicos; resultados y próximos pasos; disponibilidad de permisos de medios; elección del stack. La implementación comienza únicamente después de la aprobación solicitada.
