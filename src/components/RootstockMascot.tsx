'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

type Mood = 'neutral' | 'happy' | 'thinking' | 'waving' | 'sleeping' | 'surprised' | 'listening';

const MESSAGES = [
  "Happy to help.",
  "Thinking with you.",
  "Human aware. Data smart.",
  "Let’s simplify this.",
  "I’m listening.",
];

export default function RootstockMascot() {
  const [mood, setMood] = useState<Mood>('neutral');
  const [speech, setSpeech] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  
  // Ref for idle timeout
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load saved position from localStorage
    const saved = localStorage.getItem('rootstock-mascot-pos');
    if (saved) {
      try {
        setPosition(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse mascot position", e);
      }
    }
    
    setIsClient(true);

    // Initial load sequence: Bounce -> Wave -> Greeting
    const initTimer = setTimeout(() => {
      setMood('waving');
      setSpeech("Hi, I’m Rootie. Need help making sense of complexity?");
      setTimeout(() => {
        setMood('neutral');
        setSpeech(null);
      }, 5000); // Hide greeting after 5s
    }, 1000); // 1s after load

    return () => clearTimeout(initTimer);
  }, []);

  // Idle behavior tracker
  useEffect(() => {
    if (!isClient) return;
    
    const resetIdle = () => {
      if (mood === 'sleeping') {
        setMood('happy');
        setTimeout(() => setMood('neutral'), 2000);
      }
      
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      
      // Set to sleep after 20 seconds of no mouse movement
      idleTimeoutRef.current = setTimeout(() => {
        setMood('sleeping');
        setSpeech(null);
      }, 20000);
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('scroll', resetIdle);
    resetIdle(); // Start the timer

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('scroll', resetIdle);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [mood, isClient]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Save absolute position relative to original bottom-right anchor
    const newPos = { 
      x: position.x + info.offset.x, 
      y: position.y + info.offset.y 
    };
    setPosition(newPos);
    localStorage.setItem('rootstock-mascot-pos', JSON.stringify(newPos));
  };

  const handleDoubleClick = () => {
    // Reset to bottom-right
    setPosition({ x: 0, y: 0 });
    localStorage.removeItem('rootstock-mascot-pos');
  };

  const handleClick = () => {
    if (mood === 'sleeping') {
      setMood('surprised');
      setSpeech("Oh! I'm awake!");
      setTimeout(() => {
        setMood('neutral');
        setSpeech(null);
      }, 2000);
      return;
    }
    
    const randomMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setSpeech(randomMsg);
    setMood('happy');
    
    setTimeout(() => {
      setSpeech(null);
      setMood('neutral');
    }, 4000);
  };

  const getMoodVisuals = () => {
    switch (mood) {
      case 'sleeping': 
        return <div className="absolute -top-4 -right-2 text-blue-500 font-bold animate-bounce tracking-widest z-10 text-xl" style={{ textShadow: '0 0 5px white' }}>Z<span className="text-sm">z</span><span className="text-xs">z</span></div>;
      case 'thinking': 
        return <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-pulse drop-shadow-md z-10">🤔</div>;
      case 'happy': 
        return <div className="absolute -top-4 -right-2 text-xl animate-bounce drop-shadow-md z-10">✨</div>;
      case 'surprised': 
        return <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl animate-ping drop-shadow-md z-10">❗</div>;
      default: 
        return null;
    }
  };

  // Avoid rendering during SSR to prevent hydration mismatch for dragging and position
  if (!isClient) return null;

  return (
    <motion.div
      className="fixed z-[9999] bottom-6 right-6 md:bottom-28 md:right-10 flex flex-col items-center select-none"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ touchAction: "none" }}
      aria-label="Rootstock interactive mascot"
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {speech && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-[110%] w-[160px] md:w-[220px] bg-white text-teal-900 text-sm md:text-base p-3 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-gray-100 text-center pointer-events-none mb-4 font-medium"
          >
            {speech}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-gray-100 shadow-[2px_2px_2px_rgba(0,0,0,0.02)]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Container */}
      <div className="relative w-[90px] h-[90px] md:w-[120px] md:h-[120px] flex items-center justify-center cursor-grab active:cursor-grabbing">
        
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-full mix-blend-screen bg-teal-400"
          animate={{
            scale: isHovered || mood === 'happy' ? 1.2 : 0.9,
            opacity: isHovered || mood === 'happy' ? 0.6 : 0.2,
            filter: 'blur(20px)'
          }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        />

        {/* Mascot Image Display 
            To adjust what part of the sheet is visible, modify backgroundSize and backgroundPosition here.
            Default assumes a centered character or a single portrait. 
        */}
        <motion.div
          className="relative w-full h-full rounded-full z-10 border-2 border-white/30 shadow-lg bg-white/50 backdrop-blur-sm overflow-hidden"
          animate={
            mood === 'waving' ? { rotate: [0, -15, 15, -15, 15, 0] } :
            mood === 'listening' ? { scale: [1, 1.05, 1] } : 
            { y: [0, -6, 0] } // Idle floating
          }
          transition={
            mood === 'waving' ? { duration: 0.8, ease: "easeInOut" } :
            mood === 'listening' ? { duration: 2, repeat: Infinity } :
            { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div 
            className="w-full h-full bg-no-repeat"
            style={{
              backgroundImage: "url('/rootstock-mascot-sheet.png')",
              backgroundSize: "300%", 
              backgroundPosition: "center center", 
            }}
          />
        </motion.div>
        
        {/* State visual overlays */}
        {getMoodVisuals()}
      </div>
    </motion.div>
  );
}
