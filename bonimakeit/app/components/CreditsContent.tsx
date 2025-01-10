export default function CreditsContent() {
  return (
    <>
      <div className="absolute w-full h-full bg-black opacity-50" />
      <div className="absolute md:w-[unset] md:mx-12 top-24 md:top-48 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider [text-shadow:_0_1px_0_rgb(255_255_255_/_40%),_0_2px_0_rgb(255_255_255_/_30%),_0_3px_0_rgb(255_255_255_/_20%),_0_4px_0_rgb(255_255_255_/_10%),_0_5px_0_rgb(255_255_255_/_5%)]">
          CREDITS
        </h1>
      </div>
      <div className="absolute w-[85%] my-8 md:my-[unset] md:w-auto flex flex-col items-center gap-8 !top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-4 md:p-8 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg max-h-[60vh] overflow-y-auto">
        <div className="space-y-4 text-white/80">
          <h2 className="text-xl md:text-2xl font-bold text-center md:text-left">3D Models</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
            <li>R2-D2 by <a href="https://sketchfab.com/3d-models/r2d2-c3b6db4c7a684d1d8009ddb7f5c8e0c9" className="text-blue-300 hover:text-blue-400 underline">Skandal</a> - Licensed under Creative Commons Attribution</li>
            <li>Star Destroyer by <a href="https://sketchfab.com/3d-models/star-wars-imperial-class-star-destroyer-d6cdd00b0d2f4e7eb38d55c4d5d04af4" className="text-blue-300 hover:text-blue-400 underline">TheSpaceshipper</a> - Licensed under Creative Commons Attribution</li>
            <li>Death Star by <a href="https://sketchfab.com/3d-models/death-star-star-wars-2d25e8c9c19744a2b37e6e99f2a0d60f" className="text-blue-300 hover:text-blue-400 underline">Skandal</a> - Licensed under Creative Commons Attribution</li>
            <li>Venator-class Star Destroyer by <a href="https://sketchfab.com/3d-models/star-wars-venator-class-star-destroyer-c935b6dd68e14fd0b6178c001843869d" className="text-blue-300 hover:text-blue-400 underline">TheSpaceshipper</a> - Licensed under Creative Commons Attribution</li>
            <li>Interdictor-class Star Destroyer by <a href="https://sketchfab.com/3d-models/star-wars-interdictor-class-star-destroyer-d6cdd00b0d2f4e7eb38d55c4d5d04af4" className="text-blue-300 hover:text-blue-400 underline">TheSpaceshipper</a> - Licensed under Creative Commons Attribution</li>
            <li>Arquitens-class Light Cruiser by <a href="https://sketchfab.com/3d-models/star-wars-arquitens-class-light-cruiser-d6cdd00b0d2f4e7eb38d55c4d5d04af4" className="text-blue-300 hover:text-blue-400 underline">TheSpaceshipper</a> - Licensed under Creative Commons Attribution</li>
          </ul>
        </div>
      </div>
    </>
  )
}