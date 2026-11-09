import Link from 'next/link';

const items = [
  { number: '01', title: 'AI tutors', text: 'Guided learning built around course material.', href: '/work/edustream', icon: '◌' },
  { number: '02', title: 'Interactive labs', text: 'Hands-on environments for learning and experimentation.', href: '/work/ai-tutor', icon: '⌘' },
  { number: '03', title: 'Computer vision', text: 'Systems that interpret images and video.', href: '/work/vision-ai', icon: '◎' },
  { number: '04', title: 'AI assistants', text: 'Tools that help people find, understand and act on information.', href: '/work/research-assistant', icon: '✳' },
];
export default function HomeCapabilities() {
  return <section id="capabilities" className="home-section home-capabilities"><div className="b2b-container"><div className="home-section-heading"><div><p className="home-eyebrow">WHAT WE BUILD</p><h2>Intelligence with<br/><em>a purpose.</em></h2></div><p>Different challenges call for different tools. Our work brings AI into the places where people learn, decide and get things done.</p></div><div className="home-capability-grid">{items.map(item => <Link href={item.href} className="home-capability-card" key={item.title}><div className="home-card-top"><span>{item.number} / CAPABILITY</span><span aria-hidden="true">↗</span></div><span className="home-card-icon" aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p><span className="home-card-link">Explore related work ↗</span></Link>)}</div></div></section>;
}
