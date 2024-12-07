"use client"

import { useEffect } from "react";
import R2 from "./components/R2";
import C3PO from "./components/c3po";

const Home = () => {
  useEffect(() => {
    const numberOfStars: number = 200;
    const container: HTMLElement | null = document.getElementById('stars');
    const stars: HTMLDivElement[] = [];

    if (container) {
      // Create stars
      for (let i = 0; i < numberOfStars; i++) {
        const star: HTMLDivElement = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        container.appendChild(star);
        stars.push(star);
      }

      // Animate stars
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
    <main className="min-h-screen relative">
      <div className="stars" id="stars"></div>
      <div className="container flex flex-col justify-start mx-auto relative z-10">
        <section>
          <R2 />
        </section>
        <section className="about-me flex flex-row bg-black/50 backdrop-blur-sm rounded-lg p-8 text-white max-w-2xl mx-auto">
          <C3PO />
          <div>
            <h1 className="text-4xl font-bold mb-6">About Me</h1>
            <div className="space-y-4">
              <p>
                Hi, I'm [Your Name]! I'm a passionate developer based in [Location].
              </p>
              <p>
                With expertise in [Your Skills], I love creating innovative solutions
                and bringing ideas to life through code.
              </p>
              <p>
                When I'm not coding, you can find me [Your Hobbies/Interests].
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;