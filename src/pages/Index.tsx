import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WellnessSection from "@/components/WellnessSection";
import StorySection from "@/components/StorySection";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <GallerySection />
      <WellnessSection />
      <StorySection />
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
