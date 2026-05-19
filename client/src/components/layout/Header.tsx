import { useState } from "react";
import { Link } from "react-router";
import TalkToAlexaButton from "../ui/TalkToAlexaButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/[0.04] backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <nav className="flex justify-between items-center px-4 sm:px-6 lg:px-gutter py-3 sm:py-4 w-full max-w-[1280px] mx-auto">
        <Link
          to="/"
          className="font-headline text-lg sm:text-xl lg:text-headline-sm font-semibold text-on-surface"
        >
          Serene Flow Yoga
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-xl">
          <button
            onClick={() => scrollToSection("solution")}
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 text-sm lg:text-base"
          >
            How it works
          </button>
          <button
            onClick={() => scrollToSection("benefits")}
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 text-sm lg:text-base"
          >
            Benefits
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 text-sm lg:text-base"
          >
            FAQ
          </button>
        </div>

        <div className="hidden sm:block">
          <TalkToAlexaButton variant="header" />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-surface-container/95 backdrop-blur-xl">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("solution")}
              className="text-left text-on-surface-variant font-medium hover:text-primary transition-colors py-2"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-left text-on-surface-variant font-medium hover:text-primary transition-colors py-2"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-left text-on-surface-variant font-medium hover:text-primary transition-colors py-2"
            >
              FAQ
            </button>
            <div className="pt-2">
              <TalkToAlexaButton variant="header" className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
