import {
    Label,
    Section,
    SectionHeader,
} from "../components/primitives";
import { presentation } from "../content/presentation";
import { HeroOrbit } from "../components/illustrations/HeroOrbit";
import { HeroSpacecraft } from "../components/illustrations/SpaceBackdrop";
import { HeroPlanetScene } from "../components/illustrations/HeroPlanetScene";

export function Introduction() {
    return (
        <Section id="introduction">
            <div className="hero-layout">
                <div className="hero-copy">
                    <SectionHeader
                        hero
                        id="introduction"
                        label={presentation.sectionLabel}
                        title={presentation.title}
                    />
                    <p className="hero-description">
                        {presentation.description}
                    </p>
                    <p className="hero-tagline">{presentation.tagline}</p>
                    <div className="hero-event">
                        <Label>{presentation.team} · {presentation.event}</Label>
                    </div>
                    <a className="apk-link" href={presentation.apk.url}>
                        {presentation.apk.label}
                    </a>
                </div>
                <div className="orbital-composition" aria-hidden="true">
                    <HeroPlanetScene />
                    <HeroOrbit />
                    <HeroSpacecraft />
                </div>
            </div>
        </Section>
    );
}
