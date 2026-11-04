'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CompactDemo, { type DemoKind } from './CompactDemo';

const slides: { label: string; headline: string; description: string; demo: DemoKind }[] = [
  { label: 'Manufacturing', headline: 'Drawings in. Costs out.', description: 'Upload a part drawing and get an estimate your engineers can check, line by line.', demo: 'cad' },
  { label: 'Education', headline: 'Learning you can see.', description: 'Lessons that explain with visuals, voice and hands-on 3D labs, drawn from your own course books.', demo: 'education' },
  { label: 'Finance', headline: 'Rules first. Trades second.', description: 'Every signal is checked against your strategy and risk limits before anything reaches the market.', demo: 'trading' },
]

// One sentence per line so short two-part headlines never break mid-phrase.
const headlineLines = (headline: string) => headline.split(/(?<=\.)\s+/).map(line => <span key={line} className="apple-hero-line">{line}</span>);

export default function HeroSection() {
  const host = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (host.current) observer.observe(host.current);
    updateMotion(); updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { observer.disconnect(); media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);

  const changeSlide = useCallback((index: number) => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    if (index === active || reducedMotion) {
      setActive(index);
      setLeaving(false);
      return;
    }
    setLeaving(true);
    transitionTimer.current = setTimeout(() => {
      setActive(index);
      setLeaving(false);
      transitionTimer.current = null;
    }, 350);
  }, [active, reducedMotion]);

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
  }, []);

  const rotating = visible && pageVisible && !reducedMotion;
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => changeSlide((active + 1) % slides.length), 10_000);
    return () => window.clearTimeout(timer);
  }, [active, rotating, changeSlide]);

  const slide = slides[active];
  return <section ref={host} id="home" className="b2b-hero apple-hero" aria-label="RootStock AI solutions" aria-roledescription="carousel">
    <div className="b2b-container apple-hero-inner">
      <div className="apple-hero-copy">
        <p className="apple-hero-eyebrow">RootStock · Applied AI</p>
        <div className="apple-hero-tabs" role="group" aria-label="Choose an industry">
          {slides.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} onClick={() => { changeSlide(index); }}>{item.label}</button>)}
        </div>
        <div className={`hero-copy-stack hero-soft-transition ${leaving ? 'is-leaving' : ''}`} aria-live="off">
          {slides.map((item, index) => <div key={item.label} className={`hero-copy-slide ${index === active ? 'is-active' : ''}`} aria-hidden={index !== active}>
            {index === active ? <h1>{headlineLines(item.headline)}</h1> : <p className="hero-heading-placeholder">{headlineLines(item.headline)}</p>}
            <p className="apple-hero-sub">{item.description}</p>
          </div>)}
        </div>
        <div className="apple-hero-actions"><Link className="apple-hero-cta" href="/#contact">Discuss a pilot</Link><Link className="apple-hero-link" href="/#solutions">Explore solutions <span aria-hidden="true">›</span></Link></div>
      </div>
      <div className={`apple-hero-stage hero-soft-transition ${leaving ? 'is-leaving' : ''}`}>
        <div className="hero-demo-transition" key={slide.demo}><CompactDemo kind={slide.demo}/></div>
      </div>
    </div>
  </section>;
}
