import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { workItems, workStats } from '@/data/work';

export const metadata: Metadata = {
  title: 'Our work | RootStock Technology',
  description: 'AI systems RootStock has built and shipped across learning, industrial safety, financial research, e-commerce and document processing.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <Header activeSection="work" />
      <main className="work-page">
        <section className="work-hero">
          <div className="b2b-container">
            <Link className="b2b-back-link" href="/">← Home</Link>
            <p className="b2b-eyebrow">Proof of work</p>
            <h1>Built, shipped,<br /><em>in use.</em></h1>
            <p className="work-hero-lead">Every screen on these pages comes from a system that runs, in production, on a client site, or in pilot with its users.</p>
            <dl className="work-stats">
              {workStats.map((stat, index) => <div key={stat.label} data-reveal="up" style={{ '--reveal-i': index } as CSSProperties}><dt>{stat.label}</dt><dd>{stat.figure}</dd></div>)}
            </dl>
          </div>
        </section>
        <section className="b2b-section work-index">
          <div className="b2b-container">
            <ul className="work-grid">
              {workItems.map((item, index) => <li key={item.slug} data-reveal="up" style={{ '--reveal-i': index % 3 } as CSSProperties}>
                <Link href={`/work/${item.slug}`} className="work-card">
                  <span className={`work-card-cover${item.shots[0].width / item.shots[0].height > 3 ? ' is-wide' : ''}`}><Image src={item.shots[0].src} alt="" width={item.shots[0].width} height={item.shots[0].height} sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 420px" /></span>
                  <span className="work-card-meta"><span>{item.number} / {item.sector}</span>{item.status && <span className="work-status">{item.status}</span>}</span>
                  <strong>{item.title}</strong>
                  <span className="work-card-tagline">{item.tagline}</span>
                  <span className="work-card-link">{item.shots.length} screens <span aria-hidden="true">↗</span></span>
                </Link>
              </li>)}
            </ul>
          </div>
        </section>
        <section className="b2b-detail-cta"><div className="b2b-container"><p className="b2b-eyebrow">Start with one use case</p><h2>Want something like this?</h2><p>Tell us about the process you want to improve. We’ll show you what we have already built that fits it.</p><Link className="b2b-button b2b-button-primary" href="/#contact">Discuss a pilot <span aria-hidden="true">↗</span></Link></div></section>
      </main>
      <Footer />
    </>
  );
}
