'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ── Depth levels (0 = front / active) ──────────────────────────────────────
const DEPTH = [
  { scale: 1.000, y: 0,  opacity: 1.00, blur: 0,   shadow: '0 20px 56px rgba(0,0,0,0.13), 0 4px 14px rgba(0,0,0,0.07)' },
  { scale: 0.955, y: 18, opacity: 0.82, blur: 0,   shadow: '0 8px 24px rgba(0,0,0,0.06)' },
  { scale: 0.910, y: 33, opacity: 0.58, blur: 0.5, shadow: '0 4px 14px rgba(0,0,0,0.04)' },
  { scale: 0.865, y: 45, opacity: 0.36, blur: 1,   shadow: '0 2px 8px rgba(0,0,0,0.03)'  },
  { scale: 0.820, y: 55, opacity: 0.18, blur: 2,   shadow: 'none' },
];

const EASE: [number,number,number,number] = [0.16, 1, 0.3, 1];

// ── Workflow card definitions ────────────────────────────────────────────────
const STEPS = [
  'Lead Profile', 'Company Intel', 'Enrichment',
  'AI Research', 'Buying Signals', 'Email Draft',
  'CRM Sync', 'Completed',
];

const CARDS = [
  // ─ Lead Profile ─────────────────────────────────────────────────────────
  {
    step: 0, accent: '#3a6b38',
    body: () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-black text-sm"
            style={{ background: 'linear-gradient(135deg,#3a6b3828,#3a6b3845)', color: '#3a6b38' }}>
            JW
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[#0b182f] text-[15px]">Jake Wilson</div>
            <div className="text-gray-500 text-xs mt-0.5">VP of Sales · TechCorp</div>
            <div className="text-gray-400 text-[11px] mt-0.5">San Francisco, CA</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-semibold text-[#3a6b38] bg-[#3a6b3814] px-2.5 py-0.5 rounded-full mb-1">Score</div>
            <div className="text-2xl font-black text-[#0b182f] leading-none">94</div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['LinkedIn ✓','Email ✓','Mobile ✓'].map(t => (
            <span key={t} className="text-[11px] px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{t}</span>
          ))}
        </div>
        <div>
          <div className="flex justify-between text-[11px] text-gray-400 mb-1.5">
            <span>Profile completeness</span><span className="font-semibold text-gray-600">94%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width:'94%', background:'linear-gradient(90deg,#3a6b38,#68a86580)' }} />
          </div>
        </div>
      </div>
    ),
  },
  // ─ Company Intelligence ──────────────────────────────────────────────────
  {
    step: 1, accent: '#1a6fa8',
    body: () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-sm"
            style={{ background: 'linear-gradient(135deg,#1a6fa828,#1a6fa840)', color: '#1a6fa8' }}>TC</div>
          <div>
            <div className="font-bold text-[#0b182f] text-[15px]">TechCorp</div>
            <div className="text-gray-500 text-xs">B2B SaaS · Series B</div>
            <div className="text-gray-400 text-[11px] mt-0.5">$24M raised · 120 employees</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[{l:'Growth',v:'+34%'},{l:'Founded',v:'2019'},{l:'Avg ACV',v:'$48K'}].map(s => (
            <div key={s.l} className="rounded-xl p-2.5 text-center"
              style={{ background:`#1a6fa80a`, border:`1px solid #1a6fa818` }}>
              <div className="text-[10px] text-gray-400">{s.l}</div>
              <div className="font-black text-[#0b182f] text-sm">{s.v}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="text-[11px] text-gray-400 mb-2 font-medium uppercase tracking-wider">Tech Stack</div>
          <div className="flex gap-2 flex-wrap">
            {['Salesforce','HubSpot','Slack','Stripe'].map(t => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-gray-200 text-gray-500">{t}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  // ─ Contact Enrichment ───────────────────────────────────────────────────
  {
    step: 2, accent: '#0e9488',
    body: () => (
      <div className="flex flex-col gap-3">
        <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Enrichment complete · 2s ago</div>
        {[
          ['Work email','j.wilson@techcorp.io'],
          ['Mobile','+1 (415) 552-****'],
          ['LinkedIn','1,240 connections'],
          ['Decision maker','Budget authority ✓'],
          ['Recent posts','3 mentions of "AI tools"'],
        ].map(([l,v]) => (
          <div key={l} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background:'#0e948815' }}>
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#0e9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-gray-400">{l}</div>
              <div className="text-xs text-gray-700 font-medium">{v}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  // ─ AI Research ─────────────────────────────────────────────────────────
  {
    step: 3, accent: '#7c3aed',
    body: () => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'#7c3aed' }} />
          <span className="text-[10px] text-[#7c3aed] font-semibold uppercase tracking-wider">AI Insights · High confidence</span>
        </div>
        {[
          'Promoted to VP 2 months ago — new budget authority',
          'Mentioned "scaling outbound" in 2 recent LinkedIn posts',
          'Company hired 12 AEs this quarter — expanding GTM',
          "Opened competitor's pricing page 3× last week",
          'Q1 budget cycle starts in 3 weeks',
        ].map((t, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs flex-shrink-0 mt-0.5" style={{ color:'#7c3aed' }}>·</span>
            <p className="text-xs text-gray-600 leading-snug">{t}</p>
          </div>
        ))}
      </div>
    ),
  },
  // ─ Buying Signals ───────────────────────────────────────────────────────
  {
    step: 4, accent: '#d97706',
    body: () => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#d97706] bg-[#d9770612] px-3 py-1 rounded-full">High Intent</span>
          <span className="text-[11px] text-gray-400">Last 7 days</span>
        </div>
        {[
          {s:'Pricing page',d:'Visited 4× this week',b:90},
          {s:'ROI calculator',d:'Downloaded · 8 min session',b:76},
          {s:'Product demo',d:'Watched 4:32 of 6:00',b:60},
          {s:'Email opens',d:'3 of 3 opened',b:86},
        ].map(r => (
          <div key={r.s}>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium text-gray-700">{r.s}</span>
              <span className="text-gray-400">{r.d}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width:`${r.b}%`, background:'linear-gradient(90deg,#d97706,#fbbf2490)' }} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  // ─ Email Draft ─────────────────────────────────────────────────────────
  {
    step: 5, accent: '#0b182f',
    body: () => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">AI Generated · Personalised</div>
          <div className="text-[10px] text-green-500 font-semibold">Ready to send</div>
        </div>
        <div className="text-[11px] text-gray-500">
          <span className="font-semibold text-gray-700">Subject: </span>
          Scaling TechCorp's outbound in Q1?
        </div>
        <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 border border-gray-100">
          Hi Jake,<br /><br />
          Congrats on the VP role — exciting time to be scaling the team.
          Saw you're hiring 12 AEs and noticed TechCorp exploring
          AI-powered prospecting tools…<br /><br />
          <span className="text-gray-400">[Continue reading →]</span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 text-[11px] font-bold py-2 rounded-xl text-white" style={{ background:'#0b182f' }}>
            Send now
          </button>
          <button className="flex-1 text-[11px] font-bold py-2 rounded-xl border border-gray-200 text-gray-600">
            Edit draft
          </button>
        </div>
      </div>
    ),
  },
  // ─ CRM Sync ─────────────────────────────────────────────────────────────
  {
    step: 6, accent: '#0891b2',
    body: () => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background:'#0891b2' }} />
          <span className="text-[11px] text-[#0891b2] font-semibold">Synced to Salesforce · Just now</span>
        </div>
        {[
          ['Contact created','Jake Wilson — VP of Sales'],
          ['Account linked','TechCorp · $48K opportunity'],
          ['Stage set','Prospect → Qualified'],
          ['Task created','Follow-up call · +3 days'],
          ['Sequence enrolled','Enterprise SaaS v3 — Step 1'],
        ].map(([l,v]) => (
          <div key={l} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background:'#0891b215' }}>
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-gray-400">{l}</div>
              <div className="text-xs text-gray-700 font-medium">{v}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  // ─ Task Completed ───────────────────────────────────────────────────────
  {
    step: 7, accent: '#16a34a',
    body: () => (
      <div className="flex flex-col gap-4 items-center text-center py-1">
        <div className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background:'linear-gradient(135deg,#16a34a22,#16a34a38)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <div className="font-black text-[#0b182f] text-base">Pipeline Complete</div>
          <div className="text-gray-400 text-xs mt-1">Jake Wilson · TechCorp</div>
        </div>
        <div className="w-full flex flex-col gap-2 text-left">
          {['Lead enriched','Company researched','Signals detected','Email drafted','CRM synced'].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background:'#16a34a18' }}>
                <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xs text-gray-600">{s}</span>
            </div>
          ))}
        </div>
        <div className="w-full rounded-xl px-4 py-2.5 text-center" style={{ background:'#16a34a0a', border:'1px solid #16a34a1e' }}>
          <div className="text-[11px] text-[#16a34a] font-semibold">Next: Schedule discovery call →</div>
        </div>
      </div>
    ),
  },
];

// ── Key generator ────────────────────────────────────────────────────────────
let _id = 0;
const uid = () => `sc${++_id}`;
type Item = { id: string; idx: number };

// ── Single animated card ─────────────────────────────────────────────────────
function WorkCard({ idx, isActive }: { idx: number; isActive: boolean }) {
  const card = CARDS[idx % CARDS.length];
  return (
    <div className="w-full bg-white rounded-[18px] overflow-hidden select-none">
      {/* card header */}
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-3 border-b border-gray-100/80">
        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background:`${card.accent}1a` }}>
          <div className="w-2 h-2 rounded-full" style={{ background: card.accent }} />
        </div>
        <span className="text-[11px] font-semibold text-gray-400 tracking-wide flex-1">
          {STEPS[card.step]}
        </span>
        {isActive && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-500 tracking-wider">PROCESSING</span>
          </div>
        )}
      </div>
      {/* card body */}
      <div className="px-5 py-4">
        <card.body />
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function StackingCards() {
  const [stack, setStack] = useState<Item[]>(() =>
    Array.from({ length: 5 }, (_, i) => ({ id: uid(), idx: i }))
  );
  const next = useRef(5);
  const paused = useRef(false);
  const activeStep = CARDS[(stack[0]?.idx ?? 0) % CARDS.length].step;

  useEffect(() => {
    const tick = () => {
      if (paused.current) return;
      setStack(prev => [...prev.slice(1), { id: uid(), idx: next.current++ % CARDS.length }]);
    };
    const t = setInterval(tick, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    /* Outer device frame */
    <div
      className="w-full flex flex-col"
      style={{
        background: '#F8F8F6',
        borderRadius: 24,
        border: '1.5px solid rgba(0,0,0,0.07)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.05)',
        overflow: 'visible',       // ← lets exit anim fly out above frame
      }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* ── Window chrome ──────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-5 py-3.5 flex-shrink-0"
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          borderRadius: '22px 22px 0 0',
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* macOS traffic lights */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full" style={{ background:'#ff5f57' }} />
          <div className="w-3 h-3 rounded-full" style={{ background:'#febc2e' }} />
          <div className="w-3 h-3 rounded-full" style={{ background:'#28c840' }} />
        </div>

        {/* Title */}
        <div className="flex-1 text-center">
          <span className="text-[11px] font-semibold text-gray-400" style={{ fontFamily:'Outfit,sans-serif' }}>
            AI Workflow Pipeline · RootStock
          </span>
        </div>

        {/* Live badge */}
        <div className="flex items-center gap-1.5 flex-shrink-0 px-2.5 py-1 rounded-full"
          style={{ background:'#16a34a0f', border:'1px solid #16a34a20' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-600 tracking-wider">LIVE</span>
        </div>
      </div>

      {/* ── Card stack area ─────────────────────────────────────────── */}
      <div
        className="flex-1 relative"
        style={{
          padding: '28px 24px 32px',
          overflow: 'visible',
          /* min-height keeps the frame stable as card content varies */
          minHeight: 340,
        }}
      >
        {/* Exit animation flies upward out of the frame — visible because overflow:visible */}
        <AnimatePresence initial={false}>
          {stack.map(({ id, idx }, pos) => {
            const d = DEPTH[pos] ?? DEPTH[DEPTH.length - 1];
            return (
              <motion.div
                key={id}
                style={{
                  position: 'absolute',
                  insetInline: 24,
                  top: 28,
                  transformOrigin: 'top center',
                  zIndex: 50 - pos * 10,
                  borderRadius: 18,
                  boxShadow: d.shadow,
                  filter: d.blur > 0 ? `blur(${d.blur}px)` : undefined,
                  pointerEvents: pos === 0 ? 'auto' : 'none',
                  overflow: 'visible',
                }}
                initial={{ y: 100, scale: 0.80, opacity: 0 }}
                animate={{ y: d.y, scale: d.scale, opacity: d.opacity }}
                exit={{
                  y: -140,
                  scale: 0.90,
                  opacity: 0,
                  transition: { duration: 0.46, ease: [0.4, 0, 0.85, 0.5] },
                }}
                transition={{
                  y:       { duration: 0.70, ease: EASE },
                  opacity: { duration: 0.60, ease: EASE },
                  filter:  { duration: 0.60, ease: EASE },
                  scale: {
                    type: 'spring',
                    stiffness: pos === 0 ? 260 : 200,
                    damping:   pos === 0 ? 20  : 26,
                  },
                }}
              >
                <WorkCard idx={idx} isActive={pos === 0} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Step progress bar ────────────────────────────────────────── */}
      <div
        className="flex-shrink-0 px-5 pb-4 pt-2"
        style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Workflow progress</span>
          <span className="text-[10px] text-gray-500 font-semibold">
            {activeStep + 1} / {STEPS.length}
          </span>
        </div>
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-700"
              style={{
                background: i <= activeStep
                  ? CARDS[activeStep].accent
                  : 'rgba(0,0,0,0.08)',
                opacity: i <= activeStep ? 1 : 0.5,
              }}
            />
          ))}
        </div>
        <div className="mt-1.5 text-[10px] text-gray-400 font-medium">
          {STEPS[activeStep]}
        </div>
      </div>
    </div>
  );
}
