import { useId, type ReactNode } from 'react'

type IllustrationProps = { className?: string } & (
  | { decorative: true; title?: never; desc?: never }
  | { decorative?: false; title: string; desc?: string }
)

type FrameProps = IllustrationProps & { viewBox: string; children: ReactNode }

export function IllustrationFrame({ viewBox, className, decorative, title, desc, children }: FrameProps) {
  const id = useId()
  return <svg viewBox={viewBox} className={className} preserveAspectRatio="xMidYMid meet"
    aria-hidden={decorative || undefined} focusable="false" role={decorative ? undefined : 'img'}
    aria-labelledby={decorative ? undefined : desc ? `${id}-title ${id}-desc` : `${id}-title`}>
    {!decorative && <title id={`${id}-title`}>{title}</title>}
    {!decorative && desc && <desc id={`${id}-desc`}>{desc}</desc>}
    {children}
  </svg>
}
