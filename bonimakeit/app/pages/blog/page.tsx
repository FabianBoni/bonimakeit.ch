"use client"

import { useEffect, useState } from 'react'
import client from '../../../tina/__generated__/client'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import MobileMenu from '@/app/components/MobileMenu'

interface Post {
  __typename: "Post";
  id: string;
  title: string;
  body?: any;
  heroImage?: string;
  excerpt?: string;
  date?: string;
  _sys: {
    __typename?: "SystemInfo";
    filename: string;
    basename: string;
    hasReferences?: boolean | null;
    breadcrumbs: string[];
    path: string;
    relativePath: string;
    extension: string;
  };
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await client.queries.postConnection();
      if (postsData.data.postConnection?.edges) {
        const validPosts = postsData.data.postConnection.edges
          .map(edge => edge?.node)
          .filter((node): node is Post =>
            node !== null &&
            node !== undefined &&
            node.__typename === "Post"
          );
        setPosts(validPosts);
      }
    };

    fetchPosts();
  }, []);

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
    <main className="min-h-screen relative bg-black overflow-auto">
      <div className="flex items-center fixed top-0 left-0 h-[50px] w-full z-50 md:backdrop-blur-none backdrop-blur-md">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-white text-2xl absolute right-4"
        >
          ☰
        </button>
      </div>
      <Header />
      <div className="stars h-full w-full absolute z-10" id="stars"></div>

      <div className="pt-12 md:pt-48 pb-20 px-4 max-w-7xl mx-auto relative z-10">
        <h1 className="text-6xl font-bold text-white mb-12 text-center tracking-wider
          [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%)]">
          Latest Articles
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/pages/blog/${post._sys.filename}`} key={post._sys.filename}>
              <article className="group backdrop-blur-md bg-white/5 border border-white/20 rounded-xl overflow-hidden 
                transition-all duration-300 hover:transform hover:scale-105 hover:bg-white/10">
                {post.heroImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.date && (
                    <time className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</time>
                  )}
                  <h2 className="text-xl font-semibold text-white mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-300 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="mt-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                    Read more →
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </main>
  )
}