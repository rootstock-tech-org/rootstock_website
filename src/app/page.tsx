import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HomeWork from '@/components/HomeWork';
import HomeApproach from '@/components/HomeApproach';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return <div className="home-page"><Header activeSection="home"/><main>
    <HeroSection/><ClientsSection/><HomeWork/>
    <HomeApproach/>
    <section id="about" className="home-about"><div className="b2b-container"><p className="home-eyebrow">ABOUT ROOTSTOCK</p><h2>Technology shaped around people.</h2><p>RootStock Technology brings together language systems, computer vision and software engineering to build AI around an organisation’s goals and workflows.</p><p>Incubated at IIIT Delhi Innovation &amp; Incubation Centre, New Delhi.</p></div></section>
    <ContactSection/>
  </main><Footer/></div>;
}
