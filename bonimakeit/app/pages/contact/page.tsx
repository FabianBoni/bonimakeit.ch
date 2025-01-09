"use client"

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <main className="min-h-screen relative bg-black">
      <Header />
      <div className="w-full h-full absolute z-10 stars" id="stars"></div>

      <div className="flex items-center justify-center min-h-screen pt-20 pb-20">
        <div className="w-full relative z-20 max-w-6xl mx-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form Section */}
          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-8 tracking-wider
              [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%)]">
              Get in Touch
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2 text-lg">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                    placeholder-white/30 transition-all duration-300 hover:bg-white/15"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/80 mb-2 text-lg">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                    placeholder-white/30 transition-all duration-300 hover:bg-white/15"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/80 mb-2 text-lg">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                    placeholder-white/30 transition-all duration-300 hover:bg-white/15 min-h-[200px] resize-none"
                  placeholder="Your message"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-lg bg-blue-500/80 hover:bg-blue-600/80 
                  text-white font-semibold transition-all duration-300 
                  backdrop-blur-sm shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-8">
            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-wider
                [text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-white/80 group">
                  <FaMapMarkerAlt className="text-2xl text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Location</h3>
                    <p>Basel, Switzerland</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-white/80 group">
                  <FaEnvelope className="text-2xl text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Email</h3>
                    <a href="mailto:fabian.boni@bonimakeit.ch"
                      className="hover:text-blue-400 transition-colors">
                      fabian.boni@bonimakeit.ch
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 tracking-wider
                [text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
                Social Links
              </h2>

              <div className="flex space-x-6">
                <a href="https://github.com/yourusername"
                  className="text-3xl text-white/80 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/yourusername"
                  className="text-3xl text-white/80 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}