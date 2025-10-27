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
          <h1 className="heading-hero text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-6 sm:mb-8">
            <span className="block">AI that understands</span>
            <span className="block text-[#7AE582]">context</span>
            <span className="block text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">not just data</span>
          </h1>
          
                     <p className="lead text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
             Human-aware intelligence that blends data, emotion, and real-world context to power better decisions
           </p>
          
                     <p className="lead text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-12 max-w-4xl mx-auto px-2">
             RootStock Technology builds AI that goes beyond algorithms, creating systems that understand 
             <span className="font-semibold text-[#16BAC5]"> context, emotion, and the human side of decision-making</span>.
           </p>
          
                     <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
             <a
               href="#about"
               className="btn btn-primary text-base sm:text-lg w-full sm:w-auto py-3 sm:py-4"
               aria-label="See the vision behind RootStock Technology"
             >
               See the Vision
             </a>
             <a
               href="#FinSight" 
               className="btn btn-secondary text-base sm:text-lg w-full sm:w-auto py-3 sm:py-4"
               aria-label="Explore FinSight product details"
             >
               Explore FinSight
             </a>
           </div>
          
                     {/* Enhanced Stats */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto px-4 sm:px-0">
             <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
               <div className="text-xl sm:text-2xl font-bold text-[#16BAC5] mb-2">24×7</div>
               <div className="text-gray-700 font-medium text-sm sm:text-base">Companion on web & WhatsApp</div>
             </div>
             <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
               <div className="text-xl sm:text-2xl font-bold text-[#7AE582] mb-2">Decisive</div>
               <div className="text-gray-700 font-medium text-sm sm:text-base">Decisions in minutes, not hours</div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
