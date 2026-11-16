import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function useSurfaceTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const context = canvas.getContext('2d')
    if (!context) return null
    const image = context.createImageData(canvas.width, canvas.height)
    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const u = x / canvas.width * Math.PI * 2
        const v = y / canvas.height * Math.PI
        const continents = Math.sin(u * 5 + Math.sin(v * 4) * 1.7)
          + Math.cos(u * 9 - v * 6) * 0.42
          + Math.sin(v * 15 + u * 2) * 0.22
        const grain = Math.sin(x * 0.31 + y * 0.17) * Math.cos(y * 0.27 - x * 0.13)
        const land = continents + grain * 0.12 > 0.34
        const relief = Math.round(Math.max(0, Math.min(1, (continents + 0.7) / 2.4)) * 28)
        const offset = (y * canvas.width + x) * 4
        image.data[offset] = land ? 71 + relief : 23 + relief
        image.data[offset + 1] = land ? 103 + relief : 48 + relief
        image.data[offset + 2] = land ? 127 + relief : 67 + relief
        image.data[offset + 3] = 255
      }
    }
    context.putImageData(image, 0, 0)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

function Atmosphere() {
  return <mesh scale={1.045}>
    <sphereGeometry args={[1, 48, 48]} />
    <shaderMaterial
      side={THREE.BackSide}
      blending={THREE.AdditiveBlending}
      transparent
      depthWrite={false}
      vertexShader="varying vec3 vNormal; varying vec3 vViewPosition; void main(){ vec4 mvPosition=modelViewMatrix*vec4(position,1.0); vNormal=normalize(normalMatrix*normal); vViewPosition=-mvPosition.xyz; gl_Position=projectionMatrix*mvPosition; }"
      fragmentShader="varying vec3 vNormal; varying vec3 vViewPosition; void main(){ float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vViewPosition)),0.0),2.4); vec3 cyan=vec3(0.05,0.68,0.82); vec3 blue=vec3(0.12,0.26,0.75); vec3 color=mix(blue,cyan,clamp(rim*1.8,0.0,1.0)); gl_FragColor=vec4(color,rim*0.88); }"
    />
  </mesh>
}

function OrbitalScene({ animated }: { animated: boolean }) {
  const planet = useRef<THREE.Group>(null)
  const satelliteOrbit = useRef<THREE.Group>(null)
  const texture = useSurfaceTexture()
  const { invalidate } = useThree()
  useEffect(() => {
    return () => texture?.dispose()
  }, [texture])
  useFrame((_, delta) => {
    if (!animated) return
    if (planet.current) planet.current.rotation.y += delta * 0.075
    if (satelliteOrbit.current) satelliteOrbit.current.rotation.z += delta * 0.2
    invalidate()
  })
  const starPositions = useMemo(() => {
    const points = new Float32Array(240 * 3)
    let seed = 217
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
    for (let i = 0; i < points.length; i += 3) {
      points[i] = (random() - 0.5) * 8
      points[i + 1] = (random() - 0.5) * 6
      points[i + 2] = -1 - random() * 7
    }
    return points
  }, [])
  return <>
    <ambientLight intensity={0.09} />
    <directionalLight position={[-3, 1.4, 4]} intensity={2.65} color="#b9e6f7" />
    <pointLight position={[-2.8, 0.7, 1.4]} intensity={0.55} color="#20c6dd" distance={5} />
    <pointLight position={[2.8, -1.2, 2]} intensity={0.34} color="#e8832a" distance={6} />
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[starPositions, 3]} /></bufferGeometry>
      <pointsMaterial color="#b6d4e8" size={0.018} sizeAttenuation transparent opacity={0.65} depthWrite={false} />
    </points>
    <group ref={planet}>
      <mesh>
        <sphereGeometry args={[1, 64, 48]} />
      <meshStandardMaterial color="#b4c9d8" map={texture ?? undefined} bumpMap={texture ?? undefined} bumpScale={0.045} roughness={0.96} metalness={0.025} />
      </mesh>
      <Atmosphere />
    </group>
    <group ref={satelliteOrbit} rotation={[0.85, 0.2, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.002, 4, 112]} />
        <meshBasicMaterial color="#20c6dd" transparent opacity={0.2} />
      </mesh>
      <group position={[1.55, 0, 0]} rotation={[0.25, 0.15, -0.28]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.075, 0.2, 8]} />
          <meshStandardMaterial color="#9eb4c2" metalness={0.78} roughness={0.3} />
        </mesh>
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.055, 0.11, 8]} />
          <meshStandardMaterial color="#d5dce0" metalness={0.72} roughness={0.26} />
        </mesh>
        <mesh position={[-0.01, 0, 0]}>
          <boxGeometry args={[0.1, 0.12, 0.13]} />
          <meshStandardMaterial color="#e8832a" emissive="#6c3211" emissiveIntensity={0.18} metalness={0.62} roughness={0.34} />
        </mesh>
        {[-1, 1].map((side) => <group key={side} position={[0, side * 0.18, 0]}>
          <mesh>
            <boxGeometry args={[0.13, 0.24, 0.018]} />
            <meshStandardMaterial color="#527c96" metalness={0.62} roughness={0.38} />
          </mesh>
          {[-0.075, 0, 0.075].map((row) => <mesh key={row} position={[0, row, 0.012]}>
            <boxGeometry args={[0.12, 0.006, 0.008]} />
            <meshStandardMaterial color="#a5c7d5" metalness={0.7} roughness={0.3} />
          </mesh>)}
        </group>)}
        <mesh position={[-0.12, 0, 0.07]} rotation={[0.62, 0, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.16, 6]} />
          <meshStandardMaterial color="#b7c6ce" metalness={0.78} roughness={0.3} />
        </mesh>
      </group>
    </group>
  </>
}

export function HeroPlanetScene() {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [failed, setFailed] = useState(false)
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null)
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const probe = document.createElement('canvas')
      const context = probe.getContext('webgl2')
      setWebglAvailable(Boolean(context))
      context?.getExtension('WEBGL_lose_context')?.loseContext()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])
  useEffect(() => {
    const element = container.current
    if (!element || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '80px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  if (failed || webglAvailable === false) return <div className="hero-scene-fallback" aria-hidden="true"><span /></div>
  return <div ref={container} className="hero-planet-scene" aria-hidden="true">
    {webglAvailable === null && <div className="hero-scene-fallback"><span /></div>}
    {webglAvailable && <Canvas
      frameloop={!visible || reducedMotion ? 'demand' : 'always'}
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 4.8], fov: 38 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      fallback={<div className="hero-scene-fallback"><span /></div>}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => { event.preventDefault(); setFailed(true) }, { once: true })
      }}
    >
      <Suspense fallback={null}><OrbitalScene animated={!reducedMotion && visible} /></Suspense>
    </Canvas>}
  </div>
}
