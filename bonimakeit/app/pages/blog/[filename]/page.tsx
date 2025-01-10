import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import client from '../../../../tina/__generated__/client'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'

export async function generateStaticParams(): Promise<{ filename: string | undefined }[]> {
  const postsListData = await client.queries.postConnection()
  return postsListData.data.postConnection.edges?.map((post) => ({
    filename: post?.node?._sys.filename,
  })) ?? []
}

export default async function BlogPost({ params }: { params: { filename: string } }) {
  const { data } = await client.queries.post({
    relativePath: `${params.filename}.md`,
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
          {data.post.heroImage && (
            <div className="relative h-48 sm:h-64 md:h-96 w-full mb-4 md:mb-8 rounded-xl overflow-hidden">
              <Image
                src={data.post.heroImage}
                alt={data.post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4 md:p-8">
            {data.post.date && (
              <time className="text-gray-400 mb-2 md:mb-4 block text-sm md:text-base">
                {new Date(data.post.date).toLocaleDateString()}
              </time>
            )}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-8 [text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
              {data.post.title}
            </h1>
            <div className="prose prose-invert prose-sm md:prose-lg max-w-none text-white">
              <TinaMarkdown content={data.post.body} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}