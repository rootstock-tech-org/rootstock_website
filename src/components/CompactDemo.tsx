'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
const LabViewer = dynamic(() => import('./LabViewer'), { ssr: false, loading: () => <div className="b2b-lab-canvas">Loading lab…</div> });
export type DemoKind = 'cad' | 'vision' | 'trading' | 'education';

export default function CompactDemo({ kind }: { kind: DemoKind }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [version, setVersion] = useState(0);
  const [option, setOption] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [audio, setAudio] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (host.current) observer.observe(host.current);
    setAudio('speechSynthesis' in window);
    return () => { observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!visible && kind === 'education' && 'speechSynthesis' in window) { window.speechSynthesis.cancel(); setSpeaking(false); }
  }, [visible, kind]);
  useEffect(() => () => { if (kind === 'education' && 'speechSynthesis' in window) window.speechSynthesis.cancel(); }, [kind]);
  const answer = option ? 'Move the effort farther from the pivot and you need less force to lift the same load.' : 'The resistor limits current through the LED. Increasing resistance reduces the current, making the LED dimmer.';
  const narrate = () => {
    window.speechSynthesis.cancel();
    if (speaking) { setSpeaking(false); return; }
    const utterance = new SpeechSynthesisUtterance(answer);
    utterance.onend = utterance.onerror = () => setSpeaking(false);
    setSpeaking(true); window.speechSynthesis.speak(utterance);
  };
  return <div ref={host} className={`compact-demo demo-${kind} ${visible ? 'is-playing' : ''}`}>
    <div className="demo-bar"><span>{ { cad: 'Drawing → estimate', vision: 'Camera → insight', trading: 'Signal → action', education: 'Question → understanding' }[kind]}</span><span>Interactive preview</span></div>
    {(kind === 'vision' || kind === 'education') && <div className="demo-options" aria-label="Choose demonstration">{(kind === 'vision' ? ['Safety', 'Vehicle identification'] : ['Circuit lab', 'Mechanics lab']).map((label, i) => <button key={label} type="button" aria-pressed={option === Boolean(i)} onClick={() => { setOption(Boolean(i)); setVersion(v => v + 1); if (kind === 'education' && audio) { window.speechSynthesis.cancel(); setSpeaking(false); } }}>{label}</button>)}</div>}
    <div className="demo-stage" key={`${version}-${option}`}>
      {kind === 'cad' && <><svg viewBox="0 0 520 290" role="img" aria-label="An engineering bracket drawing becomes a cost breakdown">
        <g className="cad-object" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M104 181 L104 84 L217 39 L217 135 L329 181 L216 230 Z" fill="#edf2ef"/><path d="M104 181 L216 230 L329 181 L329 195 L216 244 L104 195 Z" fill="#dce6e1"/><path d="M104 84 L117 89 L230 44 L217 39 M117 89 V174 L216 215 L309 177 M217 135 L230 129 V44"/><ellipse cx="159" cy="94" rx="11" ry="16" transform="rotate(25 159 94)"/><ellipse cx="192" cy="80" rx="11" ry="16" transform="rotate(25 192 80)"/><ellipse cx="215" cy="187" rx="18" ry="8"/></g>
        <g fill="none" stroke="#8fa69d" strokeWidth="1"><path d="M76 86 V193 M70 86 H82 M70 193 H82 M113 259 L214 303" transform="translate(0 -4)"/><path d="M240 81 H369 V106" strokeDasharray="4 5"/></g><text x="41" y="147" fill="#64786f" fontSize="11">84</text><g className="demo-reveal"><rect x="340" y="109" width="145" height="103" rx="4" fill="white" stroke="#d4dfd8"/><text x="356" y="134" fill="#64786f" fontSize="10">ESTIMATED UNIT COST</text><text x="356" y="167" fill="#0b6b61" fontSize="27">₹363</text><text x="356" y="191" fill="#64786f" fontSize="11">Material + process</text></g>
      </svg><div className="demo-steps"><span>Drawing read</span><span>Parts identified</span><span>Estimate ready</span></div></>}
      {kind === 'vision' && <><svg viewBox="0 0 520 290" role="img" aria-label={option ? 'Sample vehicle plate highlighted for identification' : 'Sample industrial scene with helmet and safety vest highlighted'}><g fill="none" stroke="#c0cec7" strokeWidth="2"><path d="M25 245 V63 H185 V245 M25 99 H185 M25 145 H185 M25 191 H185 M0 245 H520 M398 245 V56 H496 V245 M398 103 H496"/></g>{option ? <g><path d="M187 164 L225 105 H342 L388 164 L434 177 V235 H153 V181 Z" fill="#bacbc3" stroke="#637e72"/><path d="M234 116 H331 L362 161 H210Z" fill="#f6f8f6"/><circle cx="211" cy="236" r="22" fill="#34534b"/><circle cx="379" cy="236" r="22" fill="#34534b"/><rect x="266" y="195" width="94" height="23" fill="white"/><text x="274" y="211" fontSize="12" fill="#12313d">TEST 0123</text><g className="demo-reveal" stroke="#0b6b61" fill="none"><rect x="258" y="187" width="110" height="39"/><path d="M368 187 L404 155"/></g></g> : <g><circle cx="289" cy="96" r="22" fill="#c1cec6"/><path d="M263 92 Q288 48 315 92 Z" fill="#69877a"/><path d="M255 135 L322 135 L341 225 H237Z" fill="#9cb4a7"/><path d="M268 139 V220 M309 139 V220 M248 190 H330" stroke="#edf2ee" strokeWidth="5"/><path d="M257 147 L230 211 M321 147 L350 211 M269 225 V264 M309 225 V264" stroke="#597568" strokeWidth="13"/><g className="demo-reveal" stroke="#0b6b61" fill="none"><rect x="256" y="61" width="66" height="59"/><rect x="235" y="130" width="108" height="100"/><path d="M322 61 H371"/></g><text x="377" y="65" fill="#0b6b61" fontSize="11">Helmet detected</text></g>}</svg><p className="demo-result">{option ? 'Plate identified · ready for review' : 'Helmet and vest detected · ready for review'}</p></>}
      {kind === 'trading' && <><svg viewBox="0 0 520 290" role="img" aria-label="Illustrative market signal passing a risk check before a simulated order"><g stroke="#dce4df"><path d="M30 65 H490 M30 120 H490 M30 175 H490 M30 230 H490"/></g><path d="M30 218 L65 205 L100 211 L135 179 L170 190 L205 160 L240 170 L275 144 L310 155 L345 119 L380 130 L415 87 L450 97 L490 61" className="demo-chart-line" pathLength="1" fill="none" stroke="#0b6b61" strokeWidth="2.5"/><path d="M30 130 H490" stroke="#8ba99a" strokeDasharray="5 5"/><g className="demo-reveal"><circle cx="415" cy="87" r="5" fill="#0b6b61"/></g></svg><div className="demo-trading-status demo-reveal"><span>Risk check passed</span><span aria-hidden="true">→</span><strong>Paper order</strong></div><div className="demo-steps"><span>Signal detected</span><span>Rules checked</span><span>Simulated order</span></div></>}
      {kind === 'education' && <><div className="demo-question">{option ? 'How does a lever make lifting easier?' : 'Why does this circuit need a resistor?'}</div>{visible && <LabViewer lab={option ? 'mechanics' : 'circuit'} focus={option ? 'beam' : 'resistor'} />}<p className="demo-answer">{answer}</p></>}
    </div>
    <div className="demo-footer"><span>{kind === 'education' ? 'Visual explanation · interactive 3D' : kind === 'trading' ? 'Sample data · paper simulation' : 'Sample geometry and results'}</span>{kind === 'education' && audio && <button type="button" onClick={narrate}>{speaking ? 'Stop audio' : 'Listen ↗'}</button>}</div>
  </div>;
}
