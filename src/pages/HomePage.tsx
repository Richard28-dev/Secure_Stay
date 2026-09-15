import HeroSection from '../components/home/HeroSection';
import TrustStats from '../components/home/TrustStats';
import FeaturedSection from '../components/home/FeaturedSection';
import CuratedCollections from '../components/home/CuratedCollections';
import ServicesSection from '../components/home/ServicesSection';
import ExploreLocations from '../components/home/ExploreLocations';
import WhySecureStay from '../components/home/WhySecureStay';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FinalEnquirySection from '../components/home/FinalEnquirySection';

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <TrustStats />
      <FeaturedSection />
      <CuratedCollections />
      <ServicesSection />
      <ExploreLocations />
      <WhySecureStay />
      <TestimonialsSection />
      <FinalEnquirySection />
    </div>
  );
}
