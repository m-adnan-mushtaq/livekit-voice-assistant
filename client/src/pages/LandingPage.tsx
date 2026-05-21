import HeroSection from "../components/landing/HeroSection";
import AboutSection from "../components/landing/AboutSection";
import IntroSection from "../components/landing/IntroSection";
import WhyChooseSection from "../components/landing/WhyChooseSection";
import HowAlexaMatchesSection from "../components/landing/HowAlexaMatchesSection";
import SessionsSection from "../components/landing/SessionsSection";
import BenefitsSection from "../components/landing/BenefitsSection";
import InstructorsSection from "../components/landing/InstructorsSection";
import TrustSection from "../components/landing/TrustSection";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <IntroSection />
      <WhyChooseSection />
      <HowAlexaMatchesSection />
      <SessionsSection />
      <BenefitsSection />
      <InstructorsSection />
      <TrustSection />
      <CTASection />
    </main>
  );
}
