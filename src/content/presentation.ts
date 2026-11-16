export const presentation = {
  event: 'NASA Space Apps Challenge 2026',
  team: 'Team Synergy',
  title: 'EIR',
  tagline: 'Vital Autonomy When Earth Is Out of Reach.',
  description: 'An experimental companion that gives astronauts one place to notice their health, follow daily routines, and reflect on how they are feeling when contact with Earth is limited.',
  sectionLabel: '01 / Introduction',
  navigationLabel: 'Presentation navigation',
  presentationMode: {
    enter: 'Enter presentation mode',
    exit: 'Exit presentation mode',
    current: 'Current section',
    instructions: 'Use arrow keys to move between sections, Home or End to jump, and Escape to exit.',
  },
  introductionLinkLabel: 'EIR — go to introduction',
  apk: { label: 'Download Android APK', url: 'https://github.com/Caryuter/nasa-space-app-challenge-eir-mobile/releases/tag/v1.0.1' },
  sections: [
    { id: 'introduction', label: 'Introduction', available: true },
    { id: 'the-challenge', label: 'The Challenge', available: true },
    { id: 'our-solution', label: 'Our Solution', available: true },
    { id: 'how-eir-works', label: 'How EIR Works', available: true },
    { id: 'development-evidence', label: 'Development & Evidence', available: true },
    { id: 'results-future', label: 'Results & Future', available: true },
  ],
} as const

export const challenge = {
  label: '02 / The Challenge',
  title: 'The Challenge',
  lead: 'On a long mission, staying well is not only about numbers. It is also about routines, feelings, and knowing what to do when Earth is far away.',
  description: 'Isolation and confinement can change sleep, daily rhythms, and access to ground support. EIR explores one accessible place where a crew member can keep track of physical context, everyday habits, and how the day feels.',
  contextLabel: 'One day, many signals',
  context: 'A number on its own cannot tell the whole story. A personal note about mood, energy, routines, or a concern adds useful context to everyday awareness.',
  sources: [
    { name: 'NASA HRP — Isolation and Confinement', note: 'Informed the focus on isolation, sleep awareness, reflection, and accessible support.', url: 'https://www.nasa.gov/hrp/hazard-isolation-and-confinement/' },
    { name: 'Canadian Space Agency — Science in Space', note: 'Provided context for distance, communication delays, and reduced reliance on Earth-based assistance.', url: 'https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp' },
  ],
} as const

export const solution = {
  label: '03 / Our Solution',
  title: 'Our Solution',
  lead: 'EIR gives astronauts practical ways to care for everyday life: notice what is changing, keep routines in view, and pause to reflect.',
  detailHint: 'Explore each part of the companion',
  experiences: [
    { id: 'health', title: 'Health', type: 'Daily awareness', summary: 'See body-centered information and record physical-health details in one place.', detail: 'Selectable body regions open contextual cards, while heart rate, sleep, hydration, and energy examples help make a daily check-in easier to understand. The values shown are demonstration data.' },
    { id: 'habits', title: 'Habits', type: 'Routine support', summary: 'Keep hydration, meals, nutrition, and exercise routines in view.', detail: 'Follow meals, water, calories, macronutrients, and guided workouts with sets, repetitions, rest intervals, and timers. The targets and routines in the prototype are examples, not personal prescriptions.' },
    { id: 'checkup', title: 'Checkup', type: 'Four-stage flow', summary: 'Move through a simple daily self-check: image, voice, physical details, then mood and energy.', detail: 'The flow gives the astronaut a structured moment to record how the day is going. It is a self-check, not a validated way to detect facial, respiratory, fatigue, or other medical conditions.' },
    { id: 'logbook', title: 'Logbook', type: 'Reflection', summary: 'Reflect on emotions and daily experiences through journaling, breathing pauses, and mood check-ins.', detail: 'Speech-supported entries, streaks, and a mood matrix encourage a regular habit of reflection. They are not mental-health screening tools.' },
    { id: 'ai-agent', title: 'AI Agent', type: 'Experimental', summary: 'Explore experimental conversational assistance within the companion.', detail: 'The prototype includes a pathway for Google AI Edge / LiteRT-LM on compatible devices with an installed model. The interface does not establish that local model execution occurred, and the agent is not a diagnostic system.', experimental: true },
    { id: 'sos', title: 'SOS', type: 'Guided navigation', summary: 'Quickly open guided information for dizziness, chest concerns, injury, bleeding, or breathing difficulty.', detail: 'The demonstration offers short numbered guidance and an optional audio-reading mode. It is not a certified spacecraft emergency procedure and would need expert review for mission use.' },
  ],
  visual: { src: `${import.meta.env.BASE_URL}assets/habits2.png`, alt: 'EIR Android Habits interface showing an exercise routine and workout controls.', width: 322, height: 710 },
  visualCaption: 'EIR Android Habits experience. Values shown are demonstration data.',
} as const

export const architecture = {
  label: '04 / How EIR Works',
  title: 'How EIR Works',
  lead: 'EIR is designed to help an astronaut keep a personal record through a demanding day—even when a connection to Earth is not always available.',
  diagramLabel: 'How an EIR check-in becomes an organized record',
  diagramCaption: 'A simple path from a daily check-in to an organized record when connectivity becomes available.',
  android: {
    label: '01 / Start with the day', title: 'Record what matters', summary: 'Log a habit, a check-in, or a reflection in the moment.',
    detail: 'EIR keeps these entries close at hand, so the astronaut can return to them throughout the day.',
    technicalDetail: 'Built with Kotlin and Jetpack Compose. ViewModels, repositories, Retrofit/OkHttp, local SQLite storage, an outbox, and WorkManager support the record flow.',
    local: 'Entries are kept on the device until a connection is available.', ai: 'Experimental conversational assistance', aiStatus: 'Compatible device and installed model required',
  },
  upload: { label: '02 / When a connection is available', detail: 'EIR is designed to prepare pending records for transfer to the backend.', status: 'Sign-in and other remote services still need connectivity.' },
  backend: {
    label: '03 / Keep the record organized', title: 'Organize and store', summary: 'A backend service helps keep account records and history in order.',
    detail: 'When records are shared, the service provides a place for authenticated entries to be stored and organized.',
    technicalDetail: 'The Python FastAPI backend includes authentication, sessions, account-scoped records, history, synchronization endpoints, Docker configuration, and a persistent SQLite volume.',
  },
  storageFlow: 'Build a useful history',
  database: {
    label: '04 / Over time', title: 'See the bigger picture', summary: 'Organize entries into a continuing personal record.',
    detail: 'A history of check-ins, routines, and reflections can make patterns easier to revisit and discuss.',
    technicalDetail: 'Central SQLite persistence stores accounts, sessions, health records, wellbeing check-ins, and alerts. It does not establish automatic clinical risk generation.',
  },
  detailHint: 'Explore how a daily check-in becomes a record',
  technicalLabel: 'Technical detail',
} as const
