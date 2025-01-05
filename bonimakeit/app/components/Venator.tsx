'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function Venator() {
    const { scene } = useGLTF("/venator/scene.gltf", true)
    const modelRef = useRef<THREE.Group>(null!)
  
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()
        
        modelRef.current.position.x = Math.cos(time * 0.005) * 10
        modelRef.current.position.z = Math.sin(time * 0.005) * 10
        modelRef.current.position.y = Math.sin(time * 0.0001) * 2
        
        modelRef.current.rotation.y = -time * 0.005
        modelRef.current.rotation.z = Math.sin(time * 0.0001) * 0.05
    })         
  
    return (
      <primitive 
        ref={modelRef} 
        object={scene} 
        scale={0.2} 
        position={[5, 0, 0]} 
      />
    )
  }


  export default Venator
  