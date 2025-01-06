'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBackCircleSharp } from "react-icons/io5"

export default function AutoTrade() {

    return (
        <main className="h-screen overflow-y-auto bg-gray-900 text-white scroll-smooth">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src="/images/autotrade.png"
                    alt="AutoTrade - AI-Powered Crypto Trading"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900" />
                <div className="absolute bottom-10 left-10">
                    <h1 className="text-6xl font-bold">AutoTrade</h1>
                    <p className="mt-4 text-lg">
                        Advanced cryptocurrency trading platform powered by machine learning models
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
                            AutoTrade is a sophisticated cryptocurrency trading platform that uses multiple machine learning models
                            to predict market movements. With impressive validation metrics including R² scores of 0.999+,
                            the system provides highly accurate price predictions for BTC/TRY trading pairs.
                        </p>
                    </div>

                    {/* Technical Details */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Technical Implementation</h2>
                        <ul className="space-y-4 text-lg">
                            <li>
                                <span className="font-bold">Models:</span> Multiple regression models with different configurations
                                achieving RMSE scores as low as 0.001637
                            </li>
                            <li>
                                <span className="font-bold">Features:</span> Technical indicators including RSI, MACD, Bollinger Bands,
                                and Volume-Weighted Average Price
                            </li>
                            <li>
                                <span className="font-bold">API Integration:</span> CryptoCompare API for real-time market data
                            </li>
                            <li>
                                <span className="font-bold">Visualization:</span> Interactive charts using Plotly and Streamlit
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">High Accuracy</h3>
                            <p className="text-lg">
                                Achieves R² scores of 0.999+ with minimal prediction errors
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Real-time Analysis</h3>
                            <p className="text-lg">
                                Processes live market data for immediate trading decisions
                            </p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-2xl font-bold mb-4">Advanced Indicators</h3>
                            <p className="text-lg">
                                Utilizes multiple technical indicators for comprehensive market analysis
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