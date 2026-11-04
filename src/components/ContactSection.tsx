'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import RevealHeading from './RevealHeading';
import { WHATSAPP_URL } from './FloatingWhatsApp';

type FormData = { name: string; email: string; company: string; sector: string; message: string };
const initialForm: FormData = { name: '', email: '', company: '', sector: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          productInterested: form.sector || 'Pilot inquiry',
          message: form.message,
        }),
      });
      if (!response.ok) throw new Error('We could not send your request. Please email us directly.');
      setStatus('success');
      setForm(initialForm);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Please try again later.');
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="b2b-section b2b-contact">
      <div className="b2b-container b2b-contact-grid">
        <div>
          <p className="b2b-eyebrow" data-reveal="up">Start a conversation</p>
          <RevealHeading lines={['Have one process', <em key="e">in mind?</em>]}/>
          <p data-reveal="up" style={{ '--reveal-i': 2 } as CSSProperties}>Tell us where your team spends time searching, checking or interpreting information. We’ll tell you honestly whether AI is the right fit.</p>
          <div className="b2b-contact-details" data-reveal="up" style={{ '--reveal-i': 3 } as CSSProperties}>
            <div className="contact-detail-item"><span>Email us</span><a href="mailto:info@rootstocktech.co.in">info@rootstocktech.co.in</a></div>
            <div className="contact-detail-item"><span>Call us</span><a href="tel:+918085522102">+91 80855 22102</a></div>
            <div className="contact-detail-item"><span>Prefer chat?</span><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp us</a></div>
            <span>IIITD Innovation and Incubation Center, New Delhi</span>
          </div>
        </div>
        <form className="b2b-contact-form" onSubmit={submit} data-reveal="up" style={{ '--reveal-i': 1 } as CSSProperties}>
          <p className="b2b-form-label">LET’S DISCUSS YOUR USE CASE</p>
          <div className="b2b-form-row">
            <label>Full name <span>*</span><input required name="name" autoComplete="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" /></label>
            <label>Work email <span>*</span><input required type="email" name="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@company.com" /></label>
          </div>
          <div className="b2b-form-row">
            <label>Company<input name="company" autoComplete="organization" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} placeholder="Organization name" /></label>
            <label>Area of interest<select name="sector" value={form.sector} onChange={(event) => setForm({ ...form, sector: event.target.value })}><option value="">Select an area</option><option>Manufacturing</option><option>Financial services</option><option>Education & training</option><option>Other</option></select></label>
          </div>
          <label>What would you like to improve? <span>*</span><textarea required name="message" rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="A few lines about your process, data or challenge" /></label>
          <button className="b2b-button b2b-button-primary" disabled={status === 'submitting'} type="submit">{status === 'submitting' ? 'Sending…' : 'Discuss a pilot'} <span aria-hidden="true">↗</span></button>
          {status === 'success' && <p className="b2b-form-success" role="status">Thanks. Your request has been sent.</p>}
          {status === 'error' && <p className="b2b-form-error" role="alert">{error}</p>}
        </form>
      </div>
    </section>
  );
}
