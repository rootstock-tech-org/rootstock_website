import PilotButton from '@/components/PilotButton';
import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'Manufacturing', href: '/solutions/manufacturing' },
  { label: 'Financial services', href: '/solutions/financial-services' },
  { label: 'Education & training', href: '/solutions/education' },
];

export default function Footer() {
  return (
    <footer className="b2b-footer">
      <div className="b2b-container">
        <div className="b2b-footer-main">
          <div><Link href="/" className="b2b-brand b2b-footer-brand"><Image src="/RootStock.jpeg" alt="" width={42} height={42} /><span><strong>RootStock</strong><small>TECHNOLOGY</small></span></Link><p>Applied intelligence for the work that matters.</p></div>
          <div><h2>Solutions</h2>{links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}</div>
          <div><h2>Company</h2><Link href="/work">Our work</Link><Link href="/#clients">Clients</Link><Link href="/#contact">About us</Link><Link href="/careers">Careers</Link></div>
          <div><h2>Contact</h2><a href="mailto:info@rootstocktech.co.in">info@rootstocktech.co.in</a><a href="tel:+918085522102">+91 80855 22102</a><PilotButton className="b2b-footer-cta">Discuss a pilot ↗</PilotButton></div>
        </div>
        <div className="b2b-footer-bottom"><span>© {new Date().getFullYear()} RootStock Technology Pvt. Ltd.</span><span>Built for real-world decisions.</span></div>
      </div>
    </footer>
  );
}
