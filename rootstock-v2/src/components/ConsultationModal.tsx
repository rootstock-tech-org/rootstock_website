'use client';

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
        productInterested: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/consultation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send consultation request');
            }

            setStatus('success');
            setFormData({ name: '', email: '', company: '', message: '', productInterested: '' });

            // Close modal after 2 seconds
            setTimeout(() => {
                setStatus('idle');
                onClose();
            }, 2000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    if (!isOpen || !isMounted) return null;

    return createPortal(
        (
            <div
                aria-modal="true"
                role="dialog"
                className="fixed inset-0 z-[1000] flex items-center justify-center"
            >
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-[1px]"
                    onClick={onClose}
                />
                <div
                    ref={modalRef}
                    className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Request a Consultation</h3>
                            <p className="text-sm text-gray-600 mt-1">We'll get back to you within 24-48 hours</p>
                        </div>
                        <button
                            aria-label="Close"
                            onClick={onClose}
                            className="ml-3 rounded-lg p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="consultation-name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    id="consultation-name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={status === 'submitting'}
                                    className="w-full rounded-lg bg-white text-gray-900 px-4 py-2.5 border-2 border-gray-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="consultation-email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    id="consultation-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={status === 'submitting'}
                                    className="w-full rounded-lg bg-white text-gray-900 px-4 py-2.5 border-2 border-gray-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
                                    placeholder="jane@company.com"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="consultation-company" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company/Organization
                                </label>
                                <input
                                    id="consultation-company"
                                    name="company"
                                    type="text"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    disabled={status === 'submitting'}
                                    className="w-full rounded-lg bg-white text-gray-900 px-4 py-2.5 border-2 border-gray-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
                                    placeholder="Acme Inc."
                                />
                            </div>
                            <div>
                                <label htmlFor="product-interested" className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Interested
                                </label>
                                <input
                                    id="product-interested"
                                    name="productInterested"
                                    type="text"
                                    value={formData.productInterested}
                                    onChange={handleInputChange}
                                    disabled={status === 'submitting'}
                                    className="w-full rounded-lg bg-white text-gray-900 px-4 py-2.5 border-2 border-gray-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all disabled:opacity-50"
                                    placeholder="e.g., Edu-Stream Pipeline"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="consultation-message" className="block text-sm font-medium text-gray-700 mb-1">
                                Requirements/Message *
                            </label>
                            <textarea
                                id="consultation-message"
                                name="message"
                                rows={5}
                                required
                                value={formData.message}
                                onChange={handleInputChange}
                                disabled={status === 'submitting'}
                                className="w-full rounded-lg bg-white text-gray-900 px-4 py-2.5 border-2 border-gray-200 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none disabled:opacity-50"
                                placeholder="Tell us about your project or requirements..."
                            ></textarea>
                        </div>

                        {status === 'success' && (
                            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
                                <p className="font-medium">Consultation request sent successfully!</p>
                                <p className="text-sm">We'll contact you soon.</p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                                <p className="font-medium">Failed to send request</p>
                                <p className="text-sm">{errorMessage}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-3 pt-4 mt-2 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={status === 'submitting'}
                                className="rounded-xl px-6 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-medium transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#415b3e] to-[#0b182f] text-white font-semibold px-8 py-3 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#415b3e] disabled:opacity-60 disabled:hover:scale-100 transition-all"
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Submit Request
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ),
        document.body
    );
}
