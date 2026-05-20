import { useState } from "react";
import { Link } from "react-router";
import TalkToAlexaButton from "../ui/TalkToAlexaButton";

const navItems = [
  { id: "home", label: "Home" },
  { id: "sessions", label: "Sessions" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 glass-nav border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-6 md:px-margin-desktop py-4 w-full max-w-container-max mx-auto">
        <Link
          to="/"
          className="font-headline-sm text-primary font-medium"
          onClick={() => scrollToSection("home")}
        >
          Serene Flow Yoga
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`font-body-md transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:block">
          <TalkToAlexaButton variant="header" label="Book Appointment" />
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-background/95 glass-nav">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-left text-on-surface-variant font-medium hover:text-primary transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            <TalkToAlexaButton variant="header" className="w-full" />
          </div>
        </div>
      )}
    </nav>
  );
}
