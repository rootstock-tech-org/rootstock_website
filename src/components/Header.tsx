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
            {/* Products with hover dropdown */}
            <div className="relative group">
              <a href="#technology" className={`font-medium transition-all duration-300 text-sm xl:text-base flex items-center gap-1 ${activeSection === 'technology' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}> 
                <span>Products</span>
                <svg className="w-3.5 h-3.5 text-current" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.126l3.71-3.896a.75.75 0 111.08 1.04l-4.24 4.46a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                </svg>
              </a>
              {/* Dropdown panel */}
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto absolute left-1/2 -translate-x-1/2 top-full mt-0 pt-3 z-50">
                <div className="min-w-[420px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/60 p-6">
                  <div className="grid grid-cols-2 gap-10">
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-gray-500 mb-3">API</div>
                      <a href="/ocr" className="block font-semibold text-gray-900 hover:text-[#16BAC5]">OCR to Text</a>
                      <a href="/audio-emotion" className="block font-semibold text-gray-900 hover:text-[#16BAC5] mt-2">Audio to Emotion</a>
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-gray-500 mb-3">Platform</div>
                      <a href="/finsight" className="block font-semibold text-gray-900 hover:text-[#16BAC5]">FinSight</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="#insights" className={`font-medium transition-all duration-300 text-sm xl:text-base ${activeSection === 'insights' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}>Blog</a>
            <a href="#ethics" className={`font-medium transition-all duration-300 text-sm xl:text-base ${activeSection === 'Ethics' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}>Careers</a>
            <a href="#innovation" className={`font-medium transition-all duration-300 text-sm xl:text-base ${activeSection === 'innovation' ? 'text-[#7AE582] underline underline-offset-4' : 'text-gray-700 hover:text-[#7AE582]'}`}>Innovation</a>
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
            <a href="#innovation" className={`block py-3 px-4 rounded-lg transition-all duration-300 ${activeSection === 'innovation' ? 'text-[#7AE582] bg-[#7AE582]/10' : 'text-gray-700 hover:text-[#7AE582] hover:bg-gray-200/50'}`}>Innovation</a>
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
