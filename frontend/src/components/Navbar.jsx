import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80; // Adjusted for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Overview', href: '#overview' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Floor Plans', href: '#floor-plans' },
    { name: 'Developer', href: '#developer' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white shadow-xl py-3' : 'bg-white/80 backdrop-blur-md py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={(e) => handleNavClick(e, '#')}>
             <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg border-2 border-emerald-50 bg-white">
                <img src="/logo.jpg" alt="Vighnaharta Infinity Logo" className="w-full h-full object-contain p-1" />
             </div>
             <div className="hidden sm:block">
                <h1 className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase leading-none mb-1">Vighnaharta</h1>
                <h2 className="text-xl font-black text-gray-900 leading-none">INFINITY</h2>
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-black text-gray-600 uppercase tracking-widest hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-[#b4ec51] text-gray-900 px-6 py-2.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-[#a2d84a] transition-all shadow-[0_5px_15px_rgba(180,236,81,0.3)] active:scale-95"
            >
              Enquiry Now
            </button>
          </div>

          {/* Mobile Button */}
          <div className="lg:hidden flex items-center gap-4">
             <button 
                onClick={(e) => handleNavClick(e, '#contact')}
                className="bg-[#b4ec51] text-gray-900 px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest"
             >
                Enquiry
             </button>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900">
               {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t py-6 space-y-4 px-6 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-sm font-black text-gray-800 uppercase tracking-widest py-2 border-b border-gray-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
