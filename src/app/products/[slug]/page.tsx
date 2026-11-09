import PilotButton from '@/components/PilotButton';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VirtualFitTryOnDemo from '@/components/VirtualFitTryOnDemo';
import { getProductBySlug, getAllProductSlugs } from '@/data/products';
import { workForProduct } from '@/data/work';

const solutionForProduct: Record<string, string> = {
  inventoai: 'manufacturing',
  costingai: 'manufacturing',
  gateai: 'manufacturing',
  finsight: 'financial-services',
  'edu-stream-pipeline': 'education',
};

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Capability not found' };
  return {
    title: `${product.title} | RootStock Technology`,
    description: product.tagline,
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const solution = solutionForProduct[slug];
  const work = workForProduct(slug);

  return (
    <>
      <Header activeSection="solutions" />
      <main className="b2b-product-page">
        <section className="b2b-product-hero">
          <div className="b2b-container">
            <Link className="b2b-back-link" href={solution ? `/solutions/${solution}` : '/#solutions'}>← {solution ? 'Back to solution' : 'All solutions'}</Link>
            <p className="b2b-eyebrow">ROOTSTOCK / {product.industry}</p>
            <div className="b2b-product-hero-grid">
              <div><h1>{product.title}</h1><p className="b2b-product-tagline">{product.tagline}</p><p className="b2b-product-description">{product.description}</p><PilotButton className="b2b-button b2b-button-primary">Discuss this use case <span aria-hidden="true">↗</span></PilotButton></div>
              <div className="b2b-product-mark" aria-hidden="true"><span>R.</span><small>APPLIED INTELLIGENCE<br />/ {product.title.toUpperCase()}</small></div>
            </div>
          </div>
        </section>
        <section className="b2b-section b2b-product-details">
          <div className="b2b-container">
            <div className="b2b-section-heading"><div><p className="b2b-eyebrow">What it is designed to do</p><h2>Built for a specific<br /><em>team workflow.</em></h2></div><p>We configure the scope, data connections and deployment approach around your organization.</p></div>
            <div className="b2b-product-detail-grid">
              <div><h3>Capabilities</h3><ul>{product.features.slice(0, 6).map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
              <div><h3>Where it can help</h3><ul>{product.useCases.slice(0, 5).map((useCase) => <li key={useCase}>{useCase}</li>)}</ul></div>
            </div>
          </div>
        </section>
        {work && (
          <section className="b2b-section b2b-product-shots"><div className="b2b-container"><p className="b2b-eyebrow">In use</p><h2>Built and shipped as {work.title}</h2><div className="b2b-work-links"><Link href={`/work/${work.slug}`}>See {work.shots.length} screens from {work.title} <span aria-hidden="true">↗</span></Link></div></div></section>
        )}
        {slug === 'persona-fit-engine' && (
          <section className="b2b-section b2b-product-demo"><div className="b2b-container"><p className="b2b-eyebrow">Interactive preview</p><h2>Try Virtual Fit Studio</h2><p>Upload a garment image and choose a model size to explore the preview.</p><VirtualFitTryOnDemo /></div></section>
        )}
        {slug === 'sentience-vision' && (
          <section className="b2b-section b2b-product-demo"><div className="b2b-container"><p className="b2b-eyebrow">Interactive preview</p><h2>Explore SentienceVision</h2><p>This external demo can request access to your camera and microphone.</p><div className="b2b-demo-frame"><iframe src="https://baubab4-vlm-wordpress.hf.space" width="100%" height="600" allow="camera; microphone" title="SentienceVision demo" /></div></div></section>
        )}
        {slug === 'finsight' && (
          <section className="b2b-section b2b-product-demo"><div className="b2b-container"><p className="b2b-eyebrow">Product demo</p><h2>Explore Finsight</h2><p>Open the external demo to see the analysis workflow.</p><a className="b2b-button b2b-button-primary" href="https://finsight-frontend-2026.vercel.app" target="_blank" rel="noopener noreferrer">Open Finsight demo <span aria-hidden="true">↗</span></a></div></section>
        )}
        <section className="b2b-detail-cta"><div className="b2b-container"><p className="b2b-eyebrow">Discuss your requirements</p><h2>See how this fits your process.</h2><p>Tell us about the data, team and decision involved. We’ll define a practical next step together.</p><PilotButton className="b2b-button b2b-button-primary">Discuss a pilot <span aria-hidden="true">↗</span></PilotButton></div></section>
      </main>
      <Footer />
    </>
  );
}
