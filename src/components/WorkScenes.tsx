import Image from 'next/image';
import type { CSSProperties } from 'react';

// Illustrations of shipped capabilities, rebuilt from the real screens in public/work/.
// Elements marked data-step appear in order; the parent decides when (timeline or scroll reveal).

type Box = { left: number; top: number; width: number; height: number };
export type VisionEventProps = {
  src: string; width: number; height: number; alt: string;
  box: Box; label: string; title: string; detail: string; card?: boolean;
};

// Camera frames are crops of the product screenshots; the box sits on the detection the product drew.
export const gearEvent: VisionEventProps = {
  src: '/work/showcase/vision-gear-frame.webp', width: 806, height: 598,
  alt: 'Construction site camera view with workers outlined by the vision system',
  box: { left: 57.9, top: 7.2, width: 40.8, height: 91.5 }, label: 'No helmet',
  title: '2 without a helmet, 1 without a vest', detail: 'Picture saved for the safety team',
};
export const zoneEvent: VisionEventProps = {
  src: '/work/showcase/vision-zone-frame.webp', width: 798, height: 564,
  alt: 'Camera view of a loading bay with a marked restricted zone',
  box: { left: 21.9, top: 60.1, width: 59.3, height: 37.6 }, label: 'Loading bay',
  title: 'Person in restricted zone “Loading bay”', detail: 'CAM 03 · Assembly line B · picture saved',
};

export function VisionEvent({ src, width, height, alt, box, label, title, detail, card = true }: VisionEventProps) {
  const boxStyle = { left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%` } as CSSProperties;
  return <div className="vision-event">
    <div className="vision-frame">
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 750px) 100vw, 720px"/>
      <span className="vision-box" style={boxStyle} data-step="1"><span>{label}</span></span>
    </div>
    {card && <div className="vision-card" data-step="2"><span className="vision-card-tag">Event</span><strong>{title}</strong><small>{detail}</small></div>}
  </div>;
}

// Text taken from the research assistant's answer screen (public/work/research-assistant/02-…).
export const breadthAnswer = {
  question: 'breadth indicators?',
  answer: 'Breadth indicators measure what share of stocks in a group sits in bullish, bearish or momentum zones. They show the health of the market or a sector instead of relying on index price alone.',
  sources: ['Breadth Indicators · RZone course, p. 14', 'Video lesson at 04:12', 'Live · Breadth Board'],
};

export function GroundedAnswer({ question, answer, sources }: typeof breadthAnswer) {
  return <div className="grounded-answer">
    <p className="grounded-question" data-step="1">{question}</p>
    <p className="grounded-text" data-step="2">{answer}<sup>1</sup></p>
    <ol className="grounded-sources" data-step="3" aria-label="Sources">{sources.map(source => <li key={source}>{source}</li>)}</ol>
  </div>;
}
