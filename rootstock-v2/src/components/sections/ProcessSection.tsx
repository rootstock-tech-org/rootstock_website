"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Deep dive into your operational bottlenecks, data landscape, and strategic goals.",
  },
  {
    number: "02",
    title: "Design",
    description: "Architecting custom models and integration pathways tailored to your exact needs.",
  },
  {
    number: "03",
    title: "Build",
    description: "Rigorous development, training, and testing of empathetic, autonomous systems.",
  },
  {
    number: "04",
    title: "Deploy & Scale",
    description: "Seamless integration into your workflows with continuous monitoring and optimization.",
  }
];

export default function ProcessSection() {
  return (
    <div id="process" className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 gap-6">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="mb-4"
      >
        <h2 className="text-4xl md:text-6xl font-display font-semibold text-[var(--foreground)] tracking-tight mb-4">
          Our <span className="text-[var(--color-brand-primary)]">Process</span>
        </h2>
        <p className="text-lg text-[var(--foreground)]/70">
          A structured approach from conception to global scale.
        </p>
      </motion.div>

      {steps.map((step, idx) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: idx * 0.2, duration: 0.6 }}
          className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm flex gap-6 group hover:bg-white/50 transition-colors"
        >
          <div className="text-4xl font-display font-bold text-white/50 group-hover:text-[var(--color-brand-primary)] transition-colors">
            {step.number}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-2">{step.title}</h3>
            <p className="text-[var(--foreground)]/70">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
