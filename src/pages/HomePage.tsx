import HeroSection from '../components/home/HeroSection';
import TrustStats from '../components/home/TrustStats';
import FeaturedSection from '../components/home/FeaturedSection';
import ExploreLocations from '../components/home/ExploreLocations';
import CuratedCollections from '../components/home/CuratedCollections';
import WhySecureStay from '../components/home/WhySecureStay';
import HowItWorksSection from '../components/home/HowItWorksSection';
import PremiumShowcase from '../components/home/PremiumShowcase';
import RecentSlider from '../components/home/RecentSlider';
import MarketTrendsSection from '../components/home/MarketTrendsSection';
import MortgageCalculatorSection from '../components/home/MortgageCalculatorSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FinalEnquirySection from '../components/home/FinalEnquirySection';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. HERO + PROPERTY SEARCH */}
      <HeroSection />

      {/* 2. TRUST STATISTICS */}
      <TrustStats />

      {/* 3. FEATURED PROPERTIES */}
      <FeaturedSection />

      {/* 4. EXPLORE BY LOCATION */}
      <ExploreLocations />

      {/* 5. PROPERTY COLLECTIONS */}
      <CuratedCollections />

      {/* 6. WHY SECURESTAY */}
      <WhySecureStay />

      {/* 7. HOW IT WORKS */}
      <HowItWorksSection />

      {/* 8. PREMIUM PROPERTY SHOWCASE */}
      <PremiumShowcase />

      {/* 9. RECENTLY ADDED */}
      <RecentSlider />

      {/* 10. MARKET INSIGHTS */}
      <MarketTrendsSection />

      {/* 11. EMI / AFFORDABILITY CALCULATOR */}
      <MortgageCalculatorSection />

      {/* 12. OUR SERVICES */}
      <ServicesSection />

      {/* 13. TESTIMONIALS */}
      <TestimonialsSection />

      {/* 14. FINAL ENQUIRY CTA */}
      <FinalEnquirySection />
    </div>
  );
}
