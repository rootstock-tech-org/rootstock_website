'use client';

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';

type FormData = { name: string; email: string; company: string; sector: string; message: string };
const initialForm: FormData = { name: '', email: '', company: '', sector: '', message: '' };

export default function PilotButton({ className, children = 'Discuss a pilot' }: { className?: string; children?: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
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

  return <>
    <button type="button" className={className} onClick={() => dialog.current?.showModal()}>{children}</button>
    <dialog ref={dialog} className="pilot-dialog" aria-labelledby={titleId} onClick={(event) => { if (event.target === dialog.current) dialog.current?.close(); }}>
      <div className="pilot-dialog-header"><div><p className="b2b-eyebrow">Start a conversation</p><h2 id={titleId}>Discuss a pilot</h2><p>Tell us about the process you want to improve.</p></div><button type="button" className="pilot-dialog-close" aria-label="Close dialog" onClick={() => dialog.current?.close()}>×</button></div>
        <form className="b2b-contact-form" onSubmit={submit}>
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
    </dialog>
  </>;
}
