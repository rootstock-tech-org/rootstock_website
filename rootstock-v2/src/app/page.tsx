"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import MascotCanvas from "@/components/MascotCanvas";
import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import DomainsSection from "@/components/sections/DomainsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ClientsSection from "@/components/sections/ClientsSection";
import EthicsSection from "@/components/sections/EthicsSection";
import InsightsSection from "@/components/sections/InsightsSection";
import CareersContactSection from "@/components/sections/CareersContactSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  const scrollyTellingRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollyTellingRef,
    offset: ["start start", "end end"],
  });

  // Calculate layout animations based on scrollYProgress.
  // The scrollyTelling area total height is 950vh, minus 100vh viewport = 850vh scrollable distance.
  const canvasWidth = useTransform(
    scrollYProgress,
    [0, 25 / 850, 150 / 850, 300 / 850, 350 / 850, 400 / 850, 650 / 850, 700 / 850, 750 / 850, 1],
    ["100vw", "100vw", "50vw", "50vw", "100vw", "50vw", "50vw", "100vw", "50vw", "50vw"]
  );

  const canvasX = useTransform(
    scrollYProgress,
    [0, 25 / 850, 150 / 850, 300 / 850, 350 / 850, 400 / 850, 650 / 850, 700 / 850, 750 / 850, 1],
    ["0vw", "0vw", "0vw", "0vw", "0vw", "50vw", "50vw", "0vw", "0vw", "0vw"]
  );

  return (
    <main className="relative min-h-screen bg-[var(--background)]">
      <Navbar />

      {/* ───── SCROLLYTELLING ZONE ───── */}
      <div ref={scrollyTellingRef} className="relative">
        
        {/* ONE SINGLE STICKY CANVAS BACKGROUND */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0 pointer-events-none">
          <motion.div 
            style={{ width: canvasWidth, x: canvasX }} 
            className="h-full relative origin-left"
          >
            <MascotCanvas progress={scrollYProgress} />
          </motion.div>
        </div>

        {/* CONTENT SECTIONS OVERLAY */}
        <div className="relative z-10 pointer-events-none -mt-[100vh]">
          
          {/* ── HERO ── */}
          <div className="h-[200vh]">
            <div className="h-screen w-full flex items-center px-6 md:px-12 pointer-events-auto">
              <HeroSection />
            </div>
          </div>

          {/* ── PHILOSOPHY ── (Canvas goes LEFT, Text on RIGHT) */}
          <div className="flex min-h-[200vh] justify-end relative">
            <div className="w-full md:w-1/2 pointer-events-auto sticky top-0 pt-[2vh] pb-24 h-fit">
              <PhilosophySection />
            </div>
          </div>

          {/* ── DOMAINS ── (Canvas goes RIGHT, Text on LEFT) */}
          <div className="flex min-h-[350vh] justify-start relative">
            <div className="w-full md:w-1/2 pointer-events-auto sticky top-0 pt-[2vh] pb-24 h-fit">
              <DomainsSection />
            </div>
          </div>

          {/* ── PROCESS ── (Canvas goes LEFT, Text on RIGHT) */}
          <div className="flex min-h-[200vh] justify-end relative">
            <div className="w-full md:w-1/2 pointer-events-auto sticky top-0 pt-[2vh] pb-24 h-fit">
              <ProcessSection />
            </div>
          </div>
        </div>
      </div>

      {/* ───── STANDARD FLOW ───── */}
      <div className="relative z-20 w-full bg-[var(--background)]">
        <ClientsSection />
        <EthicsSection />
        <InsightsSection />
        <CareersContactSection />
      </div>

      <FloatingWhatsApp />
    </main>
  );
}
