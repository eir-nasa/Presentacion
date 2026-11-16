import { useCallback, useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'

type SceneProps = { active: boolean; reducedMotion: boolean; onReady: () => void; onUnavailable: () => void }
type SceneModule = { ResultsClosingScene3D: ComponentType<SceneProps> }

export function ResultsClosingScene() {
  const root = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(() => !('IntersectionObserver' in window))
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const importStarted = useRef(false)
  const handleReady = useCallback(() => setReady(true), [])
  const handleUnavailable = useCallback(() => {
    setReady(false)
    setFailed(true)
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const element = root.current
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    }, { rootMargin: '0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || importStarted.current || failed) return
    importStarted.current = true
    import('./ResultsClosingScene3D')
      .then((module: SceneModule) => setScene(() => module.ResultsClosingScene3D))
      .catch(() => setFailed(true))
  }, [failed, reducedMotion, visible])

  return <div ref={root} className="space-backdrop results-closing-layer" aria-hidden="true">
    {(!Scene || !ready || failed) && <div className="results-closing-fallback">
      <span className="closing-fallback-stars" />
      <span className="closing-fallback-trajectory" />
      <span className="closing-fallback-planet" />
      <span className="closing-fallback-craft"><i /></span>
    </div>}
    {Scene && !failed && <Scene
      active={visible}
      reducedMotion={reducedMotion}
      onReady={handleReady}
      onUnavailable={handleUnavailable}
    />}
  </div>
}
