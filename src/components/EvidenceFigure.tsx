import { useState } from 'react'
import { evidence, type EvidenceItem } from '../content/evidence'
import { Label, Placeholder } from './primitives'

export function EvidenceFigure({ item }: { item: EvidenceItem }) {
  const [failed, setFailed] = useState(false)
  const media = item.media
  const pending = media.kind === 'pending'
  const unavailable = failed || pending
  const description = pending ? media.expected : `${evidence.unavailableLabel}: ${item.title}`

  return <figure className="evidence-figure">
    <div className="evidence-media">
      {unavailable ? <Placeholder className="content-placeholder evidence-placeholder" description={description} artwork={<div className="evidence-pending-art" aria-hidden="true"><i /><span /><b /></div>} /> : media.kind === 'image' || media.kind === 'diagram' ?
        <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" onError={() => setFailed(true)} /> : media.kind === 'video' ?
        <video controls preload="metadata" src={media.src} width={media.width} height={media.height} onError={() => setFailed(true)}><track kind="captions" src={media.captions} srcLang={media.captionsLanguage} label={media.captionsLabel} default /></video> : null}
    </div>
    <figcaption className="evidence-caption">
      <Label>{item.status}{item.experimental ? ' · Experimental' : ''}</Label>
      <h4>{item.title}</h4>
      <p>{item.description}</p>
      <p className="evidence-source">{item.source}</p>
      {!unavailable && media.kind === 'video' && <details><summary>{evidence.transcriptLabel}</summary><p>{media.transcript}</p></details>}
    </figcaption>
  </figure>
}
