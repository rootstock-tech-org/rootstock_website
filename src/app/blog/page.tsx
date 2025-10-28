"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";

type Post = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  slug: string;
};

const builtinPosts: Post[] = [
  {
    title: "AI + Human Collaboration",
    excerpt: "Exploring the future of human–AI partnerships in decision-making.",
    date: "Dec 15, 2024",
    readTime: "4 min",
    category: "Blog",
    image: undefined, // You can place an image under /public/blog/your-image.jpg and set path here
    slug: "ai-human-collaboration",
  },
  {
    title: "Emotional Intelligence in AI",
    excerpt: "How emotional awareness transforms AI from tools to trusted advisors.",
    date: "Dec 10, 2024",
    readTime: "6 min",
    category: "Article",
    image: undefined,
    slug: "emotional-intelligence-in-ai",
  },
  {
    title: "Case Studies & Whitepapers",
    excerpt: "Real-world applications and deep technical insights.",
    date: "Dec 5, 2024",
    readTime: "12 min",
    category: "Research",
    image: undefined,
    slug: "case-studies-and-whitepapers",
  },
  {
    title: "Responsible AI in Finance",
    excerpt: "Principles and practices for risk-aware, transparent AI systems.",
    date: "Nov 28, 2024",
    readTime: "7 min",
    category: "Blog",
    image: undefined,
    slug: "responsible-ai-in-finance",
  },
  {
    title: "Designing Trust into Products",
    excerpt: "Why trust isn’t a feature, it’s the foundation.",
    date: "Nov 22, 2024",
    readTime: "5 min",
    category: "Article",
    image: undefined,
    slug: "designing-trust-into-products",
  },
  {
    title: "Explainable AI: A Practical Guide",
    excerpt: "A pragmatic approach to XAI with examples and trade-offs.",
    date: "Nov 14, 2024",
    readTime: "9 min",
    category: "Guide",
    image: undefined,
    slug: "explainable-ai-practical-guide",
  },
];

export default function BlogIndexPage() {
  const [customPosts, setCustomPosts] = useState<Post[]>([]);
  const [serverPosts, setServerPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Blog", "Article", "Research", "Guide", "Case Study"];

  useEffect(() => {
    try {
      const raw = localStorage.getItem("customPosts");
      if (raw) {
        const parsed = JSON.parse(raw) as Array<any>;
        // Coerce to Post shape
        const normalized: Post[] = parsed.map((p) => ({
          title: p.title,
          excerpt: p.excerpt,
          date: p.date,
          readTime: p.readTime,
          category: p.category,
          image: p.image,
          slug: p.slug,
        }));
        setCustomPosts(normalized);
      }
    } catch {}
  }, []);

  // Load shared posts from API
  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then((data: Post[]) => setServerPosts(data))
      .catch(() => {});
  }, []);

  const allPosts = useMemo(() => {
    const merged = [...serverPosts, ...customPosts, ...builtinPosts];
    // Deduplicate by slug preserving first occurrence (server overrides local/builtin)
    const seen = new Set<string>();
    const deduped = merged.filter(p => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
    // Sort newest first by date
    return deduped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [customPosts, serverPosts]);
  
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") {
      return allPosts;
    }
    
    return allPosts.filter(post => post.category === activeCategory);
  }, [allPosts, activeCategory]);

  return (
    <main className="bg-gray-900 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#16BAC5]/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#7AE582]/25 blur-3xl" />

        <div className="container mx-auto px-6 pt-16 pb-8">
          <div className="max-w-3xl">
            <p className="text-[#7AE582] font-semibold tracking-widest uppercase text-xs mb-3">Insights</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              Perspectives on AI, design, and product
            </h1>
            <p className="text-gray-300 text-lg mt-4">
              Practical, honest writing on building ethical, transparent AI for real-world decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Filters (non-functional placeholders) */}
      <section>
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  category === activeCategory
                    ? "bg-white text-gray-900 border-white"
                    : "border-white/20 text-white/80 hover:text-white hover:border-white/40"
                }`}
                aria-pressed={category === activeCategory}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.length > 0 ? filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-[#7AE582]/40 hover:shadow-[0_10px_40px_rgba(10,180,140,0.12)] transition-all"
              >
                {/* Image / Placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-[#16BAC5]/20 to-[#7AE582]/20">
                  {post.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#16BAC5] to-[#7AE582] flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 006.5 22h11a2.5 2.5 0 002.5-2.5v-11A2.5 2.5 0 0017.5 6H8l-4 4v9.5z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7AE582]">{post.category}</span>
                    <span className="text-xs text-white/60">{post.date} • {post.readTime}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-semibold text-white group-hover:text-[#7AE582] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/80 text-sm mt-2 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-semibold text-[#7AE582] hover:text-white transition-colors"
                    >
                      Read more →
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7AE582]" />
                      <span>New</span>
                    </div>
                  </div>
                </div>
              </article>
            )) : (
              <div className="col-span-full py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="text-xl font-semibold text-white">No posts found in this category</h3>
                <p className="text-white/70 mt-2">Try selecting a different category or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">Get new posts in your inbox</h3>
              <p className="text-white/80 mt-1">No spam. Just helpful insights, once or twice a month.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto flex items-center gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full md:w-80 rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7AE582]"
                required
              />
              <button
                className="rounded-xl bg-gradient-to-r from-[#7AE582] to-[#16BAC5] text-gray-900 font-semibold px-5 py-3 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7AE582]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
