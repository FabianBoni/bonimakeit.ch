// First, create a new MobileProjectsView component at the top of the file
const MobileProjectsView = () => {
    return (
        <>
            <div className="absolute top-0 w-full h-full bg-black opacity-50" />
            <div className="w-full h-[85%] overflow-y-auto px-6 flex flex-col items-center justify-center">
                <div className="space-y-6 w-full max-w-md pt-64 pb-12">
                    {[
                        {
                            title: "Stepperly",
                            description: "AI powered step by step introductions.",
                            tech: "React, TypeScript, Three.js, API, AI",
                            link: "/pages/projects/stepperly"
                        },
                        {
                            title: "Immolink",
                            description: "Real estate client side management app.",
                            tech: "Flutter, Dart, React",
                            link: "/pages/projects/immolink"
                        },
                        {
                            title: "Autotrade",
                            description: "AI powered crypto trading script.",
                            tech: "Python, AI, Data Science",
                            link: "/pages/projectsautotrade"
                        }
                        // Add more projects as needed
                    ].map((project, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 transform transition-all duration-300 hover:scale-105"
                        >
                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-300 mb-2">{project.description}</p>
                            <p className="text-sm text-gray-400 mb-4">{project.tech}</p>
                            <a
                                href={project.link}
                                className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300"
                            >
                                View Project →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MobileProjectsView;