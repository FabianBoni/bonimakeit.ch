"use client"

import { useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import dynamic from 'next/dynamic'

const DeathStar = dynamic(() => import("./DeathStar"), { 
  ssr: false,
  loading: () => null 
})

const Venator = dynamic(() => import("./Venator"), { 
  ssr: false,
  loading: () => null 
})

const Interdictor = dynamic(() => import("./Interdictor"), { 
  ssr: false,
  loading: () => null 
})

const Arquitens = dynamic(() => import("./Arquitens"), { 
  ssr: false,
  loading: () => null 
})

export default function Scene3D({ isMobile }: { isMobile: boolean }) {
  const [isLoading, setIsLoading] = useState(true)
  const [devicePerformance, setDevicePerformance] = useState('high')

  useEffect(() => {
    const memory = (navigator as any).deviceMemory
    if (memory && memory < 4) {
      setDevicePerformance('low')
    } else if (isMobile) {
      setDevicePerformance('medium')
    }
    setIsLoading(false)
  }, [isMobile])

  return (
    <Canvas
      camera={{
        position: isMobile ? [0, 0, 10] : [0, 0, 15],
        fov: isMobile ? 75 : 45
      }}
      style={{ background: 'transparent' }}
      className="touch-none"
      dpr={devicePerformance === 'low' ? 1 : [1, 2]}
    >
      <Environment preset="sunset" />
      <ambientLight intensity={0.1} />
      <spotLight
        position={[15, 10, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow={devicePerformance !== 'low'}
        color="#ffa07a"
      />
      <group scale={isMobile ? 0.9 : 1}>
        {!isLoading && (
          <>
            <DeathStar />
            <Venator />
            <Interdictor />
            <Arquitens />
          </>
        )}
      </group>
      <OrbitControls 
        enableZoom={false} 
        enableRotate={false}
        enableDamping={devicePerformance !== 'low'}
      />
    </Canvas>
  )
}