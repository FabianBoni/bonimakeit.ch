'use client'
import { Html } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import PulsingCircle from './PulsingCircle'
import { useRouter } from 'next/navigation'

export function Venator() {
  const { scene } = useGLTF("/venator/scene.gltf", true)
  const modelRef = useRef<THREE.Group>(null!)
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0])

  const router = useRouter()

  const handleClick = () => {
    router.push('/projects/stepperly')
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    const x = Math.cos(time * 0.005) * 5
    const z = Math.sin(time * 0.005) * 5
    const y = Math.sin(time * 0.0001) * 2

    modelRef.current.position.x = x
    modelRef.current.position.z = z
    modelRef.current.position.y = y

    modelRef.current.rotation.y = -time * 0.005
    modelRef.current.rotation.z = Math.sin(time * 0.0001) * 0.05

    setPosition([x, y, z])
  })

  return (
    <group onClick={handleClick}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.2}
        position={[5, 0, 0]}
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