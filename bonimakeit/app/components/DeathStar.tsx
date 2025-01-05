'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export function DeathStar() {
    const { scene } = useGLTF("/death_star/scene.gltf", true)
    const modelRef = useRef<THREE.Group>(null!)
  
    useFrame(({ clock }) => {
      const time = clock.getElapsedTime()
      modelRef.current.rotation.y = time * 0.009
    })
  
    return (
      <primitive 
        ref={modelRef} 
        object={scene} 
        scale={0.2} 
        position={[5, 0, -5]} 
      />
    )
  }
  
  export default DeathStar