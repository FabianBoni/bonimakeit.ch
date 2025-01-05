"use client"

import { useEffect, useState } from "react";
import R2 from "./components/R2";
import StarDestroyer from "./components/StarDestroyer";
import DeathStar from "./components/DeathStar";
import Venator from "./components/Venator";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Interdictor from "./components/Interdictor";

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isTransitioning) return;

      if (e.deltaY > 0) {
        if (currentSection < 2) {
          setIsTransitioning(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => {
            document.getElementById(`section${currentSection + 2}`)?.scrollIntoView({ behavior: 'smooth' });
            setIsTransitioning(false);
          }, 1000);
        }
      } else if (e.deltaY < 0) {
        if (currentSection > 0) {
          setIsTransitioning(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => {
            document.getElementById(`section${currentSection}`)?.scrollIntoView({ behavior: 'smooth' });
            setIsTransitioning(false);
          }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection, isTransitioning]);

  // Stars effect remains unchanged
  useEffect(() => {
    const numberOfStars: number = 200;
    const container: HTMLElement | null = document.getElementById('stars');
    const stars: HTMLDivElement[] = [];

    if (container) {
      for (let i = 0; i < numberOfStars; i++) {
        const star: HTMLDivElement = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        container.appendChild(star);
        stars.push(star);
      }

      const animateStars = (): void => {
        stars.forEach((star: HTMLDivElement) => {
          if (Math.random() < 0.1) {
            const targetOpacity: string = star.style.opacity === '0' ? '1' : '0';
            star.style.opacity = targetOpacity;
            star.style.transition = `opacity ${Math.random() * 2 + 0.5}s`;
          }
        });
      };

      const intervalId: NodeJS.Timeout = setInterval(animateStars, 100);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <main className="relative h-screen overflow-hidden">
      <div className="stars" id="stars"></div>
      <div className="w-full relative z-10">
        <section
          id="section1"
          className={`scene-transition w-full mt-[100px] h-screen mx-auto flex items-center justify-center ${currentSection === 1 ? 'transitioning' : ''}`}
        >
          <div className="!absolute top-1/2 translate-y-[-35%] scene">
            <R2 />
          </div>
          <div className="scene-mask"></div>
        </section>
        <section
          id="section2"
          className={`scene-transition w-full h-screen flex items-center flex-row justify-between bg-[url('/images/tatooinebig.jpg')] bg-cover bg-center bg-no-repeat ${currentSection === 0 ? 'transitioning' : ''}`}
        >
          <div className="scene">
            <StarDestroyer />
            <div className="absolute flex flex-row items-center gap-12 !top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <div>
                <img src="/images/fabian-boni.png" alt="Fabian Boni" width={1200} height={1200} className="rounded-full border-4 border-white/20" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-6 text-white/90">About Me</h1>
                <div className="space-y-4 text-white/80">
                  <p className="leading-relaxed">
                    Hi, my name is Fabian Boni, and I'm a developer and aspiring data scientist based in Basel, Switzerland.
                  </p>
                  <p className="leading-relaxed">
                    I have a strong background in application development, data science, and system engineering, with a focus on designing innovative and user-friendly solutions. My technical skills include Python, Java, JavaScript, React, R, Lua, and C++, along with expertise in the latest web technologies. I particularly enjoy working at the intersection of front-end development, data analysis, and AI-based tools, creating solutions that drive efficiency and empower users.
                  </p>
                  <p className="leading-relaxed">
                    Currently, I'm studying Data Science at the University of Applied Sciences and Arts Northwestern Switzerland (FHNW) while managing innovative projects for the Canton of Basel-Stadt. These projects span areas such as AI-based applications, Virtual Reality (VR), and Augmented Reality (AR), allowing me to combine creativity with technical skills to deliver impactful solutions.
                  </p>
                  <p className="leading-relaxed">
                    Outside of work and academics, I enjoy 3D printing and designing technical devices like drones, continuously exploring new ways to push the boundaries of technology. My entrepreneurial mindset and problem-solving approach drive me to take on challenges that require both technical expertise and creative thinking.
                  </p>
                  <p className="leading-relaxed">
                    I am currently looking for opportunities where I can apply my skills in data science, software development, and AI tooling to create innovative solutions and contribute to meaningful projects. I am particularly interested in roles that involve building intuitive, data-driven tools or platforms that have a real-world impact.
                  </p>
                  <p className="leading-relaxed">
                    I look forward to bringing my passion for technology, creativity, and problem-solving to a forward-thinking company where I can grow and contribute to exciting advancements in the field.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="scene-mask"></div>
        </section>
        <section
          id="section3"
          className={`scene-transition w-full h-screen flex items-center flex-row justify-between bg-[url('/images/space.jpg')] bg-cover bg-center bg-no-repeat ${currentSection === 1 ? 'transitioning' : ''}`}
        >
          <div className="scene">
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
                <DeathStar />
                <Venator />
                <Interdictor />
                <OrbitControls enableZoom={false} enableRotate={false} />
              </Canvas>
            </div>
            <div className="w-1/3 p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <h1 className="text-4xl font-bold mb-6 text-white/90">Projects</h1>
              <div className="space-y-4 text-white/80">
                <div className="project-card">
                  <h2 className="text-2xl font-semibold mb-2">Project 1</h2>
                  <p className="leading-relaxed">Description of your amazing project</p>
                </div>
                <div className="project-card">
                  <h2 className="text-2xl font-semibold mb-2">Project 2</h2>
                  <p className="leading-relaxed">Description of another cool project</p>
                </div>
                <div className="project-card">
                  <h2 className="text-2xl font-semibold mb-2">Project 3</h2>
                  <p className="leading-relaxed">Description of your next project</p>
                </div>
              </div>
            </div>
          </div>
          <div className="scene-mask"></div>
        </section>
      </div>
    </main>
  );
}
export default Home;