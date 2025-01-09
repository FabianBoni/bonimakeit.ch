"use client"

import { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])

  return (
    <main className="min-h-screen relative bg-black">
      <Header />
      <div className="stars" id="stars"></div>
      
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto relative z-10">
        <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
          {/* Add your admin controls here */}
        </div>
      </div>
      <Footer />
    </main>
  )
}