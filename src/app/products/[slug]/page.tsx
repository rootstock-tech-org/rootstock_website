import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductBySlug, getAllProductSlugs } from '@/data/products';
import GetConsultationButton from '@/components/GetConsultationButton';

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
                        <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-[#415b3e]/10 text-[#415b3e] uppercase tracking-wider mb-4">
                            {product.industry}
                        </span>
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

                {/* Tutti Bot Demo - Only for Conservatory Grade */}
                {slug === 'conservatory-grade' && (
                    <section className="container mx-auto px-6 max-w-5xl mb-16">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                Tutti bot - The Grading Tool
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Interact with our advanced music analysis bot. Upload your audio and score to get started.
                            </p>
                        </div>

                        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
                            {/* Placeholder for Tutti Bot Demo - Replace with actual demo URL when available */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 text-center min-h-[600px] flex flex-col items-center justify-center">
                                <div className="max-w-2xl">
                                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Demo Coming Soon</h3>
                                    <p className="text-gray-600 mb-8">
                                        The Tutti Bot interface features advanced music analysis with chat, performance metrics, research insights, and HRI design tools.
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

                {/* CTA Section */}
                <section className="container mx-auto px-6 max-w-5xl">
                    <div className="bg-gradient-to-r from-[#415b3e] to-[#0b182f] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Let's discuss how {product.title} can help you achieve your goals.
                        </p>
                        <GetConsultationButton />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
