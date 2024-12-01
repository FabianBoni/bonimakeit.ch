import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const soundsDirectory = path.join(process.cwd(), 'public/sounds')
  const files = fs.readdirSync(soundsDirectory)
  const soundFiles = files.filter(file => file.endsWith('.mp3'))
  
  return NextResponse.json(soundFiles)
}