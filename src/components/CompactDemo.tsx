'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
export type DemoKind = 'cad' | 'vision' | 'trading' | 'education';

// Real screens from shipped systems; crops live in public/work/showcase/.
type RealShot = { src: string; width: number; height: number; alt: string };
type Example = { label: string; shot: RealShot; result: string };

const cad: RealShot = { src: '/work/showcase/costengine-nesting.webp', width: 503, height: 224, alt: 'CostEngine nesting 14 parts on one 6300 by 1500 mm plate' };
const trading: RealShot = { src: '/work/showcase/copilot-deploy-guardrail.webp', width: 1200, height: 760, alt: 'Investing co-pilot filling a strategy dialog and stopping before the final click' };
const examples: Partial<Record<DemoKind, Example[]>> = {
  vision: [
    { label: 'Safety gear', shot: { src: '/work/showcase/vision-safety-gear.webp', width: 806, height: 730, alt: 'Rootstock Vision AI flagging workers without a helmet or vest on a live camera feed' }, result: '2 without a helmet, 1 without a vest · picture saved' },
    { label: 'Restricted zone', shot: { src: '/work/showcase/vision-restricted-zone.webp', width: 820, height: 730, alt: 'Rootstock Vision AI detecting a person inside a marked loading-bay zone' }, result: 'Person in restricted zone, Loading bay · picture saved' },
  ],
  education: [
    { label: 'Voice lesson', shot: { src: '/work/showcase/tutor-voice-lesson.webp', width: 1200, height: 604, alt: 'Voice AI tutor building a chip design flow slide while it speaks' }, result: 'The tutor speaks and builds each slide as it teaches' },
    { label: 'Simulation', shot: { src: '/work/showcase/lab-waveform.webp', width: 1080, height: 1137, alt: 'Simulated waveform of a traffic-light state machine' }, result: 'Traffic-light design simulated · every signal on the waveform' },
    { label: 'Synthesis', shot: { src: '/work/showcase/lab-synthesis.webp', width: 1012, height: 1200, alt: 'The same design synthesized into a gate-level schematic' }, result: 'Same design synthesized · 26 cells, 5 flip-flops' },
    { label: 'Circuit 3D', shot: { src: '/work/showcase/lab-circuit-3d.webp', width: 1200, height: 983, alt: 'Night-light circuit built on a 3D breadboard' }, result: 'Circuit checked, then built on a 3D breadboard' },
    { label: 'Cross-section', shot: { src: '/work/showcase/lab-cross-section.webp', width: 1200, height: 631, alt: 'CMOS inverter cross-section with live voltage, current and delay' }, result: 'CMOS inverter cross-section · live voltage, current and delay' },
  ],
};
const sources: Record<DemoKind, { label: string; href: string }> = {
  cad: { label: 'Real screen · CostEngine', href: '/products/costingai' },
  vision: { label: 'Real screen · Rootstock Vision AI', href: '/work/vision-ai' },
  trading: { label: 'Real screen · Investing Co-Pilot, paper money', href: '/work/investing-copilot' },
  education: { label: 'Real screens · Voice AI Tutor and Chip Lab', href: '/work/ai-tutor' },
};
const ROTATE_MS = 4500;
const Shot = ({ shot }: { shot: RealShot }) => <div className="demo-shot"><Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes="(max-width: 900px) 100vw, 600px" /></div>;

export default function CompactDemo({ kind }: { kind: DemoKind }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [index, setIndex] = useState(0);
  const list = examples[kind];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (host.current) observer.observe(host.current);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    return () => { observer.disconnect(); };
  }, []);
  // Step through the examples on their own so nobody has to click to see the rest.
  useEffect(() => {
    if (!list || !visible || reducedMotion) return;
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % list.length), ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [index, list, visible, reducedMotion]);
  const current = list?.[index];
  return <div ref={host} className={`compact-demo demo-${kind} ${visible ? 'is-playing' : ''}`}>
    <div className="demo-bar"><span>{ { cad: 'Drawing → estimate', vision: 'Camera → insight', trading: 'Signal → action', education: 'Question → understanding' }[kind]}</span><span>From a running system</span></div>
    {list && <div className="demo-options" aria-label="Choose demonstration">{list.map((example, i) => <button key={example.label} type="button" aria-pressed={index === i} onClick={() => setIndex(i)}>{example.label}{index === i && visible && !reducedMotion && <span key={index} className="demo-option-timer" style={{ animationDuration: `${ROTATE_MS}ms` }} aria-hidden="true" />}</button>)}</div>}
    <div className="demo-stage" key={index}>
      {kind === 'cad' && <><Shot shot={cad} /><div className="demo-shot-card demo-reveal"><span>Part cost (unit)</span><strong>₹2,864.37</strong><small>14 parts on one 6300 × 1500 mm plate</small></div><div className="demo-steps"><span>Drawing read</span><span>Parts nested</span><span>Cost sheet ready</span></div></>}
      {kind === 'trading' && <><Shot shot={trading} /><div className="demo-trading-status demo-reveal"><span>Form filled by the co-pilot</span><span aria-hidden="true">→</span><strong>Your click deploys</strong></div><div className="demo-steps"><span>Screen read</span><span>Rules applied</span><span>Stops before money moves</span></div></>}
      {current && <><Shot shot={current.shot} /><p className="demo-result demo-reveal">{current.result}</p></>}
    </div>
    <div className="demo-footer"><Link href={sources[kind].href}>{sources[kind].label} <span aria-hidden="true">↗</span></Link></div>
  </div>;
}
