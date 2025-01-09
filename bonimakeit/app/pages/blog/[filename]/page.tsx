import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import client from '../../../../tina/__generated__/client'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

async function generateStaticParams() {
  const postsListData = await client.queries.postConnection()
  
  return postsListData.data.postConnection.edges?.map((post) => ({
    filename: post?.node?._sys.filename,
  })) ?? []
}

async function BlogPost({ params }: { params: { filename: string } }) {
  const { data } = await client.queries.post({
    relativePath: `${params.filename}.md`,
  })

  return (
    <main className="min-h-screen relative bg-black">
      <Header />
      <div className="stars" id="stars"></div>

      <article className="pt-48 pb-20 px-4 max-w-4xl mx-auto relative z-10">
        {data.post.heroImage && (
          <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={data.post.heroImage}
              alt={data.post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-8">
          {data.post.date && (
            <time className="text-gray-400 mb-4 block">
              {new Date(data.post.date).toLocaleDateString()}
            </time>
          )}
          <h1 className="text-5xl font-bold text-white mb-8 [text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
            {data.post.title}
          </h1>
          <div className="prose prose-invert prose-lg max-w-none text-white">
            <TinaMarkdown content={data.post.body} />
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}

export { generateStaticParams }
export default BlogPost