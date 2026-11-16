import { Figure, Label, Section, SectionHeader } from '../components/primitives'
import { solution } from '../content/presentation'

export function Solution() {
  return <Section id="our-solution">
    <div className="content-section solution-section">
      <SectionHeader id="our-solution" label={solution.label} title={solution.title} />
      <div className="solution-layout">
        <div>
          <p className="section-lead">{solution.lead}</p>
          <ol className="feature-list">{solution.features.map((feature, index) => <li key={feature}><Label>0{index + 1}</Label><span>{feature}</span></li>)}</ol>
          <div className="experimental"><Label>{solution.experimentalLabel}</Label><p>{solution.experimental}</p></div>
        </div>
        <Figure caption={solution.visualCaption}><div className="solution-visual"><div className="solution-orbit-structure" aria-hidden="true"><span /></div><div className="solution-screenshot-frame"><img className="solution-screenshot" src={solution.visual.src} alt={solution.visual.alt} width={solution.visual.width} height={solution.visual.height} loading="lazy" /></div></div></Figure>
      </div>
    </div>
  </Section>
}
