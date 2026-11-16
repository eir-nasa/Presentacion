import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type SceneProps = { onReady: () => void; onUnavailable: () => void }

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
      const relief = Math.round(Math.max(0, terrain) * 20)
      image.data[index] = land ? 66 + relief : 22 + relief
      image.data[index + 1] = land ? 96 + relief : 43 + relief
      image.data[index + 2] = land ? 123 + relief : 62 + relief
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
    <sphereGeometry args={[1.9, 48, 36]} />
    <shaderMaterial
      side={THREE.BackSide}
      blending={THREE.AdditiveBlending}
      transparent
      depthWrite={false}
      vertexShader="varying vec3 vNormal; varying vec3 vViewPosition; void main(){ vec4 mvPosition=modelViewMatrix*vec4(position,1.0); vNormal=normalize(normalMatrix*normal); vViewPosition=-mvPosition.xyz; gl_Position=projectionMatrix*mvPosition; }"
      fragmentShader="varying vec3 vNormal; varying vec3 vViewPosition; void main(){ float rim=pow(1.0-max(dot(normalize(vNormal),normalize(vViewPosition)),0.0),2.2); vec3 color=mix(vec3(0.08,0.24,0.72),vec3(0.05,0.72,0.84),smoothstep(0.08,0.8,rim)); gl_FragColor=vec4(color,rim*0.72); }"
    />
  </mesh>
}

function ClosingComposition() {
  const planet = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const texture = useMemo(() => makePlanetTexture(), [])
  useEffect(() => () => texture?.dispose(), [texture])
  const scale = Math.min(1, Math.max(0.62, viewport.width / 7.5)) * 0.7
  const orbitRadius = 2.25
  const edgeRatio = window.matchMedia('(min-width: 80rem)').matches ? 0.85 : 0.82
  const centerX = viewport.width * (edgeRatio - 0.5) + orbitRadius * scale

  useFrame((_, delta) => {
    if (planet.current) planet.current.rotation.y += delta * 0.038
    if (orbit.current) orbit.current.rotation.z += delta * 0.18
  })

  const stars = useMemo(() => {
    let seed = 613
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
    const positions = new Float32Array(54 * 3)
    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = viewport.width * (0.38 + random() * 0.12)
      positions[index + 1] = (random() - 0.5) * viewport.height
      positions[index + 2] = -1 - random() * 5
    }
    return positions
  }, [viewport.height, viewport.width])

  return <>
    <ambientLight intensity={0.11} />
    <directionalLight position={[-3.4, 1.8, 4]} intensity={2.1} color="#b6e6f5" />
    <pointLight position={[-2.2, 0.8, 1.5]} intensity={0.42} color="#20c6dd" distance={5.5} />
    <pointLight position={[2.5, -1.4, 1.2]} intensity={0.22} color="#e8832a" distance={5} />
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]} /></bufferGeometry>
      <pointsMaterial color="#b6d4e8" size={0.014} sizeAttenuation transparent opacity={0.48} depthWrite={false} />
    </points>
    <group position={[centerX, -0.12, 0]} scale={scale}>
      <group ref={planet}>
        <mesh>
          <sphereGeometry args={[1.9, 56, 40]} />
          <meshStandardMaterial color="#b4c9d8" map={texture ?? undefined} bumpMap={texture ?? undefined} bumpScale={0.035} roughness={0.97} metalness={0.02} />
        </mesh>
        <Atmosphere />
      </group>
      <group ref={orbit} rotation={[0.72, 0.12, 0.18]}>
        <mesh>
          <torusGeometry args={[orbitRadius, 0.006, 4, 112]} />
          <meshBasicMaterial color="#20c6dd" transparent opacity={0.34} />
        </mesh>
        <group position={[orbitRadius, 0, 0]} rotation={[0.2, 0.1, -0.3]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.055, 0.075, 0.2, 8]} />
            <meshStandardMaterial color="#a9bbc5" metalness={0.72} roughness={0.32} />
          </mesh>
          <mesh position={[0.12, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.05, 0.1, 8]} />
            <meshStandardMaterial color="#d3dce1" metalness={0.7} roughness={0.28} />
          </mesh>
          <mesh position={[-0.01, 0, 0]}>
            <boxGeometry args={[0.1, 0.12, 0.13]} />
            <meshStandardMaterial color="#e8832a" emissive="#6c3211" emissiveIntensity={0.16} metalness={0.6} roughness={0.36} />
          </mesh>
          {[-1, 1].map((side) => <group key={side} position={[0, side * 0.17, 0]}>
            <mesh>
              <boxGeometry args={[0.13, 0.22, 0.018]} />
              <meshStandardMaterial color="#4f7892" metalness={0.64} roughness={0.38} />
            </mesh>
            {[-0.065, 0, 0.065].map((row) => <mesh key={row} position={[0, row, 0.012]}>
              <boxGeometry args={[0.12, 0.005, 0.008]} />
              <meshStandardMaterial color="#a5c7d5" metalness={0.68} roughness={0.32} />
            </mesh>)}
          </group>)}
        </group>
      </group>
    </group>
  </>
}

export function ResultsClosingScene3D({ onReady, onUnavailable }: SceneProps) {
  return <Canvas
    className="results-closing-canvas"
    dpr={[1, 1.2]}
    camera={{ position: [0, 0, 6], fov: 38 }}
    gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
    fallback={null}
    onCreated={({ gl }) => {
      onReady()
      gl.domElement.addEventListener('webglcontextlost', (event) => {
        event.preventDefault()
        onUnavailable()
      }, { once: true })
    }}
  >
    <ClosingComposition />
  </Canvas>
}
