'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function RobotGuide() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Delay appearance so it pops in after initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth springs for the 3D tilt effect
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mousePosition.x, springConfig);
  const smoothY = useSpring(mousePosition.y, springConfig);

  // Transform mouse position to rotation angles (tilt slightly towards mouse)
  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-20, 20]);
  const translateX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const translateY = useTransform(smoothY, [-1, 1], [-10, 10]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] pointer-events-none hidden md:block">
      {/* Container for the 3D perspective */}
      <motion.div
        style={{ perspective: 1000 }}
        className="relative w-40 h-40 pointer-events-auto cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
      >
        {/* Floating Animation Wrapper */}
        <motion.div
          animate={{
            y: isHovered ? -15 : [0, -10, 0],
          }}
          transition={{
            y: isHovered
              ? { type: 'spring', stiffness: 300 }
              : { repeat: Infinity, duration: 4, ease: 'easeInOut' },
          }}
          className="w-full h-full relative"
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* A glowing aura behind the robot */}
          <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full scale-75 group-hover:bg-blue-400/40 transition-colors duration-500" />
          
          {/* The Robot Image with multiply blending to remove white bg */}
          <div className="relative w-full h-full mix-blend-multiply">
            <Image
              src="/ai-robot.png"
              alt="AI Guide"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Interactive Chat Bubble that appears on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0.8,
              x: isHovered ? -160 : -140
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 left-0 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl rounded-tr-none shadow-xl border border-gray-100 whitespace-nowrap"
          >
            <p className="text-sm font-semibold font-serif text-gray-800">
              Need help navigating?
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
