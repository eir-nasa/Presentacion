import { IllustrationFrame } from './IllustrationFrame'
import { ink } from './ink'

export function HeroOrbit() {
  return <IllustrationFrame viewBox="0 0 480 480" className="hero-orbit-illustration" decorative>
    <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
      <circle className={ink.structure} cx="240" cy="240" r="224" />
      <path className={ink.context} d="M16 240H48 M432 240H464 M240 16V48 M240 432V464" />
      <path className={ink.focus} d="M56 128A224 224 0 0 1 128 56" />
    </g>
  </IllustrationFrame>
}
