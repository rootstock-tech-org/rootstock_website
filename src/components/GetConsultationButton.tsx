'use client';

import React, { useState } from 'react';
import ConsultationModal from '@/components/ConsultationModal';

export default function GetConsultationButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center bg-white text-[#415b3e] font-semibold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
                Get Consultation
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
            <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
