'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CompactDemo, { type DemoKind } from './CompactDemo';
import PilotButton from './PilotButton';

const capabilities: { title: string; detail: string; href: string; demo: DemoKind }[] = [
  { title: 'AI tutors', detail: 'Learning that responds to the learner.', href: '/work/ai-tutor', demo: 'education' },
  { title: 'Interactive labs', detail: 'Space to explore, practise and build.', href: '/work/ai-tutor', demo: 'labs' },
  { title: 'Computer vision', detail: 'Make sense of images and video.', href: '/work/vision-ai', demo: 'vision' },
  { title: 'AI assistants', detail: 'Information made useful in the moment.', href: '/work/research-assistant', demo: 'trading' },
];

export default function HeroSection() {
  const tagline = 'Intelligence, engineered.';
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) { setTyped(tagline.length); return; }
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= tagline.length) window.clearInterval(timer);
    }, 70);
    return () => window.clearInterval(timer);
  }, []);
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const host = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => setRunning(visible && !document.hidden && !media.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .25 });
    if (host.current) observer.observe(host.current);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  useEffect(() => {
    if (!running || paused) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % capabilities.length), 14000);
    return () => window.clearTimeout(timer);
  }, [active, running, paused]);
  const item = capabilities[active];
  return <section ref={host} id="home" className="home-hero"><div className="b2b-container home-hero-grid">
    <div className="home-hero-copy"><p className="home-eyebrow home-typed-tagline"><span className="sr-only">{tagline}</span><span aria-hidden="true">{tagline.slice(0, typed)}<span className={typed >= tagline.length ? 'home-type-caret is-done' : 'home-type-caret'} /></span></p><h1>AI built for <em>real work.</em></h1><p>From AI tutors and interactive labs to vision systems and assistants, we build around the way people learn and work.</p><div className="home-actions"><PilotButton className="home-button">Discuss a pilot <span aria-hidden="true">↗</span></PilotButton><Link href="#capabilities" className="home-text-link">Explore what we build <span aria-hidden="true">↓</span></Link></div></div>
    <div className="home-hero-panel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className="home-panel-top"><span>CAPABILITIES / {String(active + 1).padStart(2, '0')}</span><span>ROOTSTOCK ↗</span></div>
      <div key={item.title} className="home-demo-transition"><h2>{item.title}</h2><CompactDemo kind={item.demo} overview /></div>
      <div className="home-hero-tabs" role="group" aria-label="Choose a capability">{capabilities.map((capability, index) => <button type="button" key={capability.title} aria-pressed={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{capability.title}</button>)}</div>
    </div>
  </div></section>;
}
