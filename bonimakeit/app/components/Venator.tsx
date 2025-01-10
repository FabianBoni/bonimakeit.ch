'use client'
import { Html } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import PulsingCircle from './PulsingCircle'
import { useRouter } from 'next/navigation'

export function Venator() {
  const { scene } = useGLTF("/interdictor2/scene.gltf", true)
  const modelRef = useRef<THREE.Group>(null!)
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0])
  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleClick = () => {
    router.push('/projects/stepperly')
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const orbitRadius = isMobile ? 2 : 5

    const x = Math.cos(time * 0.005) * orbitRadius
    const z = Math.sin(time * 0.005) * orbitRadius
    const y = Math.sin(time * 0.0001) * (isMobile ? 5 : 2)

    modelRef.current.position.x = x
    modelRef.current.position.z = z
    modelRef.current.position.y = y 

    modelRef.current.rotation.y = -time * 0.005
    modelRef.current.rotation.z = Math.sin(time * 0.0001) * (isMobile ? 0.025 : 0.05)

    setPosition([x, y, z])
  })

  return (
    <group onClick={handleClick}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={isMobile ? 0.03 : 0.08}
        // In Venator.tsx, update the primitive position
        position={[isMobile ? 2.5 : 8, 0, 0]}
      />
      <Html position={position as [number, number, number]} style={{ cursor: 'pointer' }}>
        <div onClick={handleClick}>
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap mb-2">
            Stepperly
          </div>
          <PulsingCircle x={0} y={0} />
        </div>
      </Html>
    </group>
  )
}
export default Venator