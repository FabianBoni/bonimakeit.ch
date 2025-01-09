"use client"

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useParams } from 'next/navigation';

export default function BlogPost() {
  const params = useParams();

  return (
    <main className="min-h-screen relative bg-black">
      <Header />
      <div className="stars" id="stars"></div>
      
      <article className="pt-32 pb-20 px-4 max-w-4xl mx-auto relative z-10">
        <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-8">
          <div className="mb-8">
            <img 
              src="/images/space.jpg" 
              alt="Blog Post Header" 
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          
          <div className="prose prose-invert max-w-none">
            <h1 className="text-4xl font-bold text-white mb-4">
              Building Star Wars-Inspired Web Experiences
            </h1>
            
            <div className="flex items-center gap-4 text-white/60 mb-8">
              <time>January 15, 2024</time>
              <span>•</span>
              <span>Web Development</span>
            </div>
            
            <div className="text-white/80 space-y-6">
              <p>Your blog content goes here...</p>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}