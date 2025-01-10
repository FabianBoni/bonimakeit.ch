import Image from 'next/image'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import client from '../../../../tina/__generated__/client'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import Link from 'next/link'

export async function generateStaticParams() {
  const postsListData = await client.queries.postConnection()

  return postsListData.data.postConnection.edges?.map((post) => ({
    filename: post?.node?._sys.filename,
  })) ?? []
}

export default async function BlogPost({ params }: { params: { filename: string } }) {
  // Add .md extension only if it's not already present
  const filePath = params.filename.endsWith('.md') 
    ? params.filename 
    : `${params.filename}.md`

  const { data } = await client.queries.post({
    relativePath: filePath,
  })

  // Rest of your component remains the same
  return (
    <>
      <main className="relative min-h-screen w-full overflow-x-hidden bg-black">
        {/* Your existing JSX */}
      </main>
      <Footer />
    </>
  )
}