import { IllustrationFrame } from './IllustrationFrame'
import { ink } from './ink'

type Props = { scene: 'challenge' | 'solution' | 'architecture' | 'evidence' | 'results'; className?: string }

export function SpaceBackdrop({ scene, className = '' }: Props) {
  return <IllustrationFrame viewBox="0 0 640 320" className={`space-backdrop space-backdrop-${scene} ${className}`} decorative>
    <defs>
      <radialGradient id="planet-light" cx="32%" cy="28%" r="78%"><stop className="space-light" offset="0" /><stop className="space-mid" offset=".42" /><stop className="space-shadow" offset="1" /></radialGradient>
      <linearGradient id="ship-shell" x1="0" y1="0" x2="1" y2="1"><stop className="space-cyan" /><stop className="space-blue" offset="1" /></linearGradient>
      <radialGradient id="halo-light"><stop className="halo-core" /><stop className="halo-edge" offset="1" /></radialGradient>
    </defs>
    <circle className="planet-atmosphere" cx="504" cy="176" r="124" fill="url(#halo-light)" />
    <circle className="space-planet" cx="504" cy="176" r="112" fill="url(#planet-light)" />
    <path className="planet-continent" d="M452 104q24-20 48-4l12 18-16 16-28-4-16 18-20-8 4-24z M520 184l20-12 26 12 8 22-20 16-8 28-22-8-12-28z" />
    <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
      <path className={`${ink.context} space-orbit`} d="M24 248C160 72 408 56 616 184 M96 304C240 136 424 120 576 168" />
      <path className={ink.structure} d="M416 176a88 88 0 1 0 176 0a88 88 0 1 0-176 0" />
      <path className={ink.context} d="M64 64h16m-8-8v16 M208 224h12m-6-6v12 M584 64h12m-6-6v12 M328 80l24 0m-12-12v24" />
      <circle className={ink.focus} cx="184" cy="120" r="4" />
      <circle className="space-star" cx="264" cy="56" r="2" /><circle className="space-star" cx="376" cy="272" r="2" />
    </g>
  </IllustrationFrame>
}

export function HeroSpacecraft() {
  return <IllustrationFrame viewBox="0 0 240 160" className="hero-spacecraft" decorative>
    <defs><linearGradient id="craft-hull" x1="0" y1="0" x2="1" y2="1"><stop className="space-cyan" /><stop className="space-blue" offset="1" /></linearGradient></defs>
    <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
      <path className="craft-body" d="M32 80L84 64 120 40 156 64 208 80 156 96 120 120 84 96Z" fill="url(#craft-hull)" />
      <path className={ink.structure} d="M96 64V96 M144 64V96 M48 80H192" />
      <path className="craft-wing" d="M84 64L64 48 96 60 M156 64L176 48 144 60 M84 96L64 112 96 100 M156 96L176 112 144 100" />
      <path className={ink.context} d="M24 80H72 M168 80H216 M120 16V48 M120 112V144" />
      <circle className={ink.focus} cx="120" cy="80" r="12" /><path className={ink.context} d="M8 128H64 M176 32H232" />
    </g>
  </IllustrationFrame>
}

export function AstronautMark() {
  return <IllustrationFrame viewBox="0 0 200 240" className="astronaut-mark" decorative>
    <defs><linearGradient id="suit-light" x1="0" y1="0" x2="1" y2="1"><stop className="space-suit-light" /><stop className="space-blue" offset="1" /></linearGradient></defs>
    <g fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke">
      <path className="suit-silhouette" d="M76 104H124L144 168H56Z M76 120L40 152 56 168 76 148 M124 120L160 152 144 168 124 148 M80 168L72 216 56 224 M120 168L128 216 144 224" fill="url(#suit-light)" />
      <circle className="helmet-shell" cx="100" cy="64" r="36" /><circle className="astronaut-visor" cx="100" cy="64" r="26" />
      <path className="suit-detail" d="M82 120H118V148H82Z M88 128H112 M88 138H104 M60 168H140" />
      <path className={ink.context} d="M88 56h24 M92 72h16 M48 64h16 M136 64h16 M100 16V32 M36 200h16 M148 200h16" />
    </g>
  </IllustrationFrame>
}
