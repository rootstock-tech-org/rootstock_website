'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DiscoverSection from '@/components/DiscoverSection';
import TechnologySection from '@/components/TechnologySection';
import EthicsSection from '@/components/EthicsSection';

import AboutSection from '@/components/AboutSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Detect active section
      const sections = ['home', 'technology', 'FinSight', 'ethics', 'about', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Scroll reveal observer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-inter w-full relative">
      <div>
        <Header activeSection={activeSection} />
        <div className="reveal"><HeroSection /></div>
        <div className="reveal"><AboutSection /></div>
        <div className="reveal"><TechnologySection /></div>
        {/* <div className="reveal"><TeamSection /></div> */}
        <div className="reveal"><EthicsSection /></div>

        <div className="reveal"><ContactSection /></div>
        <Footer />
      </div>
    </div>
  );
}
