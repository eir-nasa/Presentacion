export type EvidenceMedia =
  | { kind: 'pending'; expected: string }
  | { kind: 'image' | 'diagram'; src: string; alt: string; width: number; height: number }
  | { kind: 'video'; src: string; captions: string; captionsLanguage: string; captionsLabel: string; transcript: string; width: number; height: number }

export type EvidenceItem = {
  id: string
  title: string
  description: string
  status: 'Pending' | 'Verified' | 'Experimental' | 'Simulated' | 'UI screenshot'
  source: string
  experimental?: boolean
  media: EvidenceMedia
}

export const evidence = {
  label: '05 / Development & Evidence',
  title: 'Development & Evidence',
  lead: 'Engineering work and the evidence still needed.',
  pendingLabel: 'PENDING',
  unavailableLabel: 'Media unavailable',
  transcriptLabel: 'Transcript',
  galleryLabel: 'View more Android screenshots',
  galleryNote: 'Team-provided interface screenshots. Example screen content is not evidence of clinical validity or verified runtime behavior.',
  gallery: [
    { id: 'mood-checkin', title: 'Mood and energy check-in', description: 'The mood and energy selection screen.', status: 'UI screenshot', source: 'EIR Android project · team-provided screenshot.', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/checkup4.png`, alt: 'Android check-in screen with a mood and energy selector.', width: 357, height: 779 } },
    { id: 'logbook-overview', title: 'Logbook overview', description: 'The logbook screen with a breathing-pause control.', status: 'UI screenshot', source: 'EIR Android project · team-provided screenshot.', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/logbook.png`, alt: 'Android logbook overview with a breathing-pause control and an example streak.', width: 360, height: 795 } },
    { id: 'logbook-entry', title: 'Logbook entry screen', description: 'The interface for an emotional check-in and voice entry.', status: 'UI screenshot', source: 'EIR Android project · team-provided screenshot.', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/logbook2.png`, alt: 'Android logbook screen with an emotional-state selector and voice-entry control.', width: 355, height: 794 } },
  ] satisfies EvidenceItem[],
  groups: [
    {
      id: 'android', number: '01', title: 'Android Application',
      items: [
        { id: 'android-interface', title: 'Android Habits screen', description: 'An exercise routine shown in the Android interface. The screenshot does not establish runtime behavior.', status: 'UI screenshot', source: 'EIR Android project · team-provided screenshot; capture date and build not supplied.', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/habits2.png`, alt: 'Android Habits screen showing a list of exercises and workout controls.', width: 322, height: 710 } },
        { id: 'apollo', title: 'Experimental AI interface', description: 'The AI Agent interface. This screenshot does not establish successful on-device inference or clinical validation.', status: 'UI screenshot', experimental: true, source: 'EIR Android project · team-provided screenshot; device, model and build not supplied.', media: { kind: 'image', src: `${import.meta.env.BASE_URL}assets/AIAgent.png`, alt: 'Android AI Agent screen with a welcome message and chat input.', width: 357, height: 788 } },
      ],
    },
    {
      id: 'backend', number: '02', title: 'Backend & Infrastructure',
      items: [
        { id: 'backend-api', title: 'API and persistence', description: 'An approved diagram or API record showing the backend and persistence.', status: 'Pending', source: 'EIR team · source revision, date and permission pending.', media: { kind: 'pending', expected: 'redacted API artifact or architecture diagram · EIR team' } },
        { id: 'backend-tests', title: 'Automated testing', description: 'A test record identifying the scenarios exercised and their limits.', status: 'Pending', source: 'Backend project documentation · approved artifact and run details pending.', media: { kind: 'pending', expected: 'redacted automated test record · EIR team' } },
        { id: 'docker', title: 'Container execution', description: 'The team reports local Compose startup, health, authentication and restart checks; the test record awaits review.', status: 'Pending', source: 'EIR team report · date, version and approved redacted record pending; AWS deployment is not established.', media: { kind: 'pending', expected: 'redacted local container test record · EIR team' } },
      ],
    },
    {
      id: 'integration', number: '03', title: 'System Integration',
      items: [
        { id: 'integration-demo', title: 'Android-to-backend integration', description: 'The team reports integration tests; their scope and results await review.', status: 'Pending', source: 'EIR team report · test procedure, versions, results and permission pending.', media: { kind: 'pending', expected: 'redacted integration demonstration or test record · EIR team' } },
      ],
    },
  ] satisfies { id: string; number: string; title: string; items: EvidenceItem[] }[],
} as const
