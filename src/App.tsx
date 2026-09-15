import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertySearch from './components/PropertySearch';
import FeaturedProperties from './components/FeaturedProperties';
import PropertyShowcase3D from './components/PropertyShowcase3D';
import SignatureProjects from './components/SignatureProjects';
import WhySecureStay from './components/WhySecureStay';
import ArchitectureScroll from './components/ArchitectureScroll';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Locations from './components/Locations';
import CallToAction from './components/CallToAction';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#17181C]">
      <Navbar />
      <Hero />
      <PropertySearch />
      <FeaturedProperties />
      <PropertyShowcase3D />
      <SignatureProjects />
      <WhySecureStay />
      <ArchitectureScroll />
      <Services />
      <Testimonials />
      <Locations />
      <CallToAction />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
