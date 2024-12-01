'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Html } from '@react-three/drei'
import { Howl } from 'howler'
import { useEffect, useState } from 'react'

function Model() {
  const [message, setMessage] = useState('')
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const messages = [
    "Oh hi, you must be a new visitor! Master Fabian is here to greet you!",
    "Hi, you just met my friend R2D2. He is a bit shy, but he's always happy to meet new people!",
    "Have fun on my portfolio!"
  ]
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < messages[messageIndex].length) {
      const timer = setTimeout(() => {
        setMessage(prev => prev + messages[messageIndex][currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        if (messageIndex < messages.length - 1) {
          setMessage('')
          setCurrentIndex(0)
          setMessageIndex(prev => prev + 1)
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, messageIndex])

  const { scene } = useGLTF("/r2d2/scene.gltf", true)
  return (
    <group>
      <primitive object={scene} scale={2.5} />
      <Html
        position={[4, 2, 0]}  // Moved more to the right
        className="pointer-events-none"
        center
        distanceFactor={15}
      >
        <div className="hologram-bubble-container">
          <div className="hologram-bubble">
            {message}
          </div>
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
        src: [`/sounds/${soundFiles[randomIndex]}`],
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