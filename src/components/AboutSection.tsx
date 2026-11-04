import Link from 'next/link';
import type { CSSProperties } from 'react';
import RevealHeading from './RevealHeading';

const steps = [
  { number: '01', title: 'Understand the workflow', description: 'We identify the decision, data and people involved, then agree on what success should look like.' },
  { number: '02', title: 'Build a focused pilot', description: 'A scoped engagement puts the system into a real workflow with the people who will use it.' },
  { number: '03', title: 'Integrate and improve', description: 'We compare the result with your existing measures and plan the next deployment step.' },
];

export default function AboutSection() {
  return (
    <>
      <section id="approach" className="b2b-section b2b-approach">
        <div className="b2b-container">
          <div className="b2b-section-heading">
            <div><p className="b2b-eyebrow" data-reveal="up">How we work</p><RevealHeading lines={['Start with one', <em key="e">useful outcome.</em>]}/></div>
            <p data-reveal="up" style={{ '--reveal-i': 2 } as CSSProperties}>We work from your material and your operating context, then test the result where your team actually uses it.</p>
          </div>
          <div className="b2b-steps">{steps.map((step, index) => <div className="b2b-step" key={step.number} data-reveal="up" style={{ '--reveal-i': index } as CSSProperties}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div>
          <div className="b2b-approach-callout"><p>Our work combines retrieval, knowledge graphs and feedback so answers can stay connected to the material behind them.</p><Link href="/#contact">Talk through your use case <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
      <section id="about" className="b2b-section b2b-about">
        <div className="b2b-container b2b-about-grid">
          <div><p className="b2b-eyebrow" data-reveal="up">About RootStock</p><RevealHeading lines={['Applied AI', <em key="e">for people at work.</em>]}/></div>
          <div>
            <p className="b2b-about-lead" data-reveal="up">RootStock Technology works with organizations that run on complex information and physical operations.</p>
            <p data-reveal="up" style={{ '--reveal-i': 1 } as CSSProperties}>Our team brings together language systems, vision and software engineering. We adapt the technology to a client’s data, process and goals, with a focus on making the result understandable to the people using it.</p>
            <div className="b2b-about-facts"><div><strong>03</strong><span>Core sectors</span></div><div><strong>01</strong><span>Shared AI engine</span></div></div>
          </div>
        </div>
      </section>
    </>
  );
}
