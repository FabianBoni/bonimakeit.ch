"use client"

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Star Wars-Inspired Web Experiences",
    excerpt: "Exploring the intersection of web development and Star Wars aesthetics using Three.js and React",
    date: "2024-01-15",
    category: "Web Development",
    imageUrl: "/images/space.jpg"
  },
  {
    id: 2,
    title: "Data Science in the Digital Age",
    excerpt: "Insights from my journey studying Data Science at FHNW and real-world applications",
    date: "2024-01-10",
    category: "Data Science",
    imageUrl: "/images/tatooinebig.jpg"
  },
  // Add more blog posts as needed
];

export default function Blog() {
  return (
    <main className="min-h-screen relative bg-black">
      <Header />
      <div className="stars" id="stars"></div>
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto relative z-10">
        <h1 className="text-6xl font-bold text-white mb-12 text-center tracking-wider
          [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%)]">
          Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <article className="group backdrop-blur-md bg-white/5 border border-white/20 rounded-xl overflow-hidden 
                transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/10">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs backdrop-blur-md bg-white/10 border border-white/20 text-white/90">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <time className="text-sm text-white/60">{post.date}</time>
                  <h2 className="text-xl font-semibold text-white mt-2 mb-3">{post.title}</h2>
                  <p className="text-white/70 text-sm line-clamp-3">{post.excerpt}</p>
                  
                  <div className="mt-4 flex items-center text-blue-400 text-sm">
                    Read More
                    <svg 
                      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}