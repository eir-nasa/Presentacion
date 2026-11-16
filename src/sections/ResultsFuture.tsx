import { Label, Section, SectionHeader } from '../components/primitives'
import { results } from '../content/results'

export function ResultsFuture() {
  return <Section id="results-future">
    <div className="content-section results-section">
      <SectionHeader id="results-future" label={results.label} title={results.title} />
      <p className="section-lead results-lead">{results.lead}</p>
      <div className="results-layout">
        <section className="results-progress" aria-labelledby="results-progress-title">
          <h3 id="results-progress-title">{results.achievementsTitle}</h3>
          <div className="results-achievements">{results.achievements.map((item) => <article key={item.title}>
            <Label>{item.status}</Label><h4>{item.title}</h4><p>{item.description}</p>
          </article>)}</div>
          <p className="results-source">{results.evidenceNote}</p>
        </section>
        <div className="results-outlook">
          <section aria-labelledby="results-limitations-title">
            <h3 id="results-limitations-title">{results.limitationsTitle}</h3>
            <ul className="results-limitations">{results.limitations.map((item) => <li key={item.status}><Label>{item.status}</Label><p>{item.text}</p></li>)}</ul>
          </section>
          <section aria-labelledby="results-next-steps-title" className="results-future">
            <h3 id="results-next-steps-title">{results.futureTitle}</h3>
            <ul>{results.future.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>
      </div>
      <footer className="results-close"><p>{results.closing}</p><a href="#introduction">{results.back} <span aria-hidden="true">↑</span></a></footer>
    </div>
  </Section>
}
