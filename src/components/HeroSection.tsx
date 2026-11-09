'use client';

import { useEffect, useState } from 'react';
import HeroShowcase from './HeroShowcase';

const TAGLINE = 'Intelligence, engineered.';
const TYPE_MS = 60;

export default function HeroSection() {
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(TAGLINE.length);
      return;
    }
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= TAGLINE.length) window.clearInterval(timer);
    }, TYPE_MS);
    return () => window.clearInterval(timer);
  }, []);
  const done = typed >= TAGLINE.length;

  return <section id="home" className="home-hero">
    <div className="b2b-container home-hero-grid">
      <div className="home-hero-copy">
        {/* The hidden copy reserves the full width so the line never reflows while typing. */}
        <p className="home-tagline"><span className="home-tagline-layout" aria-hidden="true">{TAGLINE}</span><span className="home-tagline-typed" aria-hidden="true">{TAGLINE.slice(0, typed)}<span className={done ? 'home-caret is-done' : 'home-caret'}/></span><span className="sr-only">{TAGLINE}</span></p>
        <h1>We build AI<br/> that helps people<br/> learn, see and decide.</h1>
        <p className="home-hero-lead">AI tutors, interactive labs, vision systems and assistants, built around your content, data and workflows.</p>
        <a href="#work" className="home-button">Explore our work <span aria-hidden="true">↓</span></a>
      </div>
      <HeroShowcase/>
    </div>
  </section>;
}
