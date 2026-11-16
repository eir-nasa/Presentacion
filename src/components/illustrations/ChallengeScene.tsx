import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'

type SceneProps = { reducedMotion: boolean; onReady: () => void; onUnavailable: () => void }
type SceneModule = { ChallengeScene3D: ComponentType<SceneProps> }

export function ChallengeScene() {
  const root = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const importStarted = useRef(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setReducedMotion(query.matches)
      if (query.matches) setReady(false)
    }
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const element = root.current
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      if (!entry.isIntersecting) setReady(false)
    }, { rootMargin: '0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reducedMotion || importStarted.current || failed) return
    importStarted.current = true
    import('./ChallengeScene3D')
      .then((module: SceneModule) => setScene(() => module.ChallengeScene3D))
      .catch(() => setFailed(true))
  }, [failed, reducedMotion, visible])

  return <div ref={root} className="challenge-scene" role="img" aria-label="A spacesuited astronaut floats beside a blue planet in deep space.">
    {(!visible || !Scene || !ready || failed || reducedMotion) && <div className="challenge-scene-fallback" aria-hidden="true">
      <span className="challenge-fallback-planet" />
      <span className="challenge-fallback-astronaut"><i className="astronaut-pack" /><i className="astronaut-torso" /><i className="astronaut-collar" /><i className="astronaut-helmet"><b /></i><i className="astronaut-arm astronaut-arm-one" /><i className="astronaut-arm astronaut-arm-two" /><i className="astronaut-glove astronaut-glove-one" /><i className="astronaut-glove astronaut-glove-two" /><i className="astronaut-leg astronaut-leg-one" /><i className="astronaut-leg astronaut-leg-two" /><i className="astronaut-boot astronaut-boot-one" /><i className="astronaut-boot astronaut-boot-two" /></span>
    </div>}
    {visible && !reducedMotion && Scene && !failed && <Scene
      reducedMotion={reducedMotion}
      onReady={() => setReady(true)}
      onUnavailable={() => { setReady(false); setFailed(true) }}
    />}
  </div>
}
