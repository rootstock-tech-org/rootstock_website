"use client";
import Image from 'next/image';
import { useRef, useState } from 'react';
import CarouselNavigation from './CarouselNavigation';

export default function TechnologySection() {
  const [activeTab, setActiveTab] = useState<'finance' | 'education' | 'agriculture'>('finance');
  const techCarouselRef = useRef<HTMLDivElement>(null);

  const handlePrevClick = () => {
    if (techCarouselRef.current) {
      const scrollAmount = techCarouselRef.current.clientWidth * 0.5;
      techCarouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    if (techCarouselRef.current) {
      const scrollAmount = techCarouselRef.current.clientWidth * 0.5;
      techCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  const technologyCore = [
    {
      title: "Emotion-Aware AI Core",
      description: "Understands fear, FOMO, risk tolerance — adjusts guidance in real time.",
      image: "/Tech/emotion-aware-ai.png?v=2",
      color: "text-[#7AE582]"
    },
    {
      title: "Context-First Processing",
      description: "Links every answer to your holdings, goals, and time-horizon.",
      image: "/Tech/Context-First Processing.png?v=2",
      color: "text-[#7AE582]"
    },
    {
      title: "Human Robot Collaboration Layer",
      description: "You stay in control; the AI explains options and trade-offs.",
      image: "/Tech/Human-Robot Collaboration.png?v=2",
      color: "text-[#7AE582]"
    }
  ];

  const useCases = [
    {
      title: "Financial",
      description: "Portfolio analysis with emotional context, risk assessment, and behavioral insights for smarter investments.",
      image: "/Tech/finance.png",
      color: "text-[#16BAC5]"
    },
    {
      title: "Corporate",
      description: "Decision support systems that understand organizational context and stakeholder emotions for better outcomes.",
      image: "/Tech/cooperate.png",
      color: "text-[#16BAC5]"
    },
    {
      title: "Educational",
      description: "Learning assessment tools that adapt to student emotional states and learning patterns for personalized education.",
      image: "/Tech/eduction.png",
      color: "text-[#16BAC5]"
    }
  ];

  return (
    <section id="technology" className="section section--divider divider-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-section text-4xl md:text-5xl text-gray-900 mb-4">Technology</h2>
          {/* <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            The stack behind emotion-aware, context-first decisions
          </p> */}
        </div>

        {/* Use Case Examples */}
        <div className="relative mb-24">
          {/* soft background accents */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[52rem] h-40 bg-gradient-to-r from-[#16BAC5]/10 via-transparent to-[#7AE582]/10 blur-3xl rounded-full" aria-hidden="true"></div>
          <div className="text-center mb-12 relative">
            <h3 className="heading-section text-3xl text-[#16BAC5] mb-4">How Our AI + EI Works in the Real World</h3>
            {/* <p className="lead text-gray-700 max-w-2xl mx-auto mb-8">Choose an industry to see our domain intelligence in action</p> */}
          </div>

          {/* Industry Tabs */}
          <div className="flex justify-center mb-10 relative">
            <div
              role="tablist"
              aria-label="Industry examples"
              className="relative bg-gray-100 rounded-full p-1 border border-gray-200 shadow-lg flex overflow-x-auto whitespace-nowrap no-scrollbar"
            >
              <button
                role="tab"
                id="tab-finance"
                aria-controls="panel-finance"
                onClick={() => setActiveTab('finance')}
                className={`flex-none px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16BAC5]/60 ${
                  activeTab === 'finance'
                    ? 'bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                aria-selected={activeTab === 'finance'}
              >
                Finance
              </button>
              <button
                role="tab"
                id="tab-education"
                aria-controls="panel-education"
                onClick={() => setActiveTab('education')}
                className={`flex-none px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16BAC5]/60 ${
                  activeTab === 'education'
                    ? 'bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                aria-selected={activeTab === 'education'}
              >
                Education
              </button>
              <button
                role="tab"
                id="tab-agriculture"
                aria-controls="panel-agriculture"
                onClick={() => setActiveTab('agriculture')}
                className={`flex-none px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16BAC5]/60 ${
                  activeTab === 'agriculture'
                    ? 'bg-gradient-to-r from-[#16BAC5] to-[#7AE582] text-black shadow-md'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                aria-selected={activeTab === 'agriculture'}
              >
                Agriculture
              </button>
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="max-w-5xl mx-auto relative">
            {activeTab === 'finance' && (
              <div id="panel-finance" role="tabpanel" aria-labelledby="tab-finance" className="relative group">
                {/* gradient border frame */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gray-50 via-gray-100 to-transparent blur-sm"></div>
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className="flex items-center mb-5">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#16BAC5] to-[#7AE582] rounded-full flex items-center justify-center mr-4 ring-2 ring-gray-200">
                          <span className="text-xl">₹</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Financial (India)</h4>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Portfolio analysis with context, risk cues, and behavioural nudges — for smarter SIPs and stock picks.
                      </p>
                      <div className="text-sm text-gray-600 mb-5">
                        Beyond FinSight, RootStock's core tech also powers solutions across industries.
                      </div>
                      <a href="#demo" className="btn btn-secondary">
                        See How It Works
                      </a>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <div className="text-xs text-gray-500 mb-2">Live Example</div>
                      <div className="bg-gradient-to-r from-[#16BAC5]/20 to-[#7AE582]/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-[#16BAC5] rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm text-gray-900 font-medium">FinSight AI</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          "NIFTY −1.8% today. For your HDFC Bank SIP and 12-month goal, hold. Your plan already accounts for falls like this."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div id="panel-education" role="tabpanel" aria-labelledby="tab-education" className="relative group">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gray-50 via-gray-100 to-transparent blur-sm"></div>
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className="flex items-center mb-5">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#16BAC5] to-[#7AE582] rounded-full flex items-center justify-center mr-4 ring-2 ring-gray-200">
                          <span className="text-xl">🎓</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Education</h4>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Personalized study plans, concept explanations tuned to student pace and mood, and early confusion detection for timely help.
                      </p>
                      <div className="text-sm text-gray-600 mb-5">
                        Deployable as a classroom assistant or LMS plugin with teacher insights.
                      </div>
                      <a href="#demo" className="btn btn-secondary">
                        See Classroom Demo
                      </a>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <div className="text-xs text-gray-500 mb-2">Live Example</div>
                      <div className="bg-gradient-to-r from-[#16BAC5]/20 to-[#7AE582]/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-[#16BAC5] rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm text-gray-900 font-medium">Tutor AI</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          "You're revising calculus. Based on last quiz, start with a 3‑minute refresher on the chain rule, then try 2 practice problems. Need step‑by‑step hints?"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agriculture' && (
              <div id="panel-agriculture" role="tabpanel" aria-labelledby="tab-agriculture" className="relative group">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-gray-50 via-gray-100 to-transparent blur-sm"></div>
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                      <div className="flex items-center mb-5">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#16BAC5] to-[#7AE582] rounded-full flex items-center justify-center mr-4 ring-2 ring-gray-200">
                          <span className="text-xl">🚜</span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Agriculture</h4>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Crop advisory combining weather, soil, and market signals with nudges to reduce input cost and improve yield; proactive pest alerts.
                      </p>
                      <div className="text-sm text-gray-600 mb-5">
                        Works offline‑first on field devices; supports regional languages.
                      </div>
                      <a href="#demo" className="btn btn-secondary">
                        See Farm Advisory
                      </a>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <div className="text-xs text-gray-500 mb-2">Live Example</div>
                      <div className="bg-gradient-to-r from-[#16BAC5]/20 to-[#7AE582]/20 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-[#16BAC5] rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm text-gray-900 font-medium">Agri AI</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          "Rain probability 70% in next 24h. Delay urea application by 2 days to reduce runoff. Scout for bollworm; set pheromone traps in Block A."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="heading-section text-3xl text-[#7AE582] mb-4">Language Models(L.L.M)</h3>
          </div>
          {/* Auto-revolving carousel */}
          <div className="group relative overflow-hidden max-w-6xl mx-auto carousel-container" role="region" aria-label="Technology core carousel">
            {/* Edge fade masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent to-transparent z-10" aria-hidden="true"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-transparent to-transparent z-10" aria-hidden="true"></div>
            <CarouselNavigation 
              onPrevClick={handlePrevClick}
              onNextClick={handleNextClick}
            />
            <div ref={techCarouselRef} className="overflow-x-auto scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }} tabIndex={0}>
              <div className="slider-track flex gap-6 focus-within:[animation-play-state:paused]">
                {[...technologyCore, ...technologyCore].map((tech, index) => (
                  <div
                    key={index}
                    className="min-w-[260px] md:min-w-[300px] lg:min-w-[320px] bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      <Image
                        src={tech.image}
                        alt={tech.title}
                        width={200}
                        height={120}
                        className="w-full h-32 object-cover rounded-lg shadow-sm"
                        sizes="(min-width: 1024px) 320px, (min-width: 768px) 300px, 260px"
                      />
                    </div>
                    <h3 className={`text-lg font-semibold mb-3 ${tech.color}`}>{tech.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}