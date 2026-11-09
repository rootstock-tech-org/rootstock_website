'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import WorkReel from './WorkReel';
import PilotButton from './PilotButton';

export default function HeroSection() {
  const tagline = 'Intelligence, engineered.';
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => { if (motion.matches) setTyped(tagline.length); };
    finish();
    let count = 0;
    const timer = window.setInterval(() => { count += 1; setTyped(value => Math.max(value, count)); if (count >= tagline.length) window.clearInterval(timer); }, 70);
    motion.addEventListener('change', finish);
    return () => { window.clearInterval(timer); motion.removeEventListener('change', finish); };
  }, []);
  return <section id="home" className="home-hero"><svg className="home-circuit" viewBox="0 0 600 600" fill="none" aria-hidden="true"><g stroke="currentColor"><path d="M300 600V280L170 150V50M300 390L440 250V80M300 460L90 250H0M300 530L540 290H600M300 280V0"/><circle cx="170" cy="50" r="7"/><circle cx="440" cy="80" r="7"/></g></svg><div className="b2b-container home-hero-grid"><div className="home-hero-copy"><p className="home-eyebrow">Applied AI. Built around people.</p><h1 className="home-typing-heading"><span className="home-type-layout" aria-hidden="true">Intelligence,<br/>engineered.</span><span className="home-type-visible" aria-hidden="true">{tagline.slice(0, Math.min(13, typed))}<br/>{tagline.slice(14, typed)}<span className={typed >= tagline.length ? 'home-type-caret is-done' : 'home-type-caret'}/></span><span className="sr-only">{tagline}</span></h1><p>AI tutors, interactive labs, vision systems and assistants. Built for the way people learn and work.</p><div className="home-actions"><PilotButton className="home-button">Discuss a pilot <span aria-hidden="true">↗</span></PilotButton><Link href="#solutions" className="home-text-link">See our work ↓</Link></div></div><WorkReel/></div></section>;
}
