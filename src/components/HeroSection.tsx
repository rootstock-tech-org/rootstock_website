'use client';

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import NeuralTree from './NeuralTree';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yBlobA = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yBlobB = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Mouse-driven depth / tilt
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const rotX = useSpring(useTransform(mvy, [-0.5, 0.5], [5, -5]), { stiffness: 60, damping: 18 });
  const rotY = useSpring(useTransform(mvx, [-0.5, 0.5], [-7, 7]), { stiffness: 60, damping: 18 });
  const blobAX = useSpring(useTransform(mvx, [-0.5, 0.5], [45, -45]), { stiffness: 40, damping: 20 });
  const blobBX = useSpring(useTransform(mvx, [-0.5, 0.5], [-55, 55]), { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: MouseEvent) => {
      mvx.set(e.clientX / window.innerWidth - 0.5);
      mvy.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mvx, mvy]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 bg-[#F2F2F0]"
    >
      {/* NeuralTree background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35">
        <NeuralTree />
      </div>

      {/* Ambient blobs (parallax layers) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ y: yBlobA, x: blobAX }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#415b3e]/[0.06] rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: yBlobB, x: blobBX }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-400/[0.04] rounded-full blur-3xl"
        />
      </div>

      {/* Main hero text — parallax + 3D tilt */}
      <div
        className="relative z-10 text-center px-6 max-w-[95rem] mx-auto flex-1 flex flex-col items-center justify-center"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ y: yContent, opacity: contentOpacity, rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 md:space-y-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h1
              className="flex flex-col items-center justify-center text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] leading-[0.92] tracking-tighter font-bold text-[#0b182f]"
              style={{ fontFamily: 'Outfit, serif', transform: 'translateZ(55px)' }}
            >
              <span>Intelligence</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3a6b38] to-[#0b182f] pb-2 sm:pb-4 drop-shadow-sm">
                Engineered.
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed px-4"
              style={{ transform: 'translateZ(28px)' }}
            >
              Human-Aware Intelligence that blends data, emotion, and{' '}
              <span className="text-[#0b182f] font-semibold">real-world context</span>.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

