import { Label, Section, SectionHeader } from '../components/primitives'
import { challenge } from '../content/presentation'
import { ChallengeScene } from '../components/illustrations/ChallengeScene'

export function Challenge() {
  return <Section id="the-challenge">
    <div className="content-section challenge-section">
      <SectionHeader id="the-challenge" label={challenge.label} title={challenge.title} />
      <div className="challenge-layout">
        <div className="editorial-copy">
          <p className="section-lead">{challenge.lead}</p>
          <p className="section-description">{challenge.description}</p>
          <aside className="challenge-aside">
            <Label>{challenge.contextLabel}</Label>
            <p>{challenge.context}</p>
            <ul className="source-list">{challenge.sources.map((source) => <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.name}</a>
              <span>{source.note}</span>
            </li>)}</ul>
          </aside>
        </div>
        <figure className="challenge-visual"><ChallengeScene /></figure>
      </div>
    </div>
  </Section>
}
