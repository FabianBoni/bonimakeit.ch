import Link from "next/link";

const Header = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#section2' },
    { name: 'Projects', path: '/#section3' },
    { name: 'Blog', path: 'https://www.bonimakeit.ch/pages/blog' },
    { name: 'Contact', path: 'https://www.bonimakeit.ch/pages/contact' }
  ];

  return (
    <header className="hidden md:block w-2/3 px-8 py-12 my-5 fixed left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl hologram-container z-20">
      <nav className="w-full flex md:flex-row justify-center flex-col gap-12 items-center">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="relative group"
          >
            <span className="star-wars-hologram-effect text-3xl tracking-wider font-medium transition-all duration-300 group-hover:text-white text-white/70">
              {link.name}
            </span>
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white/60 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;