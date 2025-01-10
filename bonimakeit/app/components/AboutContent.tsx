export default function AboutContent() {
  return (
    <div className="absolute w-[85%] h-[50%] md:h-[50%] md:w-[unset] md:mt-24 flex flex-col md:flex-row items-center gap-6 md:gap-12 !top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-4 md:p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg max-h-[80vh] overflow-y-auto">
      <div className="w-32 md:w-auto">
        <img
          src="/images/fabian-boni.png"
          alt="Fabian Boni"
          width={1200}
          height={1200}
          className="rounded-full border-4 border-white/20"
        />
      </div>
      <div className="w-full md:w-auto">
        <div className="space-y-4 text-white/80 text-sm md:text-base px-2 md:px-0">
          <p className="leading-relaxed">
            Hi, my name is Fabian Boni, and I'm a developer and aspiring data scientist based in Basel, Switzerland.
          </p>
          <p className="leading-relaxed md:block">
            I have a strong background in application development, data science, and system engineering, with a focus on designing innovative and user-friendly solutions. My technical skills include Python, Java, JavaScript, React, R, Lua, and C++, along with expertise in the latest web technologies.
          </p>
          <p className="leading-relaxed hidden md:block">
            Currently, I'm studying Data Science at the University of Applied Sciences and Arts Northwestern Switzerland (FHNW) while managing innovative projects for the Canton of Basel-Stadt.
          </p>
          <p className="leading-relaxed hidden md:block">
            Outside of work and academics, I enjoy 3D printing and designing technical devices like drones, continuously exploring new ways to push the boundaries of technology.
          </p>
          <p className="leading-relaxed hidden md:block">
            I am currently looking for opportunities where I can apply my skills in data science, software development, and AI tooling to create innovative solutions and contribute to meaningful projects.
          </p>
          <p className="leading-relaxed hidden md:block">
            I look forward to bringing my passion for technology, creativity, and problem-solving to a forward-thinking company where I can grow and contribute to exciting advancements in the field.
          </p>
        </div>
        <div className="flex justify-center md:justify-start mt-6">
          <a
            href="/cv/fabian-boni-cv.pdf"
            download
            className="px-6 py-3 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </div>
  )
}
