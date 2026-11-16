import { useState } from 'react'
import { type EvidenceItem } from '../content/evidence'
import { Label } from './primitives'

export function EvidenceFigure({ item }: { item: EvidenceItem }) {
  const [failed, setFailed] = useState(false)
  const media = item.media
  const image = media.kind === 'image' ? media : null
  const statusLabel = media.kind === 'image' ? item.status : media.label

  return <figure className={`evidence-figure evidence-figure--${item.id}${image ? '' : ' evidence-figure-text'}`}>
    {image && <div className="evidence-media">
      {!failed ? <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" onError={() => setFailed(true)} /> :
        <div className="evidence-note"><Label>IMAGE UNAVAILABLE</Label><p>This image could not be loaded.</p></div>}
    </div>}
    <figcaption className="evidence-caption">
      <Label>{statusLabel}</Label>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      {image && <a className="evidence-full-size" href={image.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${item.title} (opens in a new tab)`}>Open full-size image <span aria-hidden="true">↗</span></a>}
    </figcaption>
  </figure>
}
