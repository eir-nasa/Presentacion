import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type SceneProps = { active: boolean; reducedMotion: boolean; onReady: () => void; onUnavailable: () => void }

function SceneReady({ onReady }: Pick<SceneProps, 'onReady'>) {
  const invalidate = useThree((state) => state.invalidate)
  useEffect(() => {
    invalidate()
    const frame = window.requestAnimationFrame(onReady)
    return () => window.cancelAnimationFrame(frame)
  }, [invalidate, onReady])
  return null
}

function ContextLossListener({ onUnavailable }: Pick<SceneProps, 'onUnavailable'>) {
  const gl = useThree((state) => state.gl)
  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      onUnavailable()
    }
    gl.domElement.addEventListener('webglcontextlost', handleContextLost)
    return () => gl.domElement.removeEventListener('webglcontextlost', handleContextLost)
  }, [gl, onUnavailable])
  return null
}

function makePlanetTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) return null
  const image = context.createImageData(canvas.width, canvas.height)
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const u = x / canvas.width * Math.PI * 2
      const v = y / canvas.height * Math.PI
      const terrain = Math.sin(u * 5 + Math.sin(v * 4) * 1.6)
        + Math.cos(u * 8 - v * 6) * 0.4
        + Math.sin(v * 13 + u * 2) * 0.2
      const index = (y * canvas.width + x) * 4
      const land = terrain > 0.42
      const relief = Math.round(Math.max(0, terrain) * 18)
      image.data[index] = land ? 82 + relief : 30 + relief
      image.data[index + 1] = land ? 116 + relief : 63 + relief
      image.data[index + 2] = land ? 147 + relief : 94 + relief
      image.data[index + 3] = 255
    }
  }
  context.putImageData(image, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function Atmosphere() {
  return <mesh scale={1.055}>
    <sphereGeometry args={[1.55, 48, 36]} />
    <shaderMaterial
      side={THREE.BackSide}
      blending={THREE.AdditiveBlending}
      transparent
      depthWrite={false}
      vertexShader="varying vec3 vNormal; varying vec3 vViewPosition; void main(){ vec4 mvPosition=modelViewMatrix*vec4(position,1.0); vNormal=normalize(normalMatrix*normal); vViewPosition=-mvPosition.xyz; gl_Position=projectionMatrix*mvPosition; }"
      fragmentShader="varying vec3 vNormal; varying vec3 vViewPosition; void main(){ float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vViewPosition)),0.0),2.5); vec3 color=mix(vec3(0.08,0.24,0.72),vec3(0.05,0.72,0.84),smoothstep(0.08,0.8,rim)); gl_FragColor=vec4(color,rim*0.52); }"
    />
  </mesh>
}

function Astronaut() {
  const suit = '#b9c8d0'
  const trim = '#607d91'
  const boot = '#425764'
  return <group rotation={[0.04, -0.18, -0.06]}>
    <mesh position={[0, 0.04, 0]}>
      <capsuleGeometry args={[0.27, 0.5, 8, 16]} />
      <meshStandardMaterial color={suit} roughness={0.7} metalness={0.08} />
    </mesh>
    <mesh position={[0, 0.1, -0.27]}>
      <boxGeometry args={[0.46, 0.58, 0.22]} />
      <meshStandardMaterial color="#738a98" roughness={0.76} metalness={0.18} />
    </mesh>
    <mesh position={[0, 0.14, 0.285]}>
      <boxGeometry args={[0.22, 0.26, 0.045]} />
      <meshStandardMaterial color="#d4e0e5" roughness={0.52} metalness={0.24} />
    </mesh>
    <mesh position={[0, 0.14, 0.315]}>
      <boxGeometry args={[0.1, 0.075, 0.014]} />
      <meshStandardMaterial color="#607d91" roughness={0.42} metalness={0.3} />
    </mesh>
    <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.245, 0.042, 8, 24]} />
      <meshStandardMaterial color={trim} roughness={0.52} metalness={0.28} />
    </mesh>
    <mesh position={[0, 0.8, 0.035]}>
      <sphereGeometry args={[0.34, 32, 24]} />
      <meshStandardMaterial color="#d4e0e5" roughness={0.28} metalness={0.22} />
    </mesh>
    <mesh position={[0, 0.79, 0.305]} scale={[0.25, 0.21, 0.085]}>
      <sphereGeometry args={[1, 32, 24]} />
      <meshPhysicalMaterial color="#10283a" roughness={0.16} metalness={0.68} clearcoat={0.8} clearcoatRoughness={0.18} />
    </mesh>
    <mesh position={[0, 0.8, 0.335]} scale={[0.18, 0.018, 0.012]}>
      <sphereGeometry args={[1, 20, 12]} />
      <meshBasicMaterial color="#72d9eb" transparent opacity={0.6} />
    </mesh>
    {[-1, 1].map((side) => <group key={`arm-${side}`} position={[side * 0.29, 0.38, 0]} rotation={[0, 0, side * 0.34]}>
      <mesh><sphereGeometry args={[0.115, 16, 12]} /><meshStandardMaterial color={trim} roughness={0.56} metalness={0.22} /></mesh>
      <mesh position={[0, -0.2, 0]}><capsuleGeometry args={[0.095, 0.22, 6, 12]} /><meshStandardMaterial color={suit} roughness={0.68} metalness={0.1} /></mesh>
      <group position={[0, -0.41, 0]} rotation={[0, 0, -side * 0.16]}>
        <mesh><sphereGeometry args={[0.1, 16, 12]} /><meshStandardMaterial color={trim} roughness={0.55} metalness={0.25} /></mesh>
        <mesh position={[0, -0.18, 0]}><capsuleGeometry args={[0.085, 0.2, 6, 12]} /><meshStandardMaterial color={suit} roughness={0.68} metalness={0.1} /></mesh>
        <mesh position={[0, -0.39, 0.025]} scale={[1, 1.12, 1]}><sphereGeometry args={[0.1, 16, 12]} /><meshStandardMaterial color={trim} roughness={0.5} metalness={0.28} /></mesh>
      </group>
    </group>)}
    {[-1, 1].map((side) => <group key={`leg-${side}`} position={[side * 0.15, -0.45, 0]} rotation={[0, 0, side * 0.055]}>
      <mesh><sphereGeometry args={[0.13, 16, 12]} /><meshStandardMaterial color={trim} roughness={0.56} metalness={0.22} /></mesh>
      <mesh position={[0, -0.22, 0]}><capsuleGeometry args={[0.11, 0.24, 6, 12]} /><meshStandardMaterial color={suit} roughness={0.7} metalness={0.08} /></mesh>
      <group position={[0, -0.45, 0]} rotation={[0, 0, -side * 0.075]}>
        <mesh><sphereGeometry args={[0.115, 16, 12]} /><meshStandardMaterial color={trim} roughness={0.55} metalness={0.25} /></mesh>
        <mesh position={[0, -0.2, 0]}><capsuleGeometry args={[0.1, 0.22, 6, 12]} /><meshStandardMaterial color={suit} roughness={0.7} metalness={0.08} /></mesh>
        <mesh position={[side * 0.025, -0.43, 0.1]}><boxGeometry args={[0.21, 0.14, 0.31]} /><meshStandardMaterial color={boot} roughness={0.58} metalness={0.3} /></mesh>
      </group>
    </group>)}
  </group>
}

function ChallengeComposition({ active, reducedMotion }: Pick<SceneProps, 'active' | 'reducedMotion'>) {
  const planet = useRef<THREE.Group>(null)
  const astronaut = useRef<THREE.Group>(null)
  const elapsed = useRef(0)
  const { viewport, invalidate } = useThree()
  const texture = useMemo(() => makePlanetTexture(), [])
  useEffect(() => () => texture?.dispose(), [texture])
  const scale = Math.min(1, viewport.height / 4.5)
  const stars = useMemo(() => {
    const values = new Float32Array(54 * 3)
    let seed = 239
    const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646 }
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (random() - 0.5) * viewport.width
      values[index + 1] = (random() - 0.5) * viewport.height
      values[index + 2] = -1 - random() * 5
    }
    return values
  }, [viewport.height, viewport.width])

  useEffect(() => {
    elapsed.current = 0
    if (astronaut.current) {
      astronaut.current.position.y = -0.2
      astronaut.current.rotation.z = 0
    }
    if (planet.current) planet.current.rotation.y = 0
    invalidate()
  }, [active, invalidate, reducedMotion])

  useFrame((_, delta) => {
    if (!active || reducedMotion || elapsed.current >= 4.5) return
    elapsed.current = Math.min(4.5, elapsed.current + delta)
    const progress = elapsed.current / 4.5
    if (astronaut.current) {
      astronaut.current.position.y = -0.2 + Math.sin(progress * Math.PI) * 0.09
      astronaut.current.rotation.z = Math.sin(progress * Math.PI) * 0.035
    }
    if (planet.current) planet.current.rotation.y = progress * 0.12
    if (elapsed.current < 4.5) invalidate()
  })

  return <>
    <ambientLight intensity={0.18} />
    <directionalLight position={[-3, 2.2, 4]} intensity={2.3} color="#c3e9f4" />
    <pointLight position={[-2.2, 0.4, 1.8]} intensity={0.5} color="#20c6dd" distance={5.5} />
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]} /></bufferGeometry>
      <pointsMaterial color="#b6d4e8" size={0.016} sizeAttenuation transparent opacity={0.45} depthWrite={false} />
    </points>
    <group position={[-0.75, 0.02, -0.9]} scale={scale} ref={planet}>
      <mesh>
        <sphereGeometry args={[1.55, 56, 40]} />
        <meshStandardMaterial color="#b4c9d8" map={texture ?? undefined} bumpMap={texture ?? undefined} bumpScale={0.035} roughness={0.97} metalness={0.02} />
      </mesh>
      <Atmosphere />
    </group>
    <group ref={astronaut} position={[0.78, -0.2, 0.18]} scale={scale * 0.92}>
      <Astronaut />
    </group>
  </>
}

export function ChallengeScene3D({ active, reducedMotion, onReady, onUnavailable }: SceneProps) {
  return <Canvas
    className="challenge-scene-canvas"
    frameloop="demand"
    dpr={[1, 1.25]}
    camera={{ position: [0, 0, 5.8], fov: 38 }}
    gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
    fallback={null}
  >
    <SceneReady onReady={onReady} />
    <ContextLossListener onUnavailable={onUnavailable} />
    <ChallengeComposition active={active} reducedMotion={reducedMotion} />
  </Canvas>
}
