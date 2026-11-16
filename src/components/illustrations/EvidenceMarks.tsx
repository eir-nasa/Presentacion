import { IllustrationFrame } from './IllustrationFrame'
import { ink } from './ink'

// The adjacent placeholder text already provides the evidence status and description.
export function EvidenceMarks() {
  return <IllustrationFrame viewBox="0 0 160 96" className="placeholder-illustration evidence-marks" decorative>
    <path className={ink.structure} d="M24 32V24H32 M128 24H136V32 M24 64V72H32 M128 72H136V64"
      fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" />
  </IllustrationFrame>
}
