'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Html } from '@react-three/drei'
import { Howl } from 'howler'
import { useEffect, useState } from 'react'

function Model() {
  const { scene } = useGLTF("/r2d2/scene.gltf", true)
  return (
    <group>
      <primitive object={scene} scale={2.5} />
      <Html
        position={[2, 4, 0]}
        className="pointer-events-none"
        center
        distanceFactor={15}
      >
        <div className="hologram-bubble">
          Hello bonimakeit.ch
        </div>
      </Html>
    </group>
  )
}

const R2 = () => {
  const [soundFiles, setSoundFiles] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/sounds')
      .then(response => response.json())
      .then(files => setSoundFiles(files))
  }, [])

  useEffect(() => {
    if (soundFiles.length === 0) return

    const playRandomSound = () => {
      const randomIndex = Math.floor(Math.random() * soundFiles.length)
      const sound = new Howl({
        src: [`/r2d2/sounds/${soundFiles[randomIndex]}`],
        volume: 0.5,
        loop: false
      })
      sound.play()
    }

    const interval = setInterval(playRandomSound, 10000)
    playRandomSound()

    return () => clearInterval(interval)
  }, [soundFiles])

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen w-screen">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 35 }}
        style={{ background: 'transparent' }}
      >
        <Environment preset="city" />
        <ambientLight intensity={5} />
        <spotLight 
          position={[0, 15, 0]} 
          angle={0.7} 
          penumbra={1} 
          intensity={8} 
          castShadow
        />
        <directionalLight position={[5, 5, 5]} intensity={3} />
        <pointLight position={[10, 10, 10]} intensity={4} />
        <pointLight position={[-10, -10, -10]} intensity={3} />
        <Model />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

export default R2