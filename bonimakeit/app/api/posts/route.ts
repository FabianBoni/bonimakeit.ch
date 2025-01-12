import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const postsPath = path.join(process.cwd(), 'posts', 'posts.json');
  const fileContents = await fs.readFile(postsPath, 'utf8');
  const data = JSON.parse(fileContents);
  
  return Response.json(data.posts);
}