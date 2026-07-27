import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ConsultationCTA from '@/components/ConsultationCTA';
import VirtualFitTryOnDemo from '@/components/VirtualFitTryOnDemo';
import { getProductBySlug, getAllProductSlugs } from '@/data/products';
import { CheckCircle2, ChevronRight, LayoutDashboard, Settings, Layers, BarChart3, Zap, Shield, Eye } from 'lucide-react';

export async function generateStaticParams() {
    const slugs = getAllProductSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.title} - RootStock Technology`,
        description: product.tagline,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) notFound();

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans overflow-x-hidden selection:bg-[var(--color-brand-primary)] selection:text-white">
            <Navbar />

            <main className="pt-32 pb-32">
                {/* Hero Section */}
                <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24 relative">
                    <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] font-medium text-sm mb-8 border border-[var(--color-brand-primary)]/20 shadow-sm backdrop-blur-md">
                            <Layers className="w-4 h-4" />
                            {product.industry}
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold mb-6 tracking-tight text-[var(--foreground)]">
                            {product.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto font-light leading-relaxed">
                            {product.tagline}
                        </p>
                    </div>
                </section>

                {/* Overview Section */}
                <section className="container mx-auto px-6 md:px-12 max-w-5xl mb-24">
                    <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-gray-200/50">
                        <h2 className="text-3xl font-display font-semibold text-[var(--foreground)] mb-6 flex items-center gap-3">
                            <Eye className="w-7 h-7 text-[var(--color-brand-primary)]" />
                            Overview
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                            {product.description}
                        </p>
                    </div>
                </section>

                {/* Live Demo: Virtual Fit */}
                {slug === 'persona-fit-engine' && (
                    <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]">
                                Live Virtual Try-On Preview
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
                                Upload a garment image, choose a size, and see an AI-generated preview on a matching model in real-time.
                            </p>
                        </div>
                        <VirtualFitTryOnDemo />
                    </section>
                )}

                {/* Live Demo: Sentience Vision */}
                {slug === 'sentience-vision' && (
                    <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                                Emotion Detection Real Time
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
                                Powered by generative AI model "Paligemma"
                            </p>
                        </div>
                        <div className="w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/20 border border-gray-800 bg-gray-900">
                            <iframe
                                src="https://baubab4-vlm-wordpress.hf.space"
                                width="100%"
                                height="700"
                                allow="camera; microphone; clipboard-read; clipboard-write;"
                                className="w-full border-none"
                            />
                        </div>
                    </section>
                )}

                {/* Live Demo: Conservatory Grade */}
                {slug === 'conservatory-grade' && (
                    <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-display font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
                                MusicGrade - Interactive Assessment
                            </h2>
                            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
                                Interact with our advanced music analysis engine. Upload your audio and score to get started.
                            </p>
                        </div>
                        <div className="w-full rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-200/50 bg-white/70 backdrop-blur-3xl">
                            <div className="bg-gradient-to-br from-violet-50/50 to-purple-50/50 p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[500px]">
                                <div className="w-24 h-24 bg-gradient-to-br from-violet-600 to-purple-600 rounded-[2rem] mx-auto mb-8 flex items-center justify-center shadow-lg shadow-violet-500/30 rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-display font-bold text-[var(--foreground)] mb-4">Interactive Demo Coming Soon</h3>
                                <p className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg font-light">
                                    The MusicGrade interface features advanced music analysis with real-time feedback, performance metrics, research insights, and HRI design tools.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm w-full max-w-3xl">
                                    {[
                                        { title: 'Chat', desc: 'AI Assistant', color: 'text-violet-600' },
                                        { title: 'Analysis', desc: 'Performance Metrics', color: 'text-purple-600' },
                                        { title: 'Research', desc: 'Knowledge Base', color: 'text-fuchsia-600' },
                                        { title: 'HRI Design', desc: 'Interaction Framework', color: 'text-pink-600' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-gray-100 hover:-translate-y-1 transition-transform">
                                            <div className={`font-semibold text-lg mb-1 ${item.color}`}>{item.title}</div>
                                            <div className="text-xs text-gray-500 font-medium tracking-wide uppercase">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Features & Technical Grids */}
                <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Features */}
                        <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-gray-200/50 hover:bg-white/80 transition-colors">
                            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
                                <Zap className="w-6 h-6 text-[var(--color-brand-primary)]" />
                                Key Features
                            </h2>
                            <div className="space-y-5">
                                {product.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] flex items-center justify-center mt-0.5 group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-colors">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Highlights */}
                        <div className="bg-[var(--color-brand-primary)]/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-[var(--color-brand-primary)]/10 hover:bg-[var(--color-brand-primary)]/10 transition-colors">
                            <h2 className="text-2xl font-display font-semibold mb-8 flex items-center gap-3">
                                <Settings className="w-6 h-6 text-[var(--color-brand-primary)]" />
                                Technical Highlights
                            </h2>
                            <div className="space-y-5">
                                {product.technicalHighlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white text-[var(--color-brand-primary)] flex items-center justify-center mt-0.5 shadow-sm">
                                            <span className="text-sm font-bold opacity-50 group-hover:opacity-100">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed font-medium">{highlight}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
                    <h2 className="text-3xl font-display font-semibold text-center mb-12 flex justify-center items-center gap-3">
                        <LayoutDashboard className="w-8 h-8 text-[var(--color-brand-primary)]" />
                        Use Cases
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {product.useCases.map((useCase, index) => (
                            <div key={index} className="bg-white rounded-[1.5rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md shadow-[var(--color-brand-primary)]/20">
                                    {index + 1}
                                </div>
                                <p className="text-gray-600 leading-relaxed text-sm font-medium">{useCase}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Custom Banner: FinSight */}
                {slug === "finsight" && (
                    <section className="container mx-auto px-6 md:px-12 max-w-5xl mb-24">
                        <div className="rounded-[2.5rem] px-10 py-20 text-center shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#1a3040] to-[#0f1f2e]">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 tracking-tight">
                                    Experience FinSight in Action
                                </h2>
                                <a
                                    href="https://finsight-frontend-2026.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-emerald-500 text-white font-semibold px-10 py-5 rounded-full hover:bg-emerald-400 hover:scale-105 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] text-lg"
                                >
                                    Launch Live Demo
                                    <ChevronRight className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </section>
                )}

                {/* Industry Specific: Manufacturing */}
                {product.industry === 'Manufacturing / ERP' && (
                    <section className="container mx-auto px-6 md:px-12 max-w-6xl mb-24">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-gray-700 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-primary)]/20 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                            
                            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">Three solutions.<br/><span className="text-[var(--color-brand-primary)]">Compounding returns.</span></h3>
                                    <p className="text-gray-400 leading-relaxed mb-10 text-lg font-light">
                                        Each solution delivers value independently. Together, they create an intelligent supply chain from component costing for vendor negotiation, through verified material arrival at the gate, to live inventory intelligence.
                                    </p>
                                    <div className="space-y-6">
                                        {[
                                            { title: 'InvenSync', desc: 'From reactive stock management to AI driven demand forecasting.', impact: '20-30% reduction in inventory carrying costs.' },
                                            { title: 'CostEngine', desc: 'From hours of manual Excel work to an automated drawing to costing workflow.', impact: '2 to 4 hours saved per component.' },
                                            { title: 'GateFlow', desc: 'From manual gate entry to a verified barcoded inbound chain.', impact: 'Under 2 minutes gate clearance.' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                                    <Shield className="w-4 h-4 text-[var(--color-brand-primary)]" />
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-gray-400 mb-3 leading-relaxed">{item.desc}</p>
                                                <p className="text-sm font-semibold text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 inline-block px-3 py-1 rounded-full">{item.impact}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">Intelligence engineered for the <span className="text-emerald-400">real world.</span></h3>
                                    <p className="text-gray-400 leading-relaxed mb-10 text-lg font-light">
                                        RootStock Technology builds AI grounded in how manufacturing businesses actually operate: complex, fast moving, and driven by people on the floor.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            "ERP native integration with existing systems.",
                                            "Structured 3 month go live approach.",
                                            "Explainable and auditable AI recommendations.",
                                            "Built for non technical users.",
                                            "Designed for manufacturing teams.",
                                            "Dedicated support after deployment."
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-xl p-5 border border-white/10 hover:-translate-y-1 transition-transform">
                                                <CheckCircle2 className="w-5 h-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                                                <span className="text-sm font-medium text-gray-300 leading-relaxed">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Consultation CTA */}
                <section className="container mx-auto px-6 md:px-12 max-w-5xl">
                    <ConsultationCTA 
                        title={product.ctaTitle || "Ready to Transform Your Business?"}
                        description={product.ctaDescription || `Let's discuss how ${product.title} can help you achieve your goals.`}
                    />
                </section>

            </main>
        </div>
    );
}
