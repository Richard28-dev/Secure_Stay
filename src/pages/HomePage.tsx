import HeroSection from '../components/home/HeroSection';
import TrustStats from '../components/home/TrustStats';
import SanctuaryWellnessSection from '../components/home/SanctuaryWellnessSection';
import FeaturedSection from '../components/home/FeaturedSection';
import ExploreLocations from '../components/home/ExploreLocations';
import CuratedCollections from '../components/home/CuratedCollections';
import PremiumShowcase from '../components/home/PremiumShowcase';
import WhySecureStay from '../components/home/WhySecureStay';
import HowItWorksSection from '../components/home/HowItWorksSection';
import MarketTrendsSection from '../components/home/MarketTrendsSection';
import MortgageCalculatorSection from '../components/home/MortgageCalculatorSection';
import ServicesSection from '../components/home/ServicesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FinalEnquirySection from '../components/home/FinalEnquirySection';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 01 — SANCTUARY ARRIVAL & RESORT SEARCH */}
      <HeroSection />

      {/* 02 — VERIFIED RESIDENCY METRICS */}
      <TrustStats />

      {/* 03 — BIOPHILIC ARCHITECTURE & RESTORATIVE LIVING PILLARS */}
      <SanctuaryWellnessSection />

      {/* 04 — FEATURED SANCTUARIES & VILLAS */}
      <FeaturedSection />

      {/* 05 — SANCTUARY DESTINATIONS (Goa, Coorg, Bengaluru, Alibaug, Hyderabad) */}
      <ExploreLocations />

      {/* 06 — LIFESTYLE SANCTUARY COLLECTIONS */}
      <CuratedCollections />

      {/* 07 — FEATURED SANCTUARY OF THE SEASON (The Banyan Villa & Water Pavilion) */}
      <PremiumShowcase />

      {/* 08 — THE SANCTUARY TRUST & TITLE ASSURANCE */}
      <WhySecureStay />

      {/* 09 — THE CURATED ACQUISITION PROCESS */}
      <HowItWorksSection />

      {/* 10 — VILLA ASSET TRENDS & APPRECIATION */}
      <MarketTrendsSection />

      {/* 11 — INTERACTIVE MORTGAGE & EMI CALCULATOR */}
      <MortgageCalculatorSection />

      {/* 12 — BESPOKE CONCIERGE SERVICES */}
      <ServicesSection />

      {/* 13 — SANCTUARY RESIDENT VOICES */}
      <TestimonialsSection />

      {/* 14 — PRIVATE ENQUIRY & CONCIERGE SUITE */}
      <FinalEnquirySection />
    </div>
  );
}
