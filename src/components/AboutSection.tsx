'use client';

import { useState, useEffect, useRef } from 'react';
import CarouselNavigation from './CarouselNavigation';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const coreValuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const handlePrevClick = () => {
    if (coreValuesRef.current) {
      const scrollAmount = coreValuesRef.current.clientWidth * 0.5;
      coreValuesRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    if (coreValuesRef.current) {
      const scrollAmount = coreValuesRef.current.clientWidth * 0.5;
      coreValuesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const coreValues = [
    { icon: "🚀", value: "Innovation", desc: "Pushing boundaries of AI", measure: "3+ patents pending" },
    { icon: "🔒", value: "Reliability", desc: "Delivering consistent solutions", measure: "99.9% uptime guarantee" },
    { icon: "👁️", value: "Transparency", desc: "Every answer shows sources & confidence", measure: "100% explainable AI" },
    { icon: "🌍", value: "Accessibility", desc: "Making advanced tools usable for all", measure: "Free tier always available" },
    { icon: "⭐", value: "Excellence", desc: "Striving for the highest quality", measure: "90% user satisfaction" }
  ];

  return (
    <section id="about" className="section section--divider divider-light relative overflow-hidden bg-gray-50">

      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0B3762] mb-4">About Us</h2>
        </div>

        {/* Vision & Mission - timeline split */}
        <div className="relative mb-20">
          {/* vertical connector on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" aria-hidden="true"></div>
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                <h3 className="text-2xl font-bold text-[#7AE582] mb-4 group-hover:scale-[1.02] transition-transform">Vision</h3>
                <p className="text-lg text-gray-700 leading-relaxed flex-grow group-hover:text-[#0B3762] transition-colors">
                  To become the industry leader in AI-powered evaluation and decision solutions — enabling organizations and individuals to make <span className="font-semibold">confident, informed choices</span>.
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-[#7AE582] text-sm font-medium group-hover:scale-105 transition-transform">
                    🎯 Leading the Future
                  </div>
                </div>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                <h3 className="text-2xl font-bold text-[#16BAC5] mb-4 group-hover:scale-[1.02] transition-transform">Mission</h3>
                <div className="flex-grow">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4 group-hover:text-[#0B3762] transition-colors">
                    We design intuitive, <span className="font-semibold">emotion-aware AI tools</span> that translate complexity into clarity.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed group-hover:text-[#0B3762] transition-colors">
                    We democratize access to sophisticated decision systems, embedding <span className="font-semibold">trust, transparency, and ethical intelligence</span> into every product.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-[#16BAC5] text-sm font-medium group-hover:scale-105 transition-transform">
                    🚀 Building Tomorrow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why RootStock Exists - stepped cards */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why RootStock Exists</h3>
            <div className="text-2xl font-bold text-[#16BAC5] mb-4">
              Most platforms give more data.<br />
              We give <span className="text-[#0B3762]">more meaning</span>.
            </div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              In a world drowning in information, people don't need another chart, metric, or dashboard.
            </p>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mt-4">
              They need <span className="font-semibold">translation</span> — AI that can answer:
            </p>
          </div>
          <div className="mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#7AE582]/50">
                <h4 className="text-xl font-bold text-[#7AE582] italic">What does this mean?</h4>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#16BAC5]/50">
                <h4 className="text-xl font-bold text-[#16BAC5] italic">What does it mean for me?</h4>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#7AE582]/50">
                <h4 className="text-xl font-bold text-[#7AE582] italic">What should I do now?</h4>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-gray-900">
                That's the RootStock philosophy: <span className="text-[#7AE582] font-bold">Decisions, not dashboards.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Core Values - auto-scrolling carousel */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-[#16BAC5] mb-4">Core Values</h3>
          </div>
          <div
            role="region"
            aria-label="Core Values carousel"
            className="group relative overflow-hidden max-w-6xl mx-auto carousel-container"
          >
            {/* Edge fade masks */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"
              aria-hidden="true"
            ></div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"
              aria-hidden="true"
            ></div>
            <CarouselNavigation 
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
            />
            <div ref={coreValuesRef} className="overflow-x-auto scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }} tabIndex={0}>
              <div className="slider-track flex gap-6 focus-within:[animation-play-state:paused]">
                {[...coreValues, ...coreValues].map((value, index) => (
                  <div
                    key={index}
                    className="min-w-[240px] md:min-w-[260px] lg:min-w-[280px] bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/60 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#7AE582]/50"
                  >
                    <div className="text-4xl mb-3 transition-transform duration-300">{value.icon}</div>
                    <div className="font-bold text-gray-900 mb-2">{value.value}</div>
                    <div className="text-sm text-gray-600 mb-2">{value.desc}</div>
                    <div className="text-xs text-[#16BAC5] font-medium">{value.measure}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel styles moved to carousel.css */}
          </div>
        </div>

        {/* Founder's Note - card */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-[#7AE582]">Founder's Note</h3>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="flex items-start mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#16BAC5] to-[#7AE582] rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500 mb-2">Kapil Sharma, Founder & CEO</div>
                <div className="text-sm text-[#16BAC5] font-medium">IIT Delhi • Ex-Goldman Sachs • Ex-Microsoft</div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "When I started RootStock Technology, I saw a gap — not in technology, but in <span className="font-semibold text-[#7AE582]">confidence</span>.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Data is everywhere. Trust is rare.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We built FinSight to change that. Not to give you more data, but to give you <span className="font-semibold text-[#16BAC5]">what matters</span>, delivered in a way that feels like a trusted colleague guiding you through uncertainty.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This isn't the future of AI. This is the future of <span className="font-semibold text-[#7AE582]">human decision-making — enhanced, not replaced</span>."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
