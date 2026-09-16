import HeroSection from '../components/home/HeroSection';
import PropertyDiscoverySection from '../components/home/PropertyDiscoverySection';
import TrustStats from '../components/home/TrustStats';
import FeaturedSection from '../components/home/FeaturedSection';
import CuratedCollections from '../components/home/CuratedCollections';
import ExploreLocations from '../components/home/ExploreLocations';
import WhySecureStay from '../components/home/WhySecureStay';
import HowItWorksSection from '../components/home/HowItWorksSection';
import MarketTrendsSection from '../components/home/MarketTrendsSection';
import StepInside3DSection from '../components/home/StepInside3DSection';
import MortgageCalculatorSection from '../components/home/MortgageCalculatorSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FinalEnquirySection from '../components/home/FinalEnquirySection';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. HERO + SEARCH */}
      <HeroSection />

      {/* 2. PROPERTY DISCOVERY CATEGORIES */}
      <PropertyDiscoverySection />

      {/* 3. KEY TRUST STATS */}
      <TrustStats />

      {/* 4. FEATURED PROPERTIES */}
      <FeaturedSection />

      {/* 5. PROPERTY COLLECTIONS */}
      <CuratedCollections />

      {/* 6. EXPLORE BY LOCATION */}
      <ExploreLocations />

      {/* 7. WHY SECURESTAY */}
      <WhySecureStay />

      {/* 8. HOW IT WORKS */}
      <HowItWorksSection />

      {/* 9. MARKET INSIGHTS */}
      <MarketTrendsSection />

      {/* 10. 3D PROPERTY EXPERIENCE */}
      <StepInside3DSection />

      {/* 11. EMI / MORTGAGE CALCULATOR */}
      <MortgageCalculatorSection />

      {/* 12. SERVICES */}
      <ServicesSection />

      {/* 13. CLIENT TESTIMONIALS */}
      <TestimonialsSection />

      {/* 14. PROPERTY ENQUIRY / CONTACT */}
      <FinalEnquirySection />
    </div>
  );
}
