import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { featuredWorkSlugs, getWorkItem, workItems, type WorkItem } from '@/data/work';

const featured = featuredWorkSlugs.map(getWorkItem).filter((item): item is WorkItem => Boolean(item));

export default function WorkStrip() {
  return <section id="proof" className="b2b-section b2b-work work-strip" aria-labelledby="work-strip-heading"><div className="b2b-container">
    <div className="b2b-section-heading b2b-heading-light">
      <div><p className="b2b-eyebrow" data-reveal="up">Proof of work</p><h2 id="work-strip-heading">Built, shipped,<br /><em>in use.</em></h2></div>
      <p>{workItems.length} products running in production, on client sites or in pilot. Every screen comes from a system that runs.</p>
    </div>
    <ul className="work-strip-grid">
      {featured.map((item, index) => <li key={item.slug} data-reveal="up" style={{ '--reveal-i': index } as CSSProperties}>
        <Link href={`/work/${item.slug}`} className="b2b-work-card work-strip-card">
          <span className="work-strip-cover"><Image src={item.shots[0].src} alt="" width={item.shots[0].width} height={item.shots[0].height} sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 320px" /></span>
          <span className="b2b-work-card-top"><span>{item.number} / {item.sector}</span>{item.status && <span className="b2b-status">{item.status}</span>}</span>
          <h3>{item.title}</h3>
          <p>{item.tagline}</p>
          <span className="b2b-work-card-bottom">See the screens <span aria-hidden="true">↗</span></span>
        </Link>
      </li>)}
    </ul>
    <Link className="work-strip-all" href="/work">See all {workItems.length} products <span aria-hidden="true">↗</span></Link>
  </div></section>;
}
