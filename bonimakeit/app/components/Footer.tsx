import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full z-50 backdrop-blur-md bg-white/5 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-white/70 text-sm">
            © {new Date().getFullYear()} Fabian Boni. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              href="https://github.com/FabianBoni" 
              target="_blank"
              className="text-white/70 hover:text-white/90 transition-colors"
            >
              GitHub
            </Link>
            <Link 
              href="https://linkedin.com/in/fabian-boni-82a5ba192" 
              target="_blank"
              className="text-white/70 hover:text-white/90 transition-colors"
            >
              LinkedIn
            </Link>
            <Link 
              href="/pages/contact"
              target='_blank'
              className="text-white/70 hover:text-white/90 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;