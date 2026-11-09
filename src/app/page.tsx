import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ClientsSection from '@/components/ClientsSection';
import HomeWork from '@/components/HomeWork';
import HomePilotCta from '@/components/HomePilotCta';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return <div className="home-page"><Header activeSection="home"/><main>
    <HeroSection/><ClientsSection/><HomeWork/><HomePilotCta/><ContactSection/>
  </main><Footer/></div>;
}
