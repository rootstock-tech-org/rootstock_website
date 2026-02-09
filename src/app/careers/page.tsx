'use client';

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { createPortal } from 'react-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PulsatingButton } from '@/components/magicui/pulsating-button';

export default function CareersPage() {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [form, setForm] = useState({ name: '', email: '', role: 'Project Associate', type: 'Full Time' });
    const [resume, setResume] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        if (open) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    const openApply = (role: string = 'Project Associate', type: string = 'Full Time', e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();
        setForm(prev => ({ ...prev, role, type }));
        setOpen(true);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setResume(file);
    };

    const handleApply = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!form.name || !form.email || !form.role || !form.type) {
            setError('Please fill in all required fields.');
            return;
        }

        if (!resume) {
            setError('Please upload your resume.');
            return;
        }

        try {
            setSubmitting(true);

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('role', form.role);
            formData.append('type', form.type);
            formData.append('resume', resume);

            const response = await fetch('/api/apply', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application');
            }

            setSuccess('Application submitted successfully! Check your email for confirmation.');
            setForm({ name: '', email: '', role: 'Project Associate', type: 'Full Time' });
            setResume(null);

            // Close modal after 3 seconds
            setTimeout(() => {
                setOpen(false);
                setSuccess(null);
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit application. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-inter">
            <Header activeSection="careers" />

            <main className="pt-32 pb-20 container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Open Positions</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join us in building the embodied intelligence of the future.
                    </p>
                </div>

                {/* Full Time Positions */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-primary mb-8 pb-2 border-b border-gray-200">Full Time Opportunities</h2>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Project Associate - IoT & Sensor Fusion</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">Project Associate-II</span>
                                    <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">Full Time</span>
                                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">On-Site</span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => openApply('Project Associate', 'Full Time', e)}
                                className="mt-4 md:mt-0 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-[#344932] transition-colors"
                            >
                                Apply for this Role
                            </button>
                        </div>

                        <div className="prose prose-gray max-w-none text-gray-600">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Focus Area</h4>
                            <p className="mb-6">Hardware Integration and Middleware Development</p>

                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Job Responsibilities</h4>
                            <ul className="list-disc pl-5 space-y-2 mb-6">
                                <li><strong>Sensor Integration:</strong> Configure and calibrate the Multi-Modal Sensor Fusion Array, including Time of Flight (ToF), Inductive (metal), Weight (HX711), and Ultrasonic sensors.</li>
                                <li><strong>Robotic Interfacing:</strong> Synchronize sensor data with the FANUC M-710iC/50 robotic controllers to enable real-time "pick and place" actions based on material classification.</li>
                                <li><strong>Middleware Development:</strong> Develop software middleware for low-latency communication between GPU servers, NVIDIA Jetson AGX Orin edge units, and the conveyor's PLC/SCADA systems.</li>
                                <li><strong>System Calibration:</strong> Perform high-precision calibration of 2D/3D vision systems to ensure accurate spatial coordinate mapping for the robotic end-effectors.</li>
                                <li><strong>On-Site Implementation:</strong> Supervise the physical installation and pilot runs at the NTPC NETRA facility, ensuring operational safety and system uptime of &gt;98%.</li>
                            </ul>

                            <h4 className="text-lg font-semibold text-gray-900 mb-2">Technical Skills Required</h4>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Expertise in IoT protocols (SPI, I2C, GPIO) and embedded programming.</li>
                                <li>Strong background in Industrial Automation, PLC/SCADA, or Robotics (FANUC/ROS).</li>
                                <li>Experience with multi-sensor data fusion and real-time control loops.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Internships */}
                <section>
                    <h2 className="text-2xl font-bold text-secondary mb-8 pb-2 border-b border-gray-200">Internship Programs</h2>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Engineering & Research Interns</h3>
                                <p className="text-gray-600 mt-1">We are looking for passionate students to join our R&D teams.</p>
                            </div>
                            <button
                                onClick={(e) => openApply('Intern', 'Intern', e)}
                                className="mt-4 md:mt-0 px-6 py-2.5 bg-secondary text-white rounded-xl font-semibold hover:bg-[#12949d] transition-colors"
                            >
                                Apply for Internship
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2">Frontend & Design</h4>
                                <p className="text-sm text-gray-600">Work on Next.js, React, and creating intuitive user interfaces for complex AI systems.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2">Backend & Middleware</h4>
                                <p className="text-sm text-gray-600">Build scalable APIs, handle IoT communication, and optimize system performance.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2">Data Science & AI</h4>
                                <p className="text-sm text-gray-600">Contribute to our embodied intelligence models, OCR pipelines, and sensor fusion algorithms.</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-2">Robotics & Hardware</h4>
                                <p className="text-sm text-gray-600">Assist in integrating sensors, microcontrollers, and robotic arms for real-world deployment.</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />

            {/* Modal - Reused Logic */}
            {open && isMounted && createPortal(
                (
                    <div
                        aria-modal="true"
                        role="dialog"
                        className="fixed inset-0 z-[1000] flex items-center justify-center"
                    >
                        <div
                            className="fixed inset-0 bg-black/60 backdrop-blur-[1px]"
                            onClick={() => setOpen(false)}
                        />
                        <div
                            ref={modalRef}
                            className="relative z-10 w-full max-w-xl mx-auto bg-gray-900 rounded-2xl border border-white/15 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Apply for a role</h3>
                                    <p className="text-sm text-gray-300 mt-1">We typically respond within 5–7 days.</p>
                                </div>
                                <button
                                    aria-label="Close"
                                    onClick={() => setOpen(false)}
                                    className="ml-3 rounded-lg p-2 text-gray-300 hover:text-white hover:bg-white/10"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleApply} className="space-y-4 mt-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Full Name</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="jane@doe.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-gray-200 mb-1">Position Type</label>
                                        <select
                                            id="type"
                                            name="type"
                                            required
                                            value={form.type}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="Full Time">Full Time</option>
                                            <option value="Intern">Intern</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-200 mb-1">Role</label>
                                        <select
                                            id="role"
                                            name="role"
                                            required
                                            value={form.role}
                                            onChange={handleInputChange}
                                            className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="" disabled>Select a role</option>
                                            <option value="Project Associate">Project Associate</option>
                                            <option value="Frontend Engineer">Frontend Engineer</option>
                                            <option value="Backend Engineer">Backend Engineer</option>
                                            <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                                            <option value="Data Scientist">Data Scientist</option>
                                            <option value="Product Designer">Product Designer</option>
                                            <option value="Intern">Intern</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="resume" className="block text-sm font-medium text-gray-200 mb-1">Resume (PDF/DOC)</label>
                                    <input
                                        id="resume"
                                        name="resume"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleResumeChange}
                                        className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-gray-900 hover:file:bg-primary/90"
                                    />
                                    <p className="text-xs text-gray-300 mt-1">Your resume will be automatically attached to the application email.</p>
                                </div>

                                {error && <p className="text-red-400 text-sm">{error}</p>}
                                {success && <p className="text-green-400 text-sm">{success}</p>}

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="rounded-xl px-4 py-2 text-gray-200 hover:text-white hover:bg:white/10"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-gray-900 font-semibold px-6 py-3 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60"
                                    >
                                        {submitting ? 'Submitting…' : 'Submit Application'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ),
                document.body
            )}
        </div>
    );
}
