export const presentation = {
    event: "NASA Space Apps Challenge 2026",
    title: "EIR",
    description:
        "A project focused on monitoring astronaut health and well-being.",
    sectionLabel: "01 / Introduction",
    navigationLabel: "Presentation navigation",
    presentationMode: {
        enter: "Enter presentation mode",
        exit: "Exit presentation mode",
        current: "Current section",
        instructions:
            "Use arrow keys to move between sections, Home or End to jump, and Escape to exit.",
    },
    introductionLinkLabel: "EIR — go to introduction",
    upcomingLabel: "Coming soon",
    pendingLabel: "PENDING",
    visualPending: "actual project visual · EIR team",
    visualCaption: "Project visual pending inclusion.",
    apk: {
        label: "Download Android APK",
        url: "https://github.com/Caryuter/nasa-space-app-challenge-eir-mobile/releases/tag/v1.0.1",
    },
    sections: [
        { id: "introduction", label: "Introduction", available: true },
        { id: "the-challenge", label: "The Challenge", available: true },
        { id: "our-solution", label: "Our Solution", available: true },
        { id: "how-eir-works", label: "How EIR Works", available: true },
        {
            id: "development-evidence",
            label: "Development & Evidence",
            available: true,
        },
        { id: "results-future", label: "Results & Future", available: true },
    ],
} as const;

export const challenge = {
    label: "02 / The Challenge",
    title: "The Challenge",
    lead: "Tracking health and well-being during a space mission.",
    description:
        "Tracking astronauts’ physical indicators and emotional well-being must be considered in the context of a space mission, including situations with limited connectivity.",
    contextLabel: "Mission context",
    context: "Physical health / emotional well-being / limited connectivity",
    sourcePending: "verifiable sources and contextual evidence · EIR team",
};

export const solution = {
    label: "03 / Our Solution",
    title: "Our Solution",
    lead: "An Android application for bringing health and well-being records together.",
    features: [
        "Physical indicator tracking",
        "Well-being check-ins",
        "Record history",
        "Record synchronization",
    ],
    experimentalLabel: "Experimental",
    experimental: "On-device AI capabilities",
    visual: {
        src: `${import.meta.env.BASE_URL}assets/habits2.png`,
        alt: "EIR Android Habits screen showing an exercise routine and workout controls.",
        width: 322,
        height: 710,
    },
    visualCaption:
        "EIR Android interface · team-provided screenshot. Runtime behavior has not been independently verified.",
};

export const architecture = {
    label: "04 / How EIR Works",
    title: "How EIR Works",
    lead: "A proposed path from local records to the backend through upload-only sync.",
    diagramLabel: "EIR architecture and record flow",
    diagramCaption:
        "Architecture overview. The backend supports record uploads; the team reports Android integration tests, whose scope and results await review.",
    android: {
        label: "01 / On device",
        title: "Android application",
        summary: "Kotlin · Jetpack Compose",
        detail: "The intended offline-first design includes local record storage. Android implementation and integration have not been verified here.",
        local: "Local storage / offline-first design",
        ai: "Apollo AI / on-device",
        aiStatus: "Experimental · not yet verified",
    },
    upload: {
        label: "Upload-only record sync",
        detail: "Intended flow: records → backend",
        status: "Reported Android tests await review",
    },
    backend: {
        label: "02 / Backend",
        title: "FastAPI",
        summary: "Python · authentication and sessions",
        detail: "The backend authenticates sessions and accepts batches of health and well-being records through its sync API.",
    },
    storageFlow: "Backend stores records and sessions",
    database: {
        label: "03 / Persistence",
        title: "SQLite",
        summary: "Records · accounts · sessions",
        detail: "The backend stores health records, well-being check-ins, accounts and sessions in SQLite.",
    },
    detailHint: "Select a component for details",
};
