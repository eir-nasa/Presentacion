export type EvidenceMedia =
  | { kind: 'image'; src: string; alt: string; width: number; height: number }
  | { kind: 'note'; label: string }

export type EvidenceItem = {
  id: string
  title: string
  description: string
  status: string
  experimental?: boolean
  media: EvidenceMedia
}

export const evidence = {
  label: '05 / Development & Evidence',
  title: 'Development & Evidence',
  lead: 'These screens show how EIR turns a demanding day into small, understandable moments of awareness, routine, and reflection.',
  galleryLabel: 'Explore more Android screens',
  galleryNote: 'Representative screens from the EIR Android prototype. Values shown are demonstration data.',
  gallery: [
    { id: 'mood-checkin', title: 'Pause for a check-in', description: 'At the end of Checkup, the astronaut can record a personal sense of mood and energy.', status: 'Checkup experience', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/checkup4.png`, alt: 'EIR Android screen with a mood and energy selector.', width: 357, height: 779 } },
    { id: 'logbook-overview', title: 'Make room to reflect', description: 'The Logbook brings together a short breathing pause and a continuing record of daily reflections.', status: 'Logbook experience', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/logbook.png`, alt: 'EIR Android Logbook overview with a breathing-pause control and example streak.', width: 360, height: 795 } },
    { id: 'logbook-entry', title: 'Capture the day in words', description: 'An emotional check-in sits alongside a voice-entry control for supported reflection.', status: 'Logbook experience', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/logbook2.png`, alt: 'EIR Android Logbook screen with an emotional-state selector and voice-entry control.', width: 355, height: 794 } },
  ] satisfies EvidenceItem[],
  groups: [
    { id: 'android', number: '01', title: 'What astronauts can do', items: [
      { id: 'android-interface', title: 'Keep a routine in view', description: 'The Habits experience brings hydration, meals, nutrition, and guided exercise into one focused daily view.', status: 'Android experience', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/habits2.png`, alt: 'EIR Android Habits screen showing an exercise routine and workout controls.', width: 322, height: 710 } },
      { id: 'ai-interface', title: 'Explore experimental assistance', description: 'The AI Agent offers a conversational starting point and an experimental on-device pathway for compatible devices with an installed model.', status: 'Experimental AI', experimental: true, media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/AIAgent.png`, alt: 'EIR Android AI Agent screen with a welcome message and chat input.', width: 357, height: 788 } },
    ] },
  ] satisfies { id: string; number: string; title: string; items: EvidenceItem[] }[],
  technical: {
    label: 'Behind the experience',
    title: 'How the prototype was built',
    lead: 'Open this section for the implementation details behind EIR’s local record flow, services, and testing.',
    items: [
      { id: 'android-code', title: 'Designed for local continuity', description: 'Kotlin, Jetpack Compose, ViewModels, repositories, Retrofit/OkHttp, a SQLite data layer, an outbox, and WorkManager support local record handling and deferred synchronization.', status: 'Android application', media: { kind: 'note', label: 'LOCAL RECORD FLOW' } },
      { id: 'backend-code', title: 'Services for organizing records', description: 'Python FastAPI, SQLite, authentication, sessions, account-scoped records, synchronization endpoints, and Docker configuration form the server-side foundation.', status: 'Backend services', media: { kind: 'note', label: 'RECORD SERVICES' } },
      { id: 'backend-tests', title: 'Automated service checks', description: 'The project includes automated scenarios for authentication, persistence, synchronization, alerts, OpenAPI validation, and configuration.', status: 'Testing', media: { kind: 'note', label: 'AUTOMATED CHECKS' } },
      { id: 'deployment', title: 'A repeatable deployment setup', description: 'Docker and Compose configuration package the backend and its persistent data layer for repeatable deployment environments.', status: 'Deployment setup', media: { kind: 'note', label: 'CONTAINERIZED BACKEND' } },
    ] satisfies EvidenceItem[],
  },
  research: {
    title: 'Informed by NASA Research',
    lead: 'NASA and Canadian Space Agency public research informed EIR’s framing and design rationale. EIR does not use NASA medical datasets and is not an official NASA system.',
    items: [
      { name: 'NASA HRP — Isolation and Confinement', note: 'Informed the emphasis on isolation, sleep awareness, journaling, and behavioral support.', url: 'https://www.nasa.gov/hrp/hazard-isolation-and-confinement/' },
      { name: 'NASA Spaceflight Standard Measures', note: 'Informed a cross-domain view of physical and behavioral factors rather than isolated metrics.', url: 'https://www.nasa.gov/reference/standard-measures/' },
      { name: 'NASA Artemis II Standard Measures', note: 'Provided deep-space context for observing multiple systems and mission phases.', url: 'https://www.nasa.gov/reference/artemis-ii-standard-measures/' },
      { name: 'NASA Risk of Hypoxia', note: 'Provided hazard context only; EIR does not detect hypoxia or measure oxygen levels.', url: 'https://www.nasa.gov/reference/risk-of-hypoxia/' },
      { name: 'Canadian Space Agency — Science in Space', note: 'Informed the exploration context of isolation, communication delay, and reduced access to support.', url: 'https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp' },
    ],
  },
} as const
