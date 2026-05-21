import { useEffect, useState } from "react";
import { Link } from "react-router";
import TalkToAlexaButton from "../ui/TalkToAlexaButton";
import { BRAND } from "../landing/shared/constants";
import { ROUTES } from "../../common";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { id: "sessions", label: "Explore Sessions" },
  { id: "instructors", label: "Instructors" },
];

export default function Header() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setHasShadow(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 h-20 w-full border-b border-outline-variant/30 bg-surface/80 glass-nav transition-shadow ${
        hasShadow ? "shadow-sm" : ""
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-container-padding-mobile md:px-container-padding-desktop">
        <Link
          to="/"
          onClick={() => scrollToSection("home")}
          className="font-display-lg text-headline-sm text-primary"
        >
          {BRAND.name}
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`font-label-caps text-label-caps transition-colors ${
                activeSection === item.id
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          {isAuthenticated ? (
            <Link
              to={ROUTES.BOOKINGS}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary"
            >
              Sign in
            </Link>
          )}
          <TalkToAlexaButton variant="header" label="Talk with Alexa" />
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-on-surface-variant transition-colors hover:text-primary md:hidden"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-outline-variant/30 bg-surface/95 glass-nav md:hidden">
          <div className="flex flex-col space-y-4 px-container-padding-mobile py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="py-2 text-left font-label-caps text-label-caps text-on-surface-variant transition-colors hover:text-primary"
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated ? (
              <Link
                to={ROUTES.BOOKINGS}
                className="font-label-caps text-label-caps text-primary"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="font-label-caps text-label-caps text-primary"
              >
                Sign in
              </Link>
            )}
            <TalkToAlexaButton
              variant="header"
              label="Talk with Alexa"
              className="w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}
