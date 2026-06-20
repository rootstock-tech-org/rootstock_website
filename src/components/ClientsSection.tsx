'use client';

import { motion } from 'framer-motion';

import React from 'react';

const clients = [
  {
    name: "Definedge Securities",
    logo: "/client_logos/definedge.png",
  },
  // {
  //   name: "ACE",
  //   logo: "/client_logos/ace.png",
  // },
  {
    name: "Saket Metal Technocraft",
    logo: "/client_logos/saket_metal.jpeg",
  },
  {
    name: "Indira Securities",
    logo: "/client_logos/indira-securities-pvt-ltd.avif",
  }
];

const ClientCard = ({ logo, name, index }: { logo: string; name: string; index: number }) => {
  return (
    <motion.div 
      className="flex flex-col items-center group cursor-pointer relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full h-28 md:h-36 lg:h-40 z-10">
        
        {/* Animated Background Glow (Behind the glass pane) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 flex items-center justify-center">
          {/* Light Green Orb - Clockwise */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-[60%] h-[60%]"
          >
            <div className="absolute top-0 right-0 w-[70%] h-[70%] bg-[#7ae582] blur-2xl rounded-full opacity-20" />
          </motion.div>

          {/* Cyan Orb - Counter-clockwise */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            className="absolute w-[60%] h-[60%]"
          >
            <div className="absolute bottom-0 left-0 w-[70%] h-[70%] bg-[#16BAC5] blur-2xl rounded-full opacity-20" />
          </motion.div>
        </div>

        {/* Pure Frosted Glass Card */}
        <div className="relative w-full h-full flex items-center justify-center p-6 bg-white/80 backdrop-blur-3xl rounded-2xl z-10 border border-gray-100 transition-all duration-500 overflow-hidden">
          
          {/* Logo with subtle spring animation */}
          <motion.img 
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            src={logo} 
            alt={name} 
            className="relative z-20 max-w-full max-h-full object-contain drop-shadow-sm mix-blend-multiply" 
            onError={(e) => { e.currentTarget.src = '/globe.svg'; }} 
          />
        </div>
      </div>
      
      <span className="mt-6 text-sm font-semibold tracking-wide text-gray-500 group-hover:text-gray-900 transition-colors text-center">
        {name}
      </span>
    </motion.div>
  );
};

export default function ClientsSection() {
  return (
    <section id="clients" className="section section--divider divider-light pt-10 pb-24 bg-[#FCFBF9] overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#7ae582]/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-section text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight"
          >
            Our Clients
          </motion.h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Partnering with industry leaders to deliver innovative solutions.
          </p>
        </div>

        {/* Client logos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-12 max-w-4xl mx-auto">
          {clients.map((client, idx) => (
            <ClientCard key={idx} logo={client.logo} name={client.name} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
