import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { CreatorsDevelopersSection } from "@/components/creators-developers-section";
import { FeaturesSection } from "@/components/features-section";
import { AboutSection } from "@/components/about-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CreatorsDevelopersSection />
      <FeaturesSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}
