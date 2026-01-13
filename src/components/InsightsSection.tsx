"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Insight = {
  title: string;
  description: string;
  type: string;
  date: string;
  readTime: string;
};

export default function InsightsSection() {
  const insightsRef = useRef<HTMLDivElement>(null);
  const [serverPosts, setServerPosts] = useState<any[]>([]);
  const [localPosts, setLocalPosts] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startScrollLeft: number; moved: boolean }>({ startX: 0, startScrollLeft: 0, moved: false });
  const adjustingRef = useRef(false);

  const getStepWidth = (): number => {
    const el = insightsRef.current;
    if (!el) return 0;
    const items = el.querySelectorAll('a');
    if (items.length >= 2) {
      const first = items[0] as HTMLElement;
      const second = items[1] as HTMLElement;
      const delta = second.offsetLeft - first.offsetLeft;
      return delta > 0 ? delta : (first.offsetWidth + 32);
    }
    return el.clientWidth * 0.5;
  };

  const handlePrevClick = () => {
    const el = insightsRef.current;
    if (!el) return;
    el.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
  };

  const handleNextClick = () => {
    const el = insightsRef.current;
    if (!el) return;
    el.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
  };
  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then((data) => setServerPosts(Array.isArray(data) ? data : []))
      .catch(() => { });
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('customPosts');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLocalPosts(parsed);
      }
    } catch { }
  }, []);

  const posts = useMemo(() => {
    const merged = [...serverPosts, ...localPosts];
    const seen = new Set<string>();
    const deduped = merged.filter(p => {
      if (!p?.slug) return false;
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
    return deduped
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);
  }, [serverPosts, localPosts]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!insightsRef.current) return;
    setIsDragging(true);
    dragRef.current.startX = e.clientX;
    dragRef.current.startScrollLeft = insightsRef.current.scrollLeft;
    dragRef.current.moved = false;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !insightsRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 4) dragRef.current.moved = true;
    insightsRef.current.scrollLeft = dragRef.current.startScrollLeft - dx;
  };

  const endDrag = () => setIsDragging(false);

  // Keep carousel infinite by jumping between the two duplicated sets
  const onScroll = () => {
    const el = insightsRef.current;
    if (!el || adjustingRef.current) return;
    const total = el.scrollWidth;
    const half = total / 2; // width of one full set
    const max = total - el.clientWidth;
    if (half <= 0) return;
    if (el.scrollLeft < 1) {
      adjustingRef.current = true;
      el.scrollLeft = el.scrollLeft + half;
      requestAnimationFrame(() => (adjustingRef.current = false));
    } else if (el.scrollLeft > half + 1) {
      adjustingRef.current = true;
      el.scrollLeft = el.scrollLeft - half;
      requestAnimationFrame(() => (adjustingRef.current = false));
    }
  };

  // After posts load, start at midpoint so user can scroll both ways
  useEffect(() => {
    const el = insightsRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      const half = el.scrollWidth / 2;
      if (half > 0) el.scrollLeft = half;
    });
    return () => cancelAnimationFrame(id);
  }, [posts.length]);

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
        <div className="flex items-center justify-center gap-3 max-w-6xl mx-auto mb-16">
          <button
            onClick={handlePrevClick}
            aria-label="Previous posts"
            className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-gray-200 text-gray-800 shadow-md hover:bg-white/60 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mx-auto">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="group relative overflow-hidden flex-1 carousel-container rounded-2xl" role="region" aria-label="Insights carousel">
            {/* Edge masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent to-transparent z-10" aria-hidden="true"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-transparent to-transparent z-10" aria-hidden="true"></div>
            <div
              ref={insightsRef}
              className="overflow-x-auto no-scrollbar scroll-smooth select-none cursor-grab active:cursor-grabbing px-6"
              style={{ WebkitOverflowScrolling: 'touch' }}
              tabIndex={0}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onScroll={onScroll}
            >
              <div className="slider-track flex gap-8 focus-within:[animation-play-state:paused] py-8">
                {[...posts.map(p => ({ ...p, _dup: 0 })), ...posts.map(p => ({ ...p, _dup: 1 }))].map((insight: any) => (
                  <motion.div
                    key={`${insight.slug}-${insight._dup ?? 0}`}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link
                      href={`/blog/${insight.slug}`}
                      onClick={(e) => { if (isDragging || dragRef.current.moved) e.preventDefault(); }}
                      className="min-w-[280px] md:min-w-[360px] lg:min-w-[380px] h-full bg-white rounded-[2rem] shadow-sm border border-gray-200 hover:shadow-xl transition-shadow duration-300 group/card overflow-hidden block focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      {/* Image */}
                      <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
                        {insight.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={insight.image}
                            alt={insight.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm">
                                <span className="text-3xl">💡</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-8">
                        {/* Type and Date */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gray-100/50 text-gray-900 border border-gray-200/60 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">{insight.category || 'Article'}</div>
                          <div className="text-gray-400 text-xs font-medium">{insight.date}</div>
                        </div>

                        <h3 className="heading-section text-xl md:text-2xl text-gray-900 mb-3 group-hover/card:text-primary transition-colors duration-300 line-clamp-2">{insight.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-base leading-relaxed">{insight.excerpt}</p>

                        <div className="flex items-center text-primary font-medium text-sm mt-auto group-hover/card:translate-x-1 transition-transform">
                          Read Article
                          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleNextClick}
            aria-label="Next posts"
            className="w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-gray-200 text-gray-800 shadow-md hover:bg-white/60 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mx-auto">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* See All Posts Link */}
        <div className="text-center">
          <Link href="/blog" className="inline-flex items-center justify-center btn bg-white text-gray-900 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg px-8 py-4 rounded-full font-semibold">
            See All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
