"use client"

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <main className="min-h-screen relative">
      <Header />
      <div className="stars" id="stars"></div>
      
      <div className="flex items-center justify-center min-h-screen pt-20 pb-20">
        <div className="w-full max-w-2xl mx-4">
          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-8 shadow-2xl">
            <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-wider
              [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%)]">
              Contact Me
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                    placeholder-white/30"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                    placeholder-white/30"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white/80 mb-2">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                    placeholder-white/30 min-h-[150px]"
                  placeholder="Your message"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-blue-500/80 hover:bg-blue-600/80 
                  text-white font-semibold transition-colors duration-200 
                  backdrop-blur-sm shadow-lg hover:shadow-blue-500/25"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
                <div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p>Basel, Switzerland</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:contact@bonimakeit.ch" className="hover:text-white transition-colors">
                    contact@bonimakeit.ch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}