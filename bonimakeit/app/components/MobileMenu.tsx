'use client';

import { useRouter, usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  const navigationItems = ['Welcome', 'About', 'Projects', 'Credits'];

  const handleNavigation = (index: number) => {
    if (isMainPage) {
      document.getElementById(`section${index + 1}`)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/#section${index + 1}`);
    }
    setIsOpen(false);
  };

  const handleRouteNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed top-0 h-full inset-0 bg-black/90 backdrop-blur-md z-50 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-6 right-6 text-white text-2xl"
        aria-label="Close menu"
      >
        ✕
      </button>

      <nav className="flex flex-col items-center justify-center h-full">
        <div className="space-y-8">
          {navigationItems.map((item, index) => (
            <div
              key={item}
              className="text-white text-2xl text-center cursor-pointer hover:text-gray-300 transition-colors"
              onClick={() => handleNavigation(index)}
            >
              {item}
            </div>
          ))}

          <div
            className="text-white text-2xl text-center cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => handleRouteNavigation('/pages/blog')}
          >
            Blog
          </div>

          <div
            className="text-white text-2xl text-center cursor-pointer hover:text-gray-300 transition-colors"
            onClick={() => handleRouteNavigation('/pages/contact')}
          >
            Contact
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;