'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ApplicationModal from '@/components/ApplicationModal';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, BrainCircuit } from 'lucide-react';

export default function CareersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Project Associate');
    const [selectedType, setSelectedType] = useState('Full Time');

    const openApply = (role: string = 'Project Associate', type: string = 'Full Time') => {
        setSelectedRole(role);
        setSelectedType(type);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--color-brand-primary)] selection:text-white font-sans overflow-x-hidden">
            <Navbar />

            <main className="pt-32 pb-32">
                {/* Hero Section */}
                <section className="container mx-auto px-6 md:px-12 max-w-5xl mb-24 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] font-medium text-sm mb-6 border border-[var(--color-brand-primary)]/20">
                            <Sparkles className="w-4 h-4" />
                            Join the Core Team
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-semibold mb-6 tracking-tight">
                            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]">embodied intelligence</span> of the future.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
                            We are looking for builders, researchers, and visionaries to help us shape the next generation of automation.
                        </p>
                    </motion.div>
                </section>

                <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                    {/* Full Time Positions */}
                    <section className="mb-24">
                        <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-200">
                            <Building2 className="w-6 h-6 text-[var(--color-brand-primary)]" />
                            <h2 className="text-3xl font-display font-semibold">Full Time Opportunities</h2>
                        </div>

                        <div className="group bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">Project Associate - IoT & Sensor Fusion</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-blue-50/80 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium border border-blue-100">Project Associate-II</span>
                                        <span className="bg-green-50/80 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium border border-green-100">Full Time</span>
                                        <span className="bg-gray-100/80 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium border border-gray-200">On-Site</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => openApply('Project Associate', 'Full Time')}
                                    className="flex items-center gap-2 px-7 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium hover:bg-[var(--color-brand-primary)] hover:shadow-lg hover:shadow-[var(--color-brand-primary)]/20 transition-all active:scale-95 whitespace-nowrap"
                                >
                                    Apply for this Role
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-400 mb-4">Focus Area</h4>
                                    <p className="text-gray-700 mb-8 font-medium">Hardware Integration and Middleware Development</p>
                                    
                                    <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-400 mb-4">Technical Skills</h4>
                                    <ul className="space-y-3">
                                        {['Expertise in IoT protocols (SPI, I2C, GPIO) & embedded C/C++', 'Background in Industrial Automation, PLC/SCADA, or Robotics (FANUC/ROS)', 'Experience with multi-sensor data fusion and real-time control loops'].map((skill, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] mt-1.5 shrink-0" />
                                                <span>{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold tracking-wider uppercase text-gray-400 mb-4">Job Responsibilities</h4>
                                    <ul className="space-y-3">
                                        {[
                                            'Configure and calibrate Multi-Modal Sensor Fusion Arrays.',
                                            'Synchronize sensor data with FANUC M-710iC/50 controllers.',
                                            'Develop middleware for NVIDIA Jetson AGX Orin edge units.',
                                            'Calibrate 2D/3D vision systems for spatial mapping.',
                                            'Supervise pilot runs at the NTPC NETRA facility.'
                                        ].map((resp, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] mt-1.5 shrink-0" />
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Internships */}
                    <section>
                        <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-200">
                            <BrainCircuit className="w-6 h-6 text-[var(--color-brand-primary)]" />
                            <h2 className="text-3xl font-display font-semibold">Internship Programs</h2>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2">Engineering & Research Interns</h3>
                                    <p className="text-gray-500">Join our R&D teams to build the future of AI and robotics.</p>
                                </div>
                                <button
                                    onClick={() => openApply('Intern', 'Intern')}
                                    className="mt-6 md:mt-0 flex items-center gap-2 px-7 py-3 bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] border border-[var(--color-brand-primary)]/20 rounded-full font-medium hover:bg-[var(--color-brand-primary)] hover:text-white transition-all active:scale-95"
                                >
                                    Apply for Internship
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: 'Frontend & Design', desc: 'Work on Next.js, React, and creating intuitive user interfaces for complex AI systems.' },
                                    { title: 'Backend & Middleware', desc: 'Build scalable APIs, handle IoT communication, and optimize system performance.' },
                                    { title: 'Data Science & AI', desc: 'Contribute to our embodied intelligence models, OCR pipelines, and sensor fusion algorithms.' },
                                    { title: 'Robotics & Hardware', desc: 'Assist in integrating sensors, microcontrollers, and robotic arms for real-world deployment.' }
                                ].map((intern, i) => (
                                    <div key={i} className="p-6 bg-gray-50/50 hover:bg-gray-50 rounded-2xl border border-gray-100 transition-colors group cursor-default">
                                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-brand-primary)] transition-colors">{intern.title}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{intern.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Floating Apply Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40">
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-t border-gray-200/50" />
                <div className="container mx-auto px-6 max-w-5xl relative z-10 py-5">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 text-lg">Ready to build the future?</h4>
                            <p className="text-sm text-gray-500 mt-1">Join our embodied intelligence team today.</p>
                        </div>
                        <button
                            onClick={() => openApply('General Application', 'Full Time')}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[var(--foreground)] text-[var(--background)] rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-[var(--color-brand-primary)] transition-all active:scale-95"
                        >
                            Submit General Application
                        </button>
                    </div>
                </div>
            </div>

            <ApplicationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                initialRole={selectedRole}
                initialType={selectedType}
            />
        </div>
    );
}
