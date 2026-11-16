import { IllustrationFrame } from './IllustrationFrame'
import { ink } from './ink'

export function SolutionMarks() {
  return <IllustrationFrame viewBox="0 0 160 96" className="placeholder-illustration solution-marks" decorative>
    <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
      <path className={ink.context} d="M24 32H136 M24 64H136" />
      <path className={ink.structure} d="M56 16V80 M104 16V80" />
      <circle className={ink.focus} cx="80" cy="48" r="8" />
    </g>
  </IllustrationFrame>
}
