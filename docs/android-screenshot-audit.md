# Android screenshot audit

The EIR team supplied these files in `public/assets/`. Dimensions are intrinsic pixels; aspect ratios are width ÷ height. Visual inspection identifies what is depicted, not the build, capture date, runtime outcome or the provenance of values displayed. Screen text mixes English and Spanish. All images were inspected; no credentials or direct personal identifiers were observed, but a visual scan cannot establish that health values or journal text are synthetic. Do not present them as real astronaut data or clinical results.

| File | Dimensions (ratio) | Visible content / decision |
|---|---:|---|
| AIAgent.png | 357 × 788 (0.45) | AI chat welcome and input. Selected as experimental interface evidence, not proof of inference. |
| AIAgent2.png | 354 × 788 (0.45) | Same AI interface with an example exchange. Deferred: response provenance and inference are unverified. |
| checkup1.png | 364 × 769 (0.47) | Facial-photo check-in with pixelated image and explanatory UI claims. Deferred pending review of image origin and claims. |
| checkup2.png | 365 × 789 (0.46) | Guided voice recording UI. Deferred: UI text implies analysis not established by this screenshot. |
| checkup3.png | 357 × 796 (0.45) | Manual vital-sign entry with example values. Deferred pending confirmation of data origin and review of displayed medical ranges. |
| checkup4.png | 357 × 779 (0.46) | Mood and energy selection. Optional gallery; interface only. |
| habits2.png | 322 × 710 (0.45) | Exercise routine and controls. Selected for Solution and Android evidence; runtime behavior remains unverified. |
| habits-portrait.png | 1245 × 2359 (0.53) | Habits summary placed in a device rendering. Deferred: decorative mockup, not an unaltered screenshot. |
| habits-landscape.png | 2359 × 1245 (1.89) | Same Habits screen rotated within a device rendering. Deferred as a duplicate mockup. |
| habits-left.png | 2505 × 2116 (1.18) | Same Habits screen in an angled device rendering. Deferred as a duplicate mockup. |
| habits-right.png | 2509 × 2112 (1.19) | Opposite-angle version of the same Habits rendering. Deferred as a duplicate mockup. |
| health-portrait.png | 1245 × 2359 (0.53) | Health screen in a device rendering, including example health values and readiness text. Deferred: mockup and claims need review. |
| health-landscape.png | 2359 × 1245 (1.89) | Same Health screen rotated in a device rendering. Deferred as a duplicate mockup. |
| health-left.png | 2505 × 2116 (1.18) | Same Health screen in an angled device rendering. Deferred as a duplicate mockup. |
| health-right.png | 2509 × 2112 (1.19) | Opposite-angle version of the same Health rendering. Deferred as a duplicate mockup. |
| logbook.png | 360 × 795 (0.45) | Logbook overview with an example streak and breathing control. Optional gallery; state provenance is unconfirmed. |
| logbook2.png | 355 × 794 (0.45) | Logbook emotional-state and voice-entry interface. Optional gallery; state provenance is unconfirmed. |
| logbook3.png | 364 × 800 (0.46) | Journal history with dated personal-sounding entries and health values. Deferred pending confirmation that records are synthetic and approved for publication. |
| SOS1.png | 365 × 796 (0.46) | Emergency instructions screen. Deferred pending review of clinical wording, illustration rights and runtime behavior. |
| SOS2.png | 357 × 775 (0.46) | Same emergency flow with condition-selection overlay. Deferred for the same reasons; alternative view of SOS1. |

No files were altered. Original PNGs remain in the public directory and are directly addressable even when not referenced by the gallery; confirm the data and publication rights for all supplied originals before deploying. The selected originals are approximately 80–104 KB each; preserving their original pixels avoids text degradation, and lazy loading keeps offscreen screenshots out of the initial display. No image encoder is available in the project environment, so no derivatives were generated.

## Production-build safety review

The production build is restricted by the explicit screenshot list in `vite.config.ts`. It includes the five images already referenced by the presentation: `habits2.png`, `AIAgent.png`, `checkup4.png`, `logbook.png`, and `logbook2.png`. The team previously supplied these for presentation use, but the origin and publication consent for displayed mood, streak and emotional-state values have not been independently confirmed. Treat this as a **proposed allowlist**, not a privacy certification. Confirm that each depicted state is synthetic and that screenshots and embedded artwork are cleared for publication. The AI image shows an interface, not verified inference or medical validation.

The other 15 images in the table are excluded from the production build. In particular, `logbook3.png` contains dated personal-sounding entries and health values; `checkup3.png` and the Health renderings display health values; `checkup1.png` includes a pixelated image; SOS and some checkup images contain medical-sounding instructions or claims. Their provenance and reuse rights need review before any future inclusion. No real name or credential was identified in the prior visual review, which does not prove absence of sensitive data or that values are synthetic.

Byte-identical copies of all 20 originals are preserved in the ignored local directory `.asset-originals/`; no supplied files were moved or deleted. The originals also remain in `public/assets/` because moving them was not authorized. **The Vite development server can still serve every original directly.** Do not expose the development server publicly; only the checked `dist/` output enforces the production allowlist. The backup is local and ignored by Git, not an offsite archive. Future additions to `public/` are not automatically included in production and require an explicit review and allowlist change.
