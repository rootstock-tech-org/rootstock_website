'use client';

import { useState } from 'react';
import ConsultationModal from './ConsultationModal';
import { ArrowRight } from 'lucide-react';

interface ConsultationCTAProps {
    title?: string;
    description?: string;
}

export default function ConsultationCTA({ 
    title = "Ready to Transform Your Business?", 
    description = "Let's discuss how we can help you achieve your goals."
}: ConsultationCTAProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-[2rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        {description}
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-[var(--background)] text-[var(--foreground)] font-semibold px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all active:scale-95 group/btn"
                    >
                        Schedule a Consultation
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            <ConsultationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
}
