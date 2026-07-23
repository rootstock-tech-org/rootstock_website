'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import RootieChat from './RootieChat';

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const VisionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const MissionIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const PILLARS = [
  {
    label: 'Think',
    tint: '#7ae582',
    desc: 'Reasoning that understands context, not just crunches numbers.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    ),
  },
  {
    label: 'Act',
    tint: '#9fe6ef',
    desc: 'Robust AI deployed to drive real, measurable impact in the field.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    ),
  },
  {
    label: 'Relate',
    tint: '#16BAC5',
    desc: 'Human-aware systems that read emotion, culture, and context.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    ),
  },
];

function EmbodiedBand() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rxRaw = useMotionValue(0);
  const ryRaw = useMotionValue(0);
  const rotateX = useSpring(rxRaw, { stiffness: 140, damping: 18 });
  const rotateY = useSpring(ryRaw, { stiffness: 140, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ryRaw.set(px * 12);
    rxRaw.set(-py * 9);
  };
  const handleLeave = () => {
    rxRaw.set(0);
    ryRaw.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-6xl mx-auto"
      style={{ perspective: 1300 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-[2rem] shadow-[0_50px_110px_-45px_rgba(11,24,47,0.65)]"
      >
        {/* Background card (clipped, flat) */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#0b182f] via-[#122a3f] to-[#0e2a24]">
          {/* Animated aurora */}
          <motion.div
            className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-[#7ae582]/25 blur-[110px]"
            animate={prefersReducedMotion ? {} : { x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-28 -right-10 w-[28rem] h-[28rem] rounded-full bg-[#16BAC5]/25 blur-[120px]"
            animate={prefersReducedMotion ? {} : { x: [0, -50, 0], y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          {/* Floating particles */}
          {!prefersReducedMotion &&
            [
              { l: '14%', t: '26%', d: 6, c: '#7ae582' },
              { l: '82%', t: '20%', d: 7, c: '#16BAC5' },
              { l: '68%', t: '72%', d: 8, c: '#9fe6ef' },
              { l: '24%', t: '78%', d: 9, c: '#7ae582' },
              { l: '46%', t: '16%', d: 7, c: '#9fe6ef' },
            ].map((p, k) => (
              <motion.span
                key={k}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ left: p.l, top: p.t, background: p.c, boxShadow: `0 0 12px ${p.c}` }}
                animate={{ y: [0, -18, 0], opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: k * 0.6 }}
              />
            ))}
        </div>

        {/* Content layers (3D depth) */}
        <div className="relative px-7 sm:px-12 md:px-16 py-14 md:py-20 text-center" style={{ transformStyle: 'preserve-3d' }}>
          <div style={{ transform: 'translateZ(30px)' }}>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.28em] uppercase text-[#7ae582] mb-6">
              <span className="w-8 h-px bg-[#7ae582]/60" />
              Our Philosophy
              <span className="w-8 h-px bg-[#7ae582]/60" />
            </span>
          </div>

          <h3
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white mb-6"
            style={{ fontFamily: 'Outfit, sans-serif', transform: 'translateZ(60px)' }}
          >
            Embodied{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7ae582] to-[#16BAC5]">
              Intelligence
            </span>
          </h3>

          <p
            className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto"
            style={{ transform: 'translateZ(40px)' }}
          >
            We build intelligence into systems, machines, and robots — models that don&apos;t just{' '}
            <span className="text-white font-semibold">process data</span>, but{' '}
            <span className="text-[#7ae582] font-semibold">think</span>,{' '}
            <span className="text-[#9fe6ef] font-semibold">act</span>, and{' '}
            <span className="text-[#16BAC5] font-semibold">relate</span>.
          </p>

          {/* Three pillars */}
          <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mt-12 text-left" style={{ transform: 'translateZ(75px)' }}>
            {PILLARS.map((pillar, k) => (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + k * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm p-5 md:p-6 hover:bg-white/[0.1] hover:border-white/25 transition-all duration-300"
              >
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                  style={{ background: `${pillar.tint}1f`, color: pillar.tint, boxShadow: `0 0 22px ${pillar.tint}33` }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                    {pillar.icon}
                  </svg>
                </span>
                <h4 className="text-lg font-bold text-white mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {pillar.label}
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutSection() {
  const { ref, inView } = useInView(0.25);
  const prefersReducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(my, { stiffness: 50, damping: 18 });
  const rotY = useSpring(mx, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e: MouseEvent) => {
      mx.set(((e.clientX / window.innerWidth) * 2 - 1) * 8);
      my.set(-((e.clientY / window.innerHeight) * 2 - 1) * 6);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my, prefersReducedMotion]);

  return (
    <section id="about" className="section section--divider divider-light relative overflow-hidden">
      <div className="container mx-auto px-6">

        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0b182f] mb-4">
            About Us
          </h2>
        </div>

        {/* Two-column: Rootie left slides in, Vision/Mission right */}
        <div ref={ref} className="grid md:grid-cols-2 gap-8 lg:gap-10 items-center mb-14">

          {/* Left — Rootie + Chat */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Rootie standing freely — no panel/box */}
            <div className="relative w-[300px] sm:w-[340px] md:w-[380px] aspect-[4/5]">
              {/* Soft ambient glow behind the mascot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full bg-[#7ae582]/12 blur-3xl pointer-events-none" />

              {/* Ground shadow — keeps Rootie grounded, not floating */}
              <div className="absolute bottom-[26px] left-1/2 -translate-x-1/2 w-28 h-4 rounded-[100%] bg-black/15 blur-md" />

              {/* Mascot */}
              <div className="absolute inset-0 flex items-end justify-center pb-8" style={{ perspective: 800 }}>
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'easeInOut' }}
                  style={{ rotateX: prefersReducedMotion ? 0 : rotX, rotateY: prefersReducedMotion ? 0 : rotY, transformStyle: 'preserve-3d' }}
                >
                  <Image
                    src="/rootie_wave.png"
                    alt="Rootie — RootStock AI Mascot"
                    width={420}
                    height={500}
                    className="object-contain w-[190px] sm:w-[215px] md:w-[240px] h-auto select-none pointer-events-none drop-shadow-[0_16px_22px_rgba(20,50,20,0.16)]"
                    draggable={false}
                  />
                </motion.div>
              </div>
            </div>


            {/* Chat with Rootie — sits below the mascot */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <RootieChat />
            </motion.div>
          </motion.div>

          {/* Right — Vision & Mission stacked */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[1.5rem] border border-[#D4C9B8]/60 flex flex-col transition-all duration-500 hover:border-[#3a6b38]/30 hover:shadow-lg group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#415b3e]/10 text-[#415b3e] group-hover:bg-[#415b3e]/20 transition-colors">
                    <VisionIcon />
                  </span>
                  <h3 className="text-2xl font-bold text-[#0b182f] group-hover:text-[#3a6b38] transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Vision
                  </h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To lead the world in AI-powered evaluation and decision systems, enabling every individual and organization to make confident, informed choices.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-[1.5rem] border border-[#D4C9B8]/60 flex flex-col transition-all duration-500 hover:border-[#3a6b38]/30 hover:shadow-lg group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#0b182f]/8 text-[#0b182f] group-hover:bg-[#0b182f]/15 transition-colors">
                    <MissionIcon />
                  </span>
                  <h3 className="text-2xl font-bold text-[#3a6b38] group-hover:text-[#0b182f] transition-colors" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Mission
                  </h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We design intuitive, emotion-aware AI tools that translate complexity into clarity. We democratize access to sophisticated decision systems, embedding trust, transparency, and ethical intelligence into every product.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Embodied Intelligence — immersive 3D statement band */}
        <EmbodiedBand />

      </div>
    </section>
  );
}
