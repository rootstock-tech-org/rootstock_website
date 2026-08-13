'use client';

import { motion } from 'framer-motion';

import React from 'react';

const clients = [
  {
    name: "Definedge Securities",
    logo: "/client_logos/definedge.png",
  },
  {
    name: "ACE",
    logo: "/client_logos/ace.png",
  },
  // Saket Metal Technocraft — no longer a client (commented out)
  // {
  //   name: "Saket Metal Technocraft",
  //   logo: "/client_logos/saket_metal.jpeg",
  // },
  {
    name: "Indira Securities",
    logo: "/client_logos/indira-securities-pvt-ltd.avif",
  },
  {
    name: "VIPS University",
    logo: "/client_logos/vips.png",
  },
  {
    name: "IIIT Delhi Incubation Centre",
    logo: "/client_logos/iiitd_ic.png",
  },
  {
    name: "Prakhar Group",
    logo: "/client_logos/prakhar.png",
  },
  {
    name: "Digitech Solutions",
    logo: "/client_logos/Digitech.png",
  }
];

// Repeat the set so the ribbon fills wide screens, then render it twice for a
// seamless -50% loop.
const loop = [...clients, ...clients, ...clients, ...clients];

const LogoPill = ({ logo, name }: { logo: string; name: string }) => (
  <div className="group shrink-0 mx-4 md:mx-5">
    <div className="relative flex items-center justify-center h-28 w-52 md:h-32 md:w-64 rounded-2xl bg-white/80 backdrop-blur-xl border border-[#e5e7eb]/50 shadow-sm transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_45px_-15px_rgba(47, 168, 216,0.35)] group-hover:border-[#2fa8d8]/40 overflow-hidden">
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#35c8ff]/10 via-transparent to-[#2fa8d8]/10" />
      <img
        src={logo}
        alt={name}
        className="relative z-10 max-h-14 md:max-h-16 max-w-[72%] object-contain opacity-100 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
        onError={(e) => { e.currentTarget.src = '/globe.svg'; }}
      />
    </div>
    <span className="block mt-3 text-center text-xs font-semibold tracking-wide text-gray-600 group-hover:text-gray-900 transition-colors duration-500">
      {name}
    </span>
  </div>
);

export default function ClientsSection() {
  return (
    <section id="clients" className="section section--divider divider-light pt-10 pb-24 bg-[#f7f8fa] overflow-hidden relative">
      {/* Marquee animation + hover pause */}
      <style>{`
        @keyframes clients-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .clients-marquee-track {
          animation: clients-marquee 32s linear infinite;
          width: max-content;
        }
        .clients-marquee:hover .clients-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .clients-marquee-track { animation: none; }
        }
      `}</style>

      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#35c8ff]/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-14 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-section text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight"
          >
            Clients &amp; Partners
          </motion.h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Trusted by industry leaders and institutions to deliver innovative solutions.
          </p>
        </div>

        {/* Infinite marquee ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="clients-marquee relative w-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="clients-marquee-track flex items-center py-4">
            {[...loop, ...loop].map((client, idx) => (
              <LogoPill key={idx} logo={client.logo} name={client.name} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

