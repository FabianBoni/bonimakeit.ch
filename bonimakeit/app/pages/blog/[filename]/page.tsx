import Image from 'next/image'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { getMarkdownPosts } from '../../../../utils/markdownLoader'
import { compile } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { JSX, ClassAttributes, HTMLAttributes, AnchorHTMLAttributes, OlHTMLAttributes, LiHTMLAttributes } from 'react'
import { evaluate } from '@mdx-js/mdx'

const components = {
  h1: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => <h1 className="text-3xl font-bold mb-4" {...props} />,
  h2: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement>) => <h2 className="text-2xl font-bold mb-3" {...props} />,
  p: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLParagraphElement> & HTMLAttributes<HTMLParagraphElement>) => <p className="mb-4" {...props} />,
  a: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-blue-400 hover:text-blue-300" {...props} />,
  ul: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLUListElement> & HTMLAttributes<HTMLUListElement>) => <ul className="list-disc list-inside mb-4" {...props} />,
  ol: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLOListElement> & OlHTMLAttributes<HTMLOListElement>) => <ol className="list-decimal list-inside mb-4" {...props} />,
  li: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLLIElement> & LiHTMLAttributes<HTMLLIElement>) => <li className="mb-2" {...props} />,
}

export async function generateStaticParams() {
  const posts = await getMarkdownPosts()
  return posts.map((post) => ({
    filename: post._sys.filename,
  }))
}

export default async function BlogPost({ params }: { params: { filename: string } }) {
  const posts = await getMarkdownPosts()
  const post = posts.find((p) => p._sys.filename === params.filename)

  if (!post) {
    return <div>Post not found</div>
  }

  const compiledSource = String(await compile(post.body, {
    outputFormat: 'function-body',
    development: false
  }))

  const { default: Content } = await evaluate(post.body, {
    ...runtime,
    useMDXComponents: () => components
  })

  return (
    <>
      <main className="relative min-h-screen w-full overflow-x-hidden bg-black">
        <Header />
        <div className="stars fixed inset-0" id="stars"></div>

        <article className="relative z-10 w-full pt-12 md:pt-48 pb-24 md:pb-20 px-4 max-w-4xl mx-auto">
          <Link
            href="/pages/blog"
            className="inline-block mb-6 px-6 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-md"
          >
            ← Return to Blog
          </Link>
          {post?.heroImage && (
            <div className="relative h-48 sm:h-64 md:h-96 w-full mb-4 md:mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4 md:p-8">
            {post?.date && (
              <time className="text-gray-400 mb-2 md:mb-4 block text-sm md:text-base">
                {new Date(post.date).toLocaleDateString()}
              </time>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-8 [text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
              {post.title}
            </h1>
            <div className="prose prose-invert prose-sm md:prose-lg max-w-none text-white">
              <Content components={components} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}