import { Link } from "react-router";
import { BRAND } from "../components/landing/shared/constants";

export default function RoomFooter() {
  return (
    <footer className="border-t border-outline-variant/20 bg-surface-container-low">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between space-y-6 px-container-padding-mobile py-12 md:flex-row md:space-y-0 md:px-container-padding-desktop">
        <Link to="/" className="font-display-lg text-headline-sm text-primary">
          {BRAND.name}
        </Link>
        <p className="font-body-sm text-on-surface-variant">
          © 2024 {BRAND.name}. {BRAND.tagline}
        </p>
        <div className="flex space-x-6">
          {["Privacy Policy", "Terms of Service", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body-sm text-on-surface-variant transition-colors hover:text-primary"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
