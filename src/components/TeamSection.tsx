'use client';

import React from 'react';

export default function TeamSection() {
    return (
        <section id="team" className="section section--divider divider-light relative overflow-hidden bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Team</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">The minds behind the innovation</p>
                </div>

                {/* Head */}
                <div className="flex flex-col items-center mb-20">
                    <div className="w-48 h-48 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-white">
                        {/* Placeholder for Rashmi Chawla's photo */}
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <span className="text-4xl">RC</span>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Rashmi Chawla</h3>
                    <p className="text-primary font-medium mb-4">Head of RootStock</p>
                    <p className="text-gray-600 text-center max-w-2xl text-lg leading-relaxed">
                        Leading the vision to humanize AI and build systems that empower decision-making with empathy and precision.
                    </p>
                </div>

                {/* R&D Team */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-secondary text-center mb-10 border-b border-gray-200 pb-4 max-w-xs mx-auto">R&D Team</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Researchers Layout - Placeholders */}
                        {[1, 2, 3].map((i) => (
                            <div key={`rnd-${i}`} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all text-center">
                                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-4 flex items-center justify-center text-gray-400">
                                    <span className="text-xl">R&D</span>
                                </div>
                                <h4 className="font-bold text-gray-900">Researcher Name</h4>
                                <p className="text-sm text-gray-500">Research Focus / Mentor</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Technical Team */}
                <div>
                    <h3 className="text-2xl font-bold text-primary text-center mb-10 border-b border-gray-200 pb-4 max-w-xs mx-auto">Technical Team</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Tech Team Layout - Placeholders */}
                        {[1, 2, 3, 4].map((i) => (
                            <div key={`tech-${i}`} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all text-center">
                                <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full mb-4 flex items-center justify-center text-gray-400">
                                    <span className="text-lg">Dev</span>
                                </div>
                                <h4 className="font-bold text-gray-900">Member Name</h4>
                                <p className="text-sm text-gray-600 mt-2">Full Stack Developer - Building the core infrastructure.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
