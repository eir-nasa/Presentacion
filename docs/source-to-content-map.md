# EIR Showcase source-to-content map

This map records the evidence basis used for public copy in the final content integration. It is not a runtime test report. Source-code findings apply to the inspected Android revision `e96ab34` and backend revision `f413e20`.

| Showcase section | Public content supported by | Applied scope and wording choice |
|---|---|---|
| 01 · Introduction | `NASA ReEdicion.pdf` §§1–2; `EIR-Demo.pdf` cover | Uses the confirmed project name, team, challenge, event, official tagline, and experimental-companion framing. |
| 02 · The Challenge | `NASA ReEdicion.pdf` “The Challenge”; NASA HRP Isolation and Confinement; Canadian Space Agency science-in-space resource | Explains isolation, routines, sleep, communication delay, and the need to combine physical and behavioral context. It does not make medical-performance claims. |
| 03 · Our Solution | `NASA ReEdicion.pdf` six-experience sections; Android source review recorded in `eir-implementation-audit.md` | Documents Health, Habits, Checkup, Logbook, AI Agent, and SOS. Camera/voice, synthetic indicators, AI inference, and SOS guidance are explicitly qualified. |
| 04 · How EIR Works | `NASA ReEdicion.pdf` architecture/synchronization/deployment sections; Android and backend source review; `integration-verification.md` | Describes Kotlin/Compose, ViewModels, repositories, Retrofit, custom SQLite, outbox, WorkManager, FastAPI, authentication, sessions, central SQLite, and Docker. The flow is identified as upload-only and end-to-end Android integration as unverified. |
| 05 · Development & Evidence | Approved screenshot allowlist and `android-screenshot-audit.md`; inspected Android/backend source; backend testing report; `NASA ReEdicion.pdf`; official NASA/CSA resources | Separates UI screenshots, code inspection, documented backend testing, reported EC2 deployment, and research inspiration. Public links are direct official NASA/CSA sources. |
| 06 · Results & Future | `NASA ReEdicion.pdf` benefits/roadmap/clarification; inspected source; backend testing report; `integration-verification.md` | States prototype capabilities and visible limitations without converting implementation into clinical, mission, or integration results. Future work follows the documented roadmap. |

## Material contradictions and resolutions

1. **Project name:** the first page of `NASA ReEdicion.pdf` says “ERI,” while the brief, remainder of the document, demo deck, Android package naming, and user instruction use **EIR**. Public copy uses **EIR**.
2. **AWS EC2:** `NASA ReEdicion.pdf` reports deployment of the backend on EC2. The inspected backend deployment notes describe EC2/external infrastructure as planned or unverified. Public copy attributes EC2 to the project report and does not claim an independently verified live EC2, DNS, Caddy, or HTTPS service.
3. **Android-to-backend integration:** the project narrative describes synchronization, while static inspection identifies missing client authentication, payload differences, placeholder/mock fallback, and no reviewed end-to-end artifact. Public copy calls it a deferred-upload design and explicitly leaves Android-to-backend runtime integration unverified.
4. **Local AI:** the primary brief describes a LiteRT-LM local-inference direction, and Android source contains model download/init/inference code. No reviewed device execution proves that a model generated a response. Public copy calls it experimental and device/model-dependent.
5. **Checkup analysis:** the narrative deck implies visual and voice assessment. The technical brief and inspected source establish capture, structured inputs, hardcoded/demo outputs, and an amplitude heuristic—not validated biometric, respiratory, fatigue, or clinical analysis. Public copy describes the four stages without detection claims.

## Publication checks still requiring owner confirmation

- Confirm that the five approved screenshots are synthetic, consented, and cleared for public publication; the build allowlist excludes the deferred files.
- Obtain a controlled, sanitized Android-to-backend test record before changing the integration wording.
- Obtain sanitized external deployment evidence before presenting EC2, DNS, HTTPS, or production availability as verified.
