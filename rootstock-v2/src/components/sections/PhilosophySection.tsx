"use client";

import { motion } from "framer-motion";

const philosophies = [
  {
    title: "Think",
    description: "Cognitive models designed to understand context and intent.",
  },
  {
    title: "Act",
    description: "Autonomous execution systems to seamlessly solve complex problems.",
  },
  {
    title: "Relate",
    description: "Empathetic interfaces fostering genuine human-robot collaboration.",
  }
];

export default function PhilosophySection() {
  return (
    <div id="philosophy" className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 gap-6">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="mb-4"
      >
        <h2 className="text-4xl md:text-6xl font-display font-semibold text-[var(--foreground)] tracking-tight mb-4">
          Embodied<br />
          <span className="text-[var(--color-brand-primary)]">Intelligence</span>
        </h2>
        <p className="text-lg text-[var(--foreground)]/70">
          Our core philosophy drives everything we build.
        </p>
      </motion.div>

      {philosophies.map((phil, idx) => (
        <motion.div
          key={phil.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: idx * 0.2, duration: 0.6 }}
          className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-lg transition-shadow"
        >
          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-2">{phil.title}</h3>
          <p className="text-[var(--foreground)]/70">{phil.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
