'use client';

import { motion } from 'framer-motion';

const products = [
  {
    slug: 'edu-stream-pipeline',
    title: 'Edu-Stream Pipeline',
    industry: 'Education / Syntex',
    description: 'A secure, multi-format (PDF/Audio/Video) injection engine that turns static content into searchable intelligence.'
  },
  {
    slug: 'rt-ocr',
    title: 'RT-OCR',
    industry: 'Enterprise',
    description: 'Our proprietary OCR-to-Text model designed for high accuracy in complex, non-standard layouts.'
  },
  {
    slug: 'conservatory-grade',
    title: 'Conservatory Grade',
    industry: 'Music / Arts',
    description: 'Automated music sheet analysis and grading—bridging the gap between physical performance and digital assessment.'
  },
  {
    slug: 'sentience-vision',
    title: 'Sentience Vision',
    industry: 'General / Security',
    description: 'Real-time emotion detection from static or live imagery for empathetic AI interaction.'
  },
  {
    slug: 'multi-doc-architect',
    title: 'Multi-Doc Architect',
    industry: 'Legal / Enterprise',
    description: 'A unique pipeline that synthesizes information across hundreds of documents simultaneously.'
  },
  {
    slug: 'persona-fit-engine',
    title: 'Persona-Fit Engine',
    industry: 'Fashion / Retail',
    description: 'A virtual try-on solution using AI-generated avatars of any body type or size. Reduces return rates by 40% through precise neural fabric simulation.'
  }
];

export default function TechnologySection() {
  return (
    <section id="technology" className="section section--divider divider-light pt-10 pb-24 bg-gray-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-section text-4xl md:text-5xl text-gray-900 mb-4 tracking-tight"
          >
            Products
          </motion.h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Cutting-edge AI solutions tailored for diverse industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#415b3e]/10 text-[#415b3e] uppercase tracking-wider mb-3">
                  {product.industry}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#415b3e] transition-colors duration-300">
                  {product.title}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed flex-grow">
                {product.description}
              </p>

              <div className="mt-6 pt-6 border-t border-gray-50">
                <a href={`/products/${product.slug}`} className="inline-flex items-center text-sm font-semibold text-[#415b3e] hover:underline">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}