import matter from 'gray-matter'
import { promises as fs } from 'fs'
import path from 'path'

interface PostData {
  title: string
  date: string
  heroImage?: string
  excerpt?: string
  body: string
  _sys: {
    filename: string
  }
}

export async function getMarkdownPosts(): Promise<PostData[]> {
  const postsDirectory = path.join(process.cwd(), 'content/posts')
  const files = await fs.readdir(postsDirectory)
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename)
      const fileContent = await fs.readFile(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      
      return {
        ...(data as Omit<PostData, 'body' | '_sys'>),
        body: content,
        _sys: {
          filename: filename.replace('.md', '')
        }
      } as PostData
    })
  )
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}