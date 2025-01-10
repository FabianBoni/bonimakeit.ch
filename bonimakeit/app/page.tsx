"use client"

import { useEffect, useState, useRef, Suspense } from "react"
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa"
import dynamic from 'next/dynamic'
import Header from "./components/Header"
import Footer from './components/Footer'
import MobileMenu from "./components/MobileMenu"
import AboutContent from './components/AboutContent'
import CreditsContent from './components/CreditsContent'
import ProjectMobileView from './components/ProjectMobileView';

// Lazy load 3D components
const R2 = dynamic(() => import("./components/R2"), {
  loading: () => <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>,
  ssr: false
})

const StarDestroyer = dynamic(() => import("./components/StarDestroyer"), {
  ssr: false
})

const Scene3D = dynamic(() => import("./components/Scene3D"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
})

const SideNav = ({ currentSection, setCurrentSection }: { currentSection: number, setCurrentSection: (section: number) => void }) => {
  const sections = [
    { id: 1, name: "Welcome", icon: "🌟" },
    { id: 2, name: "About Me", icon: "👨‍💻" },
    { id: 3, name: "Projects", icon: "🚀" },
    { id: 4, name: "Credits", icon: "✨" },
  ]
  return (
    <nav className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`group flex items-center cursor-pointer`}
            onClick={() => {
              setCurrentSection(section.id - 1)
              document.getElementById(`section${section.id}`)?.scrollIntoView({ behavior: 'smooth' })
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
  )
}

const SoundControl = ({ isMuted, toggleMute }: { isMuted: boolean; toggleMute: () => void }) => (
  <button
    onClick={toggleMute}
    className="relative mx-4 md:mx-[unset] md:fixed md:right-8 md:top-24 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full backdrop-blur-md bg-white/5 border border-white/20 
    flex items-center justify-center transition-all duration-300 hover:bg-white/10"
  >
    {isMuted ? <FaVolumeMute className="text-white text-sm md:text-xl" /> : <FaVolumeUp className="text-white text-sm md:text-xl" />}
  </button>
)

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [sounds, setSounds] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    const throttledResize = throttle(checkMobile, 200)
    window.addEventListener('resize', throttledResize)
    return () => window.removeEventListener('resize', throttledResize)
  }, [])

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => { document.body.style.overflowY = '' }
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  useEffect(() => {
    fetch('/api/sounds')
      .then(res => res.json())
      .then(data => setSounds(data))
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (currentSection === 0 && sounds.length > 0 && !isMuted) {
      const playRandomSound = () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
        const randomSound = sounds[Math.floor(Math.random() * sounds.length)]
        audioRef.current = new Audio(`/sounds/${randomSound}`)
        audioRef.current.volume = 0.5
        audioRef.current.muted = isMuted
        audioRef.current.play()
        timeoutId = setTimeout(playRandomSound, Math.random() * (10000 - 5000) + 5000)
      }
      playRandomSound()
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [currentSection, sounds, isMuted])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0 && currentSection < 3) {
        setCurrentSection(prev => prev + 1)
        document.getElementById(`section${currentSection + 2}`)?.scrollIntoView({ behavior: 'smooth' })
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1)
        document.getElementById(`section${currentSection}`)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSection])

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
      <div className="flex items-center fixed top-0 left-0 h-[50px] w-full z-50 md:backdrop-blur-none backdrop-blur-md">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-white text-2xl absolute right-4"
        >
          ☰
        </button>
        <SoundControl isMuted={isMuted} toggleMute={toggleMute} />
      </div>
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
        <main className="relative h-screen overflow-hidden">
          <SideNav currentSection={currentSection} setCurrentSection={setCurrentSection} />
          <div className="stars absolute h-full w-full z-10" id="stars"></div>
          <div className="w-full relative z-10">
            {/* Section 1 - Welcome */}
            <section id="section1" className="scene-transition w-full mt-[100px] h-screen mx-auto flex items-center justify-center">
            <div className="absolute w-full text-center md:w-[unset] md:mx-12 top-48 md:top-64 left-1/2 transform -translate-x-1/2 z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%),_0_4px_0_rgb(255_255_255_/_10%),_0_5px_0_rgb(255_255_255_/_5%)]">
                  WELCOME ON MY PORTFOLIO
                </h1>
              </div>
              <div className="!absolute top-1/2 translate-y-[-50%] md:translate-y-[-35%] scene">
                <R2 />
              </div>
              <div className="scene-mask"></div>
            </section>

            {/* Section 2 - About Me */}
            <section id="section2" className="scene-transition w-full h-screen flex items-center flex-row justify-between bg-[url('/images/tatooinebig.jpg')] bg-cover bg-center bg-no-repeat">
              <div className="absolute w-full text-center md:w-[unset] md:mx-12 top-24 md:top-48 left-1/2 transform -translate-x-1/2 z-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%),_0_4px_0_rgb(255_255_255_/_10%),_0_5px_0_rgb(255_255_255_/_5%)]">
                  ABOUT ME
                </h1>
              </div>
              <div className="scene top-12">
                <StarDestroyer />
                <AboutContent />
              </div>
              <div className="scene-mask"></div>
            </section>

            {/* Section 3 - Projects */}
            <section id="section3" className="scene-transition w-full h-screen pt-24 md:pt-48 flex flex-col items-center justify-between bg-[url('/images/space.jpg')] bg-cover bg-top bg-no-repeat">
                {isMobile && currentSection == 3 && (
                        <div className="fixed top-0 w-full h-full bg-black opacity-50" />
                )}
                <h1 className="w-full relative z-10 text-4xl text-center md:text-6xl font-bold text-white tracking-wider [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%),_0_4px_0_rgb(255_255_255_/_10%),_0_5px_0_rgb(255_255_255_/_5%)]">
                  PROJECTS
                </h1>
              <div className="scene">
                {isMobile ? (
                  <ProjectMobileView />
                ) : (
                  <Scene3D isMobile={isMobile} />
                )}
              </div>
              <div className="scene-mask"></div>
            </section>

            {/* Section 4 - Credits */}
            <section id="section4" className="scene-transition w-full h-screen flex items-center flex-row justify-between bg-[url('/images/space.jpg')] bg-cover bg-bottom bg-no-repeat">
              <CreditsContent />
            </section>
          </div>
          <Footer />
          <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </main>
      </Suspense>
    </>
  )}

function throttle(func: Function, limit: number) {
  let inThrottle: boolean
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}