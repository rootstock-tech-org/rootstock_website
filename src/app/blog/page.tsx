'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Post = {
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
};

const posts: Post[] = [
  {
    title: "Understanding Human Emotion Through Sound",
    excerpt: "Our research in audio-based emotional intelligence analyzes vocal tones, stress levels, and context to recognize emotions in real time. Projects include Safety Zone distress detection and Clinical Context-Aware Emotion Recognition.",
    readTime: "Research",
    category: "Audio-to-Emotion",
    image: "/Tech/emotion-aware-ai.png",
    slug: "audio-to-emotion",
  },
  {
    title: "LLM Pipeline Architecture for Contextual Integrity",
    excerpt: "We developed a pipeline to guide LLMs in synthesizing insights from multiple documents without repetition or hallucination — ensuring context-aware accuracy and document harmony.",
    readTime: "Architecture",
    category: "LLM Pipeline",
    image: "/Tech/Context-First Processing.png",
    slug: "llm-pipeline",
  },
  {
    title: "Teaching Machines to Feel Responsibly",
    excerpt: "RootStock’s EI research fuses empathy with computation, exploring how AI can respond with emotional awareness — bridging the gap between logic and human connection.",
    readTime: "Research",
    category: "Emotional Intelligence",
    image: "/Tech/Human-Robot Collaboration.png",
    slug: "emotional-intelligence",
  },
  {
    title: "When Music Meets Machine Learning",
    excerpt: "An AI-driven system that evaluates musical performance and composition. Combining LLMs with grading algorithms, it assesses score sheets, identifies nuances, and offers constructive feedback.",
    readTime: "Project",
    category: "Music 4D",
    image: "/Tech/eduction.png",
    slug: "music-4d",
  }
];

export default function BlogIndexPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Header activeSection="blog" />
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Research & Insights
            </h1>
            <p className="text-xl text-gray-600">
              Exploring the frontier of AI and human emotion — developing technologies that don't just process data, but understand it.
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-[#415b3e] uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#415b3e] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                    <span className="text-sm font-medium text-gray-400">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Evolution Section (Ported from Innovation) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Research Evolution</h3>
          <div className="relative border-l-2 border-gray-200 ml-4 md:ml-0 space-y-12 md:space-y-0">
            {/* Timeline Item 2023 */}
            <div className="relative md:pl-12 pb-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#415b3e] shadow-[0_0_0_4px_white]"></div>
              <div>
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 mb-2">2023</span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Audio-to-Emotion</h4>
                <p className="text-gray-600">Real-time emotion recognition from voice signals for safety and healthcare.</p>
              </div>
            </div>

            {/* Timeline Item 2024 */}
            <div className="relative md:pl-12 pb-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#415b3e] shadow-[0_0_0_4px_white]"></div>
              <div>
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 mb-2">2024</span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">LLM Pipeline for Contextual Integrity</h4>
                <p className="text-gray-600">Document-aware synthesis ensuring consistency and reduced redundancy.</p>
              </div>
            </div>

            {/* Timeline Item 2025 */}
            <div className="relative md:pl-12">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#415b3e] shadow-[0_0_0_4px_white]"></div>
              <div>
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 mb-2">2025</span>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Music 4D</h4>
                <p className="text-gray-600">Assessing composition and performance with LLMs and grading algorithms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Collaboration */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-[#415b3e] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Research Journey</h3>
              <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
                We invite researchers, partners, and innovators to co-create the future of emotionally intelligent AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/#contact" className="btn bg-white text-[#415b3e] hover:bg-green-50 px-8 py-3.5 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1">
                  Collaborate With Us
                </a>
                <a href="mailto:research@rootstock.tech" className="btn bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3.5 rounded-full font-bold transition-colors">
                  Submit Research Idea
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main >
  );
}
