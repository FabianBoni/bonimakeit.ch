'use client'
import { Html } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import PulsingCircle from './PulsingCircle'
import { useRouter } from 'next/navigation'

interface InterdictorProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function Interdictor({ position = [0, 0, 0], rotation = [0, 0, 0] }: InterdictorProps) {
  useGLTF.preload("/star_destroyer_1/scene.gltf");
  const { scene } = useGLTF("/star_destroyer_1/scene.gltf", true)
  const modelRef = useRef<THREE.Group>(null!)
  const [modelPosition, setModelPosition] = useState<[number, number, number]>(position)
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
    router.push('/projects/autotrade')
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const orbitRadius = isMobile ? 2.5 : 5

    const x = Math.cos(time * 0.005) * -orbitRadius + position[0]
    const z = Math.sin(time * 0.005) * orbitRadius + position[2]
    const y = Math.sin(time * 0.0001) * (isMobile ? -20 : -2) + position[1]

    modelRef.current.position.x = x
    modelRef.current.position.z = z
    modelRef.current.position.y = y

    modelRef.current.rotation.y = -time * 0.005 + rotation[1]
    modelRef.current.rotation.z = Math.sin(time * 0.0001) * (isMobile ? 0.025 : 0.05) + rotation[2]

    setModelPosition([x, y, z])
  })

  return (
    <group onClick={handleClick}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.01}
        position={position}
        rotation={rotation}
      />
      <Html position={modelPosition} style={{ cursor: 'pointer' }}>
        <div onClick={handleClick}>
          <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap mb-2">
            Autotrade
          </div>
          <PulsingCircle x={0} y={0} />
        </div>
      </Html>
    </group>
  )
}

export default Interdictor