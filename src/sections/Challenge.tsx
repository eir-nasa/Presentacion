import { Label, Placeholder, Section, SectionHeader } from '../components/primitives'
import { challenge } from '../content/presentation'
import { ChallengeMarks } from '../components/illustrations/ChallengeMarks'
import { AstronautMark, SpaceBackdrop } from '../components/illustrations/SpaceBackdrop'

export function Challenge() {
  return <Section id="the-challenge">
    <SpaceBackdrop scene="challenge" />
    <AstronautMark />
    <div className="content-section challenge-section">
      <SectionHeader id="the-challenge" label={challenge.label} title={challenge.title} />
      <div className="challenge-layout">
        <div className="editorial-copy">
          <p className="section-lead">{challenge.lead}</p>
          <p className="section-description">{challenge.description}</p>
        </div>
        <aside className="challenge-aside">
          <Label>{challenge.contextLabel}</Label>
          <p>{challenge.context}</p>
          <Placeholder className="content-placeholder source-placeholder" description={challenge.sourcePending} artwork={<ChallengeMarks />} />
        </aside>
      </div>
    </div>
  </Section>
}
