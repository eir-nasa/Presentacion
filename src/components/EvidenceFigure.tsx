import { useState } from 'react'
import { type EvidenceItem } from '../content/evidence'
import { Label } from './primitives'

export function EvidenceFigure({ item }: { item: EvidenceItem }) {
  const [failed, setFailed] = useState(false)
  const media = item.media
  const showMedia = media.kind === 'image'

  return <figure className={`evidence-figure${showMedia ? '' : ' evidence-figure-text'}`}>
    {showMedia && <div className="evidence-media">
      {!failed ? <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" onError={() => setFailed(true)} /> :
        <div className="evidence-note"><Label>IMAGE UNAVAILABLE</Label><p>This image could not be loaded.</p></div>}
    </div>}
    <figcaption className="evidence-caption">
      <Label>{showMedia ? item.status : media.label}</Label>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
    </figcaption>
  </figure>
}
