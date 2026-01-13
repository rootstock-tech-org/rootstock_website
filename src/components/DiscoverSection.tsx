"use client";

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function DiscoverSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll reveal for elements inside this section using existing CSS in globals.css
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const revealEls = Array.from(root.querySelectorAll(".reveal"));
    if (revealEls.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Unobserve once revealed for performance
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section section--divider divider-light bg-gradient-to-r from-dark/10 via-secondary/10 to-primary/10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10 reveal">
          <h2 className="heading-section text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3">Discover RootStock</h2>
          <p className="lead text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our vision and see how FinSight brings it to life for Indian investors
          </p>
        </div>

        {/* Two cards side by side */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Vision & Mission Card */}
          <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl reveal">
            <div className="relative">
              <Image
                src="/Our Vision & Mission.png"
                alt="Vision & Mission"
                width={1200}
                height={800}
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="heading-section text-xl sm:text-2xl text-gray-900 mb-4">Vision & Mission</h3>
              <p className="lead text-gray-700 text-sm sm:text-base mb-6">
                Leading the world in AI-powered evaluation and decision systems for confident, human-aware choices.
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li className="flex items-start gap-3 reveal"><span className="text-secondary mt-1">•</span><span className="text-sm sm:text-base">Context-first AI that blends data, signals, and human factors</span></li>
                <li className="flex items-start gap-3 reveal"><span className="text-primary mt-1">•</span><span className="text-sm sm:text-base">Transparent, ethical, and explainable outcomes</span></li>
                <li className="flex items-start gap-3 reveal"><span className="text-[#5FBFF9] mt-1">•</span><span className="text-sm sm:text-base">Built for real-world decisions, not just dashboards</span></li>
              </ul>
              <div className="flex flex-col items-center gap-3">
                <a href="#about" className="btn bg-white text-[#415b3e] border border-[#415b3e] hover:bg-gray-50 animate-pulse-glow text-sm sm:text-base px-6 py-2 rounded-full font-semibold">Learn More</a>
                <a href="#demo" className="btn text-gray-600 hover:text-[#415b3e] text-sm sm:text-base font-medium">See a 30-sec Demo</a>
              </div>
            </div>
          </div>

          {/* FinSight Card */}
          <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl reveal">
            <div className="relative">
              <Image
                src="/FinSight.png?v=2"
                alt="FinSight Product"
                width={1200}
                height={800}
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="heading-section text-xl sm:text-2xl text-gray-900 mb-4">FinSight: Your Investing Companion</h3>
              <p className="lead text-gray-700 text-sm sm:text-base mb-6">
                Not another data app. FinSight translates broker notes & news into plain, personalised answers — for Indian investors.
              </p>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li className="flex items-start gap-3 reveal"><span className="text-secondary mt-1">•</span><span className="text-sm sm:text-base">WhatsApp + Web companion, 24×7</span></li>
                <li className="flex items-start gap-3 reveal"><span className="text-primary mt-1">•</span><span className="text-sm sm:text-base">Actionable summaries from complex reports</span></li>
                <li className="flex items-start gap-3 reveal"><span className="text-[#5FBFF9] mt-1">•</span><span className="text-sm sm:text-base">Personalised to your portfolio and risk</span></li>
              </ul>
              <div className="flex flex-col items-center gap-3">
                <a href="#FinSight" className="btn bg-white text-[#415b3e] border border-[#415b3e] hover:bg-gray-50 animate-pulse-glow text-sm sm:text-base px-6 py-2 rounded-full font-semibold">Learn More</a>
                <a href="#demo" className="btn text-gray-600 hover:text-[#415b3e] text-sm sm:text-base font-medium">See a 30-sec Demo</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
