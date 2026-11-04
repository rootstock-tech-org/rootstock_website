import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TechnologySection from '@/components/TechnologySection';
import ClientsSection from '@/components/ClientsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header activeSection="home" />
      <main>
        <HeroSection />
        <ClientsSection />
        <TechnologySection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
