'use client'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

export function DeathStar() {
  const { scene } = useGLTF("/death_star/scene.gltf", true)
  const modelRef = useRef<THREE.Group>(null!)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    modelRef.current.rotation.y = time * 0.009
  })

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={isMobile ? 0.1 : 0.2} 
      position={[isMobile ? 0 : 5, 0, isMobile ? 0 : -5]} 
    />
  )
}

export default DeathStar