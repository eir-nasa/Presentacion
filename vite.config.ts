import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Only the screenshots already referenced by the presentation enter the build.
// Reassess consent and data provenance before adding any other public asset.
const presentationScreenshots = [
  'AIAgent.png',
  'checkup4.png',
  'habits2.png',
  'logbook.png',
  'logbook2.png',
]

export default defineConfig({
  build: { copyPublicDir: false },
  plugins: [react(), tailwindcss(), {
    name: 'presentation-screenshot-allowlist',
    apply: 'build',
    buildStart() {
      for (const name of presentationScreenshots) {
        this.emitFile({ type: 'asset', fileName: `assets/${name}`, source: readFileSync(resolve('public/assets', name)) })
      }
    },
  }],
})
