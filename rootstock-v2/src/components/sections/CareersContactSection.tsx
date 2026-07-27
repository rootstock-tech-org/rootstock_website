"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import ConsultationModal from "../ConsultationModal";

export default function CareersContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="careers" className="py-24 px-6 md:px-12 relative overflow-hidden bg-white/20 border-t border-white/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 relative z-10">
          
          {/* Careers / Join Our Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 bg-white/40 backdrop-blur-xl p-10 rounded-3xl border border-white/40 shadow-xl"
          >
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-[var(--foreground)] mb-4">
              Join Our <span className="text-[var(--color-brand-primary)]">Mission</span>
            </h2>
            <p className="text-[var(--foreground)]/70 mb-8 leading-relaxed text-lg">
              We are always looking for visionary AI engineers, creative developers, and product minds who want to build the future of embodied intelligence.
            </p>
            <Link href="/careers" className="inline-block bg-transparent border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] font-semibold px-8 py-3 rounded-full hover:bg-[var(--color-brand-primary)] hover:text-white transition-colors w-full md:w-auto text-center">
              View Open Roles
            </Link>
          </motion.div>

          {/* Contact / Consultation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] p-10 rounded-3xl shadow-xl flex flex-col justify-center text-white"
          >
            <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4">
              Let's Connect
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed text-lg">
              Ready to optimize your business operations or integrate advanced AI into your products? Book a discovery call with our team today.
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[var(--color-brand-primary)] font-semibold px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 transition-all w-full md:w-auto"
            >
              Get Consultation
            </button>
          </motion.div>

        </div>
      </section>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
