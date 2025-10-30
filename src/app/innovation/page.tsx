import Image from 'next/image';

export default function InnovationPage() {
  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16">
        {/* Subtle animated background visuals */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#16BAC5]/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#7AE582]/20 blur-3xl animate-pulse" />
          {/* Animated decorative wave lines (seamless tiling) */}
          <svg className="absolute -bottom-6 left-0 right-0 w-[300%] -ml-[100%] opacity-40" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Fast layer - 3 tiles, scroll 0 -> -33.333% */}
            <g className="wave-scroll-seamless">
              <g className="wave-bob">
                <path d="M0 60 C 180 120 360 0 540 60 C 720 120 900 0 1080 60 C 1260 120 1440 0 1620 60" stroke="#16BAC5" strokeOpacity="0.28" strokeWidth="2" />
                <path d="M0 60 C 180 120 360 0 540 60 C 720 120 900 0 1080 60 C 1260 120 1440 0 1620 60" stroke="#16BAC5" strokeOpacity="0.28" strokeWidth="2" transform="translate(1440,0)" />
                <path d="M0 60 C 180 120 360 0 540 60 C 720 120 900 0 1080 60 C 1260 120 1440 0 1620 60" stroke="#16BAC5" strokeOpacity="0.28" strokeWidth="2" transform="translate(2880,0)" />
              </g>
            </g>
            {/* Slow parallax layer - 3 tiles, reverse direction */}
            <g className="wave-scroll-seamless-slow">
              <g className="wave-bob">
                <path d="M0 90 C 180 150 360 30 540 90 C 720 150 900 30 1080 90 C 1260 150 1440 30 1620 90" stroke="#7AE582" strokeOpacity="0.28" strokeWidth="2" />
                <path d="M0 90 C 180 150 360 30 540 90 C 720 150 900 30 1080 90 C 1260 150 1440 30 1620 90" stroke="#7AE582" strokeOpacity="0.28" strokeWidth="2" transform="translate(1440,0)" />
                <path d="M0 90 C 180 150 360 30 540 90 C 720 150 900 30 1080 90 C 1260 150 1440 30 1620 90" stroke="#7AE582" strokeOpacity="0.28" strokeWidth="2" transform="translate(2880,0)" />
              </g>
            </g>
          </svg>
        </div>
        {/* Back button */}
        <a href="/" className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 px-3 py-1.5 text-gray-800 hover:bg-white shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L9.56 9.5H16a.75.75 0 010 1.5H9.56l3.21 3.21a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06.02z" clipRule="evenodd"/></svg>
          <span>Back</span>
        </a>
        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Where Artificial Intelligence Meets Emotional Intelligence
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mt-5 max-w-3xl mx-auto">
              RootStock Technology’s Research & Innovation Lab explores the frontier of AI and human emotion — developing technologies that don’t just process data, but understand it.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a href="#innovations" className="btn btn-primary">Explore Innovations</a>
              <a href="/#contact" className="btn btn-outline">Collaborate With Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Innovations */}
      <section id="innovations" className="py-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Innovations</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: Audio-to-Emotion Recognition */}
            <article className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-lg transition group">
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image src="/Tech/emotion-aware-ai.png" alt="Audio-to-Emotion" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" />
              </div>
              <div className="mt-4">
                <div className="text-[#16BAC5] font-bold text-xs tracking-wider">Audio-to-Emotion Recognition</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">Understanding Human Emotion Through Sound.</h3>
                <p className="text-gray-700 mt-2">
                  Our research in audio-based emotional intelligence analyzes vocal tones, stress levels, and context to recognize emotions in real time.
                </p>
                <ul className="text-gray-700 mt-3 list-disc list-inside space-y-1">
                  <li><span className="font-medium">Safety Zone Project:</span> Detect distress emotions in critical environments.</li>
                  <li><span className="font-medium">Clinical Context-Aware Emotion Recognition:</span> Interpret emotional states with contextual cues.</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">Authors: Research Lead: [Your Name]; Team: Rootstock AI Research Division</p>
                <div className="mt-4">
                  <a href="/blog/audio-to-emotion" className="text-[#16BAC5] font-semibold hover:underline">Read Full Research Blog →</a>
                </div>
              </div>
            </article>

            {/* Card 2: LLM Pipeline Architecture */}
            <article className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-lg transition group">
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image src="/Tech/Context-First Processing.png" alt="LLM Pipeline Architecture" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" />
              </div>
              <div className="mt-4">
                <div className="text-[#16BAC5] font-bold text-xs tracking-wider">LLM Pipeline Architecture for Contextual Integrity</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">Making Large Language Models Smarter and More Reliable.</h3>
                <p className="text-gray-700 mt-2">
                  We developed a pipeline to guide LLMs in synthesizing insights from multiple documents without repetition or hallucination — ensuring context-aware accuracy and document harmony.
                </p>
                <ul className="text-gray-700 mt-3 list-disc list-inside space-y-1">
                  <li>Reduces redundant information</li>
                  <li>Preserves factual consistency</li>
                  <li>Customizable across domain-specific LLMs</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">Authors: Research Lead: [Your Name]; Team: Rootstock AI Research Division</p>
                <div className="mt-4">
                  <a href="/blog/llm-pipeline" className="text-[#16BAC5] font-semibold hover:underline">Explore the LLM Pipeline →</a>
                </div>
              </div>
            </article>

            {/* Card 3: Emotional Intelligence Research */}
            <article className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-lg transition group">
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image src="/Tech/Human-Robot Collaboration.png" alt="Emotional Intelligence Research" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" />
              </div>
              <div className="mt-4">
                <div className="text-[#16BAC5] font-bold text-xs tracking-wider">Emotional Intelligence Research</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">Teaching Machines to Feel Responsibly.</h3>
                <p className="text-gray-700 mt-2">
                  Rootstock’s EI research fuses empathy with computation, exploring how AI can respond with emotional awareness — bridging the gap between logic and human connection.
                </p>
                <div className="mt-4">
                  <a href="/blog/emotional-intelligence" className="text-[#16BAC5] font-semibold hover:underline">Dive Into Emotional AI →</a>
                </div>
              </div>
            </article>

            {/* Card 4: Music 4D Project */}
            <article className="rounded-2xl bg-white p-6 border border-gray-200 shadow-sm hover:shadow-lg transition group">
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-gray-100">
                <Image src="/Tech/eduction.png" alt="Music 4D Project" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" />
              </div>
              <div className="mt-4">
                <div className="text-[#16BAC5] font-bold text-xs tracking-wider">Music 4D Project</div>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">When Music Meets Machine Learning.</h3>
                <p className="text-gray-700 mt-2">
                  An AI-driven system that evaluates musical performance and composition. Combining LLMs with grading algorithms, it assesses score sheets, identifies nuances, and offers constructive feedback.
                </p>
                <div className="mt-4">
                  <a href="/blog/music-4d" className="text-[#16BAC5] font-semibold hover:underline">Discover Music 4D →</a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="rounded-3xl bg-white p-8 md:p-12 border border-gray-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Join Our Journey in Human–Robot Collaboration</h3>
              <p className="text-gray-700 mt-2">We invite researchers, partners, and innovators to co-create the future of emotionally intelligent AI.</p>
            </div>
            <div className="flex items-center gap-3">
              <a className="btn btn-primary" href="/#contact">Collaborate With Us</a>
              <a className="btn btn-secondary" href="mailto:research@rootstock.tech">Submit Your Research Idea</a>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Research Evolution</h3>
          <div className="relative pl-6 border-l-2 border-gray-200 space-y-8">
            <div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-[#16BAC5]" />
            <div>
              <div className="text-xs font-semibold text-gray-500">2023</div>
              <div className="text-gray-900 font-semibold">Audio-to-Emotion</div>
              <p className="text-gray-700">Real-time emotion recognition from voice signals for safety and healthcare.</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">2024</div>
              <div className="text-gray-900 font-semibold">LLM Pipeline for Contextual Integrity</div>
              <p className="text-gray-700">Document-aware synthesis ensuring consistency and reduced redundancy.</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500">2025</div>
              <div className="text-gray-900 font-semibold">Music 4D</div>
              <p className="text-gray-700">Assessing composition and performance with LLMs and grading algorithms.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


