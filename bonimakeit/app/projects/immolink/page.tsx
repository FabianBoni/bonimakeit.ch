'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBackCircleSharp } from "react-icons/io5"

export default function ImmoLink() {
    return (
        <main className="h-screen overflow-y-auto bg-gray-900 text-white scroll-smooth">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src="/images/immolink.png"
                    alt="ImmoLink - Real Estate Management Platform"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
                <div className="absolute bottom-10 left-10">
                    <h1 className="text-6xl font-bold">ImmoLink</h1>
                    <p className="mt-4 text-lg">
                        Modern real estate management platform connecting property owners and tenants
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
                            ImmoLink is a comprehensive real estate management platform that streamlines 
                            property management operations. The platform facilitates seamless communication 
                            between property owners and tenants while providing powerful tools for 
                            maintenance tracking, rent collection, and document management.
                        </p>
                    </div>

                    {/* Technical Details */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Technical Implementation</h2>
                        <ul className="space-y-4 text-lg">
                            <li>
                                <span className="font-bold">Frontend:</span> Next.js with TypeScript and 
                                Tailwind CSS for responsive design
                            </li>
                            <li>
                                <span className="font-bold">Backend:</span> Node.js with Express, 
                                PostgreSQL database
                            </li>
                            <li>
                                <span className="font-bold">Authentication:</span> JWT-based secure 
                                user authentication system
                            </li>
                            <li>
                                <span className="font-bold">Cloud Storage:</span> AWS S3 for document 
                                and image storage
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Property Management</h3>
                            <p className="text-lg">
                                Comprehensive dashboard for property listings, tenant management, and 
                                maintenance requests
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Document Hub</h3>
                            <p className="text-lg">
                                Secure storage and management of contracts, invoices, and property documents
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Payment Integration</h3>
                            <p className="text-lg">
                                Automated rent collection and payment tracking system
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="fixed flex flex-col gap-4 top-0 left-10 z-20 mt-12">
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