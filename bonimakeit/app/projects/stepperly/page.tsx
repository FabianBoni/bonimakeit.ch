'use client'
import Image from 'next/image'
import Link from 'next/link'
import { BsBrowserSafari } from 'react-icons/bs';
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function Stepperly() {
    return (
        <main className="h-screen overflow-y-auto bg-gray-900 text-white scroll-smooth">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src="/images/stepperly.gif" // Replace with the Stepperly project hero image
                    alt="Stepperly - Achieve Your Goals"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
                <div className="absolute bottom-10 left-10">
                    <h1 className="text-6xl font-bold">Stepperly</h1>
                    <p className="mt-4 text-lg">
                        A platform designed to help users achieve their goals through personalized, AI-driven guidance.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Project Overview */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                        <p className="text-lg mb-4">
                            Stepperly is a goal-setting platform that leverages artificial intelligence to provide users with
                            tailored guides to achieve personal and professional milestones. The idea was to create a
                            user-friendly, intuitive interface where users can share their goals and receive step-by-step plans
                            to accomplish them.
                        </p>
                        <p className="text-lg">
                            The platform not only tracks progress but also adapts recommendations based on user feedback.
                            Stepperly emphasizes simplicity, efficiency, and user empowerment to help people take actionable
                            steps toward their dreams.
                        </p>
                    </div>

                    {/* How It Was Built */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">How It Was Built</h2>
                        <ul className="space-y-4 text-lg">
                            <li>
                                <span className="font-bold">Framework:</span> Developed using <span className="text-indigo-400">Next.js&nbsp;</span>
                                for server-side rendering and efficient client-side navigation.
                            </li>
                            <li>
                                <span className="font-bold">Styling:</span> Utilized <span className="text-indigo-400">Tailwind CSS &nbsp;</span>
                                to ensure a responsive, modern design with minimal effort.
                            </li>
                            <li>
                                <span className="font-bold">Backend:</span> Stepperly's backend was powered by a combination of
                                <span className="text-indigo-400"> Node.js</span> and <span className="text-indigo-400">Express</span>,
                                enabling fast API responses for goal sharing and tracking.
                            </li>
                            <li>
                                <span className="font-bold">AI Integration:</span> Integrated with <span className="text-indigo-400">OpenAI's API &nbsp;</span>
                                to generate personalized goal recommendations. The AI models were trained to suggest actionable plans
                                based on the user's input and feedback.
                            </li>
                            <li>
                                <span className="font-bold">Database:</span> Used <span className="text-indigo-400">MongoDB</span> for storing user data,
                                goals, and progress securely.
                            </li>
                            <li>
                                <span className="font-bold">Hosting:</span> Deployed on <span className="text-indigo-400">Vercel</span> for its scalability
                                and seamless integration with Next.js.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">AI-Powered Guidance</h3>
                            <p className="text-lg">
                                Offers personalized, step-by-step plans for achieving goals using machine learning algorithms.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Progress Tracking</h3>
                            <p className="text-lg">
                                Allows users to monitor their milestones and adjust their goals dynamically.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Community Sharing</h3>
                            <p className="text-lg">
                                Enables users to share their goals and progress, fostering motivation and collaboration.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="fixed flex flex-col gap-4 top-0 left-10 z-20 mt-12">
                    <a
                        href="https://stepperly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row gap-4 items-center bg-gray-900 text-white px-6 py-3 rounded-lg 
              hover:bg-gray-700 transition-colors"
                    >
                        <BsBrowserSafari className='text-xl' />
                        Visit Stepperly
                    </a>
                    <Link
                        href="/#section3"
                        className="flex flex-row gap-4 items-center bg-gray-900 text-white px-6 py-3 rounded-lg 
              hover:bg-gray-700 transition-colors"
                    >
                        <IoArrowBackCircleSharp className='text-2xl' />
                        Return to Portfolio
                    </Link>
                </div>
            </div>
        </main>
    )
}