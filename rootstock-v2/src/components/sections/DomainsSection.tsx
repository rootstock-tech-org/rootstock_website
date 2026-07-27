"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";

export default function DomainsSection() {
  return (
    <div id="domains" className="flex flex-col gap-8 px-8 md:px-16 py-24">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="mb-4"
      >
        <h2 className="text-4xl md:text-6xl font-display font-semibold text-[var(--foreground)] tracking-tight mb-4">
          Our <span className="text-[var(--color-brand-primary)]">Ecosystem</span>
        </h2>
        <p className="text-lg text-[var(--foreground)]/70 max-w-xl">
          A comprehensive suite of 8 flagship products designed to transform industries.
        </p>
      </motion.div>

      {products.map((product, idx) => (
        <motion.div
          key={product.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white/30 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-sm hover:shadow-xl transition-all group"
        >
          <div className="text-sm font-semibold tracking-widest uppercase text-[var(--color-brand-primary)] mb-2">
            {product.industry}
          </div>
          <h3 className="text-3xl font-semibold text-[var(--foreground)] mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors">
            {product.title}
          </h3>
          <p className="text-xl font-medium text-[var(--foreground)]/90 mb-4">
            {product.tagline}
          </p>
          <p className="text-[var(--foreground)]/70 leading-relaxed mb-6">
            {product.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {product.features.slice(0, 3).map((feature, i) => (
              <span key={i} className="px-3 py-1 bg-white/40 rounded-full text-xs font-medium text-[var(--foreground)]/80">
                {feature.substring(0, 40)}{feature.length > 40 ? '...' : ''}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
