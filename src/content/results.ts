export const results = {
  label: '06 / Results & Future',
  title: 'Results & Future',
  lead: 'A foundation to build on, with validation still ahead.',
  achievementsTitle: 'Documented progress',
  achievements: [
    { status: 'Implemented · locally tested', title: 'Backend and persistence', description: 'A FastAPI backend with SQLite persistence is implemented. Local tests documented in the backend project cover its health endpoint and persistence scenarios.' },
    { status: 'Implemented · locally tested', title: 'Accounts and records', description: 'Authentication, sessions and account-specific health and well-being records are implemented. Local tests cover selected session and account-isolation scenarios.' },
    { status: 'Implemented · locally tested', title: 'Record uploads', description: 'The backend accepts upload-only record synchronization. Local tests cover selected replay and conflict scenarios; Android integration remains unverified.' },
    { status: 'Local test · team reported', title: 'Local container checks', description: 'The team reports a Docker Compose startup, a successful health check and synthetic-account authentication, followed by a restart and another healthy response. The test record is awaiting review.' },
  ],
  evidenceNote: 'Sources: backend project documentation and team-reported container checks. These observations cover specific local scenarios and do not establish production readiness.',
  limitationsTitle: 'What remains unverified',
  limitations: [
    { status: 'Unverified', text: 'Android-to-backend tests have been reported by the team, but their scope and results await review. Android implementation and offline behavior need supporting evidence.' },
    { status: 'Experimental', text: 'Apollo on-device inference and its device behavior still require validation.' },
    { status: 'Pending', text: 'AWS deployment remains unverified. Automatic risk assessment requires approved rules and evidence.' },
  ],
  futureTitle: 'Future work',
  future: [
    'Validate on-device AI on supported hardware.',
    'Improve security and deployment readiness.',
    'Broaden testing under intermittent connectivity.',
    'Refine the astronaut health and well-being experience.',
  ],
  closing: 'Continue from evidence, with clear limits.',
  back: 'Back to the beginning',
} as const
