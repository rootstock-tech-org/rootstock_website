"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="max-w-2xl bg-white/20 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/40 shadow-2xl pointer-events-auto"
    >
      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tight text-[var(--foreground)] leading-[1.1] mb-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Intelligence<br />
        <span className="text-[var(--color-brand-primary)]">Engineered</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-[var(--foreground)]/80 leading-relaxed font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Advanced AI solutions bridging human-robot collaboration, FinTech, EdTech, and Business Optimization.
      </motion.p>
    </motion.div>
  );
}
