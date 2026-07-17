import Navbar from "@/components/Navbar";
import MantiqueiraHero from "@/components/MantiqueiraHero";
import HeroSection from "@/components/HeroSection";
import LuaDeMelBanner from "@/components/LuaDeMelBanner";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import LocationSection from "@/components/LocationSection";
import PetFriendlySection from "@/components/PetFriendlySection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <MantiqueiraHero />
      <PetFriendlySection />
      <HeroSection />
      <LuaDeMelBanner />
      <GallerySection />
      <AmenitiesSection />
      <TestimonialsSection />
      <PricingSection />
      <LocationSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
