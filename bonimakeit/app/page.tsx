"use client"

import { useEffect, useState } from "react";
import R2 from "./components/R2";
import StarDestroyer from "./components/StarDestroyer";
import DeathStar from "./components/DeathStar";

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
            <div className="absolute !top-1/2 -translate-y-1/2 right-[25%] p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
              <h1 className="text-4xl font-bold mb-6 text-white/90">About Me</h1>
              <div className="space-y-4 text-white/80">
                <p className="leading-relaxed">
                  Hi, I'm [Your Name]! I'm a passionate developer based in [Location].
                </p>
                <p className="leading-relaxed">
                  With expertise in [Your Skills], I love creating innovative solutions
                  and bringing ideas to life through code.
                </p>
                <p className="leading-relaxed">
                  When I'm not coding, you can find me [Your Hobbies/Interests].
                </p>
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
            <DeathStar />
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