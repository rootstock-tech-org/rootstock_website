'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { useScrollProgress } from '@/hooks/useScrollProgress'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// soft local studio lighting so metallic / clearcoat read correctly (no network)
function StudioEnv() {
  const { gl, scene } = useThree()
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    return () => {
      env.dispose()
      pmrem.dispose()
    }
  }, [gl, scene])
  return null
}

/**
 * RootieGLB — loads the real 3D model (public/rootie.glb). The model is a single
 * merged mesh containing three turnaround figures, so we extract just the front
 * (left) one, fix the material (its metalness was 1.0 → rendered black) to reveal
 * the true Rootie texture colours, then centre, scale and spin it a full 360°.
 */

// Extract only the left-third (front figure) of the merged geometry.
function extractFront(src: THREE.BufferGeometry): THREE.BufferGeometry {
  const pos = src.getAttribute('position') as THREE.BufferAttribute
  const uv = src.getAttribute('uv') as THREE.BufferAttribute | undefined
  const normal = src.getAttribute('normal') as THREE.BufferAttribute | undefined
  const index = src.getIndex()

  let minX = Infinity
  let maxX = -Infinity
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    if (x < minX) minX = x
    if (x > maxX) maxX = x
  }
  const thresh = minX + (maxX - minX) / 3

  const P: number[] = []
  const U: number[] = []
  const N: number[] = []
  const triCount = index ? index.count / 3 : pos.count / 3
  const gi = (t: number, k: number) => (index ? index.getX(t * 3 + k) : t * 3 + k)

  for (let t = 0; t < triCount; t++) {
    const a = gi(t, 0)
    const b = gi(t, 1)
    const c = gi(t, 2)
    const cx = (pos.getX(a) + pos.getX(b) + pos.getX(c)) / 3
    if (cx > thresh) continue
    for (const vi of [a, b, c]) {
      P.push(pos.getX(vi), pos.getY(vi), pos.getZ(vi))
      if (uv) U.push(uv.getX(vi), uv.getY(vi))
      if (normal) N.push(normal.getX(vi), normal.getY(vi), normal.getZ(vi))
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3))
  if (uv && U.length) g.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2))
  if (normal && N.length) g.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3))
  else g.computeVertexNormals()
  return g
}

function Model({ scroll }: { scroll: React.MutableRefObject<number> }) {
  const { scene } = useGLTF('/rootie.glb')
  const groupRef = useRef<THREE.Group>(null)
  const inited = useRef(false)

  const { geometry, material, scale } = useMemo(() => {
    let srcMesh: THREE.Mesh | undefined
    scene.traverse((o) => {
      if (!srcMesh && (o as THREE.Mesh).isMesh) srcMesh = o as THREE.Mesh
    })
    const srcGeo = srcMesh!.geometry as THREE.BufferGeometry
    const g = extractFront(srcGeo)

    // matte, non-metallic material; lift the texture colours so the cute
    // teal-green shade shows instead of near-black.
    // Body material spec: dark-teal, lightly metallic with clearcoat sheen.
    // (Single baked texture carries the per-part colours; we tune the whole
    // material + lift emission so circuits / chest glow.)
    const srcMat = (Array.isArray(srcMesh!.material)
      ? srcMesh!.material[0]
      : srcMesh!.material) as THREE.MeshStandardMaterial
    const map = srcMat.map
    if (map) map.colorSpace = THREE.SRGBColorSpace
    const mat = new THREE.MeshPhysicalMaterial({
      map: map ?? undefined,
      metalness: 0.25,
      roughness: 0.28,
      clearcoat: 0.35,
      clearcoatRoughness: 0.3,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: map ?? undefined,
      emissiveIntensity: 0.3,
      envMapIntensity: 1.1,
    })
    mat.needsUpdate = true

    // centre + scale
    g.computeBoundingBox()
    const box = g.boundingBox!
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    g.translate(-center.x, -center.y, -center.z)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    return { geometry: g, material: mat, scale: 2.4 / maxDim }
  }, [scene])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.elapsedTime
    if (!inited.current) {
      groupRef.current.rotation.y = Math.PI
      inited.current = true
    }
    // face front by default; rotate with scroll (+ a tiny idle sway)
    const target = Math.PI + scroll.current * Math.PI * 3 + Math.sin(t * 0.5) * 0.08
    groupRef.current.rotation.y = lerp(groupRef.current.rotation.y, target, 0.08)
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.05
  })

  return (
    <group ref={groupRef} scale={scale}>
      <mesh geometry={geometry} material={material} />
    </group>
  )
}

useGLTF.preload('/rootie.glb')

export default function RootieGLB() {
  const scroll = useScrollProgress()
  return (
    <div className="relative w-full h-full">
      {/* soft glow halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[52%] aspect-square rounded-full bg-[#25532c]/10 blur-3xl" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 4.9], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.7} color="#ffffff" groundColor="#cbb892" />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#bfe6bf" />
        <Suspense fallback={null}>
          <StudioEnv />
          <Model scroll={scroll} />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.8}
          minPolarAngle={Math.PI / 2 - 0.6}
          maxPolarAngle={Math.PI / 2 + 0.6}
        />
      </Canvas>

      <p className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[11px] text-[#888] tracking-widest uppercase whitespace-nowrap pointer-events-none">
        Scroll or drag to rotate
      </p>
    </div>
  )
}
