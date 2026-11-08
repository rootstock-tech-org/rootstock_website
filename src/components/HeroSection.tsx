'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import CompactDemo, { type DemoKind } from './CompactDemo';

const slides: { label: string; headline: string; description: string; demo: DemoKind }[] = [
  { label: 'Manufacturing', headline: 'Drawings in. Costs out.', description: 'Upload a part drawing and get an estimate your engineers can check, line by line.', demo: 'cad' },
  { label: 'Education', headline: 'Learning you can see.', description: 'A tutor that teaches out loud, builds each slide as it speaks and opens hands-on labs, all from your own course books.', demo: 'education' },
  { label: 'Finance', headline: 'Rules first. Trades second.', description: 'Every signal is checked against your strategy and risk limits before anything reaches the market.', demo: 'trading' },
]

const ROTATE_MS = 10_000;
const TAGLINE_LEAD = 'Intelligence, ';
const TAGLINE_ACCENT = 'engineered.';
const TAGLINE_LENGTH = TAGLINE_LEAD.length + TAGLINE_ACCENT.length;
const TYPE_MS = 70;

// One sentence per line so short two-part headlines never break mid-phrase.
const headlineLines = (headline: string) => headline.split(/(?<=\.)\s+/).map((line, index) => <span key={line} className="apple-hero-line" style={{ '--line-i': index } as CSSProperties}><span>{line}</span></span>);

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

  const [typed, setTyped] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(TAGLINE_LENGTH);
      return;
    }
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => setTyped(count => {
        if (count + 1 >= TAGLINE_LENGTH) window.clearInterval(timer);
        return Math.min(count + 1, TAGLINE_LENGTH);
      }), TYPE_MS);
    }, 300);
    return () => { window.clearTimeout(start); window.clearInterval(timer); };
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
    const timer = window.setTimeout(() => changeSlide((active + 1) % slides.length), ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [active, rotating, changeSlide]);

  const slide = slides[active];
  return <section ref={host} id="home" className="b2b-hero apple-hero" aria-label="RootStock AI solutions" aria-roledescription="carousel">
    <div className="b2b-container apple-hero-inner">
      <div className="apple-hero-copy">
        <p className="apple-hero-eyebrow">
          <span className="sr-only">{TAGLINE_LEAD}{TAGLINE_ACCENT}</span>
          <strong aria-hidden="true">{TAGLINE_LEAD.slice(0, typed)}<em>{TAGLINE_ACCENT.slice(0, Math.max(0, typed - TAGLINE_LEAD.length))}</em></strong>
          <span className={`apple-hero-caret${typed >= TAGLINE_LENGTH ? ' is-done' : ''}`} aria-hidden="true"/>
          <span className={`apple-hero-position${typed >= TAGLINE_LENGTH ? ' is-shown' : ''}`}>Custom AI for manufacturing, finance and education</span>
        </p>
        <div className={`hero-copy-stack hero-soft-transition ${leaving ? 'is-leaving' : ''}`} aria-live="off">
          {slides.map((item, index) => <div key={item.label} className={`hero-copy-slide ${index === active ? 'is-active' : ''}`} aria-hidden={index !== active}>
            {index === active ? <h1>{headlineLines(item.headline)}</h1> : <p className="hero-heading-placeholder">{headlineLines(item.headline)}</p>}
            <p className="apple-hero-sub">{item.description}</p>
          </div>)}
        </div>
        <div className="apple-hero-actions"><Link className="apple-hero-cta" href="/#contact">Discuss a pilot</Link><Link className="apple-hero-link" href="/#solutions">Explore solutions <span aria-hidden="true">›</span></Link></div>
        <div className="apple-hero-progress" role="group" aria-label="Choose an industry">
          {slides.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} onClick={() => { changeSlide(index); }}>
            {item.label}
            <span className="apple-hero-track" aria-hidden="true">{active === index && <span key={`${active}-${rotating}`} className={`apple-hero-fill${rotating ? ' is-running' : ''}`} style={{ animationDuration: `${ROTATE_MS}ms` }}/>}</span>
          </button>)}
        </div>
      </div>
      <div className={`apple-hero-stage hero-soft-transition ${leaving ? 'is-leaving' : ''}`}>
        <div className="hero-demo-transition" key={slide.demo}><CompactDemo kind={slide.demo}/></div>
      </div>
    </div>
  </section>;
}
