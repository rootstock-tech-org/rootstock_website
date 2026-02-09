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
        <div className="text-center mb-16">
          <h2 className="heading-section text-4xl md:text-5xl text-gray-900 mb-4">Let's Connect</h2>
          <p className="lead text-xl text-gray-700 max-w-3xl mx-auto">
            Ready to revolutionize human-robot collaboration? Get in touch with us today.
          </p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-5xl mx-auto border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="heading-section text-2xl text-primary mb-6">Contact Information</h3>
              <div className="space-y-6">
                <p className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  info@rootstocktech.co.in
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  +91 80855 22102
                </p>
                <p className="flex items-center text-gray-700">
                  <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Incubation Centre, IIIT Delhi
                </p>

              </div>
            </div>
            {/* Enhanced Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 group-hover:border-primary/50 disabled:opacity-50"
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
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 group-hover:border-primary/50 disabled:opacity-50"
                />
              </div>
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  required
                  disabled={status === 'submitting'}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 group-hover:border-primary/50 resize-none disabled:opacity-50"
                ></textarea>
              </div>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm">We'll get back to you within 24-48 hours.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                  <p className="font-medium">Failed to send message</p>
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center bg-[#415b3e] text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-[#2d402b] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
