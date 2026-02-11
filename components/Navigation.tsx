import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-center md:justify-between items-center">
        
        {/* Logo/Brand */}
        <div className="hidden md:flex items-center gap-2 text-romantic-600 font-script text-3xl">
          <span>Forever</span>
          <Heart className="w-5 h-5 fill-romantic-400 text-romantic-400" />
        </div>

        {/* Links */}
        <ul className="flex items-center gap-6 md:gap-8 font-sans text-sm tracking-widest uppercase text-gray-600">
          <li>
            <button onClick={() => scrollTo('gallery')} className="hover:text-romantic-500 transition-colors">Gallery</button>
          </li>
          <li>
            <button onClick={() => scrollTo('quotes')} className="hover:text-romantic-500 transition-colors">Memories</button>
          </li>
          <li>
            <button onClick={() => scrollTo('message')} className="hover:text-romantic-500 transition-colors">For You</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
