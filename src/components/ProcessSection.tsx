'use client';

import { motion, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    n: '01',
    title: 'Discover',
    accent: '#3a6b38',
    desc: 'We map your problem, data, and constraints to find where intelligence creates real leverage.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    ),
  },
  {
    n: '02',
    title: 'Design',
    accent: '#1a6fa8',
    desc: 'We architect the right models and interfaces, balancing immediate impact with long-term R&D.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    ),
  },
  {
    n: '03',
    title: 'Build',
    accent: '#7c3aed',
    desc: 'We develop robust, production-grade AI tailored to your context, systems, and workflows.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    ),
  },
  {
    n: '04',
    title: 'Deploy & Scale',
    accent: '#0e9488',
    desc: 'We ship, monitor, and continuously improve — turning pilots into lasting capability.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    ),
  },
];

type Step = (typeof steps)[number];

function StepCard({ step, i, noMotion }: { step: Step; i: number; noMotion: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null);
  // Resting tilt so each card looks 3D by default (alternating direction).
  const baseX = 6;
  const baseY = i % 2 === 0 ? 11 : -11;
  const rxRaw = useMotionValue(noMotion ? 0 : baseX);
  const ryRaw = useMotionValue(noMotion ? 0 : baseY);
  const rotateX = useSpring(rxRaw, { stiffness: 150, damping: 16 });
  const rotateY = useSpring(ryRaw, { stiffness: 150, damping: 16 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ryRaw.set(baseY + px * 12);
    rxRaw.set(baseX - py * 12);
  };
  const onLeave = () => {
    if (noMotion) return;
    rxRaw.set(baseX);
    ryRaw.set(baseY);
  };

  return (
    <motion.div
      initial={noMotion ? {} : { opacity: 0, y: 28 }}
      whileInView={noMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
      className="relative h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative h-full rounded-2xl bg-white border border-[#D4C9B8]/60 p-6 md:p-7"
      >
        {/* Tilted 3D floating shadow (sits behind, tilts with the card) */}
        <div
          aria-hidden
          className="absolute -inset-1.5 rounded-[22px] bg-[#0b182f]/25 blur-2xl transition-opacity duration-300 opacity-70 group-hover:opacity-100"
          style={{ transform: 'translateZ(-60px) translateY(14px)' }}
        />
        {/* accent glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(150px 120px at 50% 0%, ${step.accent}16, transparent)` }}
        />
        <div
          className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Node with icon */}
          <div
            className="relative flex items-center justify-center w-[76px] h-[76px] rounded-2xl bg-white border border-[#D4C9B8]/60 shadow-md mb-6"
            style={{ transform: 'translateZ(45px)' }}
          >
            <span style={{ color: step.accent }}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                {step.icon}
              </svg>
            </span>
            <span
              className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-bold text-white shadow"
              style={{ background: step.accent }}
            >
              {step.n}
            </span>
          </div>

          <h3
            className="text-xl font-bold text-[#0b182f] mb-2"
            style={{ fontFamily: 'Outfit, sans-serif', transform: 'translateZ(28px)' }}
          >
            {step.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed" style={{ transform: 'translateZ(18px)' }}>
            {step.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const noMotion = useReducedMotion();

  return (
    <section id="process" className="section section--divider divider-light relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold tracking-[0.28em] uppercase text-[#415b3e] mb-4">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0b182f] mb-4 tracking-tight">
            From idea to intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A clear, collaborative path — from first conversation to systems that think and act in the real world.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} i={i} noMotion={noMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
