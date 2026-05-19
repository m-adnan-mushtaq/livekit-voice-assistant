import HeroSection from "../components/landing/HeroSection";
import ProblemSection from "../components/landing/ProblemSection";
import SolutionSection from "../components/landing/SolutionSection";
import BenefitsSection from "../components/landing/BenefitsSection";
import TrustSection from "../components/landing/TrustSection";
import FAQSection from "../components/landing/FAQSection";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
