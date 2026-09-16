import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/FeaturedSection';
import ExploreLocations from '../components/home/ExploreLocations';
import WhySecureStay from '../components/home/WhySecureStay';
import CuratedCollections from '../components/home/CuratedCollections';
import PremiumShowcase from '../components/home/PremiumShowcase';
import HowItWorksSection from '../components/home/HowItWorksSection';
import MarketTrendsSection from '../components/home/MarketTrendsSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FinalEnquirySection from '../components/home/FinalEnquirySection';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 02 — HERO + PRACTICAL PROPERTY SEARCH */}
      <HeroSection />

      {/* 03 — FEATURED PROPERTIES (EDITORIAL ASYMMETRY) */}
      <FeaturedSection />

      {/* 04 — EXPLORE LOCATIONS (MAGAZINE CITY PANELS) */}
      <ExploreLocations />

      {/* 05 — WHY SECURESTAY / TRUST (PHOTOGRAPHY + 3 PILLARS + STATS) */}
      <WhySecureStay />

      {/* 06 — PROPERTY COLLECTIONS */}
      <CuratedCollections />

      {/* 07 — FEATURED PROPERTY STORY (PROPERTY OF THE MONTH) */}
      <PremiumShowcase />

      {/* 08 — HOW IT WORKS */}
      <HowItWorksSection />

      {/* 09 — MARKET INSIGHTS */}
      <MarketTrendsSection />

      {/* 10 — REAL ESTATE SERVICES */}
      <ServicesSection />

      {/* 11 — CLIENT TESTIMONIALS */}
      <TestimonialsSection />

      {/* 12 — FINAL CONTACT CTA */}
      <FinalEnquirySection />
    </div>
  );
}
