import { Figure, Label, Section, SectionHeader } from '../components/primitives'
import { architecture } from '../content/presentation'

export function Architecture() {
  return <Section id="how-eir-works">
    <div className="content-section architecture-section">
      <SectionHeader id="how-eir-works" label={architecture.label} title={architecture.title} />
      <p className="section-lead architecture-lead">{architecture.lead}</p>
      <Figure caption={architecture.diagramCaption}>
        <div className="architecture-diagram" role="group" aria-label={architecture.diagramLabel}>
          <p className="architecture-hint"><Label>{architecture.detailHint}</Label></p>
          <ol className="architecture-flow">
            <li className="architecture-stage">
              <details className="architecture-node">
                <summary><Label>{architecture.android.label}</Label><strong>{architecture.android.title}</strong><span>{architecture.android.summary}</span></summary>
                <p>{architecture.android.detail}</p>
              </details>
              <div className="device-capabilities">
                <p>{architecture.android.local}</p>
                <div className="architecture-ai"><span>{architecture.android.ai}</span><Label>{architecture.android.aiStatus}</Label></div>
              </div>
            </li>
            <li className="architecture-connection upload-connection">
              <span className="connection-arrow" aria-hidden="true">→</span>
              <span><strong>{architecture.upload.label}</strong><span>{architecture.upload.detail}</span><span>{architecture.upload.status}</span></span>
            </li>
            <li className="architecture-stage">
              <details className="architecture-node">
                <summary><Label>{architecture.backend.label}</Label><strong>{architecture.backend.title}</strong><span>{architecture.backend.summary}</span></summary>
                <p>{architecture.backend.detail}</p>
              </details>
            </li>
            <li className="architecture-connection storage-connection">
              <span className="connection-arrow" aria-hidden="true">→</span>
              <span><strong>{architecture.storageFlow}</strong></span>
            </li>
            <li className="architecture-stage">
              <details className="architecture-node">
                <summary><Label>{architecture.database.label}</Label><strong>{architecture.database.title}</strong><span>{architecture.database.summary}</span></summary>
                <p>{architecture.database.detail}</p>
              </details>
            </li>
          </ol>
        </div>
      </Figure>
    </div>
  </Section>
}
