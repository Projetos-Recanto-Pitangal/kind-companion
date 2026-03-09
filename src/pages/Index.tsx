import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WellnessSection from "@/components/WellnessSection";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <GallerySection />
      <AmenitiesSection />
      <TestimonialsSection />
      <PricingSection />
      <LocationSection />
      <Footer />
    </div>
  );
};

export default Index;
