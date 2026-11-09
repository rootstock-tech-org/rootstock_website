import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HomeCapabilities from '@/components/HomeCapabilities';
import HomeSolutions from '@/components/HomeSolutions';
import HomeApproach from '@/components/HomeApproach';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return <div className="home-page"><Header activeSection="home"/><main>
    <HeroSection/><HomeCapabilities/><HomeSolutions/>
    <section id="proof" className="home-proof"><div className="b2b-container home-proof-inner"><div><p className="home-eyebrow">PROOF OF WORK</p><h2>Ideas made <em>useful.</em></h2><p>Explore the systems behind these capabilities and see how they take shape in practice.</p></div><Link href="/work" className="home-proof-link">Explore our work <span aria-hidden="true">↗</span></Link></div></section>
    <ClientsSection/><HomeApproach/>
    <section id="about" className="home-about"><div className="b2b-container"><p className="home-eyebrow">ABOUT ROOTSTOCK</p><h2>Technology shaped around people.</h2><p>RootStock Technology brings together language systems, computer vision and software engineering to build AI around an organisation’s goals and workflows.</p><p>Incubated at IIIT Delhi Innovation &amp; Incubation Centre, New Delhi.</p></div></section>
    <ContactSection/>
  </main><Footer/></div>;
}
