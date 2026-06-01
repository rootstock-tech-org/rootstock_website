'use client';

import { useState, useEffect } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <section id="about" className="section section--divider divider-light relative overflow-hidden">

      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit text-dark mb-4">About Us</h2>
        </div>

        <div className="relative mb-20">
          {/* vertical connector on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" aria-hidden="true"></div>
          <div className="grid md:grid-cols-2 gap-10 items-stretch">
            <div className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white p-8 md:p-10 rounded-[1.5rem] border border-gray-200 h-full flex flex-col transition-all duration-500 hover:border-gray-300 group">
                <h3 className="text-2xl font-bold font-outfit text-primary mb-4 group-hover:text-[#415b3e] transition-colors">Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed flex-grow">
                  To lead the world in AI-powered evaluation and decision systems, enabling every individual and organization to make confident, informed choices.
                </p>
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

              <div className="bg-white p-8 md:p-10 rounded-[1.5rem] border border-gray-200 h-full flex flex-col transition-all duration-500 hover:border-gray-300 group">
                <h3 className="text-2xl font-bold font-outfit text-secondary mb-4 group-hover:text-[#0b182f] transition-colors">Mission</h3>
                <div className="flex-grow">
                  <p className="text-lg text-gray-600 leading-relaxed mb-4">
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
            <h3 className="text-3xl md:text-4xl font-bold font-outfit text-gray-900 mb-6 tracking-tight">Embodied Intelligence</h3>
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
        </div>


      </div>



    </section>
  );
}
