'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { outcomes } from '@/data/outcomes';

const COUNT_MS = 1200;

// Counts every number inside a figure such as "2–4" or "< 2" up from zero, keeping the surrounding characters.
const scaleFigure = (figure: string, progress: number) => figure.replace(/\d+/g, digits => String(Math.round(Number(digits) * progress)));

export default function OutcomesStrip() {
  const host = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const element = host.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    let frame = 0;
    setProgress(0);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / COUNT_MS, 1);
        setProgress(1 - Math.pow(1 - t, 3));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .3 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return <section ref={host} className="b2b-outcomes" aria-labelledby="outcomes-heading"><div className="b2b-container">
    <p id="outcomes-heading" className="b2b-eyebrow" data-reveal="up">Typical results</p>
    <dl className="b2b-outcome-grid">
      {outcomes.map((outcome, index) => <div key={outcome.product} className="b2b-outcome" data-reveal="up" style={{ '--reveal-i': index } as CSSProperties}>
        <dt>{outcome.label}</dt>
        <dd>
          <span className="b2b-outcome-figure" aria-label={`${outcome.figure} ${outcome.unit}`}><span aria-hidden="true">{scaleFigure(outcome.figure, progress)}</span><small aria-hidden="true">{outcome.unit}</small></span>
          <Link href={`/products/${outcome.productSlug}`}>{outcome.product} <span aria-hidden="true">↗</span></Link>
        </dd>
      </div>)}
    </dl>
    <p className="b2b-outcome-note">Ranges from our accelerator deployments. Results depend on your process and data.</p>
  </div></section>;
}
