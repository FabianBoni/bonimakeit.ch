'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function Model() {
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
            position={[5, 0, 0]}
        />
    )
}

const DeathStar = () => {
    return (
        <div className="w-full inset-0 flex flex-col items-center justify-center h-screen">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                style={{ background: 'transparent' }}
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
                <directionalLight
                    position={[15, 10, -5]}
                    intensity={0.5}
                    color="#ff8c00"
                />
                <pointLight
                    position={[15, 10, -5]}
                    intensity={0.6}
                    color="#fff5e6"
                />
                <Model />
                <OrbitControls enableZoom={false} enableRotate={false} />
            </Canvas>
        </div>
    )
}

export default DeathStar