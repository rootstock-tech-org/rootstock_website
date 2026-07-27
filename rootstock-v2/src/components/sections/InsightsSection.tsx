"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import posts from "@/data/posts.json";

export default function InsightsSection() {
  return (
    <section id="insights" className="py-24 px-6 md:px-12 bg-white/5 border-t border-white/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-[var(--foreground)] tracking-tight mb-4">
            Insights & <span className="text-[var(--color-brand-primary)]">Research</span>
          </h2>
          <p className="text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Deep technical insights, case studies, and perspectives on the future of AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm font-medium text-[var(--foreground)]/50">
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors">
                {post.title}
              </h3>
              <p className="text-[var(--foreground)]/70 flex-grow mb-6">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-[var(--color-brand-primary)] flex items-center gap-2 mt-auto">
                Read Article
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
