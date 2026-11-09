import PilotButton from './PilotButton';

export default function HomePilotCta() {
  return <section className="home-cta" aria-labelledby="pilot-cta-heading">
    <svg className="home-circuit" viewBox="0 0 600 300" fill="none" aria-hidden="true"><g stroke="currentColor"><path d="M600 150H430L360 80H250M430 150L360 220H210M600 60H520L480 100"/><circle cx="250" cy="80" r="5"/><circle cx="210" cy="220" r="5"/><circle cx="480" cy="100" r="5"/></g></svg>
    <div className="b2b-container home-cta-inner">
      <h2 id="pilot-cta-heading">What could this look like for your team?</h2>
      <p>Tell us about one process you want to improve.</p>
      <PilotButton className="home-button">Discuss a pilot <span aria-hidden="true">↗</span></PilotButton>
    </div>
  </section>;
}
