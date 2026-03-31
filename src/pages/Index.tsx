import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LuaDeMelBanner from "@/components/LuaDeMelBanner";
import WellnessSection from "@/components/WellnessSection";
import StorySection from "@/components/StorySection";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import AmbientAudioPlayer from "@/components/AmbientAudioPlayer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AmbientAudioPlayer />
      <Navbar />
      <HeroSection />
      <LuaDeMelBanner />
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
