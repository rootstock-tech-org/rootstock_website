"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import CarouselNavigation from './CarouselNavigation';
import { PulsatingButton } from './magicui/pulsating-button';

export default function EthicsSection() {
  const ethicsCarouselRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const openApply = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    setOpen(true);
  };

  const handlePrevClick = () => {
    if (ethicsCarouselRef.current) {
      const scrollAmount = ethicsCarouselRef.current.clientWidth * 0.5;
      ethicsCarouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNextClick = () => {
    if (ethicsCarouselRef.current) {
      const scrollAmount = ethicsCarouselRef.current.clientWidth * 0.5;
      ethicsCarouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  const ethicalPrinciples = [
    {
      icon: "🎯",
      principle: "We don't push trades or churn.",
      color: "from-[#7AE582] to-[#16BAC5]"
    },
    {
      icon: "🆓",
      principle: "Free plan with summaries & Q&A. Advanced features later.",
      color: "from-[#16BAC5] to-[#5FBFF9]"
    },
    {
      icon: "🔍",
      principle: "Every suggestion shows risk level & confidence score.",
      color: "from-[#5FBFF9] to-[#0B3762]"
    },
    {
      icon: "🛡️",
      principle: "No ads. No third-party sharing. No selling user data — ever.",
      color: "from-[#0B3762] to-[#7AE582]"
    }
  ];

  // Accessibility: close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Ensure portals only render on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

    if (!form.name || !form.email || !form.role) {
      setError('Please fill in your name, email, and the role you are applying for.');
      return;
    }

    const to = 'rootstockai@gmail.com';
    const subject = `Job Application: ${form.role} — ${form.name}`;
    const body = `Hello Hiring Team,%0D%0A%0D%0AMy name is ${form.name}. I'd like to apply for the ${form.role} role.%0D%0A%0D%0AEmail: ${form.email}%0D%0AResume: ${resume ? resume.name : 'Please see attached (attach before sending)'}%0D%0A%0D%0AThanks!`;

    try {
      setSubmitting(true);
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
      setSuccess('Opening your email client with a prefilled application. Please attach your resume if not attached automatically.');
      setForm({ name: '', email: '', role: '' });
      setResume(null);
    } catch (err) {
      setError('Could not open email client. Please email your application to rootstockai@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="ethics" className="section section--divider divider-light">
      <div className="container mx-auto px-6">
        {/* Eye-catching CTA banner */}
        <div className="mb-12">
          <div className="relative overflow-hidden max-w-6xl mx-auto rounded-3xl p-[1px] bg-gradient-to-r from-[#16BAC5] via-[#7AE582] to-[#16BAC5]">
            {/* Decorative blurred orbs */}
            <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-[#16BAC5] opacity-30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-14 -right-10 h-56 w-56 rounded-full bg-[#7AE582] opacity-30 blur-3xl" />
            <div className="rounded-3xl bg-white px-6 py-8 md:px-10 md:py-12 shadow-[0_10px_40px_rgba(0,0,0,0.1)] relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 border border-gray-200">
                    <span className="h-2 w-2 rounded-full bg-[#7AE582] animate-pulse" />
                    <span className="text-xs font-semibold tracking-wide text-gray-700">We're hiring</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold mt-3 leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7AE582] to-[#16BAC5]">Join our mission</span>
                    <span className="text-gray-900"> to build ethical, transparent AI</span>
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mt-3 max-w-2xl">
                    Remote-friendly. Product-first. Ship fast. Have impact.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">Frontend</span>
                    <span className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">Backend</span>
                    <span className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">Full‑Stack</span>
                    <span className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">Data Science</span>
                    <span className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">Design</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <PulsatingButton href="#apply" onClick={openApply} className="px-7 py-3.5 text-base md:text-lg">
                    Apply Now
                  </PulsatingButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && isMounted && createPortal(
        (
          <div
            aria-modal="true"
            role="dialog"
            className="fixed inset-0 z-[1000] flex items-center justify-center"
          >
            {/* Full-viewport dark overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-[1px]"
              onClick={() => setOpen(false)}
            />
            <div
              ref={modalRef}
              className="relative z-10 w-full max-w-xl mx-auto bg-gray-900 rounded-2xl border border-white/15 shadow-2xl p-6 md:p-8"
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
                      className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 outline-none focus:ring-2 focus:ring-[#7AE582]"
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
                      className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 outline-none focus:ring-2 focus:ring-[#7AE582]"
                      placeholder="jane@doe.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-200 mb-1">Role</label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={form.role}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 outline-none focus:ring-2 focus:ring-[#7AE582]"
                    >
                      <option value="" disabled>Select a role</option>
                      <option value="Frontend Engineer">Frontend Engineer</option>
                      <option value="Backend Engineer">Backend Engineer</option>
                      <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Product Designer">Product Designer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-200 mb-1">Resume (PDF/DOC)</label>
                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      className="w-full rounded-lg bg-white/90 text-gray-900 px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#7AE582] file:text-gray-900 hover:file:bg-[#67d374]"
                    />
                    <p className="text-xs text-gray-300 mt-1">Note: Attach your resume in the email draft after clicking Submit.</p>
                  </div>
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
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7AE582] to-[#16BAC5] text-gray-900 font-semibold px-6 py-3 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7AE582] disabled:opacity-60"
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
    </section>
  );
}
