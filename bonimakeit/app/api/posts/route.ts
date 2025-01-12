import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const postsPath = path.join(process.cwd(), 'posts', 'posts.json');
  console.log('postsPath:', postsPath);
  const fileContents = await fs.readFile(postsPath, 'utf8');
  console.log('fileContents:', fileContents);
  const data = JSON.parse(fileContents);
  
  return Response.json(data.posts);
}