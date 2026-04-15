export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
        <ul className="flex justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
          <li>
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-blue-400 transition-colors text-xs sm:text-sm uppercase tracking-wider"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-white hover:text-blue-400 transition-colors text-xs sm:text-sm uppercase tracking-wider"
            >
              Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-blue-400 transition-colors text-xs sm:text-sm uppercase tracking-wider"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-blue-400 transition-colors text-xs sm:text-sm uppercase tracking-wider"
            >
              Contact Us
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
