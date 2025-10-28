'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28">
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="heading-hero text-1xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-5xl text-gray-900 mb-6 sm:mb-8">
            <span className="block">Intelligence Engineered Empathy Embedded</span>
          </h3>
          
          <p className="lead text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Human-Aware Intelligence that blends data, emotion and <span className="whitespace-nowrap">real-world context;</span><br />
            To power better DECISIONS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
             <a
               href="#about"
              className="btn btn-primary text-base sm:text-lg w-full sm:w-48 py-3 sm:py-4 text-center"
               aria-label="See the vision behind RootStock Technology"
             >
               About Us
             </a>
             <a
               href="#FinSight" 
              className="btn btn-secondary text-base sm:text-lg w-full sm:w-48 py-3 sm:py-4 text-center"
               aria-label="Explore FinSight product details"
             >
               Request a Demo
             </a>
           </div>
          
                     {/* Enhanced Stats */}
           {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto px-4 sm:px-0">
             <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
               <div className="text-xl sm:text-2xl font-bold text-[#16BAC5] mb-2">24×7</div>
               <div className="text-gray-700 font-medium text-sm sm:text-base">Companion on web & WhatsApp</div>
             </div>
             <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
               <div className="text-xl sm:text-2xl font-bold text-[#7AE582] mb-2">Decisive</div>
               <div className="text-gray-700 font-medium text-sm sm:text-base">Decisions in minutes, not hours</div>
             </div>
           </div> */}
        </div>
      </div>
    </section>
  );
}
