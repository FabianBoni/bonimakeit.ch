import Link from "next/link";

const Header = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className="w-2/3 px-8 py-12 my-5 fixed left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/10 shadow-lg rounded-xl hologram-container z-20">
        <nav className="w-full flex md:flex-row justify-center flex-col gap-12 items-center text-3xl">
          {links.map((link) => (
            <Link key={link.path} href={link.path}>
              <span className="star-wars-hologram-effect">{link.name}</span>
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}

export default Header;