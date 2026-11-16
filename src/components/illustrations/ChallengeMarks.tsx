import { IllustrationFrame } from './IllustrationFrame'
import { ink } from './ink'

export function ChallengeMarks() {
  return <IllustrationFrame viewBox="0 0 160 96" className="placeholder-illustration challenge-marks" decorative>
    <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
      <path className={ink.context} d="M16 24H144 M16 72H144" />
      <path className={ink.structure} d="M40 16V80 M120 16V80" />
      <path className={ink.focus} d="M72 48H88" />
    </g>
  </IllustrationFrame>
}
