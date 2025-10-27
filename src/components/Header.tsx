'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PulsatingButton } from "@/components/magicui/pulsating-button";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Shrink on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 60;
      setIsScrolled(scrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-[padding] duration-300 ${isScrolled ? 'py-2' : 'py-3 sm:py-4'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className={`bg-gray-50/80 backdrop-blur-md border border-gray-200/50 hover:border-gray-300/70 rounded-2xl shadow-2xl flex justify-between items-center transition-all duration-300 ${isScrolled ? 'px-4 sm:px-6 py-2' : 'px-4 sm:px-7 py-3 sm:py-3.5'}`}>
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 sm:space-x-3 group">
            <Image
              src="/RootStock.jpeg" 
              alt="RootStock Technology Logo" 
              width={58} 
              height={58} 
              className={`rounded-lg block transition-transform duration-300 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 ${isScrolled ? 'scale-95' : 'group-hover:scale-110'}`}
            />
            <div className="flex flex-col">
              <span className={`font-bold text-gray-900 leading-none transition-transform ${isScrolled ? 'text-sm sm:text-base md:text-lg' : 'text-base sm:text-lg md:text-xl'}`}>RootStock</span>
              <span className={`font-medium text-[#7AE582] leading-none transition-transform ${isScrolled ? 'text-xs' : 'text-xs sm:text-sm'}`}>TECHNOLOGY</span>
            </div>
          </a>
          
          {/* Navigation Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
          <a href="#about" className={`font-medium transition-all duration-300 text-sm xl:text-base ${activeSection === 'about' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}>About</a>
            <a href="#technology" className={`font-medium transition-all duration-300 text-sm xl:text-base ${activeSection === 'technology' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}>Experties</a>
            <a href="#FinSight" className={`font-medium transition-all duration-300 text-sm xl:text-base ${activeSection === 'FinSight' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}>FinSight</a>
            <a href="#ethics" className={`font-medium transition-all duration-300 text-sm xl:text-base ${activeSection === 'Ethics' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}>Career</a>
            <a href="#contact" className={`font-medium transition-all duration-300 text-sm xl:text-base ${activeSection === 'contact' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}>Talk to us</a>
          </div>
          
          {/* Call-to-Action Button */}
          <div className="hidden lg:block">
            <PulsatingButton href="https://e9cwq4w7punvx7-1004.proxy.runpod.net/" target="_blank" rel="noopener noreferrer" className="btn bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black shadow-md hover:shadow-lg">
              Get Started
            </PulsatingButton>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-200/50 transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-gray-50/95 backdrop-blur-lg rounded-2xl shadow-2xl px-6 sm:px-8 py-4 border border-gray-200/50">
            <a href="#about" className={`block py-3 px-4 rounded-lg transition-all duration-300 ${activeSection === 'about' ? 'text-[#7AE582] bg-[#7AE582]/10' : 'text-gray-700 hover:text-[#7AE582] hover:bg-gray-200/50'}`}>About</a>
            <a href="#technology" className={`block py-3 px-4 rounded-lg transition-all duration-300 ${activeSection === 'technology' ? 'text-[#7AE582] bg-[#7AE582]/10' : 'text-gray-700 hover:text-[#7AE582] hover:bg-gray-200/50'}`}>Experties</a>
            <a href="#FinSight" className={`block py-3 px-4 rounded-lg transition-all duration-300 ${activeSection === 'FinSight' ? 'text-[#7AE582] bg-[#7AE582]/10' : 'text-gray-700 hover:text-[#7AE582] hover:bg-gray-200/50'}`}>FinSight</a>
            <a href="#ethics" className={`block py-3 px-4 rounded-lg transition-all duration-300 ${activeSection === 'Ethics' ? 'text-[#7AE582] bg-[#7AE582]/10' : 'text-gray-700 hover:text-[#7AE582] hover:bg-gray-200/50'}`}>Career</a>
            <a href="#contact" className={`block py-3 px-4 rounded-lg transition-all duration-300 ${activeSection === 'contact' ? 'text-[#7AE582] bg-[#7AE582]/10' : 'text-gray-700 hover:text-[#7AE582] hover:bg-gray-200/50'}`}>Talk to us</a>
            
            <a href="https://e9cwq4w7punvx7-1004.proxy.runpod.net/" target="_blank" rel="noopener noreferrer" className="btn bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black shadow-md hover:shadow-lg block mt-4 text-center w-full">
              Get Started
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
