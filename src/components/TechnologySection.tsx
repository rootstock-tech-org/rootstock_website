'use client';

import { motion } from 'framer-motion';
import React from 'react';

const domains = [
  {
    title: "Business Optimization",
    products: []
  },
  {
    title: "EdTech",
    products: [
      {
        slug: 'edu-stream-pipeline',
        title: 'EduStream',
        description: 'Content ingestion that understands context, turning your existing materials into searchable intelligence without losing the nuance of how your learners think.'
      },
      {
        slug: 'conservatory-grade',
        title: 'MusicGrade',
        description: 'Assessment that speaks the language of your tradition, grading music as it is performed in your context, not against a one-size-fits-all standard.'
      }
    ]
  },
  {
    title: "FinTech",
    products: [
      {
        slug: 'finsight',
        title: 'Finsight',
        description: 'Upload any financial document, chart, PDF, or screenshot and get the insights your broker never had time to explain.'
      }
    ]
  }
];

const experioAI = {
  title: "experio ai",
  description: "Exploring artistic, fun, and human-centric AI experiences.",
  products: [
    {
      slug: 'sentience-vision',
      title: 'SentienceVision',
      description: 'Emotion AI trained to read the signals people actually show, reflective of the expressions and gestures that vary across communities and regions.'
    },
    {
      slug: 'persona-fit-engine',
      title: 'Virtual Fit Studio',
      description: 'Try-on that fits the way real people dress: body diversity, local sizing standards, and regional style sensibilities reflected from the first preview.'
    }
  ]
};

const ProductCard = ({ product }: { product: { slug: string; title: string; description: string } }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-[#FCFBF9] transition-all duration-500 flex flex-col h-full group">
    <h4 className="text-lg font-bold font-outfit tracking-wide text-gray-900 group-hover:text-[#415b3e] transition-colors duration-300 mb-2">
      {product.title}
    </h4>
    <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">
      {product.description}
    </p>
    <a href={`/products/${product.slug}`} className="inline-flex items-center text-sm font-semibold text-[#415b3e] hover:underline mt-auto pt-4 border-t border-gray-200/50">
      Learn more
      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </div>
);

export default function TechnologySection() {
  return (
    <section id="technology" className="section section--divider divider-light pt-10 pb-24 bg-[#FCFBF9]">
      <div className="container mx-auto px-6 max-w-[90rem]">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-section text-4xl md:text-5xl font-outfit text-gray-900 mb-4 tracking-tight"
          >
            Our Domains
          </motion.h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Cutting-edge AI solutions tailored for diverse industries.
          </p>
        </div>

        {/* Top Row: 3 Domains */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-gray-200 flex flex-col h-full relative overflow-hidden"
            >
              {/* Soft background glow for domains */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#415b3e]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

              <div className="flex items-start justify-between mb-8 pb-4 border-b border-gray-100 relative z-10">
                <h3 className="text-2xl font-bold font-outfit text-gray-900">{domain.title}</h3>
              </div>

              <div className="flex-grow flex flex-col relative z-10">
                {domain.products.length > 0 ? (
                  <div className="flex flex-col space-y-4 flex-grow">
                    {domain.products.map((product, pIdx) => (
                      <ProductCard key={pIdx} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center min-h-[160px] text-gray-400 italic bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    Solutions coming soon
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Row: Experio AI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white p-6 md:p-10 rounded-[1.5rem] border border-gray-200 relative overflow-hidden"
        >
          {/* Subtle colorful glow for Experio AI */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[#16BAC5]/5 to-[#7ae582]/5 rounded-full blur-3xl -mt-64 pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-100 relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-3xl font-bold font-outfit text-gray-900 capitalize">{experioAI.title}</h3>
                <span className="bg-gradient-to-r from-[#16BAC5] to-[#7ae582] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Innovation Hub
                </span>
              </div>
              <p className="text-gray-500">{experioAI.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {experioAI.products.map((product, pIdx) => (
              <ProductCard key={pIdx} product={product} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}