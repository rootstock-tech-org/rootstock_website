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
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#16BAC5] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      value: "Innovation",
      desc: "We don’t just build AI — we redefine what’s possible.",
      measure: "From patented breakthroughs to emotionally intelligent systems, we’re shaping the next frontier of human–robot collaboration."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#415b3e] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      value: "Reliability",
      desc: "Trust is the foundation of every connection.",
      measure: "Our systems deliver consistent, secure, and dependable performance — ensuring humans can always rely on their digital collaborators."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#16BAC5] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      value: "Transparency",
      desc: "Clarity creates confidence.",
      measure: "Every insight, decision, and interaction is explainable — because understanding builds trust between people and technology."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#415b3e] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      value: "Accessibility",
      desc: "Intelligence should empower everyone.",
      measure: "We design intuitive tools that make advanced AI understandable, ethical, and accessible — regardless of background or expertise."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#16BAC5] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      value: "Empathy",
      desc: "Technology should feel human.",
      measure: "We embed emotional intelligence into every system, creating machines that don’t just respond — they relate."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#415b3e] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      value: "Excellence",
      desc: "We pursue mastery in every line of code and every human interaction.",
      measure: "RootStock stands for quality, precision, and purpose in all we deliver."
    }
  ];

  return (
    <section id="about" className="section section--divider divider-light relative overflow-hidden bg-gray-50">

      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">About Us</h2>
        </div>

        {/* Vision & Mission - timeline split */}
        <div className="relative mb-20">
          {/* vertical connector on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" aria-hidden="true"></div>
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:scale-[1.02] transition-transform">Vision</h3>
                <p className="text-lg text-gray-700 leading-relaxed flex-grow group-hover:text-dark transition-colors">
                  To lead the world in AI-powered evaluation and decision systems — enabling every individual and organization to make confident, informed choices.
                </p>
              </div>
            </div>
            <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

              <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
                <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:scale-[1.02] transition-transform">Mission</h3>
                <div className="flex-grow">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4 group-hover:text-dark transition-colors">
                    We design intuitive, emotion-aware AI tools that translate complexity into clarity. We democratize access to sophisticated decision systems, embedding trust, transparency, and ethical intelligence into every product.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why RootStock Exists - Refined Content */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Embodied Intelligence</h3>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We are RootStock Technology. We build intelligence into systems, machines, and robots.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              As a consultancy firm, we provide embodied intelligence solutions that enable systems to not just process data, but to think, act, and relate.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Our approach balances immediate impact with future innovation: we dedicate ourselves to deploying robust, existing AI models tailored to customer demands while consistently pushing boundaries through pure R&D in new logic pipelines and model architectures.
            </p>
          </div>

          {/* Key Competencies */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="text-[#415b3e] font-bold text-lg mb-2">Syntex & Education</div>
                <p className="text-gray-600">Complete injection pipelines for defining PDFs, audios, and videos into secure educational platforms.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="text-[#415b3e] font-bold text-lg mb-2">Advanced pipelines</div>
                <p className="text-gray-600">Proprietary OCR-to-text models and unique multi-document architecture for synthesizing vast information.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                <div className="text-[#415b3e] font-bold text-lg mb-2">Arts & Emotion</div>
                <p className="text-gray-600">Grading systems for musical conservatories and emotion recognition from static imagery.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values - auto-scrolling carousel */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-secondary mb-4">Core Values</h3>
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
                    className="min-w-[240px] md:min-w-[260px] lg:min-w-[280px] bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/60 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
                  >
                    <div className="text-4xl mb-3 transition-transform duration-300">{value.icon}</div>
                    <div className="font-bold text-gray-900 mb-2">{value.value}</div>
                    <div className="text-sm text-gray-600 mb-2">{value.desc}</div>
                    <div className="text-xs text-secondary font-medium">{value.measure}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel styles moved to carousel.css */}
          </div>
        </div>

      </div>



    </section>
  );
}
