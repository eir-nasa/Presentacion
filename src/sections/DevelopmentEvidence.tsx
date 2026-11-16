import { EvidenceFigure } from '../components/EvidenceFigure'
import { Label, Section, SectionHeader } from '../components/primitives'
import { evidence } from '../content/evidence'

export function DevelopmentEvidence() {
  return <Section id="development-evidence">
    <div className="content-section evidence-section">
      <SectionHeader id="development-evidence" label={evidence.label} title={evidence.title} />
      <p className="section-lead evidence-lead">{evidence.lead}</p>
      <div className="evidence-groups">{evidence.groups.map((group) => <section className="evidence-group" key={group.id} aria-labelledby={`${group.id}-evidence-title`}>
        <header className="evidence-group-header"><Label>{group.number}</Label><h3 id={`${group.id}-evidence-title`}>{group.title}</h3></header>
        <div className="evidence-items">{group.items.map((item) => <EvidenceFigure key={item.id} item={item} />)}</div>
        {group.id === 'android' && <details className="evidence-gallery"><summary>{evidence.galleryLabel}</summary><p>{evidence.galleryNote}</p><div className="evidence-items">{evidence.gallery.map((item) => <EvidenceFigure key={item.id} item={item} />)}</div></details>}
      </section>)}</div>
      <details className="evidence-technical">
        <summary><Label>{evidence.technical.label}</Label><span>{evidence.technical.title}</span></summary>
        <p>{evidence.technical.lead}</p>
        <div className="evidence-items">{evidence.technical.items.map((item) => <EvidenceFigure key={item.id} item={item} />)}</div>
      </details>
      <section className="research-section" aria-labelledby="research-title">
        <h3 id="research-title">{evidence.research.title}</h3>
        <p>{evidence.research.lead}</p>
        <ul>{evidence.research.items.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name}</a><span>{source.note}</span></li>)}</ul>
      </section>
    </div>
  </Section>
}
