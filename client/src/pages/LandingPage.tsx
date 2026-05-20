import HeroSection from "../components/landing/HeroSection";
import TrustSection from "../components/landing/TrustSection";
import AboutSection from "../components/landing/AboutSection";
import SessionsSection from "../components/landing/SessionsSection";
import AlexaSection from "../components/landing/AlexaSection";
import BenefitsSection from "../components/landing/BenefitsSection";
import FAQSection from "../components/landing/FAQSection";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <main className="relative">
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <SessionsSection />
      <AlexaSection />
      <BenefitsSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
