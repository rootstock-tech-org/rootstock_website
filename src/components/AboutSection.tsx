import type { CSSProperties } from 'react';
import RevealHeading from './RevealHeading';

const steps = [
  { number: '01', title: 'Understand the workflow', duration: '~2 weeks', description: 'We identify the decision, data and people involved, then agree on what success should look like.', deliverable: 'A scoped use case and a success measure' },
  { number: '02', title: 'Build a focused pilot', duration: '6–8 weeks', description: 'A scoped engagement puts the system into a real workflow with the people who will use it.', deliverable: 'A working system in a live workflow' },
  { number: '03', title: 'Integrate and improve', duration: 'Ongoing', description: 'We compare the result with your existing measures and plan the next deployment step.', deliverable: 'Rollout, monitoring and tuning' },
];

const trust = [
  { title: 'Runs in your environment', text: 'Your cloud or on-premise servers.', icon: 'M4 7h16v10H4z M8 21h8 M12 17v4' },
  { title: 'NDA first', text: 'Signed before any data is shared.', icon: 'M7 3h7l4 4v14H7z M14 3v4h4 M10 13h5 M10 17h5' },
  { title: 'No training on your data', text: 'Never used to train models for anyone else.', icon: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z M9 12l2 2 4-4' },
  { title: 'Data stays in India', text: 'Stored and processed in India.', icon: 'M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
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
          <div className="b2b-steps">{steps.map((step, index) => <div className="b2b-step" key={step.number} data-reveal="up" style={{ '--reveal-i': index } as CSSProperties}><span>{step.number} <em>· {step.duration}</em></span><h3>{step.title}</h3><p>{step.description}</p><p className="b2b-step-deliverable"><strong>You get</strong> {step.deliverable}</p></div>)}</div>
          <div className="b2b-trust" aria-labelledby="trust-heading">
            <p id="trust-heading" className="b2b-eyebrow" data-reveal="up">Your data stays yours</p>
            <ul>{trust.map((item, index) => <li key={item.title} data-reveal="up" style={{ '--reveal-i': index } as CSSProperties}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={item.icon}/></svg><strong>{item.title}</strong><span>{item.text}</span></li>)}</ul>
          </div>
        </div>
      </section>
      <section id="about" className="b2b-section b2b-about">
        <div className="b2b-container b2b-about-grid">
          <div><p className="b2b-eyebrow" data-reveal="up">About RootStock</p><RevealHeading lines={['Applied AI', <em key="e">for people at work.</em>]}/></div>
          <div>
            <p className="b2b-about-lead" data-reveal="up">RootStock Technology works with organizations that run on complex information and physical operations.</p>
            <p data-reveal="up" style={{ '--reveal-i': 1 } as CSSProperties}>Our team brings together language systems, vision and software engineering. We adapt the technology to a client’s data, process and goals, with a focus on making the result understandable to the people using it.</p>
            <p className="b2b-credential" data-reveal="up" style={{ '--reveal-i': 2 } as CSSProperties}><span>Incubated at</span> IIIT Delhi Innovation &amp; Incubation Centre, New Delhi</p>
          </div>
        </div>
      </section>
    </>
  );
}
