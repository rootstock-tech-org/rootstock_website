'use client';

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import { createPortal } from 'react-dom';

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialRole?: string;
    initialType?: string;
}

export default function ApplicationModal({ isOpen, onClose, initialRole = 'Project Associate', initialType = 'Full Time' }: ApplicationModalProps) {
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [form, setForm] = useState({ name: '', email: '', role: initialRole, type: initialType });
    const [resume, setResume] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setForm(prev => ({ ...prev, role: initialRole, type: initialType }));
        }
    }, [isOpen, initialRole, initialType]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

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
            setForm({ name: '', email: '', role: initialRole, type: initialType });
            setResume(null);

            setTimeout(() => {
                onClose();
                setSuccess(null);
            }, 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit application. Please try again.');
        } finally {
            setSubmitting(false);
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
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <div
                    ref={modalRef}
                    className="relative z-10 w-full max-w-xl mx-4 bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-6 md:p-8 max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Apply for a role</h3>
                            <p className="text-sm text-gray-400 mt-1">We typically respond within 5–7 days.</p>
                        </div>
                        <button
                            aria-label="Close"
                            onClick={onClose}
                            className="ml-3 rounded-full p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleApply} className="space-y-5 mt-8">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all"
                                    placeholder="jane@doe.com"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1.5">Position Type</label>
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    value={form.type}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl bg-gray-800 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all"
                                >
                                    <option value="Full Time">Full Time</option>
                                    <option value="Intern">Intern</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1.5">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    value={form.role}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl bg-gray-800 border border-white/10 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:border-transparent transition-all"
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
                            <label htmlFor="resume" className="block text-sm font-medium text-gray-300 mb-1.5">Resume (PDF/DOC)</label>
                            <input
                                id="resume"
                                name="resume"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                                className="w-full rounded-xl bg-white/5 border border-white/10 text-gray-300 px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-brand-primary)] file:text-white hover:file:bg-[var(--color-brand-secondary)] file:transition-colors cursor-pointer"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                        {success && <p className="text-green-400 text-sm mt-2 bg-green-400/10 p-3 rounded-lg border border-green-400/20">{success}</p>}

                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl px-5 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-primary)] text-white font-semibold px-6 py-2.5 hover:bg-[var(--color-brand-secondary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[var(--color-brand-primary)] disabled:opacity-50 transition-all shadow-lg shadow-black/20"
                            >
                                {submitting ? 'Submitting…' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ),
        document.body
    );
}
