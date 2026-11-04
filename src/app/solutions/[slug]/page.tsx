import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveShowcase from '@/components/InteractiveShowcase';
import { getSolution, solutions } from '@/data/solutions';

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return { title: 'Solution not found' };
  return {
    title: `${solution.sector} AI solutions | RootStock Technology`,
    description: solution.summary,
    alternates: { canonical: `/solutions/${slug}` },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <>
      <Header activeSection="solutions" />
      <main className={`b2b-solution-page b2b-accent-${solution.accent}`}>
        <section className="b2b-solution-hero">
          <div className="b2b-container">
            <Link className="b2b-back-link" href="/#solutions">← All solutions</Link>
            <p className="b2b-eyebrow">{solution.number} / {solution.sector}</p>
            <div className="b2b-solution-hero-grid"><div><h1>{solution.title}</h1><p>{solution.summary}</p><Link className="b2b-button b2b-button-primary" href="/#contact">Discuss a pilot <span aria-hidden="true">↗</span></Link></div><div className="b2b-solution-tag">{solution.buyer}<span aria-hidden="true">↗</span></div></div>
          </div>
        </section>
        <InteractiveShowcase sector={slug as 'manufacturing' | 'financial-services' | 'education'} />
        <section className="b2b-section"><div className="b2b-container b2b-detail-intro"><p className="b2b-eyebrow">The challenge</p><h2>{solution.problem}</h2></div></section>
        <section className="b2b-section b2b-detail-capabilities"><div className="b2b-container"><div className="b2b-section-heading"><div><p className="b2b-eyebrow">What we build</p><h2>Practical systems for<br /><em>your team’s workflow.</em></h2></div><p>Each engagement begins with your operating context and the decisions people need to make.</p></div><div className="b2b-capability-grid">{solution.capabilities.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p>{item.product && <Link href={`/products/${item.product}`}>Explore capability <span aria-hidden="true">↗</span></Link>}</article>)}</div></div></section>
        <section className="b2b-section b2b-detail-flow"><div className="b2b-container"><p className="b2b-eyebrow">From context to action</p><div className="b2b-detail-flow-grid"><div><h2>What goes in</h2>{solution.inputs.map((item) => <p key={item}>{item}</p>)}</div><div><span className="b2b-flow-arrow" aria-hidden="true">→</span><strong>ROOTSTOCK<br />ENGINE</strong></div><div><h2>What comes out</h2>{solution.outputs.map((item) => <p key={item}>{item}</p>)}</div></div></div></section>
        <section className="b2b-section b2b-detail-outcomes"><div className="b2b-container"><div className="b2b-section-heading"><div><p className="b2b-eyebrow">Designed to help</p><h2>Outcomes your team<br /><em>can work toward.</em></h2></div></div><div>{solution.outcomes.map((item, index) => <p key={item}><span>0{index + 1}</span>{item}</p>)}</div></div></section>
        <section className="b2b-detail-cta"><div className="b2b-container"><p className="b2b-eyebrow">Start with one use case</p><h2>Let’s make the next step concrete.</h2><p>Tell us about the process you want to improve. We’ll explore what a focused pilot could include.</p><Link className="b2b-button b2b-button-primary" href="/#contact">Discuss a pilot <span aria-hidden="true">↗</span></Link></div></section>
      </main>
      <Footer />
    </>
  );
}
