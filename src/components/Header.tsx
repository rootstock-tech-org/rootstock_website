'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Shrink on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#technology', dropdown: true },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '#ethics' },
  ];

  const products = [
    "Edu-Stream Pipeline",
    "RT-OCR",
    "Conservatory Grade",
    "Sentience Vision",
    "Multi-Doc Architect",
    "Persona-Fit Engine"
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`
          relative flex justify-between items-center transition-all duration-300 
          ${isScrolled
            ? 'bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-sm px-6 py-3 rounded-full'
            : 'bg-transparent px-4 py-3'
          }
        `}>
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group z-50 pl-2">
            <motion.div
              layout
              transition={{ duration: 0.3 }}
              className={`relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105`}
            >
              <Image
                src="/RootStock.jpeg"
                alt="RootStock Technology Logo"
                width={50}
                height={50}
                className={`block object-cover transition-all duration-300 ${isScrolled ? 'w-9 h-9' : 'w-11 h-11'}`}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className={`font-bold text-gray-900 leading-none tracking-tight transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>RootStock</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 p-1.5 bg-gray-50/50 backdrop-blur-sm rounded-full border border-gray-100/50 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className={`
                    flex items-center gap-1 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200
                    ${activeSection === link.name.toLowerCase()
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                    }
                  `}
                >
                  {link.name}
                  {link.dropdown && (
                    <svg className={`w-3 h-3 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {activeSection === link.name.toLowerCase() && !link.dropdown && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm ring-1 ring-black/5 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-2"
                    >
                      {products.map((product) => (
                        <a
                          key={product}
                          href="#technology"
                          className="block px-6 py-3 text-sm text-gray-600 hover:text-[#415b3e] hover:bg-gray-50 transition-colors"
                        >
                          {product}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pr-1">
            <div className="hidden lg:block">
              <PulsatingButton
                href="#contact"
                className="btn bg-white text-[#415b3e] border border-[#415b3e] hover:bg-gray-50 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm px-6 py-2.5 rounded-full font-semibold"
              >
                Get Consultation
              </PulsatingButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current rounded-full origin-center transition-transform"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-current rounded-full transition-opacity"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-current rounded-full origin-center transition-transform"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden mt-3 px-2"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-gray-100 p-5 space-y-2 ring-1 ring-black/5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-5 py-3.5 rounded-[1.25rem] font-medium transition-colors ${activeSection === link.name.toLowerCase() ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {link.name}
                  </a>
                ))}
                <div className="mt-8 px-4">
                  <a href="#contact" className="block w-full text-center bg-white text-[#415b3e] border border-[#415b3e] font-semibold py-4 rounded-[1.5rem] shadow-lg active:scale-95 transition-transform hover:bg-gray-50">
                    Get Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
