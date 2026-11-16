import { useCallback, useEffect, useRef, useState } from 'react'
import { presentation } from './content/presentation'
import { Introduction } from './sections/Introduction'
import { Challenge } from './sections/Challenge'
import { Solution } from './sections/Solution'
import { Architecture } from './sections/Architecture'
import { DevelopmentEvidence } from './sections/DevelopmentEvidence'
import { ResultsFuture } from './sections/ResultsFuture'

export default function App() {
  const [active, setActive] = useState('introduction')
  const [presenting, setPresenting] = useState(false)
  const activeRef = useRef<string>('introduction')
  const targetRef = useRef<string | null>(null)
  const timerRef = useRef<number | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const setCurrent = useCallback((id: string) => {
    activeRef.current = id
    setActive(id)
  }, [])

  const clearTarget = useCallback(() => {
    targetRef.current = null
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = null
  }, [])

  const navigateTo = useCallback((id: string) => {
    const section = presentation.sections.find((item) => item.available && item.id === id)
    const target = section && document.getElementById(section.id)
    if (!section || !target) return
    clearTarget()
    targetRef.current = id
    setCurrent(id)
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' })
    timerRef.current = window.setTimeout(clearTarget, 2000)
  }, [clearTarget, setCurrent])

  useEffect(() => {
    const initialId = window.location.hash.slice(1)
    if (presentation.sections.some((section) => section.available && section.id === initialId)) {
      document.getElementById(initialId)?.scrollIntoView()
    }
  }, [])

  useEffect(() => {
    const updateActive = () => {
      const sections = presentation.sections.filter((section) => section.available)
      const current = sections.filter((section) => {
        const element = document.getElementById(section.id)
        return element && element.getBoundingClientRect().top <= window.innerHeight / 2
      }).at(-1)
      if (targetRef.current) {
        const target = document.getElementById(targetRef.current)
        if (target && Math.abs(target.getBoundingClientRect().top) > 2) return
        clearTarget()
      }
      const id = current?.id ?? 'introduction'
      setCurrent(id)
      if (presenting && window.location.hash !== `#${id}`) window.history.replaceState(null, '', `#${id}`)
    }
    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive)
    window.addEventListener('wheel', clearTarget, { passive: true })
    window.addEventListener('touchstart', clearTarget, { passive: true })
    return () => { window.removeEventListener('scroll', updateActive); window.removeEventListener('resize', updateActive); window.removeEventListener('wheel', clearTarget); window.removeEventListener('touchstart', clearTarget); clearTarget() }
  }, [clearTarget, presenting, setCurrent])

  useEffect(() => {
    if (!presenting) return
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="slider"], [role="spinbutton"], video, audio'))) return
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.defaultPrevented) return
      if (event.key === 'Escape') {
        event.preventDefault()
        clearTarget()
        setPresenting(false)
        toggleRef.current?.focus()
        return
      }
      const sections = presentation.sections.filter((section) => section.available)
      const index = Math.max(0, sections.findIndex((section) => section.id === activeRef.current))
      let next = index
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = Math.min(index + 1, sections.length - 1)
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = Math.max(index - 1, 0)
      else if (event.key === 'Home') next = 0
      else if (event.key === 'End') next = sections.length - 1
      else return
      event.preventDefault()
      if (next !== index) navigateTo(sections[next].id)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [clearTarget, navigateTo, presenting])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-header-revealed')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
    document.querySelectorAll('.content-section > .section-header').forEach((header) => observer.observe(header))
    return () => observer.disconnect()
  }, [])

  return <>
    <header className="site-header">
      <a className="wordmark" href="#introduction" aria-label={presentation.introductionLinkLabel}>EIR<span aria-hidden="true">.</span></a>
      <div className="site-controls"><p className="site-event">{presentation.event}</p><button ref={toggleRef} type="button" className="presentation-toggle" aria-pressed={presenting} aria-describedby={presenting ? 'presentation-instructions' : undefined} onClick={() => setPresenting((value) => !value)}>{presenting ? presentation.presentationMode.exit : presentation.presentationMode.enter}</button></div>
    </header>
    <main>
      <p className="sr-only" id="presentation-instructions">{presentation.presentationMode.instructions}</p>
      <p className="sr-only" aria-live="polite" aria-atomic="true">{presenting ? `${presentation.presentationMode.current}: ${presentation.sections.find((section) => section.id === active)?.label ?? ''}` : ''}</p>
      <Introduction />
      <nav className="presentation-nav" aria-label={presentation.navigationLabel}>
        <ol>{presentation.sections.map((section, index) => <li key={section.id}>
          {section.available ? <a href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined} onClick={presenting ? (event) => { if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); navigateTo(section.id) } } : undefined}><span className="nav-number">0{index + 1}</span><span>{section.label}</span></a> : <span className="nav-unavailable"><span className="nav-number">0{index + 1}</span><span>{section.label}</span></span>}
        </li>)}</ol>
      </nav>
      <Challenge />
      <Solution />
      <Architecture />
      <DevelopmentEvidence />
      <ResultsFuture />
    </main>
  </>
}
