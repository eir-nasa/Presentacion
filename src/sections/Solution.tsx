import { Figure, Label, Section, SectionHeader } from '../components/primitives'
import { solution } from '../content/presentation'

export function Solution() {
  return <Section id="our-solution">
    <div className="content-section solution-section">
      <SectionHeader id="our-solution" label={solution.label} title={solution.title} />
      <div className="solution-layout">
        <div>
          <p className="section-lead">{solution.lead}</p>
          <p className="solution-hint"><Label>{solution.detailHint}</Label></p>
          <ol className="experience-list">{solution.experiences.map((experience, index) => <li key={experience.id} className={'experimental' in experience && experience.experimental ? 'experience-experimental' : undefined}>
            <Label>0{index + 1}</Label>
            <details>
              <summary><span><strong>{experience.title}</strong><em>{experience.type}</em></span><span>{experience.summary}</span></summary>
              <p>{experience.detail}</p>
            </details>
          </li>)}</ol>
        </div>
        <Figure caption={solution.visualCaption}><div className="solution-visual"><div className="solution-orbit-structure" aria-hidden="true"><span /></div><div className="solution-screenshot-frame"><img className="solution-screenshot" src={solution.visual.src} alt={solution.visual.alt} width={solution.visual.width} height={solution.visual.height} loading="lazy" /></div></div></Figure>
      </div>
    </div>
  </Section>
}
