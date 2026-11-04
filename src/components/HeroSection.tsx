import Link from 'next/link';
import Image from 'next/image';

const industries = [
  { name: 'Manufacturing', detail: 'Vision, operations and costing', href: '/solutions/manufacturing' },
  { name: 'Financial services', detail: 'Knowledge and decision support', href: '/solutions/financial-services' },
  { name: 'Education', detail: 'Learning and campus workflows', href: '/solutions/education' },
];

export default function HeroSection() {
  return (
    <section id="home" className="b2b-hero">
      <div className="b2b-container b2b-hero-main">
        <p className="b2b-eyebrow"><span className="b2b-eyebrow-line" /> Applied AI for enterprise teams</p>
        <h1>Make your data <em>work in the real world.</em></h1>
        <div className="b2b-hero-intro">
          <p className="b2b-hero-lead">
            We build AI assistants, vision systems and decision tools around your own data and processes.
            For manufacturing, financial services and education teams that need results they can use.
          </p>
          <div className="b2b-hero-actions">
            <Link className="b2b-button b2b-button-primary" href="/#contact">Discuss a pilot <span aria-hidden="true">↗</span></Link>
            <Link className="b2b-text-link" href="/#solutions">Explore solutions <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="b2b-hero-proof" aria-label="Selected clients">
          <span className="b2b-hero-proof-label">Selected clients</span>
          <div className="b2b-hero-proof-logos">
            <span className="b2b-hero-proof-logo"><Image src="/client_logos/definedge.png" alt="Definedge Securities" width={160} height={60} /></span>
            <span className="b2b-hero-proof-logo"><Image src="/client_logos/ace.png" alt="Action Construction Equipment (ACE)" width={140} height={68} /></span>
            <span className="b2b-hero-proof-logo"><Image src="/client_logos/jcb.svg" alt="JCB" width={124} height={48} /></span>
            <span className="b2b-hero-proof-name b2b-hero-proof-name-small">Indira Securities</span>
          </div>
        </div>
        <nav className="b2b-sector-nav" aria-label="Solutions by industry">
          <span className="b2b-sector-label">Explore your industry</span>
          {industries.map((industry) => (
            <Link href={industry.href} key={industry.name}>
              <span><strong>{industry.name}</strong><small>{industry.detail}</small></span>
              <span className="b2b-sector-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
