'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CompactDemo, { type DemoKind } from './CompactDemo';

const slides: { label: string; headline: string; description: string; demo: DemoKind; caption: string }[] = [
  { label: 'Manufacturing', headline: 'Custom AI for smarter manufacturing.', description: 'Turn CAD drawings into costing workflows and camera feeds into useful safety and vehicle insights. Built around your engineering data and operations.', demo: 'cad', caption: 'From an engineering drawing to a clearer estimate.' },
  { label: 'Education', headline: 'Custom AI that brings learning to life.', description: 'Help learners understand through visual explanations, audio guidance and interactive 3D labs. AI tutors built around your learning material.', demo: 'education', caption: 'From a question to an explanation you can explore.' },
  { label: 'Financial services', headline: 'Custom AI for your trading workflows.', description: 'Connect market signals, trading rules and risk checks. We build trading automation and research assistants around your strategies and data.', demo: 'trading', caption: 'From a market signal to a checked, simulated order.' },
];

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
  return <section ref={host} id="home" className="b2b-hero" aria-label="RootStock AI solutions" aria-roledescription="carousel">
    <div className="b2b-container calm-hero rotating-hero">
      <div>
        <p className="b2b-eyebrow">RootStock / Applied AI</p>
        <div className={`hero-copy-stack hero-soft-transition ${leaving ? 'is-leaving' : ''}`} aria-live="off">
          {slides.map((item, index) => <div key={item.label} className={`hero-copy-slide ${index === active ? 'is-active' : ''}`} aria-hidden={index !== active}>
            {index === active ? <h1>{item.headline}</h1> : <p className="hero-heading-placeholder">{item.headline}</p>}
            <p className="calm-hero-lead">{item.description}</p>
          </div>)}
        </div>
        <div className="calm-actions"><Link className="b2b-button b2b-button-primary" href="/#contact">Discuss a pilot <span aria-hidden="true">↗</span></Link><Link className="b2b-text-link" href="/#solutions">Explore solutions <span aria-hidden="true">↓</span></Link></div>
        <div className="hero-rotation-controls" aria-label="Choose an industry">
          {slides.map((item, index) => <button key={item.label} type="button" aria-pressed={active === index} onClick={() => { changeSlide(index); }}><span aria-hidden="true">0{index + 1}</span>{item.label}</button>)}
        </div>
      </div>
      <div className={`calm-hero-example hero-rotating-example hero-soft-transition ${leaving ? 'is-leaving' : ''}`}>
        <div className="hero-demo-transition" key={slide.demo}><CompactDemo kind={slide.demo}/></div>
        <p>{slide.caption}</p>
      </div>
    </div>
  </section>;
}
