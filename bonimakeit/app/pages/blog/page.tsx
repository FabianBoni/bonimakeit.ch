"use client"

import { useEffect, useState } from 'react'
import client from '../../../tina/__generated__/client'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

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

  return (
    <main className="min-h-screen relative bg-black">
      <Header />
      <div className="stars" id="stars"></div>

      <div className="pt-48 pb-20 px-4 max-w-7xl mx-auto relative z-10">
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
    </main>
  )
}