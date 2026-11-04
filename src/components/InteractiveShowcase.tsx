import Link from 'next/link';
import CompactDemo from './CompactDemo';
type Sector = 'manufacturing' | 'financial-services' | 'education';
const entries: { sector: Sector; label: string; title: string; text: string; tags: string[] }[] = [
  { sector: 'manufacturing', label: '01 / Manufacturing', title: 'From engineering data to everyday decisions.', text: 'Turn CAD drawings into costing workflows. Use camera vision to help teams review safety events and identify vehicles.', tags: ['CAD costing', 'PPE detection', 'Number plate recognition'] },
  { sector: 'financial-services', label: '02 / Financial services', title: 'Put your trading logic to work.', text: 'Connect market signals, strategy rules and risk checks in a trading bot built around your workflow. Give research teams AI assistants grounded in their own information.', tags: ['Trading automation', 'Risk checks', 'Research assistants'] },
  { sector: 'education', label: '03 / Education', title: 'Make complex ideas easier to understand.', text: 'An AI tutor that explains through visuals and audio. Interactive 3D labs help learners explore circuits, mechanics and the concepts behind them.', tags: ['Visual AI tutoring', 'Audio explanations', '3D learning labs'] },
];
export default function InteractiveShowcase({ sector }: { sector?: Sector }) {
  return <section id={sector ? 'showcase' : 'solutions'} className="calm-solutions"><div className="b2b-container">
    {!sector && <div className="calm-section-intro"><p className="b2b-eyebrow">What we build</p><h2>Useful AI. Built around your work.</h2></div>}
    {entries.filter(entry => !sector || entry.sector === sector).map(entry => <article className="calm-solution-row" key={entry.sector}><div className="calm-solution-copy"><p className="b2b-eyebrow">{entry.label}</p><h3>{entry.title}</h3><p>{entry.text}</p><ul>{entry.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="b2b-text-link" href={sector ? '/#contact' : `/solutions/${entry.sector}`}>{sector ? 'Discuss your use case' : `Explore ${entry.sector === 'financial-services' ? 'financial services' : entry.sector}`} <span aria-hidden="true">↗</span></Link></div><CompactDemo kind={entry.sector === 'manufacturing' ? 'vision' : entry.sector === 'education' ? 'education' : 'trading'}/></article>)}
  </div></section>;
}
