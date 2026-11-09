'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const scenes = {
  tutor: { title: 'AI tutors', image: '/work/showcase/tutor-voice-lesson.webp', alt: 'AI tutor presenting a visual lesson' },
  labs: { title: 'Interactive labs', image: '/work/showcase/lab-circuit-3d.webp', alt: 'Interactive learning environment with a three-dimensional circuit' },
  vision: { title: 'Computer vision', image: '/work/showcase/vision-safety-gear.webp', alt: 'Vision system highlighting safety equipment in camera footage' },
  zone: { title: 'Computer vision', image: '/work/showcase/vision-restricted-zone.webp', alt: 'Vision system identifying entry into a restricted area' },
  assistant: { title: 'AI assistants', image: '/work/research-assistant/02-grounded-answer-with-its-sources.webp', alt: 'Research assistant showing an answer with its sources' },
  copilot: { title: 'AI assistants', image: '/work/showcase/copilot-deploy-guardrail.webp', alt: 'Co-pilot helping a user complete a workflow' },
};
const sets = { all: ['tutor', 'labs', 'vision', 'assistant'], education: ['tutor', 'labs'], manufacturing: ['vision', 'zone'], finance: ['assistant', 'copilot'] } as const;

export default function WorkReel({ collection = 'all' }: { collection?: keyof typeof sets }) {
  const host = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const sequence = sets[collection];
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => setEnabled(visible && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .15 });
    if (host.current) observer.observe(host.current);
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); motion.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  useEffect(() => {
    if (!enabled || paused) return;
    const timer = window.setTimeout(() => setIndex(value => (value + 1) % sequence.length), 5500);
    return () => window.clearTimeout(timer);
  }, [index, enabled, paused, sequence.length]);
  const scene = scenes[sequence[index]];
  return <div className="work-reel" ref={host} role="region" aria-label="Examples of our work">
    <div className="work-reel-stage">{sequence.map((key, position) => <div key={key} className={`work-reel-slide${position === index ? ' is-active' : ''}`} aria-hidden={position !== index}><Image src={scenes[key].image} alt={scenes[key].alt} fill sizes="(max-width: 750px) 100vw, 650px" priority={collection === 'all' && position === 0}/></div>)}</div>
    <div className="work-reel-caption"><span>{scene.title}</span><div><button type="button" aria-label="Previous example" onClick={() => setIndex(value => (value + sequence.length - 1) % sequence.length)}>←</button><button type="button" aria-label={paused ? 'Play examples' : 'Pause examples'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Play' : 'Pause'}</button><button type="button" aria-label="Next example" onClick={() => setIndex(value => (value + 1) % sequence.length)}>→</button></div></div>
  </div>;
}
