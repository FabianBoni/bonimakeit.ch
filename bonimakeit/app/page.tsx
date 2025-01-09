"use client"

import { useEffect, useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import R2 from "./components/R2";
import StarDestroyer from "./components/StarDestroyer";
import DeathStar from "./components/DeathStar";
import Venator from "./components/Venator";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Interdictor from "./components/Interdictor";
import Header from "./components/Header";
import Arquitens from "./components/Arquitens";
import Footer from './components/Footer';

const SideNav = ({ currentSection, setCurrentSection }: { currentSection: number, setCurrentSection: (section: number) => void }) => {
  const sections = [
    { id: 1, name: "Welcome", icon: "🌟" },
    { id: 2, name: "About Me", icon: "👨‍💻" },
    { id: 3, name: "Projects", icon: "🚀" },
    { id: 4, name: "Credits", icon: "✨" },
  ];
  return (
    <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`group flex items-center cursor-pointer`}
            onClick={() => {
              setCurrentSection(section.id - 1);
              document.getElementById(`section${section.id}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border 
              transition-all duration-300 ${currentSection === section.id - 1
                  ? "bg-white/20 border-white scale-110"
                  : "bg-white/5 border-white/20 hover:bg-white/10"
                }`}
            >
              <span className="text-xl">{section.icon}</span>
            </div>
            <div
              className={`ml-4 py-2 px-4 rounded-lg backdrop-blur-md transition-all duration-300 
              ${currentSection === section.id - 1
                  ? "opacity-100 translate-x-0 bg-white/20"
                  : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 bg-white/5"
                }`}
            >
              <span className="text-white whitespace-nowrap">{section.name}</span>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

const MobileMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => {
  return (
    <div className={`fixed inset-0 bg-black/90 backdrop-blur-md z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-white text-2xl">
        ✕
      </button>
      <nav className="flex flex-col items-center justify-center h-full">
        <div className="space-y-8">
          {['Welcome', 'About Me', 'Projects', 'Credits'].map((item, index) => (
            <div
              key={item}
              className="text-white text-2xl text-center"
              onClick={() => {
                document.getElementById(`section${index + 1}`)?.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

const SoundControl = ({ isMuted, toggleMute }: { isMuted: boolean; toggleMute: () => void }) => (
  <button
    onClick={toggleMute}
    className="fixed right-8 top-24 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/20 
    flex items-center justify-center transition-all duration-300 hover:bg-white/10"
  >
    {isMuted ? <FaVolumeMute className="text-white text-xl" /> : <FaVolumeUp className="text-white text-xl" />}
  </button>
);

const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sounds, setSounds] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    fetch('/api/sounds')
      .then(res => res.json())
      .then(data => setSounds(data));
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentSection === 0 && sounds.length > 0 && !isMuted) {
      const playRandomSound = () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
        audioRef.current = new Audio(`/sounds/${randomSound}`);
        audioRef.current.volume = 0.5;
        audioRef.current.muted = isMuted;
        audioRef.current.play();

        const randomDelay = Math.floor(Math.random() * (10000 - 5000) + 5000);
        timeoutId = setTimeout(playRandomSound, randomDelay);
      };

      playRandomSound();
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentSection, sounds, isMuted]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        if (currentSection < 3) {
          setCurrentSection(prev => prev + 1);
          document.getElementById(`section${currentSection + 2}`)?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.deltaY < 0) {
        if (currentSection > 0) {
          setCurrentSection(prev => prev - 1);
          document.getElementById(`section${currentSection}`)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSection]);

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
    <>
      <Header />
      <div className="md:hidden flex items-center fixed top-0 left-0 h-[50px] w-full z-50 backdrop-blur-md">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-white text-2xl absolute right-4"
        >
          ☰
        </button>
      </div>
      <main className="relative h-screen overflow-hidden">
        <SideNav currentSection={currentSection} setCurrentSection={setCurrentSection} />
        <SoundControl isMuted={isMuted} toggleMute={toggleMute} />
        <div className="stars" id="stars"></div>
        <div className="w-full relative z-10">
          <section
            id="section1"
            className={`scene-transition w-full mt-[100px] h-screen mx-auto flex items-center justify-center`}
          >
            <div className="!absolute top-1/2 translate-y-[-35%] scene">
              <R2 />
            </div>
            <div className="scene-mask"></div>
          </section>
          <section
            id="section2"
            className={`scene-transition w-full h-screen flex items-center flex-row justify-between bg-[url('/images/tatooinebig.jpg')] bg-cover bg-center bg-no-repeat`}
          >
            <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-10">
              <h1 className="text-6xl font-bold text-white tracking-wider 
                 [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%),_0_4px_0_rgb(255_255_255_/_10%),_0_5px_0_rgb(255_255_255_/_5%)]">
                ABOUT ME
              </h1>
            </div>
            <div className="scene">
              <StarDestroyer />
              <div className="absolute flex flex-row items-center gap-12 !top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
                <div>
                  <img src="/images/fabian-boni.png" alt="Fabian Boni" width={1200} height={1200} className="rounded-full border-4 border-white/20" />
                </div>
                <div>
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
            className={`scene-transition w-full h-screen flex items-center flex-row justify-between bg-[url('/images/space.jpg')] bg-cover bg-top bg-no-repeat`}
          >
            <div className="absolute w-full h-full bg-black opacity-35" />
            <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-10">
              <h1 className="text-6xl font-bold text-white tracking-wider 
                 [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%),_0_4px_0_rgb(255_255_255_/_10%),_0_5px_0_rgb(255_255_255_/_5%)]">
                PROJECTS
              </h1>
            </div>
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
                  <Arquitens />
                  <OrbitControls enableZoom={false} enableRotate={false} />
                </Canvas>
              </div>
            </div>
            <div className="scene-mask"></div>
          </section>
          <section
            id="section4"
            className={`scene-transition w-full h-screen flex items-center flex-row justify-between bg-[url('/images/space.jpg')] bg-cover bg-bottom bg-no-repeat`}
          >
            <div className="absolute w-full h-full bg-black opacity-50" />
            <div className="absolute top-48 left-1/2 transform -translate-x-1/2 z-10">
              <h1 className="text-6xl font-bold text-white tracking-wider 
    [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%),_0_4px_0_rgb(255_255_255_/_10%),_0_5px_0_rgb(255_255_255_/_5%)]">
                CREDITS
              </h1>
            </div>
            <div className="absolute flex flex-col items-center gap-8 !top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <div className="space-y-4 text-white/80">
                <h2 className="text-2xl font-bold">3D Models</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>R2-D2 by <a href="https://sketchfab.com/3d-models/r2d2-c3b6db4c7a684d1d8009ddb7f5c8e0c9" className="text-blue-300 hover:text-blue-400 underline">Skandal</a> - Licensed under Creative Commons Attribution</li>
                  <li>Star Destroyer by <a href="https://sketchfab.com/3d-models/star-wars-imperial-class-star-destroyer-d6cdd00b0d2f4e7eb38d55c4d5d04af4" className="text-blue-300 hover:text-blue-400 underline">TheSpaceshipper</a> - Licensed under Creative Commons Attribution</li>
                  <li>Death Star by <a href="https://sketchfab.com/3d-models/death-star-star-wars-2d25e8c9c19744a2b37e6e99f2a0d60f" className="text-blue-300 hover:text-blue-400 underline">Skandal</a> - Licensed under Creative Commons Attribution</li>
                  <li>Venator-class Star Destroyer by <a href="https://sketchfab.com/3d-models/star-wars-venator-class-star-destroyer-c935b6dd68e14fd0b6178c001843869d" className="text-blue-300 hover:text-blue-400 underline">TheSpaceshipper</a> - Licensed under Creative Commons Attribution</li>
                  <li>Interdictor-class Star Destroyer by <a href="https://sketchfab.com/3d-models/star-wars-interdictor-class-star-destroyer-d6cdd00b0d2f4e7eb38d55c4d5d04af4" className="text-blue-300 hover:text-blue-400 underline">TheSpaceshipper</a> - Licensed under Creative Commons Attribution</li>
                  <li>Arquitens-class Light Cruiser by <a href="https://sketchfab.com/3d-models/star-wars-arquitens-class-light-cruiser-d6cdd00b0d2f4e7eb38d55c4d5d04af4" className="text-blue-300 hover:text-blue-400 underline">TheSpaceshipper</a> - Licensed under Creative Commons Attribution</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      </main>
    </>
  );
}

export default Home;