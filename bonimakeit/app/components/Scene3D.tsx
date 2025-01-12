"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import dynamic from 'next/dynamic'

const DeathStar = dynamic(() => import("./DeathStar"), { ssr: false })
const Venator = dynamic(() => import("./Venator"), { ssr: false })
const Interdictor = dynamic(() => import("./Interdictor"), { ssr: false })
const Arquitens = dynamic(() => import("./Arquitens"), { ssr: false })

export default function Scene3D({ isMobile }: { isMobile: boolean }) {
  return (
    <Canvas
      camera={{
        position: isMobile ? [0, 0, 10] : [0, 0, 15],
        fov: isMobile ? 75 : 45
      }}
      style={{ background: 'transparent' }}
      className="touch-none"
    >
      <Environment preset="sunset" />
      <ambientLight intensity={0.1} />
      <spotLight
        position={[15, 10, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        castShadow
        color="#ffa07a"
      />
      <group scale={isMobile ? 0.9 : 1.25}>
        <DeathStar />
        <Venator />
        <Interdictor />
        <Arquitens />
      </group>
      <OrbitControls enableZoom={false} enableRotate={false} />
    </Canvas>
  )
}
