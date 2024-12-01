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
        <header className="w-full px-8 py-24 relative hologram-container z-10">
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