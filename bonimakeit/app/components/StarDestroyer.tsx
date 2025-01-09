'use client'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF("/star_destroyer/scene.gltf", true)
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
    const orbitRadius = isMobile ? 5 : 10
    
    modelRef.current.position.x = Math.cos(time * 0.05) * orbitRadius
    modelRef.current.position.z = Math.sin(time * 0.05) * orbitRadius
    modelRef.current.position.y = Math.sin(time * 0.001) * (isMobile ? 1 : 2)
    
    modelRef.current.rotation.y = -time * 0.05
    modelRef.current.rotation.z = Math.sin(time * 0.001) * (isMobile ? 0.025 : 0.05)
  })

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      scale={isMobile ? 0.0025 : 0.005} 
      position={[0, 0, 0]} 
    />
  )
}

const StarDestroyer = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="w-full inset-0 flex flex-col items-center justify-center h-screen">
      <Canvas
        camera={{ position: isMobile ? [0, 3, 8] : [0, 5, 15], fov: isMobile ? 75 : 45 }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
        />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.5}
          color="#b6ceff"
        />
        <pointLight
          position={[-5, -5, -5]}
          intensity={0.2}
          color="#ff9c9c"
        />
        <Model />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  )
}

export default StarDestroyer