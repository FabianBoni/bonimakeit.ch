'use client'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Html } from '@react-three/drei'
import { useEffect, useState } from 'react'

function Model() {
  useGLTF.preload("/r2d2/scene.gltf")
  const { scene } = useGLTF("/r2d2/scene.gltf", true)
  const [isMobile, setIsMobile] = useState(false)
  const [message, setMessage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const messages = [
    "Oh hi, you must be a new visitor! Master Fabian is here to greet you!",
    "Hi, you just met my friend R2D2. He is a bit shy, but he's always happy to meet new people!",
    "Have fun on my portfolio!"
  ]
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  return (
    <group>
      <primitive 
        object={scene} 
        scale={isMobile ? 1.5 : 3.5} 
      />
      <Html
        position={[isMobile ? 2 : 4, isMobile ? 1 : 2, 0]}
        className="pointer-events-none"
        center
        distanceFactor={isMobile ? 10 : 15}
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
    <div className="w-full h-screen inset-0 flex items-center justify-center">
      <Canvas
        camera={{ 
          position: isMobile ? [5, 5, 5] : [10, 10, 10], 
          fov: isMobile ? 50 : 35 
        }}
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