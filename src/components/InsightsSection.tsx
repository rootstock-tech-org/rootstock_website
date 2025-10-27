"use client";

import { useRef } from 'react';
import CarouselNavigation from './CarouselNavigation';

export default function InsightsSection() {
  const insightsRef = useRef<HTMLDivElement>(null);

  const handlePrevClick = () => {
    if (insightsRef.current) {
      const scrollAmount = insightsRef.current.clientWidth * 0.5;
      insightsRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    if (insightsRef.current) {
      const scrollAmount = insightsRef.current.clientWidth * 0.5;
      insightsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  const insights = [
    {
      title: "AI + Human Collaboration",
      description: "Exploring the future of human-AI partnerships in decision-making.",
      type: "BLOG",
      date: "Dec 15, 2024",
      readTime: "4 min",
      image: "/insights/ai-human-collaboration.jpg"
    },
    {
      title: "Emotional Intelligence in AI",
      description: "How emotional awareness transforms AI from tools to trusted advisors.",
      type: "ARTICLE", 
      date: "Dec 10, 2024",
      readTime: "6 min",
      image: "/insights/emotional-ai.jpg"
    },
    {
      title: "Case Studies & Whitepapers",
      description: "Real-world applications and deep technical insights.",
      type: "RESEARCH",
      date: "Dec 5, 2024",
      readTime: "12 min",
      image: "/insights/case-studies.jpg"
    }
  ];

  return (
    <section id="insights" className="section section--divider divider-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-section text-4xl md:text-5xl text-gray-900 mb-4">Insights</h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Thought leadership on AI + human collaboration and emotional intelligence in decision-making
          </p>
        </div>
        
        {/* Marquee container */}
        <div className="group relative overflow-hidden max-w-6xl mx-auto mb-16 carousel-container" role="region" aria-label="Insights carousel">
          {/* Edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent to-transparent z-10" aria-hidden="true"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-transparent to-transparent z-10" aria-hidden="true"></div>
          <CarouselNavigation 
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
          <div ref={insightsRef} className="overflow-x-auto scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }} tabIndex={0}>
            <div className="slider-track flex gap-8 focus-within:[animation-play-state:paused]">
              {[...insights, ...insights].map((insight, index) => (
                <div 
                  key={index} 
                  className="min-w-[280px] md:min-w-[360px] lg:min-w-[380px] bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 hover:border-[#7AE582]/30 group overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-[#16BAC5]/20 to-[#7AE582]/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#16BAC5] to-[#7AE582] rounded-full mx-auto mb-4 flex items-center justify-center">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* Type and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[#7AE582] text-sm font-semibold uppercase tracking-wider group-hover:scale-110 transition-transform duration-300">{insight.type}</div>
                      <div className="text-gray-400 text-xs">{insight.date}</div>
                    </div>
                    
                  <h3 className="heading-section text-xl text-gray-900 mb-3 group-hover:text-[#7AE582] transition-colors duration-300">{insight.title}</h3>
                  <p className="lead text-gray-700 mb-4 group-hover:text-gray-900 transition-colors duration-300">{insight.description}</p>
                    
                    {/* Removed read link and read-time display */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Carousel styles moved to carousel.css */}
        </div>
        
        {/* See All Posts Link */}
        <div className="text-center">
          <a href="/blog" className="btn btn-primary text-lg">
            See All Posts
          </a>
        </div>
      </div>
    </section>
  );
}
