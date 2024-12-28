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
      <main className="relative min-h-screen">
        <div className="stars" id="stars"></div>
        <div className="w-full relative z-10 min-h-screen">
          <section className="w-full min-h-screen mx-auto flex items-center justify-center">
              <R2 />
          </section>
          <section className="w-full h-screen flex items-center flex-row justify-between bg-[url('/images/tatooinebig.jpg')] bg-cover bg-center bg-no-repeat">
      <C3PO />
      <div className="w-1/3">
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