import PilotButton from '@/components/PilotButton';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkGallery from '@/components/WorkGallery';
import { getWorkItem, workItems } from '@/data/work';
import { getProductBySlug } from '@/data/products';
import { getSolution } from '@/data/solutions';

export function generateStaticParams() {
  return workItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItem(slug);
  if (!item) return { title: 'Work not found' };
  return {
    title: `${item.title}: ${item.tagline} | RootStock Technology`,
    description: item.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { images: [{ url: item.shots[0].src, width: item.shots[0].width, height: item.shots[0].height }] },
  };
}

export default async function WorkItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getWorkItem(slug);
  if (!item) notFound();
  const position = workItems.indexOf(item);
  const previous = workItems[(position - 1 + workItems.length) % workItems.length];
  const next = workItems[(position + 1) % workItems.length];
  const product = item.relatedProduct ? getProductBySlug(item.relatedProduct) : undefined;
  const solution = item.relatedSolution ? getSolution(item.relatedSolution) : undefined;

  return (
    <>
      <Header activeSection="work" />
      <main className="work-page">
        <section className="work-hero work-hero-detail">
          <div className="b2b-container">
            <Link className="b2b-back-link" href="/work">← All work</Link>
            <p className="b2b-eyebrow">{item.number} / {item.sector}</p>
            <div className="work-detail-grid">
              <div>
                <h1>{item.title}</h1>
                <p className="b2b-product-tagline">{item.tagline}</p>
                <p className="work-hero-lead">{item.summary}</p>
                <PilotButton className="b2b-button b2b-button-primary">Discuss this use case <span aria-hidden="true">↗</span></PilotButton>
              </div>
              <aside className="work-facts" aria-label="At a glance">
                {item.status && <p className="work-status">{item.status}</p>}
                <h2>What it does</h2>
                <ul>{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
              </aside>
            </div>
          </div>
        </section>
        <section className="b2b-section work-shots">
          <div className="b2b-container">
            <div className="b2b-section-heading"><div><p className="b2b-eyebrow">From the running system</p><h2>See it<br /><em>working.</em></h2></div><p>{item.shots.length} screens from the system. Select one to see it full size. Client branding and personal details are blurred.</p></div>
            <WorkGallery shots={item.shots} title={item.title} preloadFirst />
          </div>
        </section>
        {(product || solution) && <section className="b2b-section work-related">
          <div className="b2b-container">
            <p className="b2b-eyebrow">Related</p>
            <div className="work-related-links">
              {solution && <Link href={`/solutions/${solution.slug}`}><span>Solution</span><strong>{solution.sector}</strong><small>{solution.summary}</small><em aria-hidden="true">↗</em></Link>}
              {product && <Link href={`/products/${product.slug}`}><span>Capability</span><strong>{product.title}</strong><small>{product.tagline}</small><em aria-hidden="true">↗</em></Link>}
            </div>
          </div>
        </section>}
        <nav className="work-pager" aria-label="More work">
          <div className="b2b-container">
            <Link href={`/work/${previous.slug}`}><span>← Previous</span><strong>{previous.title}</strong></Link>
            <Link href={`/work/${next.slug}`}><span>Next →</span><strong>{next.title}</strong></Link>
          </div>
        </nav>
        <section className="b2b-detail-cta"><div className="b2b-container"><p className="b2b-eyebrow">Discuss your requirements</p><h2>See how this fits your process.</h2><p>Tell us about the data, team and decision involved. We’ll define a practical next step together.</p><PilotButton className="b2b-button b2b-button-primary">Discuss a pilot <span aria-hidden="true">↗</span></PilotButton></div></section>
      </main>
      <Footer />
    </>
  );
}
