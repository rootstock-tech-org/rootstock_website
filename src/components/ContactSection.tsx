'use client';

import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="heading-section text-4xl md:text-5xl text-gray-900 mb-4">Let&apos;s Connect</h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to revolutionize human-robot collaboration? Get in touch with us today.
          </p>
        </div>

        <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-2xl max-w-6xl mx-auto border border-[#e5e7eb]/60 overflow-hidden">
          <div className="grid md:grid-cols-5">
            {/* ── Left: info panel (Microsoft-style dark gradient) ── */}
            <div className="md:col-span-2 relative p-8 md:p-10 text-white bg-gradient-to-br from-[#2e5335] to-[#243521] overflow-hidden">
              {/* Ambient orbs */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#35c8ff]/20 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-[#2fa8d8]/15 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold mb-2">Contact Information</h3>
                <p className="text-white/70 text-sm mb-8">Reach us directly or drop a message anytime.</p>

                <div className="space-y-5">
                  <a href="mailto:info@rootstocktech.co.in" className="flex items-center gap-4 group">
                    <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span className="text-white/90 group-hover:text-white transition-colors break-all">info@rootstocktech.co.in</span>
                  </a>

                  <a href="tel:+918085522102" className="flex items-center gap-4 group">
                    <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <span className="text-white/90 group-hover:text-white transition-colors">+91 80855 22102</span>
                  </a>

                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <span className="flex flex-col text-white/90 text-sm leading-relaxed">
                      <span>IIITD Innovation and Incubation Center</span>
                      <span>535, 5th Floor, Okhla Industrial Estate, Phase-III</span>
                      <span>New Delhi-110020</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="md:col-span-3 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      required
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 group-hover:border-primary/50 disabled:opacity-50"
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your Email"
                      required
                      disabled={status === 'submitting'}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 group-hover:border-primary/50 disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project…"
                    required
                    disabled={status === 'submitting'}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 group-hover:border-primary/50 resize-none disabled:opacity-50"
                  ></textarea>
                </div>

                {status === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm">We&apos;ll get back to you within 24-48 hours.</p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                    <p className="font-medium">Failed to send message</p>
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-[#2e5335] to-[#2d402b] text-white font-semibold text-lg px-8 py-3.5 rounded-full hover:shadow-2xl hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  <span className="text-sm text-gray-400 text-center sm:text-left">
                    We&apos;ll respond within 24–48 hours.
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

