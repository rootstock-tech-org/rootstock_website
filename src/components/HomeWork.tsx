import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import PilotButton, { type PilotInterest } from './PilotButton';
import { GroundedAnswer, VisionEvent, breadthAnswer, zoneEvent } from './WorkScenes';

type Story = { id: string; kicker: string; title: string; text: string; href: string; linkLabel: string; interest: PilotInterest; visual: ReactNode };

const stories: Story[] = [
  {
    id: 'learning', kicker: 'AI tutors · Interactive labs', title: 'Help people understand more.',
    text: 'A tutor explains a topic and builds the visual as it speaks. A lab lets learners change the inputs and see what happens.',
    href: '/work/ai-tutor', linkLabel: 'See the tutor and lab work', interest: 'AI tutors & labs',
    visual: <div className="learning-visual">
      <figure className="learning-main" data-step="1"><Image src="/work/showcase/tutor-voice-lesson.webp" alt="AI tutor slide explaining the chip design flow" width={1200} height={604} sizes="(max-width: 750px) 100vw, 640px"/><figcaption>AI tutor explains</figcaption></figure>
      <figure className="learning-lab" data-step="2"><Image src="/work/showcase/lab-cross-section.webp" alt="Interactive lab showing a CMOS inverter cross-section with live readings and an AI tutor panel" width={1200} height={631} sizes="(max-width: 750px) 90vw, 420px"/><figcaption>Lab: answers grounded in the live simulation</figcaption></figure>
    </div>,
  },
  {
    id: 'vision', kicker: 'Computer vision', title: 'Make important events visible.',
    text: 'Cameras a site already has flag the moments that need attention, each with the picture that shows what happened, so the team can review and act.',
    href: '/work/vision-ai', linkLabel: 'See the vision work', interest: 'Computer vision',
    visual: <VisionEvent {...zoneEvent}/>,
  },
  {
    id: 'assistant', kicker: 'AI assistants', title: 'Make your information useful.',
    text: 'People ask in plain language and get an answer drawn from your own material, with the sources beside it so anyone can check.',
    href: '/work/research-assistant', linkLabel: 'See the assistant work', interest: 'AI assistants',
    visual: <div className="assistant-visual"><p className="assistant-bar">Research assistant</p><GroundedAnswer {...breadthAnswer}/></div>,
  },
];

export default function HomeWork() {
  return <section id="work" className="home-work" aria-labelledby="work-heading">
    <div className="b2b-container">
      <h2 id="work-heading" className="home-eyebrow">Our work</h2>
      {stories.map(story => <article key={story.id} className={`home-story home-story-${story.id}`} data-reveal="story" aria-labelledby={`story-${story.id}`}>
        <div className="home-story-copy">
          <p className="home-story-kicker">{story.kicker}</p>
          <h3 id={`story-${story.id}`}>{story.title}</h3>
          <p>{story.text}</p>
          <div className="home-story-links"><Link href={story.href} className="home-link">{story.linkLabel} <span aria-hidden="true">↗</span></Link><PilotButton className="home-link home-link-button" interest={story.interest}>Discuss a pilot for this</PilotButton></div>
        </div>
        <div className="home-story-visual">{story.visual}</div>
      </article>)}
    </div>
  </section>;
}
