'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import React, { useRef } from 'react';

const domains = [
  {
    title: 'Business Optimization',
    accent: '#3a6b38',
    description: 'End-to-end AI for manufacturers and enterprises.',
    products: [
      { slug: 'inventoai',  title: 'InvenSync',  description: 'AI powered inventory intelligence for manufacturers.' },
      { slug: 'costingai',  title: 'CostEngine', description: 'Automated component costing from engineering drawings.' },
      { slug: 'gateai',     title: 'GateFlow',   description: 'AI powered inbound material control for factory gates.' },
    ],
  },
  {
    title: 'EdTech',
    accent: '#1a6fa8',
    description: 'Learning systems built around context and tradition.',
    products: [
      { slug: 'edu-stream-pipeline', title: 'EduStream',  description: 'Content ingestion that understands context, turning your existing materials into searchable intelligence without losing the nuance of how your learners think.' },
      { slug: 'conservatory-grade',  title: 'MusicGrade', description: 'Assessment that speaks the language of your tradition, grading music as it is performed in your context, not against a one-size-fits-all standard.' },
    ],
  },
  {
    title: 'FinTech',
    accent: '#7c3aed',
    description: 'Finance made legible for everyone.',
    products: [
      { slug: 'finsight', title: 'Finsight', description: 'Upload any financial document, chart, PDF, or screenshot and get the insights your broker never had time to explain.' },
    ],
  },
  {
    title: 'Experio AI',
    accent: '#0e9488',
    badge: 'Innovation Hub',
    description: 'Exploring artistic, fun, and human-centric AI experiences.',
    products: [
      { slug: 'sentience-vision',   title: 'SentienceVision',   description: 'Emotion AI trained to read the signals people actually show, reflective of the expressions and gestures that vary across communities and regions.',  ctaText: 'Try the product' },
      { slug: 'persona-fit-engine', title: 'Virtual Fit Studio', description: 'Try-on that fits the way real people dress: body diversity, local sizing standards, and regional style sensibilities reflected from the first preview.', ctaText: 'Try the product' },
    ],
  },
];

type Domain = (typeof domains)[number];
type Product = { slug: string; title: string; description: string; ctaText?: string };

const ProductCard = ({ product, accent }: { product: Product; accent: string }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white/85 backdrop-blur-sm p-6 rounded-2xl border border-[#D4C9B8]/60 transition-all duration-300 flex flex-col h-full group relative overflow-hidden hover:shadow-lg"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${accent}0f 0%, transparent 60%)` }}
      />
      <div className="flex flex-col h-full relative z-10">
        <h4 className="text-xl font-bold font-serif tracking-wide text-gray-900 mb-3 transition-colors duration-300">
          {product.title}
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6 transition-colors duration-300">
          {product.description}
        </p>
        <a
          href={`/products/${product.slug}`}
          className="inline-flex items-center text-sm font-bold mt-auto pt-4 border-t border-gray-100 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
          style={{ color: accent }}
        >
          {product.ctaText || 'Learn more'}
          <svg className="w-5 h-5 ml-1 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

function StackCard({
  domain,
  i,
  total,
  progress,
}: {
  domain: Domain;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();
  // As later cards stack on top, earlier cards recede slightly (deck depth).
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="stack-slot h-screen sticky top-0 flex items-center justify-center px-4 md:px-6">
      <motion.div
        style={{
          scale: prefersReducedMotion ? 1 : scale,
          top: `calc(-6vh + ${i * 34}px)`,
        }}
        className="stack-card relative w-full max-w-[1240px] min-h-[68vh] flex flex-col rounded-[32px] border border-[#D4C9B8]/60 bg-[#FBFAF7]/95 backdrop-blur-sm shadow-[0_30px_80px_-24px_rgba(0,0,0,0.28)] overflow-hidden origin-top"
      >
        {/* Accent top bar */}
        <div className="h-1.5 w-full" style={{ background: domain.accent }} />

        <div className="p-10 md:p-16 flex-grow flex flex-col justify-center">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-7 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: domain.accent }}>
                  {`0${i + 1}`}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 capitalize">
                  {domain.title}
                </h3>
                {domain.badge && (
                  <span
                    className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest text-white"
                    style={{ background: domain.accent }}
                  >
                    {domain.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-500 max-w-xl">{domain.description}</p>
            </div>
          </div>

          {/* Products */}
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))' }}
          >
            {domain.products.map((product) => (
              <ProductCard key={product.slug} product={product} accent={domain.accent} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      {/* Mobile: unstack into normal flow */}
      <style>{`
        @media (max-width: 767px) {
          .stack-slot {
            height: auto !important;
            position: relative !important;
            display: block !important;
            margin-bottom: 1.5rem;
          }
          .stack-card {
            top: 0 !important;
            transform: none !important;
          }
        }
      `}</style>

      <section id="technology" className="section section--divider divider-light pt-10 relative">
        <div className="text-center pt-10 pb-4 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-section text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight"
          >
            Our Domains
          </motion.h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Cutting-edge AI solutions tailored for diverse industries.
          </p>
        </div>

        {/* Scroll-stacking deck */}
        <div ref={containerRef} className="relative pb-[12vh]">
          {domains.map((domain, i) => (
            <StackCard
              key={domain.title}
              domain={domain}
              i={i}
              total={domains.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </section>
    </>
  );
}
