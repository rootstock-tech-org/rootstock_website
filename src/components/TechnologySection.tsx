import Link from 'next/link';
import { solutions } from '@/data/solutions';

export default function TechnologySection() {
  return (
    <section id="solutions" className="b2b-section b2b-solutions">
      <div className="b2b-container">
        <div className="b2b-section-heading">
          <div><p className="b2b-eyebrow">02 / Where we work</p><h2>Built for your industry.<br /><em>Shaped to your operation.</em></h2></div>
          <p>One approach to applied intelligence, configured around the data and decisions that matter in your business.</p>
        </div>
        <div className="b2b-solution-grid">
          {solutions.map((solution) => (
            <article className={`b2b-solution-card b2b-accent-${solution.accent}`} key={solution.slug}>
              <div className="b2b-card-top"><span>{solution.number} / 03</span><span className="b2b-card-symbol" aria-hidden="true">↗</span></div>
              <div>
                <p className="b2b-card-sector">{solution.sector}</p>
                <h3>{solution.title}</h3>
                <p>{solution.summary}</p>
              </div>
              <Link href={`/solutions/${solution.slug}`} aria-label={`Explore ${solution.sector} solutions`}>Explore solution <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
        <div className="b2b-innovation-note"><span>ALSO EXPLORING</span><p>Our innovation work spans human-centred AI experiences. <Link href="/products/sentience-vision">See an example <span aria-hidden="true">↗</span></Link></p></div>
      </div>
    </section>
  );
}
