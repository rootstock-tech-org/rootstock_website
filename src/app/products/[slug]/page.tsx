import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductBySlug, getAllProductSlugs } from '@/data/products';
import GetConsultationButton from '@/components/GetConsultationButton';
import VirtualFitTryOnDemo from '@/components/VirtualFitTryOnDemo';

export async function generateStaticParams() {
    const slugs = getAllProductSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: `${product.title} - RootStock Technology`,
        description: product.tagline,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-inter">
            <Header activeSection="technology" />

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="container mx-auto px-6 max-w-5xl mb-16">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            {product.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                            {product.tagline}
                        </p>
                    </div>
                </section>

                {/* Description Section */}
                <section className="container mx-auto px-6 max-w-5xl mb-16">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                </section>

                {/* Live demo — Virtual Fit Studio (same API as tryon_api) */}
                {slug === 'persona-fit-engine' && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#415b3e] to-teal-700">
                                Live virtual try-on preview
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Upload a garment image, choose a size, and see an AI-generated preview on a matching model. Processing runs on the server with the same Gemini prompts and retry flow as our reference implementation—no separate API deployment required.
                            </p>
                        </div>
                        <VirtualFitTryOnDemo />
                    </section>
                )}

                {/* Live Demo Section - Only for Sentience Vision */}
                {slug === 'sentience-vision' && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                                Emotion Detection Real Time
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Powered by generative AI model "Paligemma"
                            </p>
                        </div>

                        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-br from-gray-900 to-gray-800">
                            <iframe
                                src="https://baubab4-vlm-wordpress.hf.space"
                                width="100%"
                                height="600"
                                allow="camera; microphone; clipboard-read; clipboard-write;"
                                style={{ border: 'none' }}
                                title="Paligemma Emotion Detection"
                                className="w-full"
                            />
                        </div>
                    </section>
                )}

                {/* MusicGrade Interactive Demo - Only for Conservatory Grade */}
                {slug === 'conservatory-grade' && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                MusicGrade - Interactive Assessment
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Interact with our advanced music analysis engine. Upload your audio and score to get started.
                            </p>
                        </div>

                        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                            {/* Placeholder for Interactive Demo */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 text-center min-h-[600px] flex flex-col items-center justify-center">
                                <div className="max-w-2xl">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Demo Coming Soon</h3>
                                    <p className="text-gray-600 mb-8">
                                        The MusicGrade interface features advanced music analysis with real-time feedback, performance metrics, research insights, and HRI design tools.
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div className="bg-white rounded-xl p-4 shadow-sm">
                                            <div className="font-semibold text-blue-600 mb-1">Chat</div>
                                            <div className="text-xs text-gray-500">AI Assistant</div>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 shadow-sm">
                                            <div className="font-semibold text-indigo-600 mb-1">Analysis</div>
                                            <div className="text-xs text-gray-500">Performance Metrics</div>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 shadow-sm">
                                            <div className="font-semibold text-purple-600 mb-1">Research</div>
                                            <div className="text-xs text-gray-500">Knowledge Base</div>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 shadow-sm">
                                            <div className="font-semibold text-violet-600 mb-1">HRI Design</div>
                                            <div className="text-xs text-gray-500">Interaction Framework</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {/* Features Section */}
                <section className="container mx-auto px-6 max-w-5xl mb-16">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {product.features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#415b3e]/10 flex items-center justify-center mt-1">
                                        <svg className="w-4 h-4 text-[#415b3e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{feature}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Use Cases Section */}
                <section className="container mx-auto px-6 max-w-5xl mb-16">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Use Cases</h2>
                        <div className="space-y-4">
                            {product.useCases.map((useCase, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#415b3e] text-white flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed pt-1">{useCase}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technical Highlights Section */}
                <section className="container mx-auto px-6 max-w-5xl mb-16">
                    <div className="bg-gradient-to-br from-[#415b3e]/5 to-[#0b182f]/5 rounded-3xl p-8 md:p-12 border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Highlights</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {product.technicalHighlights.map((highlight, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#415b3e] mt-2"></div>
                                    <p className="text-gray-700 leading-relaxed">{highlight}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Business Impact Section (Optional) */}
                {product.businessImpact && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Business Impact</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {product.businessImpact.map((impact, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{impact}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Deployment Approach Section (Optional) */}
                {product.deploymentApproach && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Deployment Approach</h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {product.deploymentApproach}
                            </p>
                        </div>
                    </section>
                )}


                {/* 🔥 FinSight Custom Banner */}
                {slug === "finsight" && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div
                            className="rounded-3xl px-10 py-16 text-center shadow-xl"
                            style={{
                                background: "linear-gradient(135deg, #2d4a2d 0%, #1a3040 50%, #0f1f2e 100%)",
                            }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to watch DEMO
                            </h2>


                            <a
                                href="https://finsight-frontend-2026.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-green-600 transition shadow-lg"
                            >
                                Get Demo
                            </a>
                        </div>
                    </section>
                )}

                {/* Business Optimization Deep Dive & Phase II (Only for Manufacturing Products) */}
                {product.industry === 'Manufacturing / ERP' && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-200">
                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Summary Section */}
                                <div>
                                    <h3 className="text-3xl font-bold font-outfit text-gray-900 mb-4">Three solutions. Compounding returns.</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        Each solution delivers value independently. Together, they create an intelligent supply chain from component costing for vendor negotiation, through verified material arrival at the gate, all the way to live inventory intelligence that tells the team what to order next.
                                    </p>
                                    <div className="space-y-6">
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-1">InvenSync</h4>
                                            <p className="text-sm text-gray-600 mb-2">From reactive stock management to AI driven demand forecasting and proactive replenishment.</p>
                                            <p className="text-sm font-semibold text-[#415b3e]">20 to 30 percent reduction in inventory carrying costs.</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-1">CostEngine</h4>
                                            <p className="text-sm text-gray-600 mb-2">From hours of manual Excel work per component to an automated drawing to costing workflow.</p>
                                            <p className="text-sm font-semibold text-[#415b3e]">2 to 4 hours saved per component with near zero calculation errors.</p>
                                        </div>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-1">GateFlow</h4>
                                            <p className="text-sm text-gray-600 mb-2">From manual gate entry and disconnected QC checks to a verified barcoded inbound chain.</p>
                                            <p className="text-sm font-semibold text-[#415b3e]">Under 2 minutes gate clearance with zero re verification at QC.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Phase II Section */}
                                <div>
                                    <h3 className="text-3xl font-bold font-outfit text-gray-900 mb-4">What comes next</h3>
                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        Phase II extends Business Optimization into a wider intelligent operations layer across the organization.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Unified dashboard with tailored views for HQ, regional offices, dealers, and service centres.",
                                            "Role based access control so each location only sees the data it should.",
                                            "Critical AI alerts for stock arrivals, dispatches, and minimum level breaches.",
                                            "Smart triggers for custom event driven rules based on real time floor data.",
                                            "Dealer network extension for inventory visibility across direct and indirect distribution channels."
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#415b3e]/10 flex items-center justify-center mt-0.5">
                                                    <svg className="w-4 h-4 text-[#415b3e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Why RootStock Technology (Only for Manufacturing Products) */}
                {product.industry === 'Manufacturing / ERP' && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div className="bg-gradient-to-r from-[#415b3e] to-[#0b182f] rounded-3xl p-8 md:p-12 border border-gray-200 shadow-2xl text-white">
                            <div className="max-w-4xl mx-auto text-center">
                                <h3 className="text-3xl font-bold font-outfit mb-4">Intelligence engineered for the real world.</h3>
                                <p className="text-lg text-white/90 mb-10 leading-relaxed">
                                    RootStock Technology builds AI grounded in how manufacturing businesses actually operate: complex, fast moving, and driven by people on the floor, not just by data in dashboards.
                                </p>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                                    {[
                                        "ERP native integration with existing systems.",
                                        "Structured 3 month go live approach.",
                                        "Explainable and auditable AI recommendations.",
                                        "Built for non technical users.",
                                        "Designed for manufacturing teams across India.",
                                        "Dedicated support after deployment."
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                                            <svg className="w-5 h-5 text-[#7ae582] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Default CTA */}
                <section className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-gradient-to-r from-[#415b3e] to-[#0b182f] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {product.ctaTitle || "Ready to Transform Your Business?"}
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            {product.ctaDescription || `Let's discuss how ${product.title} can help you achieve your goals.`}
                        </p>
                        <GetConsultationButton />
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}