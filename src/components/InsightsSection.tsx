"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

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
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('customPosts');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setLocalPosts(parsed);
      }
    } catch {}
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
            <div className="slider-track flex gap-8 focus-within:[animation-play-state:paused]">
              {[...posts.map(p => ({...p, _dup: 0})), ...posts.map(p => ({...p, _dup: 1}))].map((insight: any) => (
                <Link
                  href={`/blog/${insight.slug}`}
                  key={`${insight.slug}-${insight._dup ?? 0}`}
                  onClick={(e) => { if (isDragging || dragRef.current.moved) e.preventDefault(); }}
                  className="min-w-[280px] md:min-w-[360px] lg:min-w-[380px] bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 hover:border-[#7AE582]/30 group/card overflow-hidden block focus:outline-none focus:ring-2 focus:ring-[#16BAC5]"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-[#16BAC5]/20 to-[#7AE582]/20 relative overflow-hidden">
                    {insight.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-[#16BAC5] to-[#7AE582] rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    {/* Type and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[#7AE582] text-sm font-semibold uppercase tracking-wider group-hover/card:scale-110 transition-transform duration-300">{insight.category}</div>
                      <div className="text-gray-400 text-xs">{insight.date}</div>
                    </div>
                    
                  <h3 className="heading-section text-xl text-gray-900 mb-3 group-hover/card:text-[#7AE582] transition-colors duration-300">{insight.title}</h3>
                  <p className="lead text-gray-700 mb-4 group-hover/card:text-gray-900 transition-colors duration-300">{insight.excerpt}</p>
                    
                    {/* Removed read link and read-time display */}
                  </div>
                </Link>
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
          <a href="/blog" className="btn btn-primary text-lg">
            See All Posts
          </a>
        </div>
      </div>
    </section>
  );
}
