import Link from 'next/link';
import type { CSSProperties } from 'react';
import posts from '@/data/posts.json';
import RevealHeading from './RevealHeading';

type Post = { slug: string; title: string; excerpt: string; category: string; readTime?: string };

// Dates are left off on purpose: the archive is older than the site redesign and would read as stale here.
const latest = (posts as Post[]).slice(0, 3);

export default function LatestInsights() {
  return <section id="insights" className="b2b-section b2b-insights"><div className="b2b-container">
    <div className="b2b-section-heading">
      <div><p className="b2b-eyebrow" data-reveal="up">Insights</p><RevealHeading lines={['How we think', <em key="e">about applied AI.</em>]}/></div>
      <Link className="b2b-text-link" href="/blog" data-reveal="up">All insights <span aria-hidden="true">→</span></Link>
    </div>
    <div className="b2b-insight-grid">
      {latest.map((post, index) => <Link key={post.slug} href={`/blog/${post.slug}`} className="b2b-insight-card" data-reveal="up" style={{ '--reveal-i': index } as CSSProperties}>
        <span className="b2b-insight-meta">{post.category}{post.readTime ? ` · ${post.readTime}` : ''}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="b2b-insight-more">Read <span aria-hidden="true">→</span></span>
      </Link>)}
    </div>
  </div></section>;
}
