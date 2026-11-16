import type { ReactNode } from 'react'
import { presentation } from '../content/presentation'

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return <section id={id} className="section-shell" aria-labelledby={`${id}-title`}>{children}</section>
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`label ${className}`}>{children}</span>
}

export function SectionHeader({ id, label, title, hero = false }: { id: string; label: string; title: string; hero?: boolean }) {
  return <header className="section-header"><Label>{label}</Label>{hero ? <h1 id={`${id}-title`} className="hero-title">{title}</h1> : <h2 id={`${id}-title`} className="section-title">{title}</h2>}</header>
}

export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`frame ${className}`}>{children}</div>
}

export function Figure({ children, caption }: { children: ReactNode; caption: string }) {
  return <figure className="hero-figure">{children}<figcaption className="figure-caption">{caption}</figcaption></figure>
}

export function Placeholder({ description, className = '', artwork }: { description: string; className?: string; artwork?: ReactNode }) {
  return <Frame className={`placeholder ${className}`}>{artwork}<Label>[{presentation.pendingLabel}: {description}]</Label></Frame>
}
