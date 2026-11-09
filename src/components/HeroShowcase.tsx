'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { GroundedAnswer, VisionEvent, breadthAnswer, gearEvent } from './WorkScenes';

const SCENE_MS = 6000;

// Each beat is the time (ms into the scene) at which the next data-step element appears.
type Scene = { id: string; caption: string; beats: number[]; content: ReactNode };

const scenes: Scene[] = [
  {
    id: 'learning', caption: 'AI tutors', beats: [300, 1300, 2300],
    content: <div className="scene-learning">
      <p className="scene-ask" data-step="1">How does a chip design flow work?</p>
      <p className="scene-reply" data-step="2"><span>AI tutor</span>It runs left to right. First, the chip’s behaviour is written as RTL code.</p>
      <div className="scene-shot" data-step="3"><Image src="/work/showcase/tutor-voice-lesson.webp" alt="Tutor slide showing the chip design flow with RTL design highlighted" fill sizes="(max-width: 750px) 90vw, 600px"/></div>
    </div>,
  },
  {
    id: 'labs', caption: 'Interactive labs', beats: [900, 1900, 2900],
    content: <div className="scene-labs">
      <figure><Image src="/work/showcase/lab-waveform.webp" alt="Simulated waveform of a traffic-light design" fill sizes="(max-width: 750px) 45vw, 300px"/><figcaption>Simulation</figcaption></figure>
      <span className="scene-action" data-step="1">Synthesize <span aria-hidden="true">→</span></span>
      <figure data-step="2"><Image src="/work/showcase/lab-synthesis.webp" alt="The same design synthesized into a gate-level schematic" fill sizes="(max-width: 750px) 45vw, 300px"/><figcaption data-step="3">Same design, as gates</figcaption></figure>
    </div>,
  },
  { id: 'vision', caption: 'Computer vision', beats: [1000, 2200], content: <VisionEvent {...gearEvent}/> },
  { id: 'assistant', caption: 'AI assistants', beats: [300, 1300, 2600], content: <GroundedAnswer {...breadthAnswer}/> },
];

const beatsReached = (scene: Scene, ms: number) => scene.beats.filter(at => ms >= at).length;
const beatClass = (count: number) => Array.from({ length: count }, (_, i) => ` b${i + 1}`).join('');

export default function HeroShowcase() {
  const host = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [mode, setMode] = useState<'motion' | 'static'>('motion');
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [position, setPosition] = useState({ scene: 0, beat: 0 });

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      setMode(motion.matches ? 'static' : 'motion');
      setActive(visible && !document.hidden && !motion.matches);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }, { threshold: .2 });
    if (host.current) observer.observe(host.current);
    update();
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); motion.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); };
  }, []);

  // One clock drives every scene and beat; pausing freezes it so playback resumes mid-scene.
  useEffect(() => {
    if (!active || paused) return;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      elapsed.current = (elapsed.current + now - last) % (SCENE_MS * scenes.length);
      last = now;
      const scene = Math.floor(elapsed.current / SCENE_MS);
      const beat = beatsReached(scenes[scene], elapsed.current - scene * SCENE_MS);
      setPosition(current => current.scene === scene && current.beat === beat ? current : { scene, beat });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, paused]);

  const previous = (position.scene + scenes.length - 1) % scenes.length;
  // The wrapper stays mounted across modes so the visibility observer keeps watching it.
  return <div className={`showcase${mode === 'static' ? ' is-static' : ''}`} ref={host} role="region" aria-label="Examples of our work">
    {mode === 'static' ? <div className="showcase-grid">{scenes.map(scene => <figure key={scene.id}><div className={`showcase-scene scene-${scene.id}-wrap${beatClass(scene.beats.length)}`}>{scene.content}</div><figcaption>{scene.caption}</figcaption></figure>)}</div> : <>
    <div className="showcase-stage">
      {scenes.map((scene, index) => {
        // The scene fading out keeps its final state; the rest reset while hidden.
        const beat = index === position.scene ? position.beat : index === previous ? scene.beats.length : 0;
        return <div key={scene.id} className={`showcase-scene scene-${scene.id}-wrap${index === position.scene ? ' is-active' : ''}${beatClass(beat)}`} aria-hidden={index !== position.scene}>{scene.content}</div>;
      })}
    </div>
    <div className="showcase-caption">
      <span>{scenes[position.scene].caption}</span>
      <button type="button" aria-pressed={paused} aria-label={paused ? 'Play demonstration' : 'Pause demonstration'} onClick={() => setPaused(value => !value)}>{paused ? 'Play' : 'Pause'}</button>
    </div></>}
  </div>;
}
