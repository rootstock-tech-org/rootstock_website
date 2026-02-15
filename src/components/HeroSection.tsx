'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NeuralTree from './NeuralTree';
import ConsultationModal from './ConsultationModal';

export default function HeroSection() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">

      {/* Neural Roots SVG Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <NeuralTree />
      </div>

      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-white via-transparent to-transparent z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[95rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 md:space-y-10"
        >
          {/* Main Heading covering multiple lines properly */}
          <h1 className="flex flex-col items-center justify-center text-[2.5rem] sm:text-[3.6rem] md:text-[4.7rem] lg:text-[5.4rem] leading-[0.95] tracking-tight font-bold text-[#0b182f]">
            <span>Intelligence</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#415b3e] to-[#0b182f] pb-2 sm:pb-4">Engineered.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-4"
          >
            Human-Aware Intelligence that blends data, emotion, and <span className="text-[#0b182f] font-semibold">real-world context</span>.
          </motion.p>


        </motion.div>
      </div>

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </section>
  );
}
