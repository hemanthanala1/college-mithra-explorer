
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedColleges from '@/components/FeaturedColleges';
import CityExplorer from '@/components/CityExplorer';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedColleges />
        <CityExplorer />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
